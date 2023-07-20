import { useContext } from 'react'
import { Board, Results, Scores, Turn } from './Components'
import { GameContext, GameContextProvider } from './Context/GameContext'
import './style/main.css'

const Tateti = () => {
  const { resetGame } = useContext(GameContext)
  return <GameContextProvider>
    <main className="Tateti-Project">
      <h1>Tateti App</h1>
      <button onClick={resetGame}>Restart</button>
      <Board />
      <Scores />
      <Turn />
      <Results />
    </main>
  </GameContextProvider>
}

export default Tateti
