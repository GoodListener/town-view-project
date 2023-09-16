import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <>
      잘못된 경로입니다.
      <Link to={'/'}>HOME</Link>
    </>
  )
}
export default ErrorPage
