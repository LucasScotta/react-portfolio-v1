import { useRef, useState, useEffect, useCallback, MouseEvent } from 'react'
import { GameConfig, GameUserOptions, Paddle as IPaddle } from '../types'
import { INIT_ARKANOID_PADDLE } from '../constants'
import { Ball as BallClass, Block as BlockClass, createBall, createManager } from '../proto'
import { Button } from '../../../Components'
import { Ball, Block, Paddle } from '../Components'
import { calculatePaddleCordinates, generateLevel, initArkanoidGame } from '../utils'
type Props = { gameOptions: GameUserOptions }
export const PlayArkanoidGame = ({ gameOptions }: Props) => {
  const [game, setGame] = useState<GameConfig>(initArkanoidGame(gameOptions))
  const paddleRef = useRef<IPaddle>({ ...INIT_ARKANOID_PADDLE })
  const ballsRef = useRef(createManager<BallClass>())
  const blocksRef = useRef(createManager<BlockClass>())
  const intervalRef = useRef<number | void>()

  const { width: gameWidth, height: gameHeight } = game

  /** Starts the game if it's not started yes */
  const startGame = () => {
    const blocks = blocksRef.current
    const balls = ballsRef.current
    const { start, pause } = game
    if (start) return
    setGame(prev => {
      /** Level blocks representation */
      blocks.setItems(generateLevel(game.level, game.difficult))
      balls.resetItems()
      addBall()
      return { ...prev, start: !start, pause: !pause }
    })
  }

  /** Loses the game */
  const loss = useCallback(() => {
    setGame(prev => {
      const lives = prev.lives - 1
      if (lives === 0) return { ...prev, start: false, level: 1, pause: false, lives: 3 }
      const ball = createBall(paddleRef.current.x + paddleRef.current.width / 2, paddleRef.current.y - 11, 0, { height: game.height, width: game.width }, paddleRef.current)
      const balls = ballsRef.current
      balls.resetItems()
      balls.addItem(ball)
      return { ...prev, lives }
    })
  }, [game.height, game.width])

  /** Wins the game */
  const win = useCallback(() => {
    setGame(prev => {
      const level = prev.level + 1
      if (level === 5) return { ...prev, start: false, level: 1, pause: false }
      const ball = createBall(paddleRef.current.x + paddleRef.current.width / 2, paddleRef.current.y - 11, 0, { height: game.height, width: game.width }, paddleRef.current)
      const blocks = blocksRef.current
      const balls = ballsRef.current
      const points = 1000 * balls.getItems().length * prev.lives * prev.multiplier
      console.log(balls, points, balls.getItems().length, prev.lives, prev.multiplier)
      balls.setItems([ball])
      blocks.setItems(generateLevel(level, game.difficult))
      return { ...prev, level, points: prev.points + points }
    })
  }, [game.width, game.height, game.difficult])

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
    let points = 0

    setGame(prev => {
      for (const ball of balls.getItems()) {

        for (const block of blocks.getItems()) {
          // if the ball is coliding block
          if (ball.isColiding(block) && !block.destroyed) {
            points += block.points * prev.multiplier * prev.lives * ballsRef.current.getItems().length
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
      return { ...prev, points: prev.points + points }
    })
  }, [win, loss])

  /**
   * Updates the paddle's X coordinate
   * @param {mouseEvent} e Mouse event with the clientX coordinate
   */
  const movePaddle = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    if (!game.pause) {
      const { current } = paddleRef
      const x = calculatePaddleCordinates(e.clientX, current.width, e.currentTarget.getBoundingClientRect())
      paddleRef.current.x = x
      setGame(prev => ({ ...prev }))
    }
  }
  const moveBalls = () => {
    if (game.start && !game.pause) {
      const balls = ballsRef.current.getItems()
      for (const ball of balls) {
        const { speed } = ball
        if (!speed) ball.speed = 3
      }
    }
  }
  const switchPause = useCallback(() => setGame(prev => ({ ...prev, pause: !prev.pause })), [])

  const addBall = () => {
    const randomX = Math.floor(Math.random() * gameWidth)
    const randomY = Math.floor(Math.random() * gameHeight / 2)
    const speed = 3
    const ball = createBall(randomX, randomY, speed, { height: game.height, width: game.width }, paddleRef.current)
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


  return <div
    className='Arkanoid-game-container'
    style={{ width: `${gameWidth}px`, height: `${gameHeight}px` }}
    onMouseMove={movePaddle}
    onClick={moveBalls}
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
    <Button className='Arkanoid-ingame-button' onClick={!game.start ? startGame : switchPause} style={{ top: 0, left: gameWidth }}>{!game.start ? 'START' : game.pause ? 'UNPAUSE' : 'PAUSE'}</Button>
    {
      game.cheats && <Button className='Arkanoid-ingame-button' onClick={addBall} style={{ top: 100, left: gameWidth }}>Add Ball</Button>
    }
    <Button className='Arkanoid-ingame-button' onClick={addBall} style={{ top: 100, left: gameWidth }}>Add Ball</Button>
    {
      game.start && (<>
        <div className='Arkanoid-ingame-points' style={{ top: gameHeight - 40, left: 0 }}>Points: {game.points}</div>
        <div className='Arkanoid-ingame-lives' style={{ top: gameHeight - 40, left: gameWidth - 100 }}>Lives: {game.lives}</div>
      </>
      )
    }
  </div>

}
