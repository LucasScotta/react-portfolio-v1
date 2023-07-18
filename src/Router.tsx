import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { projectsPath } from './constants'
const Home = lazy(() => import('./Projects/Home/Home'))
export const Router = () => {
  const { HOME } = projectsPath
  return (
    <BrowserRouter>
      <Suspense fallback={<>LOADING...</>}>
        <Routes>
          <Route path={HOME} element={<Home />} />
          <Route path="*" element={<Navigate to={HOME} replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default Router
