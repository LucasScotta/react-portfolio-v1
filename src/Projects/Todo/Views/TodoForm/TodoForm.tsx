import { FC, FormEvent } from 'react'

interface TodoFormProps {
  addTodo: (e: FormEvent<HTMLFormElement>) => void
}

export const TodoForm: FC<TodoFormProps> = ({ addTodo }) => {
  return <form onSubmit={addTodo}>
    <input type='text' name='name' />
    <textarea name='description' />
    <button>Add</button>
  </form>
}
