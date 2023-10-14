import * as THREE from 'three'
import { BufferAttribute, BufferGeometry, MathUtils, Vector3 } from 'three'
import { useEffect, useRef } from 'react'

interface ArcBrickModel {
  position: number[]
  min: number[]
  max: number[]
  type?: string
  color?: string
  angle?: number
}

const PrismBrick = ({ position: initialPositionProps, min, max, color = '#fff', angle = 0 }: ArcBrickModel) => {
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
    1, 4, 5, 1, 2, 5,

    // 측면 2 사각형
    0, 3, 2, 2, 3, 5,

    // 윗면 삼각형 1
    3, 4, 5,
  ]

  const prismGeometry = new BufferGeometry()

  prismGeometry.setAttribute('position', new BufferAttribute(new Float32Array(vertices), 3))
  prismGeometry.setIndex(new BufferAttribute(new Uint32Array(indices), 1))
  prismGeometry.computeVertexNormals()

  return (
    <group name="brick">
      <mesh name="brickMesh" position={new Vector3(3.5, 0.5, 3.5)} geometry={prismGeometry}>
        <meshStandardMaterial color={'red'} metalness={0} roughness={0} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

export default PrismBrick
