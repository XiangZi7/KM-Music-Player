export const componentShapes = ['', 'circle', 'round'] as const

export type ComponentShape = (typeof componentShapes)[number]
