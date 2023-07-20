import { FC } from 'react'
import { Player } from '../../constants'
interface ResultsProps {
  winner: Player | ''
  draw: boolean
}
export const Results: FC<ResultsProps> = ({ winner, draw }) => <div
  className='Tateti-Modal'
  style={{
    visibility: (winner || draw) && 'visible' || 'hidden'
  }}>
  {
    draw ? 'Empate!!!!!!' : `Ganador ${winner}!!!!!!!!!`
  }
</div>
