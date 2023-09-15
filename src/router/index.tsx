import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from '@/page/error/ErrorPage'
import Main from '@/page/main/Main'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
  },
])

export default router
