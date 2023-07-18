import { useState, useEffect } from 'react'
import { Footer, Navbar, Separator } from '../../Components'
import { Language } from './Model'
import { getLanguage, persistLanguage } from './utils'
import ES_LANG from './text/es.json'
import EN_LANG from './text/en.json'
import { descriptionList } from './constants'
import { githubLink } from '../../constants'

const defaultLanguage: Language = 'es'
const text = {
  'es': ES_LANG,
  'en': EN_LANG
}

const Home = () => {
  const [language, setLanguage] = useState<Language>(getLanguage())
  const [description, setDescription] = useState<string>(descriptionList[language][0])

  useEffect(() => {
    persistLanguage(language)
    const changeDescription = () => {
      setDescription(currentString => {
        const list = descriptionList[language]
        const currentIndex = list.findIndex(str => str === currentString)
        const index = currentIndex + 1 === list.length ? 0 : currentIndex + 1
        return list[index]
      })
    }
    changeDescription()
    const interval = setInterval(changeDescription, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [language])

  const getText = (key: string) => {
    if (!(language in text)) return (text[defaultLanguage] as { [key: string]: string })[key]
    return (text[language] as { [key: string]: string })[key]
  }

  const switchLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es')
  }

  return (
    <main className='home-page-container'>
      <section>
        <Navbar>
          <button onClick={switchLanguage}>{language}</button>
        </Navbar>
      </section>
      <section>
        <h1>{getText('welcome')} {getText('phrasePrefix')} {description}</h1>
      </section>
      <Separator />
      <section>
        <p>Proyectos</p>
      </section>
      <section>
        <Footer>
          <h3>
            {getText('footerText')} <a href={githubLink} target='_blank'>
              {getText('footerAction')}
            </a>
          </h3>
        </Footer>
      </section>
    </main>
  )
}

export default Home
