/**
 * 
 * @param {number} clientX The client mouse position
 * @param {number} paddleWidth The paddle's width
 * @param {DOMRect} rect The paddle's container
 * @returns {number} The new X of the paddle's coordinate
 */
export const calculatePaddleCordinates = (clientX: number, paddleWidth: number, rect: DOMRect) => {
  const leftRect = rect.left
  const rightRect = rect.right - rect.left
  const mouseX = clientX - leftRect
  // Set X coordinate
  let x = 1
  // If mouse X is less than half of the paddle width
  if (mouseX <= paddleWidth / 2 - 1) x = 0
  // If mouse X is greater than the container width minus half of the paddle width
  else if (mouseX >= rightRect - paddleWidth / 2 - 5) x = rightRect - paddleWidth - 5
  else x = mouseX - paddleWidth / 2
  return x
}
