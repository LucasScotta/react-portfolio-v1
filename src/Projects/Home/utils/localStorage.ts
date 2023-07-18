import { defaultLanguage } from '../../../constants'
import { Language } from '../Model'


export const getLanguage = () => {

  const language = localStorage.getItem('language')
  if (language) return JSON.parse(language) as Language

  return defaultLanguage
}
