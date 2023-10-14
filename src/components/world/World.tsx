import { Environment, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { BufferGeometry, MathUtils, Mesh, NormalBufferAttributes } from 'three'
import Brick from '@/components/mesh/Brick'
import { useRef } from 'react'
import { useBrickState } from '@/hooks/useBrickState'
import { BrickModel } from '@/models/Brick.model'
import { useFrame } from '@react-three/fiber'
import { useRecoilValue } from 'recoil'
import { colorState, componentState } from '@/store'
import { checkBoxesOverlap, getDirection, getMinMax, getSizeOf } from '@/utils'
import ArcBrick from '@/components/mesh/ArcBrick'
import PrismBrick from '@/components/mesh/PrismBrick'

const World = () => {
  const color = useRecoilValue(colorState)
  const component = useRecoilValue(componentState)
  const rolloverRef = useRef<Mesh<BufferGeometry<NormalBufferAttributes>>>(null)
  const [bricks, setBricks] = useBrickState()

  const setPositioningBrick = (rollover: any) => {
    setBricks((bricks: BrickModel[]) =>
      bricks.concat([
        {
          position: rollover.userData.position,
          min: rollover.userData.min,
          max: rollover.userData.max,
          type: component.type,
          color: color,
        },
      ])
    )
  }

  useFrame((state) => {
    const children = state.scene.children

    state.raycaster.setFromCamera(state.pointer, state.camera)
    const intersects = state.raycaster.intersectObjects(
      children.filter((child) => {
        return child.name === 'brick'
      }),
      true
    )

    if (intersects.length > 0) {
      handleIntersectMove(intersects[0])
    } else {
      const floor = state.raycaster.intersectObjects(children.filter((child) => child.name === 'floor'))[0]
      handleIntersectMoveOnFloor(floor)
    }
  })

  const setRolloverInfo = (startPoints: number[], direction: 'e' | 'w' | 'n' | 's') => {
    if (!rolloverRef || !rolloverRef.current) return

    const sizes = getSizeOf(component.type)
    const { min, max } = getMinMax(startPoints, direction, sizes)
    const position = [(min[0] + max[0]) / 2, (min[1] + max[1]) / 2, (min[2] + max[2]) / 2]

    // collision detector 충돌감지 로직 최적화 필요
    const isOverlapped = !!bricks.find((brick) => {
      if (brick.min && brick.max) {
        return checkBoxesOverlap(brick, { min, max })
      }
    })

    rolloverRef.current.position.x = position[0]
    rolloverRef.current.position.y = position[1]
    rolloverRef.current.position.z = position[2]
    rolloverRef.current.material.color = new THREE.Color(isOverlapped ? '#ff3333' : '#55cbea')
    rolloverRef.current.userData = {
      min,
      max,
      position,
      isOverlapped,
    }
    if (isOverlapped) return
  }

  const handleIntersectMove = (intersect: THREE.Intersection) => {
    if (!intersect) return

    const attachDirection = getDirection(intersect.normal)
    /**
     *  2. size 문제
     */

    setRolloverInfo([intersect.point.x + 0.001, intersect.point.y + 0.001, intersect.point.z + 0.001], attachDirection)
  }
  const handleIntersectMoveOnFloor = (floor: THREE.Intersection) => {
    if (!floor) return

    setRolloverInfo([floor.point.x, floor.point.y + 0.5, floor.point.z], 'e')
  }

  const handleClick = () => {
    if (rolloverRef?.current?.userData.isOverlapped) return
    setPositioningBrick(rolloverRef.current)
  }

  return (
    <>
      <OrbitControls />
      <Environment background files={'/resting_place_4k.exr'} blur={0.5} />
      <fog attach="fog" color="#cccccc" near={10} far={100} />

      <mesh ref={rolloverRef} onClick={handleClick}>
        <boxGeometry args={getSizeOf(component.type)} />
        <meshStandardMaterial transparent={true} opacity={0.5} />
      </mesh>

      <mesh name="floor" rotation-x={MathUtils.degToRad(90)}>
        <planeGeometry args={[250, 250]} />
        <meshStandardMaterial color={'#cccccc'} side={THREE.DoubleSide} />
      </mesh>

      {bricks.map((brick: BrickModel, index: number) => (
        <Brick key={index} {...brick} />
      ))}

      <PrismBrick position={[0, 0, 0]} min={[0, 0, 0]} max={[3, 3, 3]} />

      <gridHelper args={[50, 50]} />
      <axesHelper args={[10]} scale={10} />
    </>
  )
}

export default World
