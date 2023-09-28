import { atom } from 'recoil'
import { BrickType } from '@/models/Brick.type'

interface ComponentModel {
  component: 'brick' // todo: 구성요소 늘리기
  type: BrickType
}

export const componentState = atom<ComponentModel>({
  key: 'component', // unique ID (with respect to other atoms/selectors)
  default: {
    component: 'brick',
    type: 'rect',
  }, // default value (aka initial value)
})
