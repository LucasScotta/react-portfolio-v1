import { Todo } from '../Models'

const isString = (s: unknown): s is string => typeof s === 'string'
const isNumber = (n: unknown): n is number => typeof n === 'number' && !isNaN(n)
const isBoolean = (b: unknown): b is boolean => Boolean(b) === b
const isTodo = (todo: unknown): todo is Todo => (
  !!todo &&
  typeof todo === 'object' && !Array.isArray(todo) &&
  'id' in todo && isNumber(todo.id) &&
  'name' in todo && isString(todo.name) &&
  'finished' in todo && isBoolean(todo.finished) &&
  'description' in todo && isString(todo.description)
)

export const isTodoArray = (todos: unknown): todos is Todo[] => {
  if (!todos || !Array.isArray(todos)) return false
  for (const todo of todos) {
    if (!isTodo(todo)) return false
  }
  return true
}
