import { Environment, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { MathUtils, Vector3 } from 'three'
import Brick from '@/components/Brick'
import { useEffect, useState } from 'react'
import { useBrickState } from '@/hooks/useBrickState'
import { BrickModel } from '@/models/Brick.model'
import { useFrame } from '@react-three/fiber'
import { useRecoilValue } from 'recoil'
import { colorState, componentState } from '@/store'
import { checkBoxesOverlap, getSizeOf } from '@/utils'

const World = () => {
  const color = useRecoilValue(colorState)
  const component = useRecoilValue(componentState)
  const [rolloverPosition, setRolloverPosition] = useState<Vector3>(new Vector3(2, 0.5, 2))
  const [rolloverMin, setRolloverMin] = useState<number[]>([0, 0, 0])
  const [rolloverMax, setRolloverMax] = useState<number[]>([1, 1, 1])
  const [isOverlapped, setIsOverlapped] = useState<boolean>(false)
  const [bricks, setBricks] = useBrickState()

  const handlePointerDown = (event: any) => {
    if (event.target.nodeName !== 'CANVAS') return
    if (isOverlapped) return

    setBricks((bricks: BrickModel[]) =>
      bricks.concat([
        {
          position: [rolloverPosition.x, rolloverPosition.y, rolloverPosition.z],
          min: rolloverMin,
          max: rolloverMax,
          type: component.type,
          color: color,
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

  const setRolloverInfo = (startPoints: number[]) => {
    const sizes = getSizeOf(component.type)
    const min = [Math.floor(startPoints[0]), Math.floor(startPoints[1]), Math.floor(startPoints[2])]
    const max = [min[0] + sizes[0], min[1] + sizes[1], min[2] + sizes[2]]
    const position = [(min[0] + max[0]) / 2, (min[1] + max[1]) / 2, (min[2] + max[2]) / 2]

    setRolloverMin(min)
    setRolloverMax(max)
    setRolloverPosition(new Vector3(...position))

    const isOverlapped = !!bricks.find((brick) => {
      if (brick.min && brick.max) {
        return checkBoxesOverlap(brick, { min, max })
      }
    })
    setIsOverlapped(isOverlapped)
  }

  const handlePointerMove = (intersect: THREE.Intersection) => {
    if (!intersect) return

    setRolloverInfo([
      intersect.object.position.x + (intersect.normal?.x || 0),
      intersect.object.position.y + (intersect.normal?.y || 0),
      intersect.object.position.z + (intersect.normal?.z || 0),
    ])
  }
  const handlePointerMoveOnFloor = (floor: THREE.Intersection) => {
    if (!floor) return

    setRolloverInfo([floor.point.x, floor.point.y + 0.5, floor.point.z])
  }

  return (
    <>
      <OrbitControls />
      <Environment background files={'/resting_place_4k.exr'} blur={0.5} />
      <fog attach="fog" color="#cccccc" near={10} far={100} />

      <mesh position={rolloverPosition}>
        <boxGeometry args={getSizeOf(component.type)} />
        <meshStandardMaterial color={isOverlapped ? '#ff3333' : '#55cbea'} transparent={true} opacity={0.5} />
      </mesh>

      <mesh name="floor" rotation-x={MathUtils.degToRad(90)}>
        <planeGeometry args={[250, 250]} />
        <meshStandardMaterial color={'#cccccc'} side={THREE.DoubleSide} />
      </mesh>

      {bricks.map((brick: BrickModel, index: number) => {
        return <Brick key={index} {...brick} />
      })}
      <gridHelper args={[50, 50]} />
      <axesHelper args={[10]} />
    </>
  )
}

export default World
