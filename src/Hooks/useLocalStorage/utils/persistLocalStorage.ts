type PersistLocalStorageFunction = <T>(key: string, value: T) => void

export const persistLocalStorage: PersistLocalStorageFunction = (key, value) => localStorage.setItem(key, JSON.stringify(value))
