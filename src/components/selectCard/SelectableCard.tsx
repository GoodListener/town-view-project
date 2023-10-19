import { Card, CardContent, Typography } from '@mui/joy'
import { Canvas } from '@react-three/fiber'
import Brick from '@/components/mesh/Brick'
import { useRecoilState, useRecoilValue } from 'recoil'
import { colorState, componentState } from '@/store'
import { BrickType } from '@/models/Brick.type'
import TrianglePrism from '@/components/mesh/ExtrudeBrick'

const SelectableCard = ({ angle, type }: { angle?: number; type: BrickType }) => {
  const color = useRecoilValue(colorState)
  const [component, setComponent] = useRecoilState(componentState)

  return (
    <Card
      color="primary"
      invertedColors
      variant={component.type === type ? 'solid' : 'plain'}
      sx={{
        cursor: 'pointer',
      }}
      onClick={() =>
        setComponent({
          type: type,
          component: 'brick',
        })
      }
    >
      <CardContent>
        <Typography>{type.toUpperCase()}</Typography>
        <Canvas
          className="selectCanvas"
          camera={{
            fov: 55,
            position: [4, 4, 0],
          }}
        >
          <directionalLight color="#ffffff" intensity={3} position={[5, 5, 5]} target-position={[0, 0, 0]} />
          {type === 'triangle' ? (
            <TrianglePrism position={[0, 0, 0]} type={type} angle={angle || 45} color={color} />
          ) : (
            <Brick position={[0, 0, 0]} type={type} angle={angle || 45} color={color} />
          )}
        </Canvas>
      </CardContent>
    </Card>
  )
}
export default SelectableCard
