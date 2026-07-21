import styles from './FixedBackground.module.css'

interface FixedBackgroundProps {
  image: string
  color?: string
  /** Lớp phủ đè lên ảnh nền, ví dụ 'rgba(0,0,0,.35)' hoặc một gradient. */
  overlay?: string
}

/** Lớp nền cố định phủ toàn màn hình, nằm dưới mọi nội dung. */
export function FixedBackground({ image, color, overlay }: FixedBackgroundProps) {
  return (
    <div
      className={styles.background}
      style={{ backgroundImage: `url(${image})`, backgroundColor: color }}
      aria-hidden="true"
    >
      {overlay && <div className={styles.overlay} style={{ background: overlay }} />}
    </div>
  )
}

export default FixedBackground
