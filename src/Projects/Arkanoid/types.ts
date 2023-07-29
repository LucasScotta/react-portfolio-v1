/** Default game config */
export interface GameConfig {
  start: boolean
  pause: boolean
  width: number
  height: number
  timeInterval: number
  level: number
  lives: number
  cheats: boolean
  difficult: Difficult
  points: number
  multiplier: number
}

export interface Entity {
  id: number
  x: number
  y: number
  width: number
  height: number
  destroyed: boolean
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
  points: number
}

/** Paddle representation in-game */
export interface Paddle {
  x: number
  y: number
  width: number
  height: number
}


/** Game difficult options enum */
export enum Difficult {
  easy = 'easy',
  medium = 'medium',
  hard = 'hard',
  insane = 'insane'
}

/** Game cheats options enum */
export enum Cheats {
  on = 'ON',
  off = 'OFF'
}

/** Game options interface */
export interface GameUserOptions {
  cheats: Cheats
  difficult: Difficult
}
