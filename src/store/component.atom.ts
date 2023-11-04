import { atom } from 'recoil'
import { BrickType } from '@/models/Brick.type'

interface ComponentModel {
  component: 'brick'
  type: BrickType
  angle: number
}

export const componentState = atom<ComponentModel>({
  key: 'component', // unique ID (with respect to other atoms/selectors)
  default: {
    component: 'brick',
    type: 'rect',
    angle: 0,
  }, // default value (aka initial value)
})
