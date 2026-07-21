import type { HeroConfig } from '../../types/content'
import Reveal from '../Reveal/Reveal'
import styles from './Hero.module.css'

interface HeroProps {
  config: HeroConfig
}

/** Khối đầu trang: banner, dòng chào, tiêu đề, các đoạn giới thiệu. */
export function Hero({ config }: HeroProps) {
  const { bannerImage, eyebrow, titleImage, titleText, paragraphs = [] } = config

  return (
    <header className={styles.hero}>
      {bannerImage && (
        <img src={bannerImage} alt="" className={styles.banner} fetchPriority="high" />
      )}

      {eyebrow && (
        <Reveal className={styles.text}>
          <span className={styles.eyebrow}>{eyebrow}</span>
        </Reveal>
      )}

      {(titleImage || titleText) && (
        <Reveal className={styles.titleWrap}>
          {titleImage ? (
            <img src={titleImage} alt={titleText ?? ''} className={styles.titleImage} />
          ) : (
            <h1 className={styles.titleText}>{titleText}</h1>
          )}
        </Reveal>
      )}

      {paragraphs.length > 0 && (
        <Reveal className={styles.text}>
          {paragraphs.map((paragraph, i) => (
            <p key={i} className={styles.paragraph}>
              {paragraph.split('\n').map((line, j) => (
                <span key={j} className={styles.line}>
                  {line}
                </span>
              ))}
            </p>
          ))}
        </Reveal>
      )}
    </header>
  )
}

export default Hero
