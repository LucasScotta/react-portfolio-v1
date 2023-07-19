import { useState, useEffect, useRef } from 'react'
import { getLocalStorage, persistLocalStorage } from './utils'

interface UseLocalStorageProps<T> {
  key: string,
  defaultValue: T
  validator: (val: unknown) => val is T
}

export const useLocalStorage = <T>({ key, defaultValue, validator }: UseLocalStorageProps<T>) => {
  const [storage, setStorage] = useState<T>(getLocalStorage(key, defaultValue, validator))
  const keyRef = useRef(key)
  const validatorRef = useRef(validator)
  const valueRef = useRef(defaultValue)

  useEffect(() => {
    const listenStorage = (e: StorageEvent) => {
      if (e.key === keyRef.current) {
        const value = getLocalStorage(keyRef.current, valueRef.current, validatorRef.current)
        setStorage(value)
      }
    }
    window.addEventListener('storage', listenStorage)
    return () => window.removeEventListener('storage', listenStorage)
  }, [])

  useEffect(() => persistLocalStorage(keyRef.current, storage), [storage])

  return { storage, setStorage }
}
