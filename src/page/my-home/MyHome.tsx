import World from '@/components/world/World'
import { Canvas } from '@react-three/fiber'
import { Button, Card, Sheet, Stack } from '@mui/joy'
import { colorMap } from '@/utils'
import { useRecoilState } from 'recoil'
import { colorState, componentState } from '@/store'
import { useEffect, useState } from 'react'
import SelectableCard from '@/components/selectCard/SelectableCard'

const MyHome = () => {
  const [color, setColor] = useRecoilState(colorState)
  const [turningAngle, setTurningAngle] = useState(0)
  const handleClickSave = () => {
    console.log('save')
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTurningAngle((turningAngle) => turningAngle + 10)
    }, 100)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <>
      <Sheet
        sx={{
          position: 'absolute',
          zIndex: 100,
          right: 20,
          top: 20,
          background: 'transparent',
        }}
      >
        <Button variant="solid" color="primary" onClick={handleClickSave}>
          SAVE
        </Button>
      </Sheet>
      <Canvas
        camera={{
          fov: 75,
          position: [5, 5, 0],
        }}
      >
        <World />
      </Canvas>
      <Card
        sx={{
          position: 'absolute',
          bottom: 5,
          left: 5,
          zIndex: 100,
        }}
      >
        <Stack direction="row" gap={2}>
          <SelectableCard angle={turningAngle} type="rect" />
          <SelectableCard angle={turningAngle} type="square" />
          <SelectableCard angle={turningAngle} type="big-square" />
        </Stack>
      </Card>
      <Card
        sx={{
          position: 'absolute',
          bottom: 5,
          right: 5,
          zIndex: 100,
        }}
      >
        <Stack
          direction="row"
          gap={2}
          width={320}
          sx={{
            overflowX: 'scroll',
          }}
        >
          {Object.values(colorMap).map((colorInfo: any) => (
            <Button
              key={colorInfo.default}
              variant="plain"
              onClick={() => setColor(colorInfo.default)}
              sx={{
                background: colorInfo.default,
                border: color === colorInfo.default ? '2px solid' : 'none',
              }}
            ></Button>
          ))}
        </Stack>
      </Card>
    </>
  )
}
export default MyHome
