import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react'
import { GameConfig, Paddle as IPaddle, Block as IBlock } from './types'
import { INIT_ARKANOID_GAME, INIT_ARKANOID_PADDLE } from './constants'
import { Button } from '../../Components'
import { Ball, Block, Paddle } from './Components'
import { calculatePaddleCordinates } from './utils'
import { generateLevel } from './utils/blocks/generate-level'
import { Ball as BallClass, createBall } from './proto'
import './styles/main.css'

/** Arkanoid App Component */
const Arkanoid = () => {
  const paddleRef = useRef<IPaddle>({ ...INIT_ARKANOID_PADDLE })
  const ballsRef = useRef<Array<BallClass>>([])
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
      ballsRef.current = [createBall(paddleRef.current.x + paddleRef.current.width / 2, paddleRef.current.y - 11, 5, { height: game.height, width: game.width }, paddleRef.current)]
      return { ...prev, start: !start }
    })
  }

  /** Loses the game */
  const loss = useCallback(() => {
    setGame(prev => {
      const lives = prev.lives - 1
      if (lives === 0) return { ...prev, start: false, level: 1, pause: false, lives: 3 }
      const ball = createBall(paddleRef.current.x + paddleRef.current.width / 2, paddleRef.current.y - 11, 5, { height: game.height, width: game.width }, paddleRef.current)
      ballsRef.current = [ball]
      return { ...prev, pause: true, lives }
    })
  }, [game.height, game.width])

  /** Wins the game */
  const win = useCallback(() => {
    setGame(prev => {
      const level = prev.level + 1
      if (level === 5) return { ...prev, start: false, level: 1, pause: false }
      const ball = createBall(Math.floor(Math.random() * 300) + 15, Math.floor(Math.random() * 300) + 15, 5, { height: game.height, width: game.width }, paddleRef.current)
      ballsRef.current = [ball]
      blocksRef.current = generateLevel(level)
      return { ...prev, level, pause: true }
    })
  }, [game.width, game.height])

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

      for (const ball of ballsRef.current) {

        for (const block of blocksRef.current) {
          // if the ball is coliding block
          if (ball.isColiding(block)) {
            blockIds.add(block.id)
            const angle = ball.calculateAngle(block)
            ball.angle = angle
          }
        }
        ball.update()
      }
      // filter blocks NOT included in the hitted blocks set
      blocksRef.current = blocksRef.current.filter(block => !blockIds.has(block.id))
      ballsRef.current = ballsRef.current.filter(ball => !ball.destroyed)
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
    const { current } = ballsRef
    ballsRef.current = [...current, createBall(Math.floor(Math.random() * 300) + 15, Math.floor(Math.random() * 300) + 15, 2.5, { height: game.height, width: game.width }, paddleRef.current)]
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
