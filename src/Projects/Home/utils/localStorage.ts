import { Language } from '../Model'
import { defaultLanguage } from '../constants'


export const getLanguage = () => {

  const language = localStorage.getItem('language')
  if (language) return JSON.parse(language) as Language

  return defaultLanguage
}

export const persistLanguage = (language: Language) => localStorage.setItem('language', JSON.stringify(language))
