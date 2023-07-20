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
    </main>
  </GameContextProvider>
}

export default Tateti
