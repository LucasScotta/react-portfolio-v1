import { FC } from 'react'
interface TodoRowProps {
  id: string
  name: string
  description: string
  finished: boolean
  switchChecked: (id: string) => void
  removeTodo: (id: string) => void
}
export const TodoRow: FC<TodoRowProps> = ({ id, name, description, finished, switchChecked, removeTodo }) => <tr key={id}>
  <td>{name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase()}</td>
  <td>{description}</td>
  <td>
    <input type='checkbox' checked={finished} onChange={() => switchChecked(id)} />
  </td>
  <td onClick={() => removeTodo(id)}>X</td>
</tr>
