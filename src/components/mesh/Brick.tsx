import { MathUtils, Vector3 } from 'three'
import { getSizeOf } from '@/utils'
import { BrickModel } from '@/models/Brick.model'

const Brick = ({ position: initialPositionProps, min, max, type, color = '#fff', angle = 0 }: BrickModel) => {
  const initialPosition = new Vector3(initialPositionProps[0], initialPositionProps[1], initialPositionProps[2]) // 초기 위치
  const size = getSizeOf(type)
  const realSize = angle % 180 > 0 ? size.reverse() : size

  const x = (min && max && max[0] - min[0]) || 1
  const y = (min && max && max[1] - min[1]) || 1
  const z = (min && max && max[2] - min[2]) || 1

  return (
    <group name="brick">
      <mesh name="brickMesh" position={initialPosition} rotation-y={MathUtils.degToRad(0)}>
        <boxGeometry args={[realSize[0], realSize[1], realSize[2]]} />
        <meshStandardMaterial color={color} metalness={0} roughness={0} />
        {Array.from({ length: x }).map((_, xIndex: number) =>
          Array.from({ length: z }).map((_, zIndex: number) => (
            <mesh
              name="brickCap"
              key={xIndex + '-' + zIndex}
              position={[xIndex - realSize[0] / 2 + 0.5, y - realSize[1] / 2, zIndex - realSize[2] / 2 + 0.5]}
            >
              <cylinderGeometry args={[0.2, 0.2, 0.3]} />
              <meshStandardMaterial color={color} metalness={0} roughness={0} />
            </mesh>
          ))
        )}
      </mesh>
    </group>
  )
}

export default Brick
