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
      Object.values(scores).map(score => {
        return <p>{score}</p>
      })
    }
  </div>
}
