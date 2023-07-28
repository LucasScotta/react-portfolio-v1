import { Block, Ball as IBall, Paddle } from '../../types'
import { scale } from '../../utils'
import { generateId } from '../utils/'

interface GameConfig {
  width: number
  height: number
}
/**
 * Represents the in-game object ball
 */
export class Ball implements IBall {
  id: number
  width = 10
  height = 10
  angle = Math.PI * 1.75
  destroyed = false

  /**
   * Creates a new ball instance
   * @param {number} x The initial x-coordinate of the ball
   * @param {number} y The initial y-coordinate of the ball
   * @param {number} speed The initial speed of the ball
   * @param {GameConfig} gameConfig The game configuration containing width and height
   * @param {Paddle} paddle The paddle object used for collision detection
   */
  constructor(public x: number, public y: number, public speed: number, private gameConfig: GameConfig, private paddle: Paddle) {
    this.id = generateId()
  }

  /**
   * Calculates the new ball's angle after colliding with an entity
   * @param {Block | Paddle} entity The entity with which the ball collides
   * @returns {number} The new angle of the ball after collision
   */
  calculateAngle(entity: Block | Paddle): number {
    const scaledBall = scale(this)
    const scaledEntity = scale(entity)

    // Calcular los límites de la bola y el bloque con las coordenadas escaladas
    const ballTop = scaledBall.top
    const ballBottom = scaledBall.top + scaledBall.height
    const ballRight = scaledBall.left + scaledBall.width
    const ballLeft = scaledBall.left
    const entityTop = scaledEntity.top
    const entityBottom = scaledEntity.top + scaledEntity.height
    const entityRight = scaledEntity.left + scaledEntity.width
    const entityLeft = scaledEntity.left
    // Calcular los puntos de intersección en el eje X e Y
    const intersectionX = Math.max(ballLeft, Math.min(ballRight, entityRight)) - Math.min(ballLeft, Math.max(ballRight, entityLeft))
    const intersectionY = Math.max(ballTop, Math.min(ballBottom, entityBottom)) - Math.min(ballTop, Math.max(ballBottom, entityTop))

    // Determinar el lado de colisión (izquierda, derecha, arriba o abajo)
    const colisionDirection = intersectionX < intersectionY
      ? intersectionX === ballLeft - entityRight ? 'left' : 'right'
      : intersectionY === ballTop - entityBottom ? 'top' : 'bottom'

    // Calcular el ángulo de rebote según la dirección de colisión
    let newAngle = this.angle
    if (colisionDirection === 'left' || colisionDirection === 'right') {
      newAngle = Math.PI - this.angle
    } else if (colisionDirection === 'top' || colisionDirection === 'bottom') {
      newAngle = -this.angle
    }

    // Actualizar el ángulo de la bola con el ángulo de rebote
    return newAngle
  }

  /**
   * Checks if the ball is colliding with an entity (block or paddle)
   * @param {Block | Paddle} entity The entity to check for collision
   * @returns {boolean} True if the ball is colliding with the entity, otherwise false
   */
  isColiding(entity: Block | Paddle) {
    const scaledBall = scale(this)
    const scaledEntity = scale(entity)

    // Calcular los límites de la bola y el bloque con las coordenadas escaladas
    const ballTop = scaledBall.top
    const ballBottom = scaledBall.top + scaledBall.height
    const ballRight = scaledBall.left + scaledBall.width
    const ballLeft = scaledBall.left
    const entityTop = scaledEntity.top
    const entityBottom = scaledEntity.top + scaledEntity.height
    const entityRight = scaledEntity.left + scaledEntity.width
    const entityLeft = scaledEntity.left

    // Verificar si hay colisión
    return (
      ballLeft <= entityRight &&
      ballRight >= entityLeft &&
      ballTop <= entityBottom &&
      ballBottom >= entityTop
    )
  }

  /**
   * Checks if the ball is colliding with the floor
   * @returns {boolean} True if the ball is colliding with the floor, otherwise false
   */
  isColidingFloor() {
    const { y, height } = this
    const gameHeight = this.gameConfig.height
    return y + height * 2 >= gameHeight
  }

  /**
   * Updates the in-game parameters of the ball
   */
  update() {
    const { speed, paddle } = this

    if (this.isColidingFloor()) {
      return this.destroy()
    }

    if (speed === 0) {
      this.y = paddle.y - this.height - 1
      this.x = paddle.x + paddle.width / 2
    }

    // If this ball is coliding with the paddle
    if (this.isColiding(paddle)) {
      this.angle = this.calculateAngle(paddle)
      this.updateCoords()
      return
    }

    // Set new X and Y positions
    const newX = this.x + speed * Math.cos(this.angle)
    const newY = this.y + speed * Math.sin(this.angle)

    // If X is outside the container, should invert angle
    if (newX >= this.gameConfig.width - this.width || newX <= 0) {
      // Reflect angle horizontally
      this.angle = Math.PI - this.angle
    }
    if (newY <= 0) {
      // Reflect the angle vertically
      this.angle = -this.angle
    }

    // set new X and Y positions
    this.updateCoords()

  }

  /**
   * Updates the X and Y coordinates of the ball based on its speed and angle
   */
  updateCoords() {
    const { speed, angle, x, y } = this
    this.x = x + speed * Math.cos(angle)
    this.y = y + speed * Math.sin(angle)
  }

  /**
   * Marks the ball as destroyed
   */
  destroy() {
    this.destroyed = true
  }

}
