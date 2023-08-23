export const componentSizes = ['', 'sm', 'lg', 'xl'] as const
export const formComponentSizes = ['', 'sm', 'lg'] as const

export type ComponentSize = (typeof componentSizes)[number]
export type FormComponentSize = (typeof formComponentSizes)[number]
