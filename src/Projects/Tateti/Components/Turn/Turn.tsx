import { useContext } from 'react'
import { Player } from '../../constants'
import { GameContext } from '../../Context/GameContext'

export const Turn = () => {
  const { game } = useContext(GameContext)
  const { winner, draw, turn } = game
  return <div className="Tateti-turn">
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
}
