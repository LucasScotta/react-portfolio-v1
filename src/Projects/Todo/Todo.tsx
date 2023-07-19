import { TodoForm, Todos } from './Views'
import { Anchor, Footer } from '../../Components'
import { TodoProvider } from './Context/TodoProvider'
import { projectsPath } from '../../constants'
import './styles/main.css'

const ToDo = () => {
  return <TodoProvider>
    <main className='todo-project-main'>
      <h1>Todo App</h1>
      <TodoForm />
      <Todos />
      <Footer>
        <p>Este proyecto forma parte de un Portfolio de proyectos, para verlo <Anchor path={projectsPath.HOME}>haz click aquí</Anchor></p>
      </Footer>
    </main>
  </TodoProvider>
}

export default ToDo
