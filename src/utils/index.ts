import { BrickType } from '@/models/Brick.type'

export const getSizeOf = (type: BrickType): number[] => {
  switch (type) {
    case 'square':
      return [1, 1, 1]
    case 'big-square':
      return [3, 1, 3]
    case 'rect':
      return [1, 1, 2]
    case 'top4':
      return [1, 4, 1]
    case 'long-rect':
      return [4, 1, 1]
    case 'super-big-square':
      return [7, 1, 7]
    default:
      return [1, 1, 1]
  }
}

export const checkBoxesOverlap = (
  box1: { min: number[]; max: number[] },
  box2: { min: number[]; max: number[] }
): boolean => {
  return !(
    box2.min[0] >= box1.max[0] ||
    box2.max[0] <= box1.min[0] ||
    box2.min[1] >= box1.max[1] ||
    box2.max[1] <= box1.min[1] ||
    box2.min[2] >= box1.max[2] ||
    box2.max[2] <= box1.min[2]
  )
}

export const getDirection = (normal: { x: number; y: number; z: number }): 'e' | 'w' | 'n' | 's' => {
  if (normal.x === 0 && normal.z === 0) return 'e'
  if (normal.x !== 0) {
    return normal.x > 0 ? 'e' : 'w'
  } else {
    return normal.z > 0 ? 'n' : 's'
  }
}

export const getMinMax = (startPoints: number[], direction: 'e' | 'w' | 'n' | 's', sizes: number[]) => {
  if (direction === 's') {
    const min = [Math.floor(startPoints[0]), Math.floor(startPoints[1]), Math.floor(startPoints[2]) - sizes[2]]
    const max = [min[0] + sizes[0], min[1] + sizes[1], Math.floor(startPoints[2])]
    return { min, max }
  } else if (direction === 'n') {
    const min = [Math.floor(startPoints[0]), Math.floor(startPoints[1]), Math.floor(startPoints[2])]
    const max = [min[0] + sizes[0], min[1] + sizes[1], min[2] + sizes[2]]
    return { min, max }
  } else if (direction === 'e') {
    const min = [Math.floor(startPoints[0]), Math.floor(startPoints[1]), Math.floor(startPoints[2])]
    const max = [min[0] + sizes[0], min[1] + sizes[1], min[2] + sizes[2]]
    return { min, max }
  } else if (direction === 'w') {
    const min = [Math.floor(startPoints[0]) - sizes[0], Math.floor(startPoints[1]), Math.floor(startPoints[2])]
    const max = [Math.floor(startPoints[0]), min[1] + sizes[1], min[2] + sizes[2]]
    return { min, max }
  } else {
    const min = [Math.floor(startPoints[0]), Math.floor(startPoints[1]), Math.floor(startPoints[2])]
    const max = [min[0] + sizes[0], min[1] + sizes[1], min[2] + sizes[2]]
    return { min, max }
  }
}

