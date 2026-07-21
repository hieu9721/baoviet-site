import type { SiteConfig, ThemeConfig } from '../types/content'

/** Map từ khoá trong config sang tên CSS variable. */
const COLOR_VARS: Record<keyof NonNullable<ThemeConfig['colors']>, string> = {
  goldLight: '--color-gold-light',
  gold: '--color-gold',
  goldDeep: '--color-gold-deep',
  textPrimary: '--color-text-primary',
  textMuted: '--color-text-muted',
  buttonText: '--color-button-text',
}

const FONT_VARS: Record<keyof NonNullable<ThemeConfig['fonts']>, string> = {
  body: '--font-body',
  heading: '--font-heading',
  title: '--font-title',
  button: '--font-button',
}

/**
 * Đẩy `theme` trong config vào CSS variables trên :root.
 * Nhờ vậy đổi màu / font chỉ cần sửa config, không đụng tới file CSS.
 */
export function applyTheme(theme: ThemeConfig, animation?: SiteConfig['animation']): void {
  const root = document.documentElement

  Object.entries(theme.colors ?? {}).forEach(([key, value]) => {
    if (value) root.style.setProperty(COLOR_VARS[key as keyof typeof COLOR_VARS], value)
  })

  Object.entries(theme.fonts ?? {}).forEach(([key, value]) => {
    if (value) root.style.setProperty(FONT_VARS[key as keyof typeof FONT_VARS], value)
  })

  if (theme.backgroundColor) root.style.setProperty('--color-background', theme.backgroundColor)
  if (theme.contentMaxWidth) root.style.setProperty('--content-max-width', theme.contentMaxWidth)
  if (animation?.shutterColor) root.style.setProperty('--shutter-color', animation.shutterColor)
}

/** Cập nhật title / description / favicon theo config. */
export function applySeo(seo: SiteConfig['seo']): void {
  document.title = seo.title

  const setMeta = (selector: string, attr: string, name: string, content: string) => {
    let el = document.head.querySelector<HTMLMetaElement>(selector)
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute(attr, name)
      document.head.appendChild(el)
    }
    el.content = content
  }

  if (seo.description) {
    setMeta('meta[name="description"]', 'name', 'description', seo.description)
  }
  if (seo.ogImage) {
    setMeta('meta[property="og:image"]', 'property', 'og:image', seo.ogImage)
  }
  setMeta('meta[property="og:title"]', 'property', 'og:title', seo.title)

  if (seo.favicon) {
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="icon"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'icon'
      document.head.appendChild(link)
    }
    link.href = seo.favicon
  }
}
