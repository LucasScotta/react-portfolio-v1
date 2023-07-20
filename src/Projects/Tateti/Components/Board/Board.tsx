import { FC } from 'react'
import { Cell } from '..'

interface BoardProps {
  board: string[]
  updateCell: (index: number) => void
}

export const Board: FC<BoardProps> = ({ board, updateCell }) => {
  return <ul>
    {
      board.map((cell, index) => <Cell key={index} onClick={() => updateCell(index)} cell={cell} />)
    }
  </ul>
}
