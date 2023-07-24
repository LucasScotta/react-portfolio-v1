import { useState } from 'react'
import { GameConfig } from './types'
import { INIT_ARKANOID_GAME } from './constants'
import './styles/main.css'
import { Button } from '../../Components'

/** Arkanoid App Component */
const Arkanoid = () => {
  const [game, setGame] = useState<GameConfig>({ ...INIT_ARKANOID_GAME })
  const { width: gameWidth, height: gameHeight } = game

  return (
    <main className='Arkanoid-Project'>
      <h1>Arkanoid App</h1>
      <div className='Arkanoid-handler'>
        {
          !game.start
            ? <Button onClick={() => setGame({ ...game, start: true })}>START</Button>
            : <Button onClick={() => setGame({ ...game, pause: !game.pause })}>{game.pause ? 'UNPAUSE' : 'PAUSE'}</Button>
        }
      </div>
      <div
        className='Arkanoid-game-container'
        style={{ width: `${gameWidth}px`, height: `${gameHeight}px` }}>
      </div>
    </main>
  )
}

export default Arkanoid
