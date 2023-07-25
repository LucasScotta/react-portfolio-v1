import type { GameConfig } from './types'

/** Arkanoid Container Game Measurements */
export const GAME_MEASUREMENTS = {
  width: 600,
  height: 700,
  blockWidth: 60,
  blockHeight: 25,
  blocksSeparatorX: 10,
  blocksSeparatorY: 50,
}

const { width, height } = GAME_MEASUREMENTS

/** Arkanoid Initial Config */
export const INIT_ARKANOID_GAME: GameConfig = {
  start: false,
  pause: false,
  width,
  height,
  level: 1,
  balls: [],
  blocks: [],
  timeInterval: 10
}
