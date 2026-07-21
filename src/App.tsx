import { useEffect } from 'react'
import styles from './App.module.css'
import FixedBackground from './components/FixedBackground/FixedBackground'
import Footer from './components/Footer/Footer'
import Hero from './components/Hero/Hero'
import Section from './components/Section/Section'
import defaultConfig from './config/site.config'
import { StyleDefaultsProvider } from './context/StyleDefaults'
import { applySeo, applyTheme } from './lib/theme'
import type { SiteConfig } from './types/content'

interface AppProps {
  /** Cho phép truyền config khác để tái sử dụng cho landing page khác. */
  config?: SiteConfig
}

export function App({ config = defaultConfig }: AppProps) {
  const { seo, theme, hero, sections, footer, animation } = config

  useEffect(() => {
    applyTheme(theme, animation)
    applySeo(seo)
  }, [theme, animation, seo])

  return (
    <StyleDefaultsProvider value={theme.defaults}>
      <FixedBackground
        image={theme.backgroundImage}
        color={theme.backgroundColor}
        overlay={theme.backgroundOverlay}
      />

      <main className={styles.page}>
        <Hero config={hero} />

        <div className={styles.content}>
          {sections
            .filter((section) => !section.hidden)
            .map((section) => (
              <Section key={section.id} config={section} animation={animation} />
            ))}
        </div>

        {footer && <Footer config={footer} />}
      </main>
    </StyleDefaultsProvider>
  )
}

export default App
