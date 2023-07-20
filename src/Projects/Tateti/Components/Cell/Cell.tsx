import { FC } from 'react'
interface CellProps {
  cell: string
  onClick: () => void
}
export const Cell: FC<CellProps> = ({ cell, onClick }) => {
  return <li onClick={() => onClick()}>{cell}</li>
}
