import { useState } from 'react'
import { Board } from './Components'
import './style/main.css'

const emptyBoard = Array(9).fill('')

const Tateti = () => {
  const [board, setBoard] = useState<string[]>(emptyBoard)
  return <main className="Tateti-Project">
    <h1>Tateti App</h1>
    <button>Restart</button>
    <Board board={board} />
  </main>
}

export default Tateti
