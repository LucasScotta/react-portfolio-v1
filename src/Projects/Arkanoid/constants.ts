import { Difficult, type GameConfig, type Paddle } from './types'

/** Arkanoid Container Game Measurements */
export const GAME_MEASUREMENTS = {
  gameWidth: 600,
  gameHeight: 700,
  blockWidth: 60,
  blockHeight: 25,
  blocksSeparatorX: 10,
  blocksSeparatorY: 50,
  paddleWidth: 100,
  paddleHeight: 25
}

/** Factor to scale entities */
export const scaleFactor = 1000

const { gameWidth, gameHeight, paddleWidth, paddleHeight } = GAME_MEASUREMENTS

/** Arkanoid Initial Config */
export const INIT_ARKANOID_GAME: GameConfig = {
  start: false,
  pause: true,
  width: gameWidth,
  height: gameHeight,
  level: 1,
  timeInterval: 10,
  lives: 3,
  cheats: false,
  difficult: Difficult.easy,
  points: 0,
  multiplier: 1,
  baseSpeed: 5
}

/** Paddle initial config */
export const INIT_ARKANOID_PADDLE: Paddle = {
  x: gameWidth / 2 - paddleWidth / 2,
  y: gameHeight - paddleHeight * 2,
  width: paddleWidth,
  height: paddleHeight
}
