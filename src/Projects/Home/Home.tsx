import { useState, useEffect } from 'react'
import { Footer, Navbar, Separator } from '../../Components'
import { descriptionList, languages } from './constants'
import { githubLink } from '../../constants'
import { useLanguage } from './Hooks'
import { Contact, Projects } from './Views'
import './styles/home.css'
import { useNavigate } from 'react-router-dom'


const Home = () => {
  const [indexDescription, setIndexDescription] = useState<number>(0)
  const { language, switchLanguage, getText } = useLanguage()
  const navigate = useNavigate()

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
      <Contact getText={getText} />
      <section>
        <Footer>
          <h3>
            {getText('footerText')} <a href={githubLink} target='_blank'>
              {getText('footerAction')}
            </a>
          </h3>
          <p>Si sabes programar, me gustaria pedirte encarecidamente que intentes romper mi pagina como sea. Y de lograrlo, enviame el feed-back mediante el <a href="/" onClick={(e) => {
            e.preventDefault()
            navigate('/asdasd', { replace: true })
          }}>formulario de contacto</a> para arreglar bugs o posibles fugas de seguridad que no haya tenido en cuenta.</p>
          <p>Por ejemplo, puedes intentar settear un lenguage que no sea Ingles, Español ni Frances desde la consola usando el almacenamiento local con la clave <strong>language</strong>, y ver que pasa.</p>
        </Footer>
      </section>
    </main>
  )
}

export default Home
