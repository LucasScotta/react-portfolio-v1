import { useCallback, useEffect, useRef, useState } from 'react'
import { GameConfig } from './types'
import { INIT_ARKANOID_GAME } from './constants'
import './styles/main.css'
import { Button } from '../../Components'
import { Ball } from './Components'
import { createBall, isCollidingFloor, updateBall } from './utils'
/** Arkanoid App Component */
const Arkanoid = () => {
  const [game, setGame] = useState<GameConfig>({ ...INIT_ARKANOID_GAME })
  const intervalRef = useRef<number | void>()
  const { width: gameWidth, height: gameHeight } = game

  /** Starts the game if it's not started yes */
  const startGame = () => {
    const { start } = game
    if (start) return
    setGame(prev => {
      return { ...prev, start: !start, balls: [createBall()] }
    })
  }

  /** Updates the game */
  const update = useCallback(() => setGame(prev => {
    const balls = []
    for (const b of game.balls) {
      // If the ball is coliding with the floor
      if (isCollidingFloor(b, gameHeight)) continue
      balls.push(ball)
      // Updates the ball's position
      const ball = updateBall({ ...b }, gameWidth)
    }
    return { ...prev, balls }
  }), [game.balls, gameHeight, gameWidth])

  /** UseEffect to switch pause */
  useEffect(() => {
    if (!game.start || game.pause) return
    const interval = setInterval(update, game.timeInterval)
    intervalRef.current = interval
    return () => {
      intervalRef.current = clearInterval(interval)
    }
  }, [game.start, game.pause, game.timeInterval, update])

  return (
    <main className='Arkanoid-Project'>
      <h1>Arkanoid App</h1>
      <div className='Arkanoid-handler'>
        {
          !game.start
            ? <Button onClick={startGame}>START</Button>
            : <Button onClick={() => setGame({ ...game, pause: !game.pause })}>{game.pause ? 'UNPAUSE' : 'PAUSE'}</Button>
        }
      </div>
      <div
        className='Arkanoid-game-container'
        style={{ width: `${gameWidth}px`, height: `${gameHeight}px` }}
      >
        {
          /** in-game balls */
          game.balls.map(ball => <Ball ball={ball} className='Arkanoid-ball' key={ball.id} />)
        }
      </div>
    </main >
  )
}

export default Arkanoid
