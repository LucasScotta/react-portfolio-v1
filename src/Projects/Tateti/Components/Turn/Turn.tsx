import { FC } from 'react'
import { Player } from '../../constants'
interface TurnProps {
  winner: Player | ''
  turn: Player
  draw: boolean
}
export const Turn: FC<TurnProps> = ({ winner, turn, draw }) => <div className="Tateti-turn">
  {
    Object.values(Player).map(player => {
      const className = `${winner || draw ? '' : turn === player ? 'turn' : ''}`
      return <p
        key={player}
        className={className}>
        {player}
      </p>
    })
  }
</div>
