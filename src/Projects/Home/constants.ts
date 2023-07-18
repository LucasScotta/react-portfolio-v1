import { Language } from './Model'

type DescriptionList = {
  'es': string[],
  'en': string[]
}

export const defaultLanguage: Language = 'es'

export const descriptionList: DescriptionList = {
  'es': ['Dev', 'Argentino', 'gamer'],
  'en': ['Dev', 'Argentinian', 'gamer']
}
