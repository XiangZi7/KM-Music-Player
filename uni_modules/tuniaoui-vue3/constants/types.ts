export const componentTypes = [
  '',
  'primary',
  'success',
  'warning',
  'danger',
  'info',
] as const

export type ComponentType = (typeof componentTypes)[number]
