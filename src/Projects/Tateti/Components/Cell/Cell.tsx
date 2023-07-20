import { FC } from 'react'
interface CellProps {
  cell: string
}
export const Cell: FC<CellProps> = ({ cell }) => {
  return <li>{cell}</li>
}
