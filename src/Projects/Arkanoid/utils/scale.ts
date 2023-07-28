import { scaleFactor } from '../constants'
import { Ball, Block, Paddle } from '../types'

/**
 * Scales the entity proportions to calculate the hitbox in a new coordinate system
 * based on the given scale factor.
 * @param entity The entity to be scaled.
 * @returns An object with the original entity's values scaled to the new coordinate system.
 */
export const scale = (entity: Ball | Block | Paddle) => ({
  left: Math.round(entity.x * scaleFactor),
  top: Math.round(entity.y * scaleFactor),
  width: Math.round(entity.width * scaleFactor),
  height: Math.round(entity.height * scaleFactor)
})
