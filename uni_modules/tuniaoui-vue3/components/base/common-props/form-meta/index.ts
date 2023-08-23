import { buildProps } from '../../../../utils'
import { formComponentSizes } from '../../../../constants'

export const formMetaProps = buildProps({
  /**
   * @description 设置表单下组件的尺寸
   */
  size: {
    type: String,
    values: formComponentSizes,
  },
  /**
   * @description 是否禁用表单内的所有组件，优先级比组件自身的禁用属性高
   */
  disabled: Boolean,
} as const)
