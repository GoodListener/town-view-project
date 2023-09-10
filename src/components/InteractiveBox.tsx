import { Box } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { Vector3 } from 'three'
import { gravity } from '../constants'

const InteractiveBox = (props: any) => {
  const boxRef = useRef()
  const initialPosition = new Vector3(0, 5, 0) // 초기 위치
  const [position, setPosition] = useState(initialPosition)
  const handleMouseClick = (event: any) => {
    console.log(event)
  }

  useFrame(() => {
    if (!boxRef) return

    const newPosition = position.clone().add(gravity)

    // 바닥에 닿으면 물체를 초기 위치로 리셋
    if (newPosition.y < -5) {
      newPosition.copy(initialPosition)
    }

    // 새로운 위치를 적용
    setPosition(newPosition)

    // Sphere의 위치를 업데이트
    boxRef.current.position.copy(newPosition)
  })

  return (
    <mesh onClick={handleMouseClick}>
      <Box {...props} ref={boxRef} position={position} />
    </mesh>
  )
}

export default InteractiveBox
