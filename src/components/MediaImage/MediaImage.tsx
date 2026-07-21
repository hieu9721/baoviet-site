import { createClickHandler } from '../../lib/actions'
import type { MediaItem } from '../../types/content'
import GoldButton from '../GoldButton/GoldButton'
import styles from './MediaImage.module.css'

interface MediaImageProps {
  item: MediaItem
  /** Ảnh đầu trang: bỏ lazy-load và ưu tiên tải. */
  priority?: boolean
}

/** Một ảnh trong section — có thể bấm được và/hoặc mang nút nổi bên trên. */
export function MediaImage({ item, priority = false }: MediaImageProps) {
  const { src, alt = '', action, overlayButton, padding, lazy } = item
  const onClick = createClickHandler(action)
  const isLazy = lazy ?? !priority

  const image = (
    <img
      src={src}
      alt={alt}
      loading={isLazy ? 'lazy' : 'eager'}
      fetchPriority={priority ? 'high' : undefined}
      style={padding ? { padding } : undefined}
      className={`${styles.image} ${onClick ? styles.clickable : ''}`.trim()}
      onClick={onClick}
      // Ảnh bấm được cần truy cập được bằng bàn phím.
      {...(onClick && {
        role: 'button',
        tabIndex: 0,
        onKeyDown: (e: React.KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onClick()
          }
        },
      })}
    />
  )

  if (!overlayButton) return image

  return (
    <div className={styles.wrapper}>
      {image}
      <GoldButton config={{ ...overlayButton, variant: 'overlay' }} />
    </div>
  )
}

export default MediaImage
