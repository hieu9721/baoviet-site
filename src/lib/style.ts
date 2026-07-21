import type { CSSProperties } from 'react'
import type {
  ButtonStyle,
  MediaStyle,
  OverlayPosition,
  SectionStyle,
  TextStyle,
  TitleStyle,
} from '../types/content'

/** CSSProperties cộng thêm CSS custom properties (`--x`). */
export type StyleWithVars = CSSProperties & Record<`--${string}`, string | number | undefined>

/** Gộp style mặc định với style ghi đè; giá trị `undefined` không ghi đè. */
export function mergeStyle<T extends object>(base?: T, override?: T): T | undefined {
  if (!base) return override
  if (!override) return base
  const result = { ...base } as Record<string, unknown>
  Object.entries(override).forEach(([key, value]) => {
    if (value !== undefined) result[key] = value
  })
  return result as T
}

/** Loại bỏ các khoá có giá trị undefined để không đè lên CSS class. */
function clean(style: StyleWithVars): StyleWithVars {
  Object.keys(style).forEach((key) => {
    if (style[key as keyof StyleWithVars] === undefined) {
      delete style[key as keyof StyleWithVars]
    }
  })
  return style
}

/** Chuyển style của khối chữ thành CSS inline. */
export function textStyleToCss(style?: TextStyle): StyleWithVars {
  if (!style) return {}

  const css: StyleWithVars = {
    fontFamily: style.fontFamily,
    fontSize: style.fontSize,
    fontWeight: style.fontWeight,
    lineHeight: style.lineHeight,
    letterSpacing: style.letterSpacing,
    textTransform: style.textTransform,
    textShadow: style.textShadow,
    textAlign: style.align,
    margin: style.margin,
    padding: style.padding,
    maxWidth: style.maxWidth,
    color: style.color,
  }

  // Tô chữ bằng gradient: nền gradient + cắt theo hình chữ.
  if (style.gradient) {
    css.background = style.gradient === true ? 'var(--gradient-gold)' : style.gradient
    css.WebkitBackgroundClip = 'text'
    css.backgroundClip = 'text'
    css.WebkitTextFillColor = 'transparent'
    // Giữ `color` làm màu dự phòng cho trình duyệt không hỗ trợ background-clip.
    css.color = style.color ?? 'var(--color-gold)'
  }

  if (style.maxWidth && style.align === 'center') {
    css.marginLeft = 'auto'
    css.marginRight = 'auto'
  }

  return clean(css)
}

/** Chuyển style tiêu đề — phần gạch chân đi qua CSS variables cho pseudo-element. */
export function titleStyleToCss(style?: TitleStyle): StyleWithVars {
  if (!style) return {}

  const css = textStyleToCss(style)
  css['--underline-width'] = style.underlineWidth
  css['--underline-height'] = style.underlineHeight
  css['--underline-color'] = style.underlineColor
  css['--underline-gap'] = style.underlineGap

  return clean(css)
}

export function mediaStyleToCss(style?: MediaStyle): StyleWithVars {
  if (!style) return {}

  return clean({
    width: style.width,
    maxWidth: style.maxWidth,
    margin: style.margin,
    padding: style.padding,
    borderRadius: style.borderRadius,
    border: style.border,
    boxShadow: style.boxShadow,
    opacity: style.opacity,
    aspectRatio: style.aspectRatio,
    objectFit: style.objectFit,
  })
}

export function buttonStyleToCss(
  style?: ButtonStyle,
  position?: OverlayPosition,
): StyleWithVars {
  const css: StyleWithVars = {
    background: style?.background,
    color: style?.color,
    fontFamily: style?.fontFamily,
    fontSize: style?.fontSize,
    fontWeight: style?.fontWeight,
    lineHeight: style?.lineHeight,
    padding: style?.padding,
    margin: style?.margin,
    borderRadius: style?.borderRadius,
    border: style?.border,
    boxShadow: style?.boxShadow,
    width: style?.width,
    textTransform: style?.textTransform,
    letterSpacing: style?.letterSpacing,
    // Hover không đặt được inline nên đi qua CSS variable.
    '--hover-scale': style?.hoverScale,
    ...position,
  }

  return clean(css)
}

export function sectionStyleToCss(style?: SectionStyle): StyleWithVars {
  if (!style) return {}

  const css: StyleWithVars = {
    padding: style.padding,
    margin: style.margin,
    background: style.background,
    borderRadius: style.borderRadius,
    border: style.border,
    boxShadow: style.boxShadow,
    maxWidth: style.maxWidth,
    textAlign: style.align,
    '--section-gap': style.gap,
    '--media-gap': style.mediaGap,
  }

  if (style.backdropBlur) {
    css.backdropFilter = `blur(${style.backdropBlur})`
    css.WebkitBackdropFilter = `blur(${style.backdropBlur})`
  }

  // maxWidth chỉ có tác dụng khi khối được căn giữa.
  if (style.maxWidth && !style.margin) {
    css.marginLeft = 'auto'
    css.marginRight = 'auto'
  }

  return clean(css)
}

/** Khoảng trắng không ngắt dòng (U+00A0), viết bằng mã để nhìn thấy được. */
const NBSP = String.fromCharCode(0xa0)

/**
 * Nối hai chữ cuối bằng NBSP để dòng cuối không bao giờ trơ lại một chữ.
 * Cần thiết vì `text-wrap: balance` bị Chrome bỏ qua với khối trên 6 dòng,
 * và trình duyệt cũ thì chưa hỗ trợ thuộc tính này.
 */
export function preventWidow(text: string): string {
  const trimmed = text.trimEnd()
  const lastSpace = trimmed.lastIndexOf(' ')
  // Chỉ có một chữ thì không cần nối.
  if (lastSpace <= 0) return text
  return trimmed.slice(0, lastSpace) + NBSP + trimmed.slice(lastSpace + 1)
}

/**
 * Tách chuỗi nhiều dòng thành từng dòng đã cắt khoảng trắng thừa.
 * Cần thiết vì template literal trong config thường có thụt lề.
 */
export function splitLines(text: string, preserve: boolean | 'auto' = 'auto'): string[] {
  const lines = text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)

  // `false` gộp thành một dòng duy nhất; `true` và `'auto'` giữ nguyên các dòng
  // rồi để CSS quyết định có xuống dòng thật hay không.
  return preserve === false ? [lines.join(' ')] : lines
}
