import { useContext } from 'react'
import { GameContext } from '../../Context/GameContext'

export const Results = () => {
  const { game } = useContext(GameContext)
  const { winner, draw } = game
  return (winner || draw) && <div
    className='Tateti-Modal'>
    {
      draw ? 'Empate!!!!!!' : `Ganador ${winner}!!!!!!!!!`
    }
  </div> || <></>
}
