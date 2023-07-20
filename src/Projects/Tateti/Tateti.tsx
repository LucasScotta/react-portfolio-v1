import { useState } from 'react'
import { Board } from './Components'

const emptyBoard = Array(9).fill('')

const Tateti = () => {
  const [board, setBoard] = useState<string[]>(emptyBoard)
  return <main>
    <Board board={board} />
  </main>
}

export default Tateti
