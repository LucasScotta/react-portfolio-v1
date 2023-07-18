import ES_LANG from '../../text/es.json'
import EN_LANG from '../../text/en.json'
import { useState, useEffect } from 'react'
import { Language } from '../../Model'
import { getLanguage, persistLanguage } from '../../utils'

const texts = {
  'es': ES_LANG,
  'en': EN_LANG
}

export const useLanguage = () => {

  const [language, setLanguage] = useState<Language>(getLanguage())
  const [text, setText] = useState(texts[language])

  const switchLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es')
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
