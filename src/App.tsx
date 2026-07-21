import { useEffect } from 'react'
import styles from './App.module.css'
import FixedBackground from './components/FixedBackground/FixedBackground'
import Hero from './components/Hero/Hero'
import Section from './components/Section/Section'
import defaultConfig from './config/site.config'
import { applySeo, applyTheme } from './lib/theme'
import type { SiteConfig } from './types/content'

interface AppProps {
  /** Cho phép truyền config khác để tái sử dụng cho landing page khác. */
  config?: SiteConfig
}

export function App({ config = defaultConfig }: AppProps) {
  const { seo, theme, hero, sections, animation } = config

  useEffect(() => {
    applyTheme(theme, animation)
    applySeo(seo)
  }, [theme, animation, seo])

  return (
    <>
      <FixedBackground image={theme.backgroundImage} color={theme.backgroundColor} />

      <main className={styles.page}>
        <Hero config={hero} />

        <div className={styles.content}>
          {sections
            .filter((section) => !section.hidden)
            .map((section) => (
              <Section key={section.id} config={section} animation={animation} />
            ))}
        </div>
      </main>
    </>
  )
}

export default App
