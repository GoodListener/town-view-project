import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { MathUtils, Vector3 } from 'three'
import Brick from '@/components/Brick'
import { useEffect, useState } from 'react'
import { useBrickState } from '@/hooks/useBrickState'
import { BrickModel } from '@/models/Brick.model'
import { useFrame } from '@react-three/fiber'

const MyElement3D = () => {
  const [rolloverPosition, setRolloverPosition] = useState<Vector3>(new Vector3(2, 0.5, 2))

  const [bricks, setBricks] = useBrickState()

  const handlePointerMove = (intersect: THREE.Intersection) => {
    if (!intersect) return

    setRolloverPosition(
      new Vector3(
        intersect.object.position.x + (intersect.normal?.x || 0),
        intersect.object.position.y + (intersect.normal?.y || 0),
        intersect.object.position.z + (intersect.normal?.z || 0)
      )
    )
  }

  const handlePointerDown = () => {
    setBricks((bricks: BrickModel[]) =>
      bricks.concat([
        {
          position: [rolloverPosition.x - 0.5, rolloverPosition.y - 0.5, rolloverPosition.z - 0.5],
          type: 'square',
          color: 'green',
        },
      ])
    )
  }

  useEffect(() => {
    window.addEventListener('pointerdown', handlePointerDown)

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [rolloverPosition, handlePointerDown])

  useFrame((state) => {
    const children = state.scene.children

    state.raycaster.setFromCamera(state.pointer, state.camera)
    const intersects = state.raycaster.intersectObjects(
      children.filter((child) => {
        return child.name === 'brick'
      }),
      false
    )
    if (intersects.length > 0) {
      handlePointerMove(intersects[0])
    } else {
      const floor = state.raycaster.intersectObjects(children.filter((child) => child.name === 'floor'))[0]
      handlePointerMoveOnFloor(floor)
    }
  })

  const handlePointerMoveOnFloor = (floor: THREE.Intersection) => {
    if (!floor) return

    setRolloverPosition(
      new Vector3(
        Math.floor(floor.point.x) + 0.5,
        Math.floor(floor.point.y + 0.5) + 0.5,
        Math.floor(floor.point.z) + 0.5
      )
    )
  }

  return (
    <>
      <OrbitControls />
      <directionalLight color="#ffffff" intensity={3} position={[5, 5, 5]} target-position={[0, 0, 0]} />

      <mesh position={rolloverPosition}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={'#55cbea'} transparent={true} opacity={0.5} />
      </mesh>

      <mesh name="floor" rotation-x={MathUtils.degToRad(90)}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color={'#ffffff'} side={THREE.DoubleSide} />
      </mesh>

      {bricks.map((brick: BrickModel, index: number) => {
        return <Brick key={index} {...brick} />
      })}
      <gridHelper args={[50, 50]} />
      <arrowHelper />
    </>
  )
}

export default MyElement3D
