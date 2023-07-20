import { useContext } from 'react'
import { GameContext } from '../../Context/GameContext'

export const Scores = () => {
  const { game } = useContext(GameContext)
  const { scores } = game
  return <div className='Tateti-scores'>
    {
      Object.entries(scores).map(([player, score]) => <p key={player} children={score} />)
    }
  </div>
}
