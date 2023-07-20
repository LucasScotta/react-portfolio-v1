import { useState } from 'react'
import { Board } from './Components'
import './style/main.css'
import { Player } from './constants'

const emptyBoard = Array(9).fill('')
const Tateti = () => {
  const [board, setBoard] = useState<(Player | '')[]>(emptyBoard)
  const [turn, setTurn] = useState<Player>(Player.X)

  const updateCell = (index: number) => {
    if (board[index]) return
    const dif = [...board]
    dif[index] = turn
    setBoard(dif)
    setTurn(turn === Player.X ? Player.O : Player.X)
  }

  return <main className="Tateti-Project">
    <h1>Tateti App</h1>
    <button>Restart</button>
    <Board board={board} updateCell={updateCell} />
    <div className="Tateti-turn">
      <p>{Player.X}</p>
      <p>{Player.O}</p>
    </div>

  </main>
}

export default Tateti
