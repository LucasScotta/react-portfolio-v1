import { Game, TBoard } from './types'

export enum Player {
  X = '❌',
  O = '⚪'
}

export const INITIAL_STATE: Game = { board: Array(9).fill('') as TBoard, turn: Player.X, scores: { [Player.X]: 0, [Player.O]: 0 }, winner: '', draw: false }
