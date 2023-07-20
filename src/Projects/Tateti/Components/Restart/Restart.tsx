import { useContext } from 'react'
import { GameContext } from '../../Context/GameContext'
import { Button } from '../../../../Components'

export const Restart = () => {
  const { resetGame } = useContext(GameContext)
  return <Button onClick={resetGame}>Restart</Button>

}
