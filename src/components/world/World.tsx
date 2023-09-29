import { Environment, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { MathUtils, Vector3 } from 'three'
import Brick from '@/components/Brick'
import { useEffect, useMemo, useState } from 'react'
import { useBrickState } from '@/hooks/useBrickState'
import { BrickModel } from '@/models/Brick.model'
import { useFrame } from '@react-three/fiber'
import { useRecoilValue } from 'recoil'
import { colorState, componentState } from '@/store'
import { checkBoxesOverlap, getDirection, getMinMax, getSizeOf } from '@/utils'

const World = () => {
  const color = useRecoilValue(colorState)
  const component = useRecoilValue(componentState)
  const [rolloverPosition, setRolloverPosition] = useState<Vector3>(new Vector3(2, 0.5, 2))
  const [rolloverMin, setRolloverMin] = useState<number[]>([0, 0, 0])
  const [rolloverMax, setRolloverMax] = useState<number[]>([1, 1, 1])
  const [isOverlapped, setIsOverlapped] = useState<boolean>(false)
  const [bricks, setBricks] = useBrickState()

  const handlePointerDown = (event: any) => {
    // pointer down up move 로 클릭이벤트 거르기
    if (event.target.parentNode.parentNode.id !== 'worldCanvas') return
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

  const setRolloverInfo = (startPoints: number[], direction: 'e' | 'w' | 'n' | 's') => {
    const sizes = getSizeOf(component.type)
    const { min, max } = getMinMax(startPoints, direction, sizes)
    const position = [(min[0] + max[0]) / 2, (min[1] + max[1]) / 2, (min[2] + max[2]) / 2]

    setRolloverMin(min)
    setRolloverMax(max)
    setRolloverPosition(new Vector3(...position))

    // optimization code
    if (rolloverPosition.x === position[0] && rolloverPosition.y === position[1] && rolloverPosition.z === position[2])
      return

    console.log('opti')

    const isOverlapped = !!bricks.find((brick) => {
      if (brick.min && brick.max) {
        return checkBoxesOverlap(brick, { min, max })
      }
    })
    setIsOverlapped(isOverlapped)
  }

  const handlePointerMove = (intersect: THREE.Intersection) => {
    if (!intersect) return

    const attachDirection = getDirection(intersect.normal)
    /**
     *  2. size 문제
     */

    setRolloverInfo([intersect.point.x + 0.001, intersect.point.y + 0.001, intersect.point.z + 0.001], attachDirection)
  }
  const handlePointerMoveOnFloor = (floor: THREE.Intersection) => {
    if (!floor) return

    setRolloverInfo([floor.point.x, floor.point.y + 0.5, floor.point.z], 'e')
  }

  const bricksMemo = useMemo(() => {
    return bricks.map((brick: BrickModel, index: number) => <Brick key={index} {...brick} />)
  }, [bricks])

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

      {bricksMemo}

      <gridHelper args={[50, 50]} />
      <axesHelper args={[10]} scale={10} />
    </>
  )
}

export default World
