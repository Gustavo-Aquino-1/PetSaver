'use client'

import { useEffect, useState } from 'react'

export function useLocalStorage(key: string, initialState: unknown) {
  const [state, setState] = useState()

  useEffect(() => {
    const value = JSON.parse(localStorage.getItem(key) || 'null')
    setState(value || initialState)
  }, [])

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [state, key])

  return [state, setState]
}
