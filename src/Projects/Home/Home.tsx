import { useState, useEffect } from 'react'
import { Footer, Navbar, Separator } from '../../Components'
import { descriptionList } from './constants'
import { githubLink } from '../../constants'
import { useLanguage } from './Hooks'
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

  return (
    <main className='home-page-container'>
      <section>
        <Navbar>
          <button onClick={switchLanguage}>{language}</button>
        </Navbar>
      </section>
      <section className="home-welcome">
        <h1>{getText('welcome')} {getText('cheer')}</h1>
        <h2>{getText('phrasePrefix')} {descriptionList[language][indexDescription]}</h2>
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
