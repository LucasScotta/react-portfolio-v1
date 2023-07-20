import { Player } from './constants'

export interface Game {
  board: TBoard
  turn: Player
  scores: IScores
  winner: Player | ''
  draw: boolean
}
export type IScores = { [Player.X]: number, [Player.O]: number }
export type TBoard = (Player | '')[]
