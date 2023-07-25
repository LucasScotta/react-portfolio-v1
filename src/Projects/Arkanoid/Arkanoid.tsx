import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react'
import { GameConfig } from './types'
import { INIT_ARKANOID_GAME } from './constants'
import './styles/main.css'
import { Button } from '../../Components'
import { Ball, Block, Paddle } from './Components'
import { calculateAngle, calculatePaddleCordinates, createBall, isColliding, isCollidingFloor, updateBall } from './utils'
import { generateLevel } from './utils/blocks/generate-level'
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
      /** Level blocks representation */
      const blocks = generateLevel(game.level)
      return { ...prev, start: !start, balls: [createBall()], blocks }
    })
  }

  /** Updates the game */
  const update = useCallback(() => setGame(prev => {
    const balls = []
    // Agregar IDS de los bloques que estan siendo golpeados
    // const blockIds = new Set<number>()
    const blockIds = new Set<number>()
    for (const b of game.balls) {
      const ball = { ...b }
      // If the ball is coliding with the floor
      if (isCollidingFloor(ball, gameHeight)) continue
      if (isColliding(ball, prev.paddle, 1000)) {
        const angle = calculateAngle(ball, prev.paddle, 1000)
        ball.angle = angle
        balls.push(updateBall(ball, gameWidth))
        continue
      }
      // Updates the ball's position
      // Recorrer el arr de bloques y, si estan siendo golpeados por la bola en cuestion, agregar el ID al set.
      for (const block of prev.blocks) {
        if (isColliding(ball, block, 1000)) {
          blockIds.add(block.id)
          const angle = calculateAngle(ball, block, 1000)
          ball.angle = angle
        }
      }
      balls.push(updateBall(ball, gameWidth))
    }
    const blocks = prev.blocks.filter(block => !blockIds.has(block.id))
    // Filtrar los bloques que NO esten incluidos en el SET
    return { ...prev, balls, blocks }
  }), [game, gameHeight, gameWidth])

  /**
   * Updates the paddle's X coordinate
   * @param {mouseEvent} e Mouse event with the clientX coordinate
   */
  const movePaddle = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    if (game.start && !game.pause) {
      const x = calculatePaddleCordinates(e.clientX, game.paddle.width, e.currentTarget.getBoundingClientRect())
      setGame(prev => ({ ...prev, paddle: { ...game.paddle, x } }))
    }
  }

  const addBall = () => setGame(prev => ({ ...prev, balls: [...prev.balls, createBall()] }))
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
        {game.start && <Button onClick={addBall}>ADD BALL</Button>}
      </div>
      <div
        className='Arkanoid-game-container'
        style={{ width: `${gameWidth}px`, height: `${gameHeight}px` }}
        onMouseMove={movePaddle}
      >
        {
          /** in-game balls */
          game.balls.map(ball => <Ball ball={ball} className='Arkanoid-ball' key={ball.id} />)
        }
        {
          /** in-game blocks */
          game.blocks.map(block => <Block block={block} className='Arkanoid-block' key={block.id} />)
        }
        {/* in-game paddle */}
        <div ></div>
        <Paddle className='Arkanoid-paddle' paddle={game.paddle} />
      </div>
    </main >
  )
}

export default Arkanoid
