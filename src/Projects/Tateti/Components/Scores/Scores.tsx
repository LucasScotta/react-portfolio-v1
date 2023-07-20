import { FC } from 'react'
import { Player } from '../../constants'

interface ScoresProps {
  scores: {
    [Player.X]: number
    [Player.O]: number
  }
}

export const Scores: FC<ScoresProps> = ({ scores }) => {
  return <div className='Tateti-scores'>
    {
      Object.entries(scores).map(([player, score]) => <p key={player} children={score} />)
    }
  </div>
}
