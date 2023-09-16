import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Main from '@/page/main/Main'
import MyHome from '@/page/my-home/MyHome'
import Town from '@/page/town/Town'
import Login from '@/page/login/Login'
import Layout from '@/layout/Layout'
import AuthLayout from '@/layout/AuthLayout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Main />,
      },
      {
        path: '/auth',
        element: <Login />,
      },
      {
        path: '/register',
        element: <>Register</>,
      },
      {
        path: '/town/:id', // 공유용 마을 주소
        element: <Town />,
      },
      {
        path: '/home/:id', // 공유용 집 주소
        element: <MyHome />,
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/my-home', // 내 집
        element: <MyHome />,
      },
    ],
  },
])

export default router
