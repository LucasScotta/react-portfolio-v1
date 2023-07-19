import { FC, FormEvent } from 'react'
import { useLocalStorage } from '../../../Hooks'
import { Todo } from '../Models'
import { localStorageKeys } from '../../../constants'
import { isTodoArray } from '../utils'
import { TodoContext } from './TodoContext'

interface TodoProviderProps {
  children: JSX.Element
}

export const TodoProvider: FC<TodoProviderProps> = ({ children }) => {
  const localStorageData = { key: localStorageKeys.todo, defaultValue: [] as Todo[], validator: isTodoArray }
  const {
    storage: todos,
    setStorage: setTodos
  } = useLocalStorage(localStorageData)

  const switchChecked = (id: string) => {
    setTodos(prev => prev.map(t => {
      if (t.id !== id) return t
      return { ...t, finished: !t.finished }
    }))
  }
  const addTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as typeof e.target & { name: HTMLInputElement, description: HTMLInputElement }
    const { description, name } = target
    if (!name.value) return
    const todo = {
      id: crypto.randomUUID(),
      name: name.value.slice(0),
      description: description.value.slice(0),
      finished: false
    }
    setTodos(prev => [...prev, todo])
    name.value = ''
    description.value = ''
  }
  const removeTodo = (id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id))
  }


  return <TodoContext.Provider value={{ todos, setTodos, switchChecked, addTodo, removeTodo }}>
    {children}
  </TodoContext.Provider>
}
