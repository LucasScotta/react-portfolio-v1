import { useState, useEffect, FormEvent } from 'react'
import './styles/main.css'
import { Todo } from './Models'
import { getTodos, persistData } from './utils'
interface TodoInputs {
  name: HTMLInputElement
  description: HTMLInputElement
}

const ToDo = () => {
  const [todos, setTodos] = useState<Todo[]>(getTodos())

  useEffect(() => {
    persistData(todos)
    const listenLocalStorage = (e: StorageEvent) => e.key === 'todos' && setTodos(getTodos())
    window.addEventListener('storage', listenLocalStorage)
    return () => {
      window.removeEventListener('storage', listenLocalStorage)
    }
  }, [todos])

  const addTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as typeof e.target & TodoInputs
    const { description, name } = target
    setTodos([...todos, { id: crypto.randomUUID(), name: name.value, description: description.value, finished: false }])
  }
  const switchChecked = (todo: Todo) => {
    setTodos(prev => prev.map(t => {
      if (t.id !== todo.id) return t
      return { ...t, finished: !t.finished }
    }))
  }
  const remove = (todo: Todo) => {
    setTodos(prev => prev.filter(t => t.id !== todo.id))
  }
  return <main className='todo-project-main'>
    <form onSubmit={addTodo}>
      <input type='text' name='name' />
      <textarea name='description' />
      <button>Add</button>
    </form>
    <ul>
      {
        todos.map(todo => {
          const { id, name, description, finished } = todo
          return <li key={id}>
            <h3>{name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase()}</h3>
            <p>{description}</p>
            <input type='checkbox' checked={finished} onChange={() => switchChecked(todo)} />
            <p onClick={() => remove(todo)}>X</p>
          </li>
        })
      }
    </ul>
  </main>
}

export default ToDo
