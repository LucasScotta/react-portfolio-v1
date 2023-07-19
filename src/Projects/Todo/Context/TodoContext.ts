import { createContext, FormEvent, Dispatch } from 'react'
import { Todo } from '../Models'

interface ITodoContext {
  todos: Todo[],
  setTodos: Dispatch<Todo[]>,
  switchChecked: (id: number) => void,
  addTodo: (e: FormEvent<HTMLFormElement>) => void,
  removeTodo: (id: number) => void
}
export const TodoContext = createContext({} as ITodoContext)
