import { Fragment } from 'react'
import { useStyleDefaults } from '../../context/StyleDefaults'
import { mergeStyle, splitLines, titleStyleToCss } from '../../lib/style'
import type { TitleStyle } from '../../types/content'
import styles from './GoldTitle.module.css'

interface GoldTitleProps {
  /** Dùng '\n' trong chuỗi để xuống dòng. */
  text: string
  as?: 'h1' | 'h2' | 'h3'
  style?: TitleStyle
  className?: string
}

/** Tiêu đề chữ vàng gradient, có gạch chân tuỳ chọn. */
export function GoldTitle({ text, as: Tag = 'h2', style, className = '' }: GoldTitleProps) {
  const defaults = useStyleDefaults('title')
  const resolved = mergeStyle(defaults, style)
  // Mặc định tô gradient vàng và có gạch chân, giống bản gốc.
  const css = titleStyleToCss({ gradient: true, ...resolved })
  const underline = resolved?.underline ?? true
  const lines = splitLines(text, resolved?.preserveLineBreaks ?? true)

  return (
    <Tag
      className={`${styles.title} ${underline ? styles.underline : ''} ${className}`.trim()}
      style={css}
    >
      {lines.map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {line}
        </Fragment>
      ))}
    </Tag>
  )
}

export default GoldTitle
