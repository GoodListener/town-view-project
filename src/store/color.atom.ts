import { atom } from 'recoil'

export const colorState = atom({
  key: 'color', // unique ID (with respect to other atoms/selectors)
  default: '#ffffff', // default value (aka initial value)
})
