import { FC } from 'react'
import { Todo } from '../../Models'
import { TodoRow } from '../../Components'
interface TodosProps {
  todos: Todo[]
  switchChecked: (id: string) => void
  removeTodo: (id: string) => void
}
export const Todos: FC<TodosProps> = ({ todos, switchChecked, removeTodo }) => {
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
        todos.map(todo => {
          const { id, name, description, finished } = todo
          return <TodoRow
            key={id}
            id={id}
            name={name}
            description={description}
            finished={finished}
            switchChecked={switchChecked}
            removeTodo={removeTodo} />
        })
      }
    </tbody>
  </table>
}
