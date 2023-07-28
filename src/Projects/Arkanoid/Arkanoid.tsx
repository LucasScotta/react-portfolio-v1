import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react'
import { GameConfig, Paddle as IPaddle, Ball as IBall, Block as IBlock } from './types'
import { INIT_ARKANOID_GAME, INIT_ARKANOID_PADDLE } from './constants'
import './styles/main.css'
import { Button } from '../../Components'
import { Ball, Block, Paddle } from './Components'
import { calculateAngle, calculatePaddleCordinates, createBall, isColiding, isColidingFloor, updateBall } from './utils'
import { generateLevel } from './utils/blocks/generate-level'

/** Arkanoid App Component */
const Arkanoid = () => {
  const paddleRef = useRef<IPaddle>({ ...INIT_ARKANOID_PADDLE })
  const ballsRef = useRef<Array<IBall>>([])
  const blocksRef = useRef<Array<IBlock>>([])
  const [game, setGame] = useState<GameConfig>({ ...INIT_ARKANOID_GAME })
  const intervalRef = useRef<number | void>()
  const { width: gameWidth, height: gameHeight } = game

  /** Starts the game if it's not started yes */
  const startGame = () => {
    const { start } = game
    if (start) return
    setGame(prev => {
      /** Level blocks representation */
      blocksRef.current = generateLevel(game.level)
      ballsRef.current = [createBall()]
      return { ...prev, start: !start }
    })
  }

  /** Loses the game */
  const loss = useCallback(() => {
    setGame(prev => {
      const lives = prev.lives - 1
      if (lives === 0) return { ...prev, start: false, level: 1, pause: false, lives: 3 }
      const ball = createBall()
      ballsRef.current = [ball]
      return { ...prev, pause: true, lives }
    })
  }, [])

  /** Wins the game */
  const win = useCallback(() => {
    setGame(prev => {
      const level = prev.level + 1
      if (level === 5) return { ...prev, start: false, level: 1, pause: false }
      const ball = createBall()
      ballsRef.current = [ball]
      blocksRef.current = generateLevel(level)
      return { ...prev, level, pause: true }
    })
  }, [])

  /** Updates the game */
  const update = useCallback(() => {
    // If no blocks
    if (!blocksRef.current.length) {
      return win()
    }

    // If no balls
    if (!ballsRef.current.length) {
      return loss()
    }

    setGame(prev => {
      // Agregar IDS de los bloques que estan siendo golpeados
      const blockIds = new Set<number>()
      const ballIds = new Set<number>()
      for (const ball of ballsRef.current) {

        // If the ball is coliding with the floor
        if (isColidingFloor(ball, gameHeight)) {
          ballIds.add(ball.id)
          continue
        }

        // if the ball is coliding with the paddle
        if (isColiding(ball, paddleRef.current)) {
          // calculate the new angle
          const angle = calculateAngle(ball, paddleRef.current)
          ball.angle = angle
          const { x, y, angle: newAngle } = updateBall(ball, gameWidth)
          ball.x = x
          ball.y = y
          ball.angle = newAngle
          continue
        }
        for (const block of blocksRef.current) {
          // if the ball is coliding block
          if (isColiding(ball, block)) {
            blockIds.add(block.id)
            const angle = calculateAngle(ball, block)
            ball.angle = angle
          }
        }
        const { x, y, angle } = updateBall(ball, gameWidth)
        ball.x = x
        ball.y = y
        ball.angle = angle
      }
      // filter blocks NOT included in the hitted blocks set
      blocksRef.current = blocksRef.current.filter(block => !blockIds.has(block.id))
      ballsRef.current = ballsRef.current.filter(ball => !ballIds.has(ball.id))
      return { ...prev }
    })
  }, [gameHeight, gameWidth, win, loss])

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
    const { current } = ballsRef
    ballsRef.current = [...current, createBall()]
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
          ballsRef.current.map(ball => <Ball ball={ball} className='Arkanoid-ball' key={ball.id} />)
        }
        {
          /** in-game blocks */
          blocksRef.current.map(block => <Block block={block} className='Arkanoid-block' key={block.id} />)
        }
        {/* in-game paddle */}
        <Paddle className='Arkanoid-paddle' paddle={paddleRef.current} />
      </div>
    </main >
  )
}

export default Arkanoid
