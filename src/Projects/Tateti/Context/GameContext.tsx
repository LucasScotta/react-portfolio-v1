import { FC, createContext, useState } from 'react'
import { Game, TBoard } from '../types'
import { INITIAL_STATE, Player } from '../constants'
import { SwitchTurn, isDraw, isWinner } from '../utils'
interface GameContextProviderProps {
  children: JSX.Element
}
interface IGameContext {
  game: Game
  updateCell: (index: number) => void
  resetGame: () => void
}
export const GameContext = createContext({} as IGameContext)

export const GameContextProvider: FC<GameContextProviderProps> = ({ children }) => {
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
  return <GameContext.Provider value={{ game, updateCell, resetGame }}>
    {children}
  </GameContext.Provider>
}
