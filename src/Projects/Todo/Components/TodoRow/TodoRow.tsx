import { FC, useContext } from 'react'
import { Todo } from '../../Models'
import { TodoContext } from '../../Context/TodoContext'
interface TodoRowProps {
  todo: Todo
}
export const TodoRow: FC<TodoRowProps> = ({ todo }) => {
  const { switchChecked, removeTodo } = useContext(TodoContext)
  const { id, name, description, finished } = todo
  return <tr key={id}>
    <td>{name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase()}</td>
    <td>{description}</td>
    <td>
      <input type='checkbox' checked={finished} onChange={() => switchChecked(id)} />
    </td>
    <td onClick={() => removeTodo(id)}>X</td>
  </tr>
}
