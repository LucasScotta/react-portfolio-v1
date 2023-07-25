import { FC } from 'react'
import { Paddle as PaddleModel } from '../../types'

interface PaddleProps {
  paddle: PaddleModel
  className: string
}

/** Paddle representation in-game */
export const Paddle: FC<PaddleProps> = ({ paddle, className }) => {
  return <div
    className={className}
    style={{
      width: `${paddle.width}px`,
      height: `${paddle.height}px`,
      top: `${paddle.y}px`,
      left: `${paddle.x}px`
    }} />
}
