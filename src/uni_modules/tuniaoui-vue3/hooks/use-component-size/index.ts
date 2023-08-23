import { computed } from 'vue'
import { componentSizes } from '../../constants'

export const componentSizeTypes = ['none', 'inner', 'custom'] as const
export type ComponentSizeType = (typeof componentSizeTypes)[number]

export const useComponentSize = (size?: string | number) => {
  // size类型，内置size类型还是设置的自定义size大小
  const sizeType = computed<ComponentSizeType>(() => {
    if (!size) return 'none'
    return componentSizes.includes(size as any) ? 'inner' : 'custom'
  })

  return {
    sizeType,
  }
}
