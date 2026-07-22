import type { KeyboardEvent } from 'react'
import { useStyleDefaults } from '../../context/StyleDefaults'
import { createClickHandler } from '../../lib/actions'
import { fetchPriorityAttr } from '../../lib/dom'
import { mediaStyleToCss, mergeStyle } from '../../lib/style'
import type { MediaItem } from '../../types/content'
import GoldButton from '../GoldButton/GoldButton'
import Paragraphs from '../Paragraphs/Paragraphs'
import styles from './MediaImage.module.css'

interface MediaImageProps {
  item: MediaItem
  /** Ảnh đầu trang: bỏ lazy-load và ưu tiên tải. */
  priority?: boolean
}

/** Một ảnh — có thể bấm được, mang nút nổi và/hoặc chú thích bên dưới. */
export function MediaImage({ item, priority = false }: MediaImageProps) {
  const { src, alt = '', action, overlayButton, style, padding, lazy, caption, captionStyle } = item
  const defaults = useStyleDefaults('media')
  // `padding` viết tắt chỉ dùng khi style.padding không có.
  const resolved = mergeStyle(mergeStyle(defaults, { padding }), style)
  const css = mediaStyleToCss(resolved)

  const onClick = createClickHandler(action)
  const isLazy = lazy ?? !priority

  const image = (
    <img
      src={src}
      alt={alt}
      loading={isLazy ? 'lazy' : 'eager'}
      // Ảnh nặng (nhiều tấm 2–3 MB): giải mã ngoài luồng chính để không kẹt cuộn.
      // Ảnh đầu trang giải mã đồng bộ cho kịp lần vẽ đầu (LCP).
      decoding={priority ? 'sync' : 'async'}
      {...fetchPriorityAttr(priority)}
      style={css}
      className={`${styles.image} ${onClick ? styles.clickable : ''}`.trim()}
      onClick={onClick}
      // Ảnh bấm được cần truy cập được bằng bàn phím.
      {...(onClick && {
        role: 'button',
        tabIndex: 0,
        onKeyDown: (e: KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onClick()
          }
        },
      })}
    />
  )

  // Không có gì bọc thêm thì trả thẳng thẻ img.
  if (!overlayButton && !caption) return image

  return (
    <div className={styles.wrapper}>
      {image}
      {overlayButton && <GoldButton config={{ ...overlayButton, variant: 'overlay' }} />}
      {caption && (
        <Paragraphs
          items={[caption]}
          style={captionStyle}
          defaultsKey="caption"
          className={styles.caption}
        />
      )}
    </div>
  )
}

export default MediaImage
