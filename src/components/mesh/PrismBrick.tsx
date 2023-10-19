import { BufferAttribute, BufferGeometry, Vector3 } from 'three'
import * as THREE from 'three'
import { useRef } from 'react'

interface PrismBrickModel {
  position: number[]
  min: number[]
  max: number[]
  type?: string
  color?: string
  angle?: number
}

const PrismBrick = ({ position: initialPositionProps, min, max, color = '#fff', angle = 0 }: PrismBrickModel) => {
  const meshRef = useRef()
  const vertices = [
    -0.5,
    -0.5,
    -0.5, // V0
    0.5,
    -0.5,
    -0.5, // V1
    -0.5,
    -0.5,
    0.5, // V2
    -0.5,
    0.5,
    -0.5, // V3
    0.5,
    0.5,
    -0.5, // V4
    -0.5,
    0.5,
    0.5, // V5
  ]

  const indices = [
    // 아랫면 삼각형 1
    0, 1, 2,

    // 측면 1 사각형
    0, 3, 1, 1, 3, 4,

    // 측면 2 사각형
    1, 4, 5, 1, 5, 2,

    // 측면 2 사각형
    0, 2, 3, 2, 5, 3,

    // 윗면 삼각형 1
    3, 5, 4,
  ]

  const uvs = [
    // Triangle 1 (0, 1, 2)
    0,
    0, // 정점 0
    1,
    0, // 정점 1
    0.5,
    1, // 정점 2

    // Triangle 2 (3, 4, 5)
    0,
    0, // 정점 3
    1,
    0, // 정점 4
    0.5,
    1, // 정점 5

    // Side Faces
    // Square 1 (0, 1, 3, 2)
    0,
    0, // 정점 0
    1,
    0, // 정점 1
    0,
    1, // 정점 3
    1,
    1, // 정점 2

    // Square 2 (2, 4, 3, 5)
    0,
    0, // 정점 2
    1,
    0, // 정점 4
    0,
    1, // 정점 3
    1,
    1, // 정점 5

    // Square 3 (0, 2, 1, 4)
    0,
    0, // 정점 0
    1,
    0, // 정점 2
    0,
    1, // 정점 1
    1,
    1, // 정점 4
  ]

  const prismGeometry = new BufferGeometry()

  prismGeometry.setAttribute('position', new BufferAttribute(new Float32Array(vertices), 3))
  prismGeometry.setIndex(new BufferAttribute(new Uint32Array(indices), 1))
  prismGeometry.setAttribute('uv', new BufferAttribute(new Float32Array(uvs), 2))

  return (
    <group name="brick">
      <mesh
        name="brickMesh"
        position={new Vector3(initialPositionProps[0], initialPositionProps[1], initialPositionProps[2])}
        geometry={prismGeometry}
        ref={meshRef}
      >
        <meshStandardMaterial color={'red'} metalness={0} roughness={0} />
      </mesh>
    </group>
  )
}

export default PrismBrick
