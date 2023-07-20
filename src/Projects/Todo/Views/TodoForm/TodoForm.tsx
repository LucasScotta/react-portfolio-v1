import { useContext } from 'react'
import { TodoContext } from '../../Context/TodoContext'
import './style.css'
import { Button } from '../../../../Components'

export const TodoForm = () => {
  const { addTodo } = useContext(TodoContext)
  return <form className="Todo-Form" onSubmit={addTodo}>
    <input
      type='text'
      name='name'
      placeholder='Desarrollar una App en React' />
    <textarea
      name='description'
      placeholder={'Desarrollar una App en React usando Custom Hooks y React-Router, o también, forkear este proyecto y customizarlo 🤜🤛.\nAbrí esta página en una nueva pestaña o ventana, agrega una tarea y volve a este navegador a ver la magia'} />
    <Button>Add</Button>
  </form>
}
