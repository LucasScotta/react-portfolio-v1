import { FC } from 'react'
import { Player } from '../../constants'
interface ResultsProps {
  winner: Player | ''
  draw: boolean
}
export const Results: FC<ResultsProps> = ({ winner, draw }) => (winner || draw) && <div
  className='Tateti-Modal'>
  {
    draw ? 'Empate!!!!!!' : `Ganador ${winner}!!!!!!!!!`
  }
</div> || <></>
