'use client'

import {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react'
import { IUser } from '../api/models/User'
import { useLocalStorage } from '../hooks/useLocalStorage'

type ContextProps = {
  user: IUser | null 
  setUser: (user: IUser | null) => void
}

const PetSaverContext = createContext<ContextProps | null>(null)

export default function useAppContext() {
  const context = useContext(PetSaverContext)

  if (!context) throw new Error('Put provider in parent component.')

  return context
}

export const ContextProvider = (props: PropsWithChildren) => {
  const [user, setUser] = useLocalStorage('user', {})

  const contextValue = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user, setUser],
  )

  return (
    <PetSaverContext.Provider value={contextValue}>
      {props.children}
    </PetSaverContext.Provider>
  )
}
