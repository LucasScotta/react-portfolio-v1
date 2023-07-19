import { useContext } from 'react'
import { TodoContext } from '../../Context/TodoContext'

export const TodoForm = () => {
  const { addTodo } = useContext(TodoContext)
  return <form onSubmit={addTodo}>
    <input type='text' name='name' />
    <textarea name='description' />
    <button>Add</button>
  </form>
}
