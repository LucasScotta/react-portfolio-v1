import { useState } from 'react'
import { Board, Results, Scores, Turn } from './Components'
import { INITIAL_STATE, Player } from './constants'
import type { Game, TBoard } from './types'
import { isWinner, isDraw, SwitchTurn } from './utils'
import './style/main.css'

const Tateti = () => {
  const [game, setGame] = useState<Game>(INITIAL_STATE)

  const updateCell = (index: number) => {
    if (game.board[index] || game.winner || game.draw) return

    setGame(prev => {
      const state = { ...prev }
      const { turn, board } = state
      board[index] = turn
      if (isWinner(board, turn)) {
        state.scores[turn] += 1
        state.winner = turn
        return state
      }
      if (isDraw(board)) {
        state.draw = true
        return state
      }
      return { ...state, board, turn: SwitchTurn(turn) }
    })

  }
  const resetGame = () => setGame(prev => ({ ...prev, board: Array(9).fill('') as TBoard, turn: Player.X, winner: '', draw: false }))

  return <main className="Tateti-Project">
    <h1>Tateti App</h1>
    <button onClick={resetGame}>Restart</button>
    <Board board={game.board} updateCell={updateCell} />
    <Scores scores={game.scores} />
    <Turn winner={game.winner} draw={game.draw} turn={game.turn} />
    <Results winner={game.winner} draw={game.draw} />
  </main>
}

export default Tateti
