import { sectionStyleToCss } from '../../lib/style'
import type { FooterConfig } from '../../types/content'
import Paragraphs from '../Paragraphs/Paragraphs'
import styles from './Footer.module.css'

interface FooterProps {
  config: FooterConfig
}

/** Chân trang: dòng bản quyền và các ghi chú cuối trang. */
export function Footer({ config }: FooterProps) {
  const { paragraphs, style, sectionStyle } = config

  return (
    <footer className={styles.footer} style={sectionStyleToCss(sectionStyle)}>
      <Paragraphs items={paragraphs} style={style} className={styles.text} />
    </footer>
  )
}

export default Footer
