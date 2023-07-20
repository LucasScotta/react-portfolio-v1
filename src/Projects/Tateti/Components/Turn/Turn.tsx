import { FC } from 'react'
import { Player } from '../../constants'
interface TurnProps {
  winner: Player | ''
  turn: Player
}
export const Turn: FC<TurnProps> = ({ winner, turn }) => <div className="Tateti-turn">
  {
    Object.values(Player).map(player => {
      return <p
        key={player}
        className={`${winner === player && 'winner' || turn === player && 'turn' || ''}`}>
        {player}
      </p>
    })
  }
</div>
