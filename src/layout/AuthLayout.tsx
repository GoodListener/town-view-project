import { Button, Sheet, Typography } from '@mui/joy'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import React from 'react'

const AuthLayout = () => {
  return (
    <>
      <Sheet
        invertedColors
        color="primary"
        variant="plain"
        sx={{
          position: 'fixed',
          width: '100%',
          height: '32px',
          boxSizing: 'border-box',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 2,
          boxShadow: '0px 1px 4px 2px #ddd',
          zIndex: 100,
        }}
      >
        <Typography level="h3" component="h1">
          <Link to={'/'}>TOWN</Link>
        </Typography>
        <Button size="sm">Logout</Button>
      </Sheet>
      <Sheet
        sx={{
          position: 'absolute',
          width: '100%',
          top: '32px',
          height: 'calc(100vh - 32px)',
          boxSizing: 'border-box',
          p: 1,
        }}
      >
        <Outlet />
      </Sheet>
    </>
  )
}

export default AuthLayout
