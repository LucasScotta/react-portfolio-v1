import { FC } from 'react'

import { Block as BlockModel } from '../../types'

interface BlockProps {
  block: BlockModel
  className: string
}

export const Block: FC<BlockProps> = ({ block, className }) => {
  return <div
    className={className}
    style={{
      width: `${block.width}px`,
      height: `${block.height}px`,
      top: `${block.y}px`,
      left: `${block.x}px`,
      backgroundColor: block.color
    }}
  />
}
