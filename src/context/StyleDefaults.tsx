import { createContext, useContext, type ReactNode } from 'react'
import type { StyleDefaults } from '../types/content'

const StyleDefaultsContext = createContext<StyleDefaults>({})

export function StyleDefaultsProvider({
  value,
  children,
}: {
  value?: StyleDefaults
  children: ReactNode
}) {
  return (
    <StyleDefaultsContext.Provider value={value ?? {}}>{children}</StyleDefaultsContext.Provider>
  )
}

/**
 * Lấy style mặc định của một loại thành phần (`theme.defaults`).
 * Component tự gộp với style riêng của mình, nên không cần truyền props xuyên tầng.
 */
export function useStyleDefaults<K extends keyof StyleDefaults>(key: K): StyleDefaults[K] {
  return useContext(StyleDefaultsContext)[key]
}
