import { useState } from 'react'
import { Board, Results, Scores, Turn } from './Components'
import { Player } from './constants'
import './style/main.css'
type TBoard = (Player | '')[]
const isWinner = (dif: TBoard, turn: Player) => {
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
const isDraw = (board: TBoard) => board.every(cell => cell !== '')
const emptyBoard = Array(9).fill('')
const Tateti = () => {
  const [board, setBoard] = useState<TBoard>(emptyBoard)
  const [turn, setTurn] = useState<Player>(Player.X)
  const [winner, setWinner] = useState<Player | ''>('')
  const [draw, setDraw] = useState(false)
  const [scores, setScores] = useState({ [Player.X]: 0, [Player.O]: 0 })
  const updateCell = (index: number) => {
    if (board[index] || winner) return
    const dif = [...board]
    dif[index] = turn
    if (isWinner(dif, turn)) {
      setWinner(turn)
    }
    if (isDraw(dif)) {
      setDraw(true)
    }
    setBoard(dif)
    setTurn(turn === Player.X ? Player.O : Player.X)
  }

  const resetGame = () => {
    setBoard(emptyBoard)
    setTurn(Player.X)
    if (winner) setWinner('')
    if (draw) setDraw(false)
  }
  return <main className="Tateti-Project">
    <h1>Tateti App</h1>
    <button onClick={resetGame}>Restart</button>
    <Board board={board} updateCell={updateCell} />
    <Scores scores={scores} />
    <Turn winner={winner} draw={draw} turn={turn} />
    <Results winner={winner} draw={draw} />
  </main>
}

export default Tateti
