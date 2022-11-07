import { ReactNode } from "react"

import { AuthContextProvider } from "./AuthContext"

interface IAppContextsProps {
  children: ReactNode
}

export function AppContexts({children}: IAppContextsProps) {
  return (
    <AuthContextProvider>
      {children}
    </AuthContextProvider>
  )
}