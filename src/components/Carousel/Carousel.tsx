import { useCallback, useEffect, useRef, useState } from 'react'
import type { CarouselOptions, MediaItem } from '../../types/content'
import MediaImage from '../MediaImage/MediaImage'
import styles from './Carousel.module.css'
import type { StyleWithVars } from '../../lib/style'

interface CarouselProps {
  items: MediaItem[]
  options?: CarouselOptions
  /** Nhãn cho trình đọc màn hình, thường là tiêu đề section. */
  label?: string
}

/**
 * Khối ảnh cuộn ngang. Dùng scroll-snap của trình duyệt nên vuốt trên điện thoại
 * và cuộn bằng trackpad đều mượt sẵn; JS chỉ lo đồng bộ chấm phân trang.
 */
export function Carousel({ items, options, label }: CarouselProps) {
  const {
    dots = true,
    slidesPerView = 1,
    gap = '12px',
    peek,
    autoplayMs = 0,
    arrows = false,
    dotColor,
    dotActiveColor,
  } = options ?? {}

  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const pageCount = Math.max(1, Math.ceil(items.length / slidesPerView))

  // Suy ra slide đang xem từ vị trí cuộn thật, nên kéo tay hay bấm chấm đều khớp.
  const handleScroll = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    if (max <= 0) return setActive(0)
    const ratio = el.scrollLeft / max
    setActive(Math.round(ratio * (pageCount - 1)))
  }, [pageCount])

  const goTo = useCallback(
    (index: number) => {
      const el = trackRef.current
      if (!el) return
      const max = el.scrollWidth - el.clientWidth
      const target = pageCount > 1 ? (max * index) / (pageCount - 1) : 0
      el.scrollTo({ left: target, behavior: 'smooth' })
    },
    [pageCount],
  )

  useEffect(() => {
    if (!autoplayMs || pageCount < 2) return
    const el = trackRef.current
    let paused = false
    const pause = () => (paused = true)
    const resume = () => (paused = false)
    el?.addEventListener('pointerenter', pause)
    el?.addEventListener('pointerleave', resume)

    const timer = window.setInterval(() => {
      if (!paused) goTo((active + 1) % pageCount)
    }, autoplayMs)

    return () => {
      window.clearInterval(timer)
      el?.removeEventListener('pointerenter', pause)
      el?.removeEventListener('pointerleave', resume)
    }
  }, [autoplayMs, active, pageCount, goTo])

  const trackStyle: StyleWithVars = {
    gap,
    '--slides-per-view': slidesPerView,
    '--carousel-gap': gap,
    '--carousel-peek': peek ?? '0px',
  }

  return (
    <div className={styles.carousel}>
      <div
        ref={trackRef}
        className={styles.track}
        style={trackStyle}
        onScroll={handleScroll}
        role="group"
        aria-roledescription="carousel"
        aria-label={label}
        // Cho phép cuộn bằng phím mũi tên khi khối được focus.
        tabIndex={0}
      >
        {items.map((item, i) => (
          <div key={i} className={styles.slide}>
            <MediaImage item={item} priority={i === 0} />
          </div>
        ))}
      </div>

      {arrows && pageCount > 1 && (
        <>
          <button
            type="button"
            className={`${styles.arrow} ${styles.prev}`}
            onClick={() => goTo(Math.max(0, active - 1))}
            disabled={active === 0}
            aria-label="Ảnh trước"
          >
            ‹
          </button>
          <button
            type="button"
            className={`${styles.arrow} ${styles.next}`}
            onClick={() => goTo(Math.min(pageCount - 1, active + 1))}
            disabled={active === pageCount - 1}
            aria-label="Ảnh tiếp theo"
          >
            ›
          </button>
        </>
      )}

      {dots && pageCount > 1 && (
        <div className={styles.dots}>
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              type="button"
              className={`${styles.dot} ${i === active ? styles.dotActive : ''}`.trim()}
              style={{
                background: i === active ? dotActiveColor : dotColor,
              }}
              onClick={() => goTo(i)}
              aria-label={`Xem ảnh ${i + 1} trên ${pageCount}`}
              aria-current={i === active}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Carousel
