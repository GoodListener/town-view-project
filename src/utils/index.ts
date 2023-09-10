import { BrickType } from '../models/Brick.type.ts'

export const getSizeOf = (type: BrickType): number[] => {
  switch (type) {
    case 'square':
      return [1, 1, 1]
    case 'triangle':
      return [1, 1, 1]
    case 'rect':
      return [1, 1, 2]
    case 'roundRect':
      return [1, 1, 1]
    default:
      return [1, 1, 1]
  }
}

export const getNumberOfCylinder = (type: BrickType) => {
  switch (type) {
    case 'square':
      return 1
    case 'triangle':
      return 0
    case 'rect':
      return 2
    case 'roundRect':
      return 0
  }
}
