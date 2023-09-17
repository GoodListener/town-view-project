import './App.css'
import router from '@/router'
import { RouterProvider } from 'react-router'
import { RecoilRoot } from 'recoil'

function App() {
  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  )
}

export default App
