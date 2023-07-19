import { useState, useEffect } from 'react'
import { Anchor, Footer, Navbar, Separator } from '../../Components'
import { descriptionList, languages } from './constants'
import { githubLink, projectsPath } from '../../constants'
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
          <select onChange={(e) => switchLanguage(e.target.value)} defaultValue={language}>
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
      <Contact id='Home-Form' getText={getText} />
      <section>
        <Footer>
          <h3>
            {getText('footerText')} <Anchor path={githubLink} target='_blank'>
              {getText('footerAction')}
            </Anchor>
          </h3>
          <p>{getText('footerParagraphOnePartOne')} <Anchor path={`${projectsPath.HOME}#Home-Form`} target='_self'>{getText('footerParagraphOneLink')}</Anchor> {getText('footerParagraphOnePartTwo')}</p>
          <p>{getText('footerParagraphTwoPartOne')} <strong>language</strong> {getText('footerParagraphTwoPartTwo')}</p>
        </Footer>
      </section>
    </main>
  )
}

export default Home
