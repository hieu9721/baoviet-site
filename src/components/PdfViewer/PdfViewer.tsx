import { useCallback, useEffect, useRef, useState } from 'react'
import { PDF_VIEWER_EVENT, type PdfViewerRequest } from '../../lib/actions'
import styles from './PdfViewer.module.css'

/** Mức phóng to cho phép, người xem bấm +/− để chuyển. */
const ZOOM_STEPS = [1, 1.5, 2, 3]

type Pdfjs = typeof import('pdfjs-dist')
type PdfDocument = Awaited<ReturnType<Pdfjs['getDocument']>['promise']>

/** Nạp pdf.js một lần rồi tái dùng; worker cũng chỉ dựng một lần. */
let pdfjsPromise: Promise<Pdfjs> | null = null

function loadPdfjs(): Promise<Pdfjs> {
  pdfjsPromise ??= import('pdfjs-dist').then((pdfjs) => {
    // Worker của pdf.js v6 là ES module. Tự dựng Worker rồi truyền qua
    // `workerPort` để Vite đóng gói đúng file worker và ta kiểm soát được
    // `type: 'module'`, thay vì để pdf.js tự đoán từ `workerSrc`.
    // Đi kèm `worker.format: 'es'` trong vite.config.ts.
    pdfjs.GlobalWorkerOptions.workerPort = new Worker(
      new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url),
      { type: 'module' },
    )
    return pdfjs
  })
  return pdfjsPromise
}

/** Giữ lại tài liệu đã mở để lần mở sau hiện ngay, không phải tải lại. */
const documentCache = new Map<string, Promise<PdfDocument>>()

function loadDocument(pdfjs: Pdfjs, url: string): Promise<PdfDocument> {
  let doc = documentCache.get(url)
  if (!doc) {
    doc = pdfjs.getDocument({ url }).promise
    // Hỏng thì bỏ khỏi cache, nếu không mọi lần mở sau đều hỏng theo.
    doc.catch(() => documentCache.delete(url))
    documentCache.set(url, doc)
  }
  return doc
}

/** Trạng thái tải của tài liệu đang mở. */
type Status = 'loading' | 'ready' | 'error'

/**
 * Lớp phủ đọc PDF ngay trong trang, render bằng pdf.js ra canvas.
 * Dùng canvas thay cho `<iframe>` vì Chrome Android không có trình đọc PDF
 * nhúng (iframe ra trang trắng) còn Safari iOS chỉ hiện trang đầu.
 *
 * Component tự lắng nghe `PDF_VIEWER_EVENT` nên chỉ cần đặt một lần ở `App`.
 */
export function PdfViewer() {
  const [request, setRequest] = useState<PdfViewerRequest | null>(null)
  const [status, setStatus] = useState<Status>('loading')
  const [zoom, setZoom] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  /* Mở: nhận sự kiện từ `runAction`. */
  useEffect(() => {
    const onOpen = (event: Event) => {
      setRequest((event as CustomEvent<PdfViewerRequest>).detail)
      setStatus('loading')
      setZoom(0)
      // Đẩy một mốc lịch sử để nút back của điện thoại/trình duyệt đóng lớp
      // phủ thay vì rời khỏi trang.
      window.history.pushState({ pdfViewer: true }, '')
    }
    window.addEventListener(PDF_VIEWER_EVENT, onOpen)
    return () => window.removeEventListener(PDF_VIEWER_EVENT, onOpen)
  }, [])

  /* Đóng: nút back đã pop mốc lịch sử, chỉ cần dọn state. */
  useEffect(() => {
    if (!request) return
    const onPopState = () => setRequest(null)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [request])

  /* Nút "Quay lại" đi qua history để hai đường đóng về cùng một luồng. */
  const close = useCallback(() => window.history.back(), [])

  /* Khoá cuộn nền khi đang mở. */
  useEffect(() => {
    if (!request) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [request])

  /* Tải và vẽ toàn bộ trang PDF. */
  useEffect(() => {
    if (!request) return
    const container = containerRef.current
    if (!container) return

    let cancelled = false
    let current: { cancel: () => void } | null = null

    async function render(url: string, host: HTMLDivElement) {
      try {
        // Nạp động để pdf.js nằm ở chunk riêng, không làm nặng lần tải đầu.
        const pdfjs = await loadPdfjs()
        const loaded = await loadDocument(pdfjs, url)
        if (cancelled) return

        host.replaceChildren()
        // Bề rộng khung nhìn nhân mức phóng; trang rộng hơn thì cuộn ngang.
        const targetWidth = host.clientWidth * ZOOM_STEPS[zoom]
        // Giới hạn 2x để trang nhiều điểm ảnh không ngốn bộ nhớ trên di động.
        const dpr = Math.min(window.devicePixelRatio || 1, 2)

        for (let number = 1; number <= loaded.numPages; number += 1) {
          const page = await loaded.getPage(number)
          if (cancelled) return

          const base = page.getViewport({ scale: 1 })
          const viewport = page.getViewport({ scale: (targetWidth / base.width) * dpr })

          const canvas = document.createElement('canvas')
          canvas.className = styles.page
          canvas.width = viewport.width
          canvas.height = viewport.height
          canvas.style.width = `${viewport.width / dpr}px`
          const context = canvas.getContext('2d')
          if (!context) continue

          const task = page.render({ canvas, canvasContext: context, viewport })
          current = task
          await task.promise
          if (cancelled) return
          host.append(canvas)

          // Trang đầu hiện lên là bỏ thông báo tải; các trang sau vẽ dần.
          if (number === 1) setStatus('ready')
        }
      } catch {
        if (!cancelled) setStatus('error')
      }
    }

    setStatus('loading')
    void render(request.url, container)

    return () => {
      cancelled = true
      // Chỉ dừng việc vẽ dở; tài liệu giữ trong cache cho lần mở sau.
      current?.cancel()
    }
  }, [request, zoom])

  if (!request) return null

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label={request.title}>
      <div className={styles.band}>
        <div className={styles.bar}>
          <button type="button" className={styles.back} onClick={close} aria-label="Quay lại">
            <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 5 8 12l7 7" />
            </svg>
            <span className={styles.backLabel}>Quay lại</span>
          </button>

          <span className={styles.title}>{request.title}</span>

          <div className={styles.zoom}>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(0, z - 1))}
              disabled={zoom === 0}
              aria-label="Thu nhỏ"
            >
              <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(ZOOM_STEPS.length - 1, z + 1))}
              disabled={zoom === ZOOM_STEPS.length - 1}
              aria-label="Phóng to"
            >
              <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          </div>

          {/* Giữ chỗ cho cụm zoom bị ẩn ở mobile. */}
          <div className={styles.spacer} aria-hidden="true" />
        </div>
      </div>

      <div className={styles.scroll}>
        <div ref={containerRef} className={styles.pages} />

        {status === 'loading' && <p className={styles.notice}>Đang tải tài liệu…</p>}

        {status === 'error' && (
          <p className={styles.notice}>
            Không hiển thị được tài liệu.{' '}
            <a href={request.url} target="_blank" rel="noopener noreferrer">
              Mở file PDF
            </a>
          </p>
        )}
      </div>
    </div>
  )
}

export default PdfViewer
