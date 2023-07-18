import { Language } from './Model'

type DescriptionList = {
  'es': string[],
  'en': string[],
  'fr': string[]
}

export const isLanguage = (value: unknown): value is Language => typeof value === 'string' && (value === 'es' || value === 'en' || value === 'fr')
export const defaultLanguage: Language = 'es'
export const languages: Language[] = ['es', 'en', 'fr']
export const descriptionList: DescriptionList = {
  'es': ['desarrollador', 'Argentino', 'gamer'],
  'en': ['developer', 'Argentinian', 'gamer'],
  'fr': ['développeur', 'argentin', 'joueur']
}
