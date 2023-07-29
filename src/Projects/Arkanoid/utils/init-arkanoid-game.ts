import { INIT_ARKANOID_GAME } from '../constants'
import { Cheats, Difficult, GameConfig, GameUserOptions } from '../types'
const getMultiplier = (difficult: Difficult) => Object.values(Difficult).indexOf(difficult) + 1
const getBaseSpeed = (d: Difficult) => {
  const { easy, medium, hard, insane } = Difficult
  return d === easy
    ? 5
    : d === medium
      ? 8
      : d === hard
        ? 10
        : 15
}
export const initArkanoidGame = (options: GameUserOptions): GameConfig => {
  const { cheats } = options
  const lives = options.cheats === Cheats.on ? Infinity : 3
  const multiplier = options.cheats === Cheats.on ? 0 : getMultiplier(options.difficult)
  const baseSpeed = getBaseSpeed(options.difficult)
  return { ...INIT_ARKANOID_GAME, lives, difficult: options.difficult, cheats: cheats === Cheats.on, multiplier, baseSpeed }
}
