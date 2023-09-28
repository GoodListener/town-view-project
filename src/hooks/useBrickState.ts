import { buildData } from '@/data/exampleData'
import { useState } from 'react'
import { BrickModel } from '@/models/Brick.model'

export const useBrickState = (): [BrickModel[], React.Dispatch<React.SetStateAction<BrickModel[]>>] => {
  const [bricks, setBricks] = useState<BrickModel[]>(buildData.bricks)
  return [bricks, setBricks]
}
