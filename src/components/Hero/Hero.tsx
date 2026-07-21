import { fetchPriorityAttr } from '../../lib/dom'
import { mediaStyleToCss, sectionStyleToCss, textStyleToCss } from '../../lib/style'
import type { HeroConfig } from '../../types/content'
import GoldButton from '../GoldButton/GoldButton'
import GoldTitle from '../GoldTitle/GoldTitle'
import MediaImage from '../MediaImage/MediaImage'
import Paragraphs from '../Paragraphs/Paragraphs'
import Reveal from '../Reveal/Reveal'
import styles from './Hero.module.css'

interface HeroProps {
  config: HeroConfig
}

/** Khối đầu trang: banner, dòng chào, tiêu đề, các đoạn giới thiệu, nút. */
export function Hero({ config }: HeroProps) {
  const {
    bannerImage,
    bannerStyle,
    eyebrow,
    eyebrowStyle,
    titleImage,
    titleImageStyle,
    titleText,
    titleStyle,
    media = [],
    paragraphs = [],
    paragraphStyle,
    buttons = [],
    style,
  } = config

  return (
    <header className={styles.hero} style={sectionStyleToCss(style)}>
      {bannerImage && (
        <img
          src={bannerImage}
          alt=""
          className={styles.banner}
          style={mediaStyleToCss(bannerStyle)}
          {...fetchPriorityAttr(true)}
        />
      )}

      {eyebrow && (
        <Reveal className={styles.eyebrowWrap}>
          <span className={styles.eyebrow} style={textStyleToCss(eyebrowStyle)}>
            {eyebrow}
          </span>
        </Reveal>
      )}

      {(titleImage || titleText) && (
        <Reveal className={styles.titleWrap}>
          {titleImage ? (
            <img
              src={titleImage}
              alt={titleText ?? ''}
              className={styles.titleImage}
              style={mediaStyleToCss(titleImageStyle)}
            />
          ) : (
            // Tiêu đề trang chỉ nên có một, nên dùng h1 và bỏ gạch chân.
            <GoldTitle
              text={titleText!}
              as="h1"
              style={{ underline: false, ...titleStyle }}
              className={styles.titleText}
            />
          )}
        </Reveal>
      )}

      {media.map((item, i) => (
        <Reveal key={i} className={styles.mediaWrap}>
          <MediaImage item={item} priority />
        </Reveal>
      ))}

      {paragraphs.length > 0 && (
        <Reveal className={styles.textWrap}>
          <Paragraphs items={paragraphs} style={paragraphStyle} />
        </Reveal>
      )}

      {buttons.length > 0 && (
        <Reveal className={styles.buttons}>
          {buttons.map((button, i) => (
            <GoldButton key={i} config={button} />
          ))}
        </Reveal>
      )}
    </header>
  )
}

export default Hero
