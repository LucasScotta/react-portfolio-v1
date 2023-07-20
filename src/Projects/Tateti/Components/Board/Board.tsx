import { useContext } from 'react'
import { Cell } from '..'
import { GameContext } from '../../Context/GameContext'

export const Board = () => {
  const { game, updateCell } = useContext(GameContext)
  const { board } = game
  return <ul>
    {
      board.map((cell, index) => <Cell key={index} onClick={() => updateCell(index)} cell={cell} />)
    }
  </ul>
}
