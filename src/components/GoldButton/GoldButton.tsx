import { createClickHandler } from '../../lib/actions'
import type { ButtonConfig } from '../../types/content'
import styles from './GoldButton.module.css'

interface GoldButtonProps {
  config: ButtonConfig
  className?: string
}

/** Nút vàng gradient. `variant: 'overlay'` để đặt nổi lên trên ảnh. */
export function GoldButton({ config, className = '' }: GoldButtonProps) {
  const { label, action, variant = 'inline' } = config
  const onClick = createClickHandler(action)

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.button} ${variant === 'overlay' ? styles.overlay : ''} ${className}`.trim()}
    >
      {label}
    </button>
  )
}

export default GoldButton
