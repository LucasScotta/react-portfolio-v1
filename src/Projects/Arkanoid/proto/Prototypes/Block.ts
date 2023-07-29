import { GAME_MEASUREMENTS } from '../../constants'
import { Block as IBlock } from '../../types'
import { Entity } from './Entity'

const { blockWidth, blockHeight } = GAME_MEASUREMENTS

/**
 * Represents the in-game object block
 */
export class Block extends Entity implements IBlock {
  /**
   * Creates a new ball instance
   * @param {number} x The initial x-coordinate of the ball
   * @param {number} y The initial y-coordinate of the ball
   * @param {number} lives The block's durability
   * @param {string} color The block's color
   */
  constructor(
    x: number,
    y: number,
    public lives: number,
    public color: string,
    public points: number) {
    super(x, y, blockWidth, blockHeight)
  }

  hit() {
    this.lives -= 1
    if (this.lives === 0) this.destroy()
  }
}
