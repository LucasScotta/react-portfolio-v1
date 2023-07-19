import { useContext } from 'react'
import { TodoRow } from '../../Components'
import { TodoContext } from '../../Context/TodoContext'

export const Todos = () => {
  const { todos } = useContext(TodoContext)
  return <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Check</th>
        <th>Remove</th>
      </tr>
    </thead>
    <tbody>
      {
        todos.map(todo => <TodoRow
          key={todo.id}
          todo={todo} />
        )
      }
    </tbody>
  </table>
}
