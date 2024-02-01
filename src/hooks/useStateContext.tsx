'use client'

import { createContext, useContext } from "react"
import { StringParam, useQueryParam, withDefault } from "use-query-params"

interface StateContextProps {
  state: string
  setState: (newValue: string | null) => void
}

const stateContext = createContext({} as StateContextProps)

export function StateContextProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useQueryParam("m", withDefault(StringParam, 'home'))

  return (
    <stateContext.Provider value={{ state, setState }}>
      {children}
    </stateContext.Provider>
  )
}

export default function useStateContext() {
  return useContext(stateContext)
}