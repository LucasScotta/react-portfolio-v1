import type { GameConfig } from './types'

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

const { gameWidth, gameHeight, paddleWidth, paddleHeight } = GAME_MEASUREMENTS

/** Arkanoid Initial Config */
export const INIT_ARKANOID_GAME: GameConfig = {
  start: false,
  pause: false,
  width: gameWidth,
  height: gameHeight,
  level: 1,
  balls: [],
  blocks: [],
  timeInterval: 10,
  paddle: {
    x: gameWidth / 2 - paddleWidth / 2,
    y: gameHeight - paddleHeight * 2,
    width: 100,
    height: 25
  }
}
