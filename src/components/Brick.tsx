import { MathUtils, Vector3 } from 'three'
import { getSizeOf } from '@/utils'
import { BrickModel } from '@/models/Brick.model'

const Brick = ({ position: initialPositionProps, min, max, type, color = '#fff', angle = 0 }: BrickModel) => {
  const initialPosition = new Vector3(initialPositionProps[0], initialPositionProps[1], initialPositionProps[2]) // 초기 위치
  const size = getSizeOf(type)

  const x = (min && max && max[0] - min[0]) || 1
  const y = (min && max && max[1] - min[1]) || 1
  const z = (min && max && max[2] - min[2]) || 1

  return (
    <mesh name="brick" position={initialPosition} rotation-y={MathUtils.degToRad(angle)}>
      <boxGeometry args={[size[0], size[1], size[2]]} />
      <meshStandardMaterial color={color} metalness={0} roughness={0} />
      {Array.from({ length: x }).map((_, xIndex: number) =>
        Array.from({ length: z }).map((_, zIndex: number) => (
          <mesh position={[xIndex - size[0] / 2 + 0.5, y - size[1] / 2, zIndex - size[2] / 2 + 0.5]}>
            <cylinderGeometry args={[0.2, 0.2, 0.3]} />
            <meshStandardMaterial color={color} metalness={0} roughness={0} />
          </mesh>
        ))
      )}
    </mesh>
  )
}

export default Brick
