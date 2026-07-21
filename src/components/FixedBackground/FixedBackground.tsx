import styles from './FixedBackground.module.css'

interface FixedBackgroundProps {
  image: string
  color?: string
}

/** Lớp nền cố định phủ toàn màn hình, nằm dưới mọi nội dung. */
export function FixedBackground({ image, color }: FixedBackgroundProps) {
  return (
    <div
      className={styles.background}
      style={{ backgroundImage: `url(${image})`, backgroundColor: color }}
      aria-hidden="true"
    />
  )
}

export default FixedBackground
