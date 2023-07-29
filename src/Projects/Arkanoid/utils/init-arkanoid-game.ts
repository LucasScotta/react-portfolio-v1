import { INIT_ARKANOID_GAME } from '../constants'
import { Cheats, GameConfig, GameUserOptions } from '../types'

export const initArkanoidGame = (options: GameUserOptions): GameConfig => {
  const { cheats } = options
  const lives = options.cheats === Cheats.on ? Infinity : 3
  return { ...INIT_ARKANOID_GAME, lives, difficult: options.difficult, cheats: cheats === Cheats.on }
}
