import { Ball } from '../../types'
import { idGenerator } from '../id-generator'

/**
 * Create a ball with random between 15 and 315
 * @returns {Ball}
 */
export const createBall = (): Ball => ({
  id: idGenerator(),
  x: Math.floor(Math.random() * 300) + 15,
  y: Math.floor(Math.random() * 300) + 15,
  width: 10,
  height: 10,
  speed: 5,
  angle: Math.PI * 1.75
})
