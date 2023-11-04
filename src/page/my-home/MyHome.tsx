import World from '@/components/world/World'
import { Canvas } from '@react-three/fiber'
import { Button, Card, Sheet, Stack } from '@mui/joy'
import { colorMap } from '@/utils'
import { useRecoilState } from 'recoil'
import { colorState, componentState } from '@/store'
import { useEffect } from 'react'
import SelectableCard from '@/components/selectCard/SelectableCard'

const MyHome = () => {
  const [color, setColor] = useRecoilState(colorState)
  const [component, setComponent] = useRecoilState(componentState)
  const handleClickSave = () => {
    console.log('save')
  }

  useEffect(() => {
    const handleKeypressR = (event: any) => {
      if (event.key.toLowerCase() === 'r') setComponent({ ...component, angle: (component.angle % 360) + 90 })
    }

    window.addEventListener('keypress', handleKeypressR)

    return () => {
      window.removeEventListener('keypress', handleKeypressR)
    }
  }, [component])

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
        id="worldCanvas"
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
          <SelectableCard type="rect" />
          <SelectableCard type="square" />
          <SelectableCard type="big-square" />
          <SelectableCard type="top4" />
          <SelectableCard type="long-rect" />
          <SelectableCard type="super-big-square" />
          <SelectableCard type="triangle" />
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
