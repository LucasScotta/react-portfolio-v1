import { useRef, useState, useEffect, useCallback, MouseEvent } from 'react'
import { GameConfig, GameUserOptions, Paddle as IPaddle } from '../types'
import { INIT_ARKANOID_PADDLE } from '../constants'
import { Ball as BallClass, Block as BlockClass, createBall, createManager } from '../proto'
import { Button } from '../../../Components'
import { Ball, Block, Paddle } from '../Components'
import { calculatePaddleCordinates, generateLevel, initArkanoidGame } from '../utils'
import { useLocalStorage } from '../../../Hooks'
import { localStorageKeys } from '../../../constants'
type Props = { gameOptions: GameUserOptions }
export const PlayArkanoidGame = ({ gameOptions }: Props) => {
  const localStorageData = {
    key: localStorageKeys.arkanoid, defaultValue: 0, validator: (str: unknown): str is number => typeof str === 'number' && !isNaN(Number(str))
  }
  const { storage: storagePoints, setStorage: setStoragePoints } = useLocalStorage(localStorageData)
  const [game, setGame] = useState<GameConfig>(initArkanoidGame(gameOptions))
  const paddleRef = useRef<IPaddle>({ ...INIT_ARKANOID_PADDLE })
  const ballsRef = useRef(createManager<BallClass>())
  const blocksRef = useRef(createManager<BlockClass>())
  const intervalRef = useRef<number | void>()

  const { width: gameWidth, height: gameHeight } = game

  /** Updates the local storage high score */
  const persistPoints = useCallback(() => {
    if (storagePoints < game.points) {
      setStoragePoints(game.points)
    }
  }, [game.points, setStoragePoints, storagePoints])

  /** Addes a ball with randomX and randomY. This function is available only if cheats are ON */
  const addBall = useCallback(() => {
    const randomX = Math.floor(Math.random() * gameWidth)
    const randomY = Math.floor(Math.random() * gameHeight / 2)
    const speed = game.baseSpeed
    const ball = createBall(randomX, randomY, speed, { height: gameHeight, width: gameWidth }, paddleRef.current)
    ballsRef.current.addItem(ball)
  }, [game.baseSpeed, gameHeight, gameWidth])

  /** Starts the game if it's not started yes */
  const startGame = useCallback(() => {
    const blocks = blocksRef.current
    const balls = ballsRef.current
    setGame(prev => {
      const { start } = prev
      if (start) return { ...prev }
      /** Level blocks representation */
      blocks.setItems(generateLevel(prev.level, prev.difficult))
      balls.resetItems()
      const ball = createBall(paddleRef.current.x + paddleRef.current.width / 2, paddleRef.current.y - 11, 0, { height: prev.height, width: prev.width }, paddleRef.current)
      balls.addItem(ball)
      return { ...prev, start: !start, pause: false }
    })
  }, [])

  /** Loses the game */
  const loss = useCallback(() => {
    setGame(prev => {
      persistPoints()
      const lives = prev.lives - 1
      const balls = ballsRef.current
      balls.resetItems()
      if (lives === 0) return { ...prev, start: false, level: 1, pause: false, lives: 3 }
      const ball = createBall(paddleRef.current.x + paddleRef.current.width / 2, paddleRef.current.y - 11, 0, { height: prev.height, width: prev.width }, paddleRef.current)
      balls.addItem(ball)
      return { ...prev, lives }
    })
  }, [persistPoints])

  /** Wins the game */
  const win = useCallback(() => {
    setGame(prev => {
      const level = prev.level + 1
      if (level === 5) return { ...prev, start: false, level: 1, pause: false }
      const ball = createBall(paddleRef.current.x + paddleRef.current.width / 2, paddleRef.current.y - 11, 0, { height: prev.height, width: prev.width }, paddleRef.current)
      const blocks = blocksRef.current
      const balls = ballsRef.current
      const points = 1000 * balls.getItems().length * prev.lives * prev.multiplier
      balls.setItems([ball])
      blocks.setItems(generateLevel(level, prev.difficult))
      if (storagePoints < prev.points + points) {
        setStoragePoints(prev.points + points)
      }
      return { ...prev, level, points: prev.points + points }
    })
  }, [storagePoints, setStoragePoints])

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
  const movePaddle = useCallback((e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    if (!game.pause) {
      const { current } = paddleRef
      const x = calculatePaddleCordinates(e.clientX, current.width, e.currentTarget.getBoundingClientRect())
      paddleRef.current.x = x
      setGame(prev => ({ ...prev }))
    }
  }, [game.pause])

  /**
 * Moves the balls stuck to the Paddle
 * If a ball has its speed is set to 0, it will move along with the Paddle.
 */
  const moveBalls = useCallback(() => {
    if (game.start && !game.pause) {
      const balls = ballsRef.current.getItems()
      for (const ball of balls) {
        const { speed } = ball
        if (!speed) ball.speed = game.baseSpeed
      }
    }
  }, [game.baseSpeed, game.pause, game.start])

  const switchPause = useCallback(() => setGame(prev => ({ ...prev, pause: !prev.pause })), [])

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
    <div className='Arkanoid-ingame-points' style={{ top: gameHeight - 40, left: 0 }}>Points: {game.points}</div>
    <div className='Arkanoid-ingame-high-score' style={{ top: gameHeight - 40, left: gameWidth / 2 - 100 }}>High Score: {storagePoints}</div>
    {
      game.start && (<>
        <div className='Arkanoid-ingame-lives' style={{ top: gameHeight - 40, left: gameWidth - 100 }}>Lives: {game.lives}</div>
      </>
      )
    }
  </div>

}
