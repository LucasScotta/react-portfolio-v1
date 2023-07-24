import { Ball } from '../../types'

/**
 * 
 * @param {Ball} ball In-game ball's representation
 * @param {number} height The height of the game's container
 * @returns {boolean}
 */
export const isCollidingFloor = (ball: Ball, height: number) => ball.y + ball.height * 2 >= height
