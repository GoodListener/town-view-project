import { BrickType } from './Brick.type'

export interface BrickModel {
  position: number[]
  type: BrickType
  min?: number[]
  max?: number[]
  color?: string
  angle?: number
}
