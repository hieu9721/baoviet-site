import type { ReactNode } from 'react'
import { useStyleDefaults } from '../../context/StyleDefaults'
import { mergeStyle, sectionStyleToCss } from '../../lib/style'
import type { MediaItem, RevealEffect, SectionConfig } from '../../types/content'
import Carousel from '../Carousel/Carousel'
import GoldButton from '../GoldButton/GoldButton'
import GoldTitle from '../GoldTitle/GoldTitle'
import MediaImage from '../MediaImage/MediaImage'
import Paragraphs from '../Paragraphs/Paragraphs'
import Reveal from '../Reveal/Reveal'
import ShutterReveal from '../ShutterReveal/ShutterReveal'
import styles from './Section.module.css'

interface SectionProps {
  config: SectionConfig
  /** Cấu hình hiệu ứng dùng chung, lấy từ `siteConfig.animation`. */
  animation?: { shutterBars?: number; once?: boolean }
}

/** Bọc nội dung bằng hiệu ứng tương ứng. */
function withEffect(
  effect: RevealEffect,
  children: ReactNode,
  animation: SectionProps['animation'],
  key?: string | number,
): ReactNode {
  switch (effect) {
    case 'shutter':
      return (
        <ShutterReveal key={key} bars={animation?.shutterBars} once={animation?.once}>
          {children}
        </ShutterReveal>
      )
    case 'slide':
      return (
        <Reveal key={key} once={animation?.once}>
          {children}
        </Reveal>
      )
    case 'none':
    default:
      return <div key={key}>{children}</div>
  }
}

/**
 * Một khối nội dung: tiêu đề + đoạn văn + ảnh + nút.
 * Toàn bộ nội dung lẫn giao diện đến từ `SectionConfig`, không hard-code gì.
 */
export function Section({ config, animation }: SectionProps) {
  const {
    id,
    title,
    titleStyle,
    paragraphs = [],
    paragraphStyle,
    paragraphsPlacement = 'afterMedia',
    media = [],
    layout = 'stack',
    carousel,
    buttons = [],
    buttonsLayout = 'column',
    effect = 'shutter',
    style,
  } = config

  const defaults = useStyleDefaults('section')
  const css = sectionStyleToCss(mergeStyle(defaults, style))

  const paragraphBlock = paragraphs.length > 0 && (
    <Reveal once={animation?.once} className={styles.paragraphs}>
      <Paragraphs items={paragraphs} style={paragraphStyle} />
    </Reveal>
  )

  return (
    <section id={id} className={styles.section} style={css}>
      {title && (
        <Reveal once={animation?.once} className={styles.titleWrap}>
          <GoldTitle text={title} style={titleStyle} />
        </Reveal>
      )}

      {paragraphsPlacement === 'afterTitle' && paragraphBlock}

      {layout === 'carousel'
        ? // Cả dải cuộn dùng chung một hiệu ứng, tránh từng slide tự chạy rời rạc.
          withEffect(
            effect,
            <Carousel items={media} options={carousel} label={title} />,
            animation,
            'carousel',
          )
        : media.map((item: MediaItem, i) => (
            // Bọc thêm một lớp để CSS giãn cách được các ảnh kề nhau (--media-gap).
            <div key={i} className={styles.media}>
              {withEffect(item.effect ?? effect, <MediaImage item={item} />, animation)}
            </div>
          ))}

      {paragraphsPlacement === 'afterMedia' && paragraphBlock}

      {buttons.length > 0 && (
        <div className={`${styles.buttons} ${buttonsLayout === 'row' ? styles.row : ''}`.trim()}>
          {buttons.map((button, i) => (
            <Reveal key={i} once={animation?.once}>
              <GoldButton config={button} />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  )
}

export default Section
