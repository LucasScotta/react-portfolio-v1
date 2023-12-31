import { GAME_MEASUREMENTS } from '../constants'
import { createBlock } from '../proto'
import { Difficult } from '../types'
import { levels } from './levels'
const basePoints = 10
const startX = 10
const startY = 10
const { blocksSeparatorX, blocksSeparatorY, blockWidth } = GAME_MEASUREMENTS
/** Generate the blocks of the level provided */
export const generateLevel = (level: number, difficult: Difficult) => {
  const blocks = []
  const multiplier = Object.values(Difficult).indexOf(difficult) + 1
  const points = basePoints * multiplier

  // Representation of the block's level
  const levelBlocks = levels[level - 1]

  // Block starts coordinates
  let x = startX
  let y = startY

  for (const row of levelBlocks) {
    for (const b of row) {
      // if the representation of the block is 0 (empty place)
      x += blocksSeparatorX
      if (b === 0) {
        x += blockWidth
        continue
      }
      // if the repesentation of the block IS a block
      blocks.push(createBlock(x, y, 1, points))
      x += blockWidth
    }

    // reset the X coordinate
    x = startX

    // Set the Y coordinate to the next line
    y += blocksSeparatorY
  }
  return blocks
}
