import { Block } from '..'
import { getRandomBlockColor } from '../utils'

/**
 * Returns a new instance of Ball
 * @param {number} x The block's X coordinate
 * @param {number} y The block's X coordinate
 * @returns {Block} 
 */
export const createBlock = (
  x: number,
  y: number,
  lives: number,
  points: number,
): Block => new Block(x, y, lives, getRandomBlockColor(), points)
