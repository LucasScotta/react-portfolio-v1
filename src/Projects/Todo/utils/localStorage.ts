import { Todo } from '../Models'

const isString = (s: unknown): s is string => typeof s === 'string'
const isBoolean = (b: unknown): b is boolean => Boolean(b) === b
const isTodo = (todo: unknown): todo is Todo => (
  !!todo &&
  typeof todo === 'object' && !Array.isArray(todo) &&
  'id' in todo && isString(todo.id) &&
  'name' in todo && isString(todo.name) &&
  'finished' in todo && isBoolean(todo.finished) &&
  'description' in todo && isString(todo.description)
)
const isTodoArray = (todos: unknown): todos is Todo[] => {
  if (!todos || !Array.isArray(todos)) return false
  for (const todo of todos) {
    if (!isTodo(todo)) return false
  }
  return true
}
export const getTodos = () => {
  try {
    const item = localStorage.getItem('todos')
    if (!item) {
      resetData()
      return []
    }
    const todos = JSON.parse(item) as unknown
    if (!isTodoArray(todos)) {
      resetData()
      return []
    }
    return todos
  }
  catch (e) {
    console.log('Something went wrong retrieving your previous data')
    resetData()
    return []
  }
}

export const resetData = () => persistData([])
export const persistData = (todos: Todo[]) => localStorage.setItem('todos', JSON.stringify(todos))
