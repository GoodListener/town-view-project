import { BrickModel } from '../models/Brick.model.ts'

export const buildData = {
  light: {},
  camera: {},
  bricks: [
    { type: 'square', position: [1, 0, 1], color: 'red' },
    { type: 'square', position: [3, 0, 5], color: 'red' },
    { type: 'square', position: [4, 0, 5], color: 'red' },
    { type: 'square', position: [5, 0, 5], color: 'red' },
    { type: 'square', position: [6, 0, 5], color: 'blue' },
    { type: 'square', position: [7, 0, 5], color: 'red' },
    { type: 'square', position: [8, 0, 5], color: 'blue' },
    { type: 'square', position: [9, 0, 5], color: 'red' },
    { type: 'square', position: [9, 0, 6], color: 'blue' },
    { type: 'square', position: [9, 0, 7], color: 'red' },
    { type: 'square', position: [9, 0, 8], color: 'blue' },
    { type: 'square', position: [9, 0, 9], color: 'red' },
    { type: 'square', position: [9, 0, 10], color: 'blue' },
    { type: 'rect', position: [12, 0, 10], angle: 90, color: 'red' },
    { type: 'square', position: [0, 0, 0], color: 'blue' },
    { type: 'square', position: [-1, 0, 0], color: 'blue' },
    { type: 'square', position: [-2, 0, 0], color: 'blue' },
    { type: 'square', position: [-3, 0, 0], color: 'blue' },
  ] as BrickModel[],
}
