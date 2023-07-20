import { useContext } from 'react'
import { GameContext } from '../../Context/GameContext'

export const ResetCount = () => {
  const { resetCounter } = useContext(GameContext)
  return <button onClick={resetCounter} className='Tateti-Reset-Counter'>Reset Counter</button>
}
