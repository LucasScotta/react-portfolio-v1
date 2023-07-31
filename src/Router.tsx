import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { projectsPath } from './constants'
const Home = lazy(() => import('./Projects/Home/Home'))
const ToDo = lazy(() => import('./Projects/Todo/Todo'))
const Tateti = lazy(() => import('./Projects/Tateti/Tateti'))
const Arkanoid = lazy(() => import('./Projects/Arkanoid/Arkanoid'))
const MemoryNumbers = lazy(() => import('./Projects/Memory-Numbers/Memory-Numbers'))

export const Router = () => {
  const { HOME, TODO, TATETI, TIKTAKTOE, ARKANOID, MEMORY_NUMBERS } = projectsPath
  return (
    <BrowserRouter>
      <Suspense fallback={<>LOADING...</>}>
        <Routes>
          <Route path={HOME} element={<Home />} />
          <Route path={TODO} element={<ToDo />} />
          <Route path={TATETI} element={<Tateti />} />
          <Route path={TIKTAKTOE} element={<Tateti />} />
          <Route path={ARKANOID} element={<Arkanoid />} />
          <Route path={MEMORY_NUMBERS} element={<MemoryNumbers />} />
          <Route path="*" element={<Navigate to={HOME} replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default Router
