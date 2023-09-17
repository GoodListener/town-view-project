import { atom } from 'recoil'

export const componentState = atom({
  key: 'component', // unique ID (with respect to other atoms/selectors)
  default: {
    component: 'brick',
    type: 'rect',
  }, // default value (aka initial value)
})
