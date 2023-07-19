import { createContext, FormEvent, Dispatch } from 'react'
import { Todo } from '../Models'

interface ITodoContext {
  todos: Todo[],
  setTodos: Dispatch<Todo[]>,
  switchChecked: (id: string) => void,
  addTodo: (e: FormEvent<HTMLFormElement>) => void,
  removeTodo: (id: string) => void
}
export const TodoContext = createContext({} as ITodoContext)
