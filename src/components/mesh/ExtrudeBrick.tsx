import React from 'react'
import * as THREE from 'three'
import { MathUtils, Vector3 } from 'three'
import { BrickModel } from '@/models/Brick.model'

const TrianglePrism = ({ position: initialPositionProps, min, max, type, color = '#fff', angle = 0 }: BrickModel) => {
  const initialPosition = new Vector3(initialPositionProps[0], initialPositionProps[1], initialPositionProps[2]) // 초기 위치

  const triangleShape = new THREE.Shape()
  triangleShape.moveTo(-1, -0.5)
  triangleShape.lineTo(1, -0.5)
  triangleShape.lineTo(1, -0.3)
  triangleShape.lineTo(-1, 0.5)
  triangleShape.lineTo(-1, -0.5)

  const extrudeSettings = {
    steps: 1,
    depth: 1,
    bevelEnabled: false,
  }

  return (
    <mesh name="brick" position={initialPosition} rotation-y={MathUtils.degToRad(angle)}>
      <extrudeGeometry args={[triangleShape, extrudeSettings]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

export default TrianglePrism