export const colorMap = {
  red: {
    default: '#F44336',
    lighten: ['#FFEBEE', '#FFCDD2', '#EF9A9A', '#E57373', '#EF5350'],
    darken: ['#E53935', '#D32F2F', '#C62828', '#B71C1C'],
    accent: ['#FF8A80', '#FF5252', '#FF1744', '#D50000'],
  },
  pink: {
    default: '#E91E63',
    lighten: ['#FCE4EC', '#F8BBD0', '#F48FB1', '#F06292', '#EC407A'],
    darken: ['#D81B60', '#C2185B', '#AD1457', '#880E4F'],
    accent: ['#FF80AB', '#FF4081', '#F50057', '#C51162'],
  },
  purple: {
    default: '#9C27B0',
    lighten: ['#F3E5F5', '#E1BEE7', '#CE93D8', '#BA68C8', '#AB47BC'],
    darken: ['#8E24AA', '#7B1FA2', '#6A1B9A', '#4A148C'],
    accent: ['#EA80FC', '#E040FB', '#D500F9', '#AA00FF'],
  },
  deep_purple: {
    default: '#673AB7',
    lighten: ['#EDE7F6', '#D1C4E9', '#B39DDB', '#9575CD', '#7E57C2'],
    darken: ['#5E35B1', '#512DA8', '#4527A0', '#311B92'],
    accent: ['#B388FF', '#7C4DFF', '#651FFF', '#6200EA'],
  },
  indigo: {
    default: '#3F51B5',
    lighten: ['#E8EAF6', '#C5CAE9', '#9FA8DA', '#7986CB', '#5C6BC0'],
    darken: ['#3949AB', '#303F9F', '#283593', '#1A237E'],
    accent: ['#8C9EFF', '#536DFE', '#3D5AFE', '#304FFE'],
  },
  blue: {
    default: '#2196F3',
    lighten: ['#E3F2FD', '#BBDEFB', '#90CAF9', '#64B5F6', '#42A5F5'],
    darken: ['#1E88E5', '#1976D2', '#1565C0', '#0D47A1'],
    accent: ['#82B1FF', '#448AFF', '#2979FF', '#2962FF'],
  },
  light_blue: {
    default: '#03A9F4',
    lighten: ['#E1F5FE', '#B3E5FC', '#81D4FA', '#4FC3F7', '#29B6F6'],
    darken: ['#039BE5', '#0288D1', '#0277BD', '#01579B'],
    accent: ['#80D8FF', '#40C4FF', '#00B0FF', '#0091EA'],
  },
  cyan: {
    default: '#00BCD4',
    lighten: ['#E0F7FA', '#B2EBF2', '#80DEEA', '#4DD0E1', '#26C6DA'],
    darken: ['#00ACC1', '#0097A7', '#00838F', '#006064'],
    accent: ['#84FFFF', '#18FFFF', '#00E5FF', '#00B8D4'],
  },
  teal: {
    default: '#009688',
    lighten: ['#E0F2F1', '#B2DFDB', '#80CBC4', '#4DB6AC', '#26A69A'],
    darken: ['#00897B', '#00796B', '#00695C', '#004D40'],
    accent: ['#A7FFEB', '#64FFDA', '#1DE9B6', '#00BFA5'],
  },
  green: {
    default: '#4CAF50',
    lighten: ['#E8F5E9', '#C8E6C9', '#A5D6A7', '#81C784', '#66BB6A'],
    darken: ['#43A047', '#388E3C', '#2E7D32', '#1B5E20'],
    accent: ['#B9F6CA', '#69F0AE', '#00E676', '#00C853'],
  },
  light_green: {
    default: '#8BC34A',
    lighten: ['#F1F8E9', '#DCEDC8', '#C5E1A5', '#AED581', '#9CCC65'],
    darken: ['#7CB342', '#689F38', '#558B2F', '#33691E'],
    accent: ['#CCFF90', '#B2FF59', '#76FF03', '#64DD17'],
  },
  lime: {
    default: '#CDDC39',
    lighten: ['#F9FBE7', '#F0F4C3', '#E6EE9C', '#DCE775', '#D4E157'],
    darken: ['#C0CA33', '#AFB42B', '#9E9D24', '#827717'],
    accent: ['#F4FF81', '#EEFF41', '#C6FF00', '#AEEA00'],
  },
  yellow: {
    default: '#FFEB3B',
    lighten: ['#FFFDE7', '#FFF9C4', '#FFF59D', '#FFF176', '#FFEE58'],
    darken: ['#FDD835', '#FBC02D', '#F9A825', '#F57F17'],
    accent: ['#FFFF8D', '#FFFF00', '#FFEA00', '#FFD600'],
  },
  amber: {
    default: '#ffc107',
    lighten: ['#fff8e1', '#ffecb3', '#ffe082', '#ffd54f', '#ffca28'],
    darken: ['#ffb300', '#ffa000', '#ff8f00', '#ff6f00'],
    accent: ['#ffe57f', '#ffd740', '#ffc400', '#ffab00'],
  },
  orange: {
    default: '#FF9800',
    lighten: ['#FFF3E0', '#FFE0B2', '#FFCC80', '#FFB74D', '#FFA726'],
    darken: ['#FB8C00', '#F57C00', '#EF6C00', '#E65100'],
    accent: ['#FFD180', '#FFAB40', '#FF9100', '#FF6D00'],
  },
  deep_orange: {
    default: '#FF5722',
    lighten: ['#FBE9E7', '#FFCCBC', '#FFAB91', '#FF8A65', '#FF7043'],
    darken: ['#F4511E', '#E64A19', '#D84315', '#BF360C'],
    accent: ['#FF9E80', '#FF6E40', '#FF3D00', '#DD2C00'],
  },
  brown: {
    default: '#795548',
    lighten: ['#EFEBE9', '#D7CCC8', '#BCAAA4', '#A1887F', '#8D6E63'],
    darken: ['#6D4C41', '#5D4037', '#4E342E', '#3E2723'],
  },
  grey: {
    default: '#9E9E9E',
    lighten: ['#FAFAFA', '#F5F5F5', '#EEEEEE', '#E0E0E0', '#BDBDBD'],
    darken: ['#757575', '#616161', '#424242', '#212121'],
  },
  blue_grey: {
    default: '#607D8B',
    lighten: ['#ECEFF1', '#CFD8DC', '#B0BEC5', '#90A4AE', '#78909C'],
    darken: ['#546E7A', '#455A64', '#37474F', '#263238'],
  },
  black: {
    default: '#000000',
  },
}
