import './App.css'
import { Canvas } from '@react-three/fiber'
import MyElement3D from './MyElement3D.tsx'

function App() {
  return (
    <>
      <Canvas
        camera={{
          fov: 75,
          position: [-1, 10, 0],
        }}
      >
        <MyElement3D></MyElement3D>
      </Canvas>
      <div id="topMenu" className="menu">
        topMenu
      </div>
      <div id="bottomMenu" className="menu">
        bottom
      </div>
      <div id="sideMenu" className="menu">
        side
      </div>
    </>
  )
}

export default App
