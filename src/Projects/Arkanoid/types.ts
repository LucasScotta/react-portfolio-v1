/** Default game config */
export interface GameConfig {
  start: boolean
  pause: boolean
  width: number
  height: number
  timeInterval: number
  level: number
  lives: number
}

export interface Entity {
  id: number
  x: number
  y: number
  width: number
  height: number
}

/** Ball representation in-game */
export interface Ball extends Entity {
  speed: number
  angle: number
}

/** Block representation in-game */
export interface Block extends Entity {
  lives: number
  color: string
}

/** Paddle representation in-game */
export interface Paddle {
  x: number
  y: number
  width: number
  height: number
}
