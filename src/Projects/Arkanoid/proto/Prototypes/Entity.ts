import { generateId } from '..'
import { scaleFactor } from '../../constants'
import { Entity as IEntity } from '../../types'

export class Entity implements IEntity {
  id: number
  destroyed = false
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {
    this.id = generateId()
  }

  /**
   * Scales the entity proportions to calculate the hitbox in a new coordinate system
   * based on the given scale factor
   * @returns An object with the original entity's values scaled to the new coordinate system
   */
  scale() {
    return {
      left: Math.round(this.x * scaleFactor),
      top: Math.round(this.y * scaleFactor),
      width: Math.round(this.width * scaleFactor),
      height: Math.round(this.height * scaleFactor)
    }
  }

  /**
   * Marks the entity as destroyed
   */
  destroy() {
    this.destroyed = true
  }
}

