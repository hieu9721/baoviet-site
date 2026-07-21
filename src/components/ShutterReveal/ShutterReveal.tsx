import type { ReactNode } from 'react'
import { useInView } from '../../hooks/useInView'
import styles from './ShutterReveal.module.css'

interface ShutterRevealProps {
  children: ReactNode
  /** Số thanh chắn dọc. */
  bars?: number
  /** Độ trễ giữa các thanh liền kề (giây). */
  stagger?: number
  className?: string
  once?: boolean
}

/**
 * Hiệu ứng "cửa cuốn": các thanh dọc thu về bên trái lần lượt, đồng thời
 * nội dung bên trong trượt vào (tương đương `.shutter-reveal` bản gốc).
 */
export function ShutterReveal({
  children,
  bars = 12,
  stagger = 0.08,
  className = '',
  once = true,
}: ShutterRevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15, once })
  const barWidth = 100 / bars

  return (
    <div
      ref={ref}
      className={`${styles.shutter} ${inView ? styles.active : ''} ${className}`.trim()}
    >
      {children}
      {Array.from({ length: bars }, (_, i) => (
        <div
          key={i}
          className={styles.bar}
          style={{
            width: `${barWidth}%`,
            left: `${i * barWidth}%`,
            // Thanh bên phải biến mất trước → cảm giác quét từ phải sang trái.
            transitionDelay: `${(bars - 1 - i) * stagger}s`,
          }}
        />
      ))}
    </div>
  )
}

export default ShutterReveal
