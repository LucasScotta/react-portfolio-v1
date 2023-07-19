export const getLocalStorage = <T>(key: string, defaultValue: T, verifier: (val: unknown) => val is T): T => {
  try {
    const item = localStorage.getItem(key)
    if (!item) {
      localStorage.setItem(key, JSON.stringify(defaultValue))
      return defaultValue
    }
    const parsed = JSON.parse(item) as unknown
    if (!verifier(parsed)) return defaultValue
    return parsed
  }
  catch (e) {
    console.log('Error getting local storage:\n', e)
    return defaultValue
  }
}
