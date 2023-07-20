import { Anchor, Footer } from '../../Components'
import { projectsPath } from '../../constants'
import { Board, ResetCount, Restart, Results, Scores, Turn } from './Components'
import { GameContextProvider } from './Context/GameContext'
import './style/main.css'

const Tateti = () => {
  return <GameContextProvider>
    <main className="Tateti-Project">
      <h1>Tateti App</h1>
      <Restart />
      <Board />
      <Scores />
      <Turn />
      <Results />
      <ResetCount />
      <Footer>
        <p>Este proyecto forma parte de un Portfolio de proyectos, para verlo <Anchor path={projectsPath.HOME}>haz click aquí</Anchor></p>
      </Footer>
    </main>
  </GameContextProvider>
}

export default Tateti
