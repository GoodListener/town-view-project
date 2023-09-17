import { atom } from 'recoil'

export const modeState = atom({
  key: 'mode',
  default: 'view',
})
