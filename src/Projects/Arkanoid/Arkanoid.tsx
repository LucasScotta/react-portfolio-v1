import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react'
import { Paddle as IPaddle, GameConfig } from './types'
import { INIT_ARKANOID_GAME, INIT_ARKANOID_PADDLE } from './constants'
import { Button } from '../../Components'
import { Ball, Block, Paddle } from './Components'
import { calculatePaddleCordinates, generateLevel } from './utils'
import { Ball as BallClass, Block as BlockClass, createBall, createManager } from './proto'
import './styles/main.css'

/** Arkanoid App Component */
const Arkanoid = () => {
  const paddleRef = useRef<IPaddle>({ ...INIT_ARKANOID_PADDLE })
  const ballsRef = useRef(createManager<BallClass>())
  const blocksRef = useRef(createManager<BlockClass>())
  const [game, setGame] = useState<GameConfig>({ ...INIT_ARKANOID_GAME })
  const intervalRef = useRef<number | void>()
  const { width: gameWidth, height: gameHeight } = game

  /** Starts the game if it's not started yes */
  const startGame = () => {
    const blocks = blocksRef.current
    const balls = ballsRef.current
    const { start } = game
    if (start) return
    setGame(prev => {
      /** Level blocks representation */
      blocks.setItems(generateLevel(game.level))
      balls.resetItems()
      addBall()
      return { ...prev, start: !start }
    })
  }

  /** Loses the game */
  const loss = useCallback(() => {
    setGame(prev => {
      const lives = prev.lives - 1
      if (lives === 0) return { ...prev, start: false, level: 1, pause: false, lives: 3 }
      const ball = createBall(paddleRef.current.x + paddleRef.current.width / 2, paddleRef.current.y - 11, 3, { height: game.height, width: game.width }, paddleRef.current)
      const balls = ballsRef.current
      balls.resetItems()
      balls.addItem(ball)
      return { ...prev, pause: true, lives }
    })
  }, [game.height, game.width])

  /** Wins the game */
  const win = useCallback(() => {
    setGame(prev => {
      const level = prev.level + 1
      if (level === 5) return { ...prev, start: false, level: 1, pause: false }
      const ball = createBall(Math.floor(Math.random() * 300) + 15, Math.floor(Math.random() * 300) + 15, 3, { height: game.height, width: game.width }, paddleRef.current)
      const blocks = blocksRef.current
      const balls = ballsRef.current
      balls.setItems([ball])
      blocks.setItems(generateLevel(level))
      return { ...prev, level, pause: true }
    })
  }, [game.width, game.height])

  /** Updates the game */
  const update = useCallback(() => {
    const blocks = blocksRef.current
    const balls = ballsRef.current

    // If no blocks
    if (!blocks.getItems().length) {
      return win()
    }

    // If no balls
    if (!balls.getItems().length) {
      return loss()
    }

    setGame(prev => {
      for (const ball of balls.getItems()) {

        for (const block of blocks.getItems()) {
          // if the ball is coliding block
          if (ball.isColiding(block)) {
            block.hit()
            const angle = ball.calculateAngle(block)
            ball.angle = angle
          }
        }
        // updates ball's coordinates
        ball.update()
      }
      // filter destroyed items
      blocksRef.current.removeDestroyed()
      ballsRef.current.removeDestroyed()
      return { ...prev }
    })
  }, [win, loss])

  /**
   * Updates the paddle's X coordinate
   * @param {mouseEvent} e Mouse event with the clientX coordinate
   */
  const movePaddle = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    if (game.start && !game.pause) {
      const { current } = paddleRef
      const x = calculatePaddleCordinates(e.clientX, current.width, e.currentTarget.getBoundingClientRect())
      paddleRef.current.x = x
    }
  }

  const addBall = () => {
    const ball = createBall(Math.floor(Math.random() * 300) + 15, Math.floor(Math.random() * 300) + 15, 3, { height: game.height, width: game.width }, paddleRef.current)
    ballsRef.current.addItem(ball)
  }
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
      <h1>Arkanoid App LEVEL: {game.level}</h1>
      <h2>Lives: {game.lives}</h2>
      <div className='Arkanoid-handler'>
        {
          !game.start
            ? <Button onClick={startGame}>START</Button>
            : <Button onClick={() => setGame({ ...game, pause: !game.pause })}>{game.pause ? 'UNPAUSE' : 'PAUSE'}</Button>
        }
        {game.start && <Button onClick={addBall}>ADD BALL</Button>}
      </div>
      <div
        className='Arkanoid-game-container'
        style={{ width: `${gameWidth}px`, height: `${gameHeight}px` }}
        onMouseMove={movePaddle}
      >
        {
          /** in-game balls */
          ballsRef.current.getItems().map(ball => <Ball ball={ball} className='Arkanoid-ball' key={ball.id} />)
        }
        {
          /** in-game blocks */
          blocksRef.current.getItems().map(block => <Block block={block} className='Arkanoid-block' key={block.id} />)
        }
        {/* in-game paddle */}
        <Paddle className='Arkanoid-paddle' paddle={paddleRef.current} />
      </div>
    </main >
  )
}

export default Arkanoid
