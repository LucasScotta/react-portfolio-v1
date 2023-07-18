import ES_LANG from '../../text/es.json'
import EN_LANG from '../../text/en.json'
import FR_LANG from '../../text/fr.json'
import { useState, useEffect } from 'react'
import { Language } from '../../Model'
import { getLanguage, persistLanguage } from '../../utils'
import { isLanguage } from '../../constants'

const texts = {
  'es': ES_LANG,
  'en': EN_LANG,
  'fr': FR_LANG
}

export const useLanguage = () => {

  const [language, setLanguage] = useState<Language>(getLanguage())
  const [text, setText] = useState(texts[language])

  const switchLanguage = (newLanguage: string) => {
    setLanguage(prev => !isLanguage(newLanguage) ? prev : newLanguage)
  }

  const getText = (value: string) => (text as { [key: string]: string })[value]


  useEffect(() => {

    const listenLocalChanges = (e: StorageEvent) => {
      if (e.key === 'language') {
        setLanguage(getLanguage())
      }
    }

    persistLanguage(language)
    setText(texts[language])

    window.addEventListener('storage', listenLocalChanges)

    return () => {
      window.removeEventListener('storage', listenLocalChanges)
    }
  }, [language])

  return { language, switchLanguage, getText }
}
