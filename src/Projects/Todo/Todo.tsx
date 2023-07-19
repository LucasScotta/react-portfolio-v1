import { FormEvent } from 'react'
import { Todo } from './Models'
import { useLocalStorage } from '../../Hooks'
import { localStorageKeys } from '../../constants'
import { isTodoArray } from './utils'
import { TodoForm, Todos } from './Views'
import './styles/main.css'

interface TodoInputs {
  name: HTMLInputElement
  description: HTMLInputElement
}

const defaultTodos: Todo[] = []
const ToDo = () => {
  const localStorageData = { key: localStorageKeys.todo, defaultValue: defaultTodos, validator: isTodoArray }
  const {
    storage: todos,
    setStorage: setTodos
  } = useLocalStorage(localStorageData)

  const addTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as typeof e.target & TodoInputs
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

  const switchChecked = (id: string) => {
    setTodos(prev => prev.map(t => {
      if (t.id !== id) return t
      return { ...t, finished: !t.finished }
    }))
  }

  const removeTodo = (id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id))
  }
  return <main className='todo-project-main'>
    <h1>Todo App</h1>
    <TodoForm addTodo={addTodo} />
    <Todos todos={todos} switchChecked={switchChecked} removeTodo={removeTodo} />
  </main>
}

export default ToDo
