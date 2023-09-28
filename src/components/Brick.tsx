import { MathUtils, Vector3 } from 'three'
import { getSizeOf } from '@/utils'
import { BrickModel } from '@/models/Brick.model'

const Brick = ({ position: initialPositionProps, type, color = '#fff', angle = 0 }: BrickModel) => {
  const initialPosition = new Vector3(initialPositionProps[0], initialPositionProps[1], initialPositionProps[2]) // 초기 위치
  const size = getSizeOf(type)

  return (
    <mesh name="brick" position={initialPosition} rotation-y={MathUtils.degToRad(angle)}>
      <boxGeometry args={[size[0], size[1], size[2]]} />
      <meshStandardMaterial color={color} metalness={0} roughness={0} />
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.3]} />
        <meshStandardMaterial color={color} metalness={0} roughness={0} />
      </mesh>
    </mesh>
  )
}

export default Brick
