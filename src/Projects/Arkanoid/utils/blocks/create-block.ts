import { GAME_MEASUREMENTS } from '../../constants'
import { Block } from '../../types'
import { generateId } from '../../proto'

const { blockWidth, blockHeight } = GAME_MEASUREMENTS

/** Colors to blocks */
const colors = ['red', 'orange', 'blue', 'gray', 'black']
const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)]
/**
 * Create a block with random between 15 and 315
 * @param {number} x
 * @param {number} y
 * @returns 
 */
export const createBlock = (x: number, y: number): Block => ({
  id: generateId(),
  x,
  y,
  width: blockWidth,
  height: blockHeight,
  color: getRandomColor()
})
