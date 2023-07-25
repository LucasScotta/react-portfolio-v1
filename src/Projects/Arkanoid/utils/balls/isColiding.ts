import { scaleFactor } from '../../constants'
import { Ball, Block, Paddle } from '../../types'

/**
 * 
 * @param {Ball} ball In-game ball's representation
 * @param {number} height The height of the game's container
 * @returns {boolean}
 */
export const isColidingFloor = (ball: Ball, height: number) => ball.y + ball.height * 2 >= height


/**
 * Scales the entity proportions to calculate the hitbox
 * @param entity 
 * @returns 
 */
const scale = (entity: Ball | Block | Paddle) => ({
  left: Math.round(entity.x * scaleFactor),
  top: Math.round(entity.y * scaleFactor),
  width: Math.round(entity.width * scaleFactor),
  height: Math.round(entity.height * scaleFactor)
})

/**
 * Return if the entities are colisioning
 * @param {Ball} ball in-game ball's representation
 * @param {Block | Paddle} entity in-game entity's representation
 * @returns {boolean}
 */
export const isColiding = (ball: Ball, entity: Block | Paddle) => {
  const scaledBall = scale(ball)
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

export const calculateAngle = (ball: Ball, entity: Block | Paddle) => {
  const scaledBall = scale(ball)
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
  let newAngle = ball.angle
  if (colisionDirection === 'left' || colisionDirection === 'right') {
    newAngle = Math.PI - ball.angle
  } else if (colisionDirection === 'top' || colisionDirection === 'bottom') {
    newAngle = -ball.angle
  }

  // Actualizar el ángulo de la bola con el ángulo de rebote
  return newAngle
}
