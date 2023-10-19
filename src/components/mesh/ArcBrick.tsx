import { MathUtils, Vector3 } from 'three'
import * as THREE from 'three'

interface ArcBrickModel {
  position: number[]
  min: number[]
  max: number[]
  type?: string
  color?: string
  angle?: number
}

const ArcBrick = ({ position: initialPositionProps, min, max, color = '#fff', angle = 0 }: ArcBrickModel) => {
  const initialPosition = new Vector3(initialPositionProps[0], initialPositionProps[1], initialPositionProps[2]) // 초기 위치

  const x = (min && max && max[0] - min[0]) || 1
  const y = (min && max && max[1] - min[1]) || 1
  const z = (min && max && max[2] - min[2]) || 1

  // 오목한 아크 형태의 면을 정의합니다.

  const vertices = [
    0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0.25, 0.25, -0.25, 0.75, 0.25, -0.25, 0.75, 0.75, -0.25, 0.25, 0.75, -0.25,
  ]

  const indices = [0, 1, 5, 0, 5, 4, 1, 2, 6, 1, 6, 5, 2, 3, 7, 2, 7, 6, 3, 0, 4, 3, 4, 7, 4, 5, 6, 6, 7, 4]

  return (
    <group name="brick">
      <mesh name="brickMesh" position={[3, 10, 3]} rotation-y={MathUtils.degToRad(angle)}>
        <polyhedronGeometry args={[vertices, indices, 3, 1]} />
        <meshStandardMaterial color={color} metalness={0} roughness={0} />
      </mesh>
    </group>
  )
}

export default ArcBrick
