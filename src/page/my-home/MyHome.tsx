import MyElement3D from '@/components/r3f/MyElement3D'
import { Canvas } from '@react-three/fiber'

const MyHome = () => {
  return (
    <Canvas
      camera={{
        fov: 75,
        position: [-1, 10, 0],
      }}
    >
      <MyElement3D></MyElement3D>
    </Canvas>
  )
}
export default MyHome
