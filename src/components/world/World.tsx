import { Environment, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { BufferGeometry, MathUtils, Mesh, NormalBufferAttributes } from 'three'
import Brick from '@/components/mesh/Brick'
import React, { useRef } from 'react'
import { useBrickState } from '@/hooks/useBrickState'
import { BrickModel } from '@/models/Brick.model'
import { useFrame } from '@react-three/fiber'
import { useRecoilValue } from 'recoil'
import { colorState, componentState } from '@/store'
import { checkBoxesOverlap, getDirection, getMinMax, getSizeOf } from '@/utils'
import TrianglePrismBrick from '@/components/mesh/TrianglePrismBrick'

type Rollover = Mesh<BufferGeometry<NormalBufferAttributes>>
const World = () => {
  const color = useRecoilValue(colorState)
  const component = useRecoilValue(componentState)
  const rolloverRef = useRef<Rollover>(null)
  const [bricks, setBricks] = useBrickState()

  const setPositioningBrick = (rollover: Rollover) => {
    setBricks((bricks: BrickModel[]) =>
      bricks.concat([
        {
          position: rollover.userData.position,
          min: rollover.userData.min,
          max: rollover.userData.max,
          type: component.type,
          angle: component.angle,
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

    const { min, max } = getMinMax(startPoints, direction, component.angle % 180 > 0 ? sizes.reverse() : sizes)
    const position = [(min[0] + max[0]) / 2, (min[1] + max[1]) / 2, (min[2] + max[2]) / 2]

    // collision detector 충돌감지 로직 최적화 필요
    const isOverlapped = !!bricks.find((brick) => {
      if (brick.min && brick.max) {
        return checkBoxesOverlap({ min: brick.min, max: brick.max }, { min, max })
      }
    })

    rolloverRef.current.position.x = position[0]
    rolloverRef.current.position.y = position[1]
    rolloverRef.current.position.z = position[2]
    rolloverRef.current.material.color = new THREE.Color(isOverlapped ? '#ff3333' : '#55cbea')
    rolloverRef.current.rotation.y = MathUtils.degToRad(component.angle)

    rolloverRef.current.userData = {
      min,
      max,
      position: [position[0], position[1], position[2]],
      isOverlapped,
    }
    if (isOverlapped) return
  }

  const handleIntersectMove = (intersect: THREE.Intersection) => {
    if (!intersect) return
    if (!intersect.normal) return

    const attachDirection = getDirection(intersect.normal)
    setRolloverInfo([intersect.point.x + 0.001, intersect.point.y + 0.001, intersect.point.z + 0.001], attachDirection)
  }
  const handleIntersectMoveOnFloor = (floor: THREE.Intersection) => {
    if (!floor) return
    setRolloverInfo([floor.point.x, floor.point.y + 0.5, floor.point.z], 'e')
  }

  const handleClick = () => {
    if (!rolloverRef.current || rolloverRef?.current?.userData.isOverlapped) return
    setPositioningBrick(rolloverRef.current)
  }

  const triangleShape = new THREE.Shape()
  triangleShape.moveTo(0 - 0.5, 0 - 0.5)
  triangleShape.lineTo(0 - 0.5, 1 - 0.5)
  triangleShape.lineTo(2 - 0.5, 0.2 - 0.5)
  triangleShape.lineTo(2 - 0.5, 0 - 0.5)
  triangleShape.lineTo(0 - 0.5, 0 - 0.5)

  const extrudeSettings = {
    steps: 1,
    depth: 1,
    bevelEnabled: false,
  }

  return (
    <>
      <OrbitControls />
      <Environment background files={'/resting_place_4k.exr'} blur={0.5} />
      <fog attach="fog" color="#cccccc" near={10} far={100} />

      <mesh ref={rolloverRef} onClick={handleClick}>
        {component.type === 'triangle' ? (
          <extrudeGeometry args={[triangleShape, extrudeSettings]} />
        ) : (
          <boxGeometry args={getSizeOf(component.type)} />
        )}
        <meshStandardMaterial transparent={true} opacity={0.5} />
      </mesh>

      <mesh name="floor" rotation-x={MathUtils.degToRad(90)}>
        <planeGeometry args={[250, 250]} />
        <meshStandardMaterial color={'#cccccc'} side={THREE.DoubleSide} />
      </mesh>

      {bricks.map((brick: BrickModel, index: number) =>
        brick.type === 'triangle' ? <TrianglePrismBrick key={index} {...brick} /> : <Brick key={index} {...brick} />
      )}

      <gridHelper args={[50, 50]} />
      <axesHelper args={[10]} scale={10} />
    </>
  )
}

export default World
