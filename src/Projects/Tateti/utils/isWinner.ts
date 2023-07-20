import { Player } from '../constants'
import { TBoard } from '../types'

export const isWinner = (dif: TBoard, turn: Player) => {
  for (let i = 0; i < 7; i += 1) {
    if (i < 3) {
      const isColumnWin = dif[i] === turn && dif[i + 3] === turn && dif[i + 6] === turn
      if (isColumnWin) return true
    }
    if (i === 0 || i === 3 || i === 6) {
      const isRowWin = dif[i] === turn && dif[i + 1] === turn && dif[i + 2] === turn
      if (isRowWin) return true
    }
    if (i === 0) {
      const isDiagonalWin = dif[i] === turn && dif[i + 4] === turn && dif[i + 8] === turn
      if (isDiagonalWin) return true
    }
    if (i === 2) {
      const isDiagonalWin = dif[i] === turn && dif[i + 2] === turn && dif[i + 4] === turn
      if (isDiagonalWin) return isDiagonalWin
    }
  }
  return false
}
