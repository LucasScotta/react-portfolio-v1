import { Ball } from '..'
import { Paddle } from '../../types'
interface GameConfig {
  width: number
  height: number
}
/**
 * Returns a new instance of Ball
 * @param {number} x The ball's X coordinate
 * @param {number} y The ball's X coordinate
 * @param {number} speed The ball's speed
 * @param {GameConfig} gameConfig The game's config
 * @param {Paddle} paddle The game's paddle
 * @returns {Ball} 
 */
export const createBall = (x: number, y: number, speed: number, gameConfig: GameConfig, paddle: Paddle): Ball => new Ball(x, y, speed, gameConfig, paddle)
