import { FC } from 'react'
import { Cell } from '..'

interface BoardProps {
  board: string[]
}

export const Board: FC<BoardProps> = ({ board }) => {
  return <ul>
    {
      board.map(cell => <Cell key={cell} cell={cell} />)
    }
  </ul>
}
