export const tuniaoColors = [
  'red',
  'purplered',
  'purple',
  'bluepurple',
  'aquablue',
  'blue',
  'indigo',
  'cyan',
  'teal',
  'green',
  'yellowgreen',
  'lime',
  'yellow',
  'orangeyellow',
  'orange',
  'orangered',
  'brown',
  'grey',
  'gray',
] as const
export const tuniaoColorType = ['', 'dark', 'disabled', 'light'] as const
export const tuniaoColorNames = ['bg', 'text', 'border', 'shadow'] as const

export type TuniaoColor = (typeof tuniaoColors)[number]
export type TuniaoColorType = (typeof tuniaoColorType)[number]
export type TuniaoColorName = (typeof tuniaoColorNames)[number]
