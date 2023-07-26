/** Default game config */
export interface GameConfig {
  start: boolean
  pause: boolean
  width: number
  height: number
  timeInterval: number
  level: number
}

/** Ball representation in-game */
export interface Ball {
  id: number
  x: number
  y: number
  width: number
  height: number
  speed: number
  angle: number
}

/** Block representation in-game */
export interface Block {
  id: number
  x: number
  y: number
  width: number
  height: number
  color: string
}

/** Paddle representation in-game */
export interface Paddle {
  x: number
  y: number
  width: number
  height: number
}
