import { useState } from 'react'
import { MathUtils, Vector3 } from 'three'
import { getSizeOf } from '../utils'
import { BrickModel } from '../models/Brick.model.ts'

const Brick = ({
  position: initialPositionProps,
  type,
  color = '#fff',
  angle = 0,
}: BrickModel) => {
  const initialPosition = new Vector3(
    initialPositionProps[0] + 0.5,
    initialPositionProps[1] + 0.5,
    initialPositionProps[2] + 0.5
  ) // 초기 위치
  const [position, setPosition] = useState(initialPosition)
  const size = getSizeOf(type)

  return (
    <mesh
      name="brick"
      position={position}
      rotation-y={MathUtils.degToRad(angle)}
    >
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.3]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </mesh>
  )
}

export default Brick
