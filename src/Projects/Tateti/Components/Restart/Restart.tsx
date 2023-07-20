import { useContext } from 'react'
import { GameContext } from '../../Context/GameContext'
import { Button } from '../../../../Components'

export const Restart = () => {
  const { resetGame } = useContext(GameContext)
  return <Button onClick={resetGame} className='Tateti-button'>Restart</Button>

}
