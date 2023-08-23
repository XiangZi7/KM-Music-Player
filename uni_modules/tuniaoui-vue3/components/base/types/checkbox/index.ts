export const checkboxCheckedShapes = ['square', 'circle'] as const
export type CheckboxCheckedShape = (typeof checkboxCheckedShapes)[number]

export type CheckboxValueType = string | number | boolean
