import { Button, Card, CardContent, Input, Sheet, Typography } from '@mui/joy'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  const handleSubmit = () => {
    navigate('/my-home')
  }

  return (
    <Sheet
      sx={{
        height: '70%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Card sx={{ width: 320 }}>
        <div>
          <Typography level="title-lg">login</Typography>
          <Typography level="body-sm">로그인 정보를 입력해주세요.</Typography>
        </div>
        <div>
          <Input />
          <Input type="password" />
        </div>
        <CardContent orientation="horizontal">
          <Button
            variant="solid"
            size="md"
            color="primary"
            aria-label="Explore Bahamas Islands"
            sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
            onClick={handleSubmit}
          >
            LOGIN
          </Button>
        </CardContent>
      </Card>
      <div>
        <Link to={'/register'}>회원이 아니신가요? 회원가입 해주세요.</Link>
      </div>
    </Sheet>
  )
}
export default Login
