import { useStyleDefaults } from '../../context/StyleDefaults'
import { createClickHandler } from '../../lib/actions'
import { buttonStyleToCss, mergeStyle } from '../../lib/style'
import type { ButtonConfig } from '../../types/content'
import styles from './GoldButton.module.css'

interface GoldButtonProps {
  config: ButtonConfig
  className?: string
}

/** Nút vàng gradient. `variant: 'overlay'` để đặt nổi lên trên ảnh. */
export function GoldButton({ config, className = '' }: GoldButtonProps) {
  const { label, action, variant = 'inline', style, position } = config
  const defaults = useStyleDefaults('button')
  const isOverlay = variant === 'overlay'
  const css = buttonStyleToCss(mergeStyle(defaults, style), isOverlay ? position : undefined)
  const onClick = createClickHandler(action)

  return (
    <button
      type="button"
      onClick={onClick}
      style={css}
      className={`${styles.button} ${isOverlay ? styles.overlay : ''} ${className}`.trim()}
    >
      {label}
    </button>
  )
}

export default GoldButton
