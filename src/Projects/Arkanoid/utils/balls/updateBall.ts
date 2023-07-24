import { Ball } from '../../types'

/**
 * Updates the ball's position based on its speed and angle.
 *
 * @param {Ball} ball
 * @param {number} width - The width of the arkanoid game container.
 * @returns {Ball}
 */
export const updateBall = (ball: Ball, width: number): Ball => {
  const { speed, angle } = ball

  // Set new X and Y positions
  const newX = ball.x + speed * Math.cos(angle)
  const newY = ball.y + speed * Math.sin(angle)

  // Calculate the new angle
  let newAngle = angle

  // If X is outside the container, should invert angle
  if (newX >= width - ball.width || newX <= 0) {
    // Reflect angle horizontally
    newAngle = Math.PI - angle
  }
  if (newY <= 0) {
    // Reflect the angle vertically
    newAngle = -angle
  }

  // set new X and Y positions
  const x = ball.x + speed * Math.cos(newAngle)
  const y = ball.y + speed * Math.sin(newAngle)

  return { ...ball, x, y, angle: newAngle }
}
