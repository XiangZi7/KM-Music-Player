export const componentImgModes = [
  'scaleToFill',
  'aspectFit',
  'aspectFill',
  'widthFix',
  'heightFix',
  'top',
  'bottom',
  'center',
  'left',
  'right',
  'top left',
  'top right',
  'bottom left',
  'bottom right',
] as const

export type ComponentImgMode = (typeof componentImgModes)[number]
