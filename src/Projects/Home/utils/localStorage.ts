import { Language } from '../Model'
import { defaultLanguage } from '../constants'


export const getLanguage = () => {
  const isLanguage = (value: unknown): value is Language => typeof value === 'string' && (value === 'es' || value === 'en')

  try {
    const item = localStorage.getItem('language')
    if (!item) return defaultLanguage

    const language: unknown = JSON.parse(item)
    if (!isLanguage(language)) return defaultLanguage

    return isLanguage(language) ? language : defaultLanguage
  }
  catch (e) {
    console.log('Error parsing language\n', e)
    persistLanguage(defaultLanguage)
    return defaultLanguage
  }
}

export const persistLanguage = (language: Language) => localStorage.setItem('language', JSON.stringify(language))
