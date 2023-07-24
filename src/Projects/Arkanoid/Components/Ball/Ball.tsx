import { FC } from 'react'
import { Ball as BallModel } from '../../types'

interface BallProps {
  ball: BallModel
  className: string
}
export const Ball: FC<BallProps> = ({ ball, className }) => {
  return <div
    className={className}
    style={{
      width: `${ball.width}px`,
      height: `${ball.height}px`,
      top: `${ball.y}px`,
      left: `${ball.x}px`
    }}
  />
}
