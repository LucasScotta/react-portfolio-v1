import { useContext } from 'react'
import { GameContext } from '../../Context/GameContext'

export const Restart = () => {
  const { resetGame } = useContext(GameContext)
  return <button onClick={resetGame}>Restart</button>

}
