import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { projectsPath } from './constants'

export const Router = () => {
  const { HOME } = projectsPath
  return (
    <BrowserRouter>
      <Routes>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
