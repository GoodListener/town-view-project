import { useParams } from 'react-router'

const Town = () => {
  const { id } = useParams()

  console.log(id)
  return <></>
}
export default Town
