import type { ReactNode } from 'react'
import type { MediaItem, RevealEffect, SectionConfig } from '../../types/content'
import GoldButton from '../GoldButton/GoldButton'
import GoldTitle from '../GoldTitle/GoldTitle'
import MediaImage from '../MediaImage/MediaImage'
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
 * Một khối nội dung: tiêu đề + danh sách ảnh + danh sách nút.
 * Toàn bộ hình dạng đến từ `SectionConfig`, không hard-code gì.
 */
export function Section({ config, animation }: SectionProps) {
  const { id, title, media = [], buttons = [], effect = 'shutter' } = config

  return (
    <section id={id} className={styles.section}>
      {title && (
        <Reveal once={animation?.once}>
          <GoldTitle text={title} />
        </Reveal>
      )}

      {media.map((item: MediaItem, i) =>
        withEffect(item.effect ?? effect, <MediaImage item={item} />, animation, i),
      )}

      {buttons.length > 0 && (
        <div className={styles.buttons}>
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
