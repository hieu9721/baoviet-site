import { Fragment } from 'react'
import styles from './GoldTitle.module.css'

interface GoldTitleProps {
  /** Dùng '\n' trong chuỗi để xuống dòng. */
  text: string
  as?: 'h1' | 'h2' | 'h3'
  /** Có gạch chân gradient bên dưới hay không. */
  underline?: boolean
  className?: string
}

/** Tiêu đề chữ vàng gradient (tương đương `.title-box` bản gốc). */
export function GoldTitle({
  text,
  as: Tag = 'h2',
  underline = true,
  className = '',
}: GoldTitleProps) {
  const lines = text.split('\n')

  return (
    <Tag
      className={`${styles.title} ${underline ? styles.underline : ''} ${className}`.trim()}
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
