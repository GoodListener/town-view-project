import { BrickType } from './Brick.type.ts'

export interface BrickModel {
  position: number[]
  type: BrickType
  color?: string
  angle?: number
}
