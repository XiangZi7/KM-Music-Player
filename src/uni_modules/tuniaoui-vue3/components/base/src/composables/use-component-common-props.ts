import { buildProp, definePropType, generateId } from '../../../../utils'
import { componentSizes, formComponentSizes } from '../../../../constants'

export type ComponentIndex = string | number

/**
 * @description 组件Boolean类型定义
 */
export const useComponentBoolean = buildProp({
  type: [Boolean, undefined],
  default: undefined,
})

/**
 * @description 组件尺寸
 */
export const useComponentSizeProp = buildProp({
  type: String,
  values: componentSizes,
  required: false,
} as const)

/**
 * @description 表单组件尺寸
 */
export const useFormSizeProps = buildProp({
  type: String,
  values: formComponentSizes,
  required: false,
} as const)

/**
 * @description 组件自定义样式
 */
export const useComponentCustomStyleProp = buildProp({
  type: Object,
  default: () => ({}),
})

/**
 * @description 组件自定义index
 */
export const useComponentIndexProp = buildProp({
  type: definePropType<ComponentIndex>([String, Number]),
  default: () => generateId(),
})

/**
 * @description 组件是否开启底部安全区域
 */
export const useComponentSafeAreaInsetBottomProp = buildProp({
  type: Boolean,
  default: true,
})
