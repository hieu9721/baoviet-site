import type { ElementType, ReactNode } from 'react'
import { useInView } from '../../hooks/useInView'
import styles from './Reveal.module.css'

interface RevealProps {
  children: ReactNode
  /** Thẻ HTML được render, mặc định 'div'. */
  as?: ElementType
  /** Trễ trước khi chạy hiệu ứng, tính bằng giây. */
  delay?: number
  className?: string
  once?: boolean
}

/** Trượt từ trái sang + fade in khi cuộn tới (tương đương `.reveal` bản gốc). */
export function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  className = '',
  once = true,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    once,
  })

  return (
    <Tag
      ref={ref}
      className={`${styles.reveal} ${inView ? styles.active : ''} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  )
}

export default Reveal
