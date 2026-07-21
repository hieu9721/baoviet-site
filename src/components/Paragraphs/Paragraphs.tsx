import { useStyleDefaults } from '../../context/StyleDefaults'
import { mergeStyle, preventWidow, splitLines, textStyleToCss } from '../../lib/style'
import type { ParagraphItem, TextStyle } from '../../types/content'
import styles from './Paragraphs.module.css'

interface ParagraphsProps {
  /** Mỗi phần tử là một thẻ <p>. Xuống dòng trong chuỗi = ngắt dòng. */
  items: ParagraphItem[]
  /** Style áp cho cả khối; từng đoạn vẫn ghi đè được. */
  style?: TextStyle
  /** Khoá lấy style mặc định trong `theme.defaults`. */
  defaultsKey?: 'paragraph' | 'caption'
  className?: string
}

/** Khối văn bản nhiều đoạn, dùng chung cho Hero và Section. */
export function Paragraphs({
  items,
  style,
  defaultsKey = 'paragraph',
  className = '',
}: ParagraphsProps) {
  const defaults = useStyleDefaults(defaultsKey)
  const blockStyle = mergeStyle(defaults, style)

  if (items.length === 0) return null

  return (
    <div className={`${styles.block} ${className}`.trim()} style={textStyleToCss(blockStyle)}>
      {items.map((item, i) => {
        const text = typeof item === 'string' ? item : item.text
        const own = typeof item === 'string' ? undefined : item.style
        // Đoạn có style riêng thì gộp đè lên style của cả khối.
        const resolved = own ? mergeStyle(blockStyle, own) : undefined
        const preserve = (resolved ?? blockStyle)?.preserveLineBreaks ?? 'auto'
        // 'auto' vẫn tách dòng, nhưng CSS sẽ nối lại khi màn hình hẹp.
        const lineClass =
          preserve === true ? styles.line : preserve === 'auto' ? styles.lineAuto : undefined

        return (
          <p key={i} className={styles.paragraph} style={own ? textStyleToCss(resolved) : undefined}>
            {splitLines(text, preserve).map((line, j, all) => (
              <span key={j} className={lineClass}>
                {/* Chỉ khoá chữ cuối của đoạn — khoá mọi dòng sẽ tạo ra nhiều
                    cụm không tách được và làm ngắt dòng xấu đi. */}
                {j === all.length - 1 ? preventWidow(line) : line}
              </span>
            ))}
          </p>
        )
      })}
    </div>
  )
}

export default Paragraphs
