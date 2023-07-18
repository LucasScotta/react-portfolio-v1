import { useState } from 'react'
import { Navbar } from '../../Components'
import ES_LANG from './text/es.json'
import EN_LANG from './text/en.json'
import { getLanguage } from './utils'
import { Language } from './Model'
const defaultLanguage = 'es'
const text = {
  'es': ES_LANG,
  'en': EN_LANG
}


const Home = () => {
  const [language, setLanguage] = useState<Language>(getLanguage())
  const getText = (key: string) => {
    if (!(language in text)) (text[defaultLanguage] as { [key: string]: string })[key]
    return (text[language] as { [key: string]: string })[key]
  }
  return <>
    <header>
      <Navbar>
      </Navbar>
    </header>
    <main>
      <h1>{getText('welcome')}</h1>
    </main>
  </>
}

export default Home
