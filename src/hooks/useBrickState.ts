import { buildData } from '@/data/exampleData'
import { useState } from 'react'

export const useBrickState = () => {
  const [bricks, setBricks] = useState(buildData.bricks)
  return [bricks, setBricks]
}
