import { useState, useEffect } from 'react'
import { Footer, Navbar, Separator } from '../../Components'
import { descriptionList, languages } from './constants'
import { githubLink } from '../../constants'
import { useLanguage } from './Hooks'
import { Contact, Projects } from './Views'
import './styles/home.css'


const Home = () => {
  const [indexDescription, setIndexDescription] = useState<number>(0)
  const { language, switchLanguage, getText } = useLanguage()

  useEffect(() => {
    const changeDescription = () => {
      setIndexDescription((currentIndex) => {
        const list = descriptionList[language]
        const index = currentIndex + 1 === list.length ? 0 : currentIndex + 1
        return index
      })
    }

    const interval = setInterval(changeDescription, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [language])
  const rotativeText = descriptionList[language][indexDescription]
  return (
    <main className='home-page-container'>
      <section>
        <Navbar>
          <select onChange={(e) => switchLanguage(e.target.value)}>
            {
              languages.map(language => <option key={language}>{language}</option>)
            }
          </select>
        </Navbar>
      </section>
      <section className="home-welcome">
        <h1>{getText('welcome')} {getText('cheer')}</h1>
        <h2>{getText('phrasePrefix')} {rotativeText}</h2>
      </section>
      <Separator />
      <Projects />
      <Separator />
      <Contact getText={getText} />
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
