import type { Action } from '../types/content'

/** Biến đường dẫn tương đối thành URL tuyệt đối (Google Viewer cần URL công khai). */
function toAbsoluteUrl(url: string): string {
  if (/^https?:\/\//i.test(url)) return url
  return window.location.origin + (url.startsWith('/') ? url : `/${url}`)
}

/**
 * Sự kiện nội bộ nối `runAction` (hàm thuần) với `PdfViewer` (component ở App),
 * để không phải luồn prop qua từng Section / MediaImage.
 */
export const PDF_VIEWER_EVENT = 'baoviet:open-pdf'

export interface PdfViewerRequest {
  url: string
  title?: string
}

function openPdfViewer(url: string, title?: string): void {
  window.dispatchEvent(
    new CustomEvent<PdfViewerRequest>(PDF_VIEWER_EVENT, { detail: { url, title } }),
  )
}

/** Thực thi một `Action` từ config. */
export function runAction(action: Action): void {
  switch (action.type) {
    case 'link':
    case 'pdf': {
      const newTab = action.newTab ?? true
      if (newTab) window.open(action.url, '_blank', 'noopener,noreferrer')
      else window.location.href = action.url
      break
    }
    case 'pdfViewer': {
      openPdfViewer(action.url, action.title)
      break
    }
    case 'gdocsViewer': {
      const viewer =
        'https://docs.google.com/viewer?url=' +
        encodeURIComponent(toAbsoluteUrl(action.url)) +
        '&embedded=false'
      window.open(viewer, '_blank', 'noopener,noreferrer')
      break
    }
    case 'scrollTo': {
      document
        .getElementById(action.targetId)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      break
    }
  }
}

/**
 * Tạo handler onClick từ config; trả về `undefined` nếu không có action
 * để component biết là phần tử không tương tác được.
 */
export function createClickHandler(action?: Action) {
  if (!action) return undefined
  return () => runAction(action)
}
