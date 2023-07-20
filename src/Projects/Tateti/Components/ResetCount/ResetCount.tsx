import { useContext } from 'react'
import { GameContext } from '../../Context/GameContext'
import { Button } from '../../../../Components'

export const ResetCount = () => {
  const { resetCounter } = useContext(GameContext)
  return <Button onClick={resetCounter} className='Tateti-Reset-Counter Tateti-button'>Reset Counter</Button>
}
