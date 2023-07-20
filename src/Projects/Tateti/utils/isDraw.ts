import { TBoard } from '../types'

export const isDraw = (board: TBoard) => board.every(cell => cell !== '')
