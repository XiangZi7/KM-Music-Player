import { buildProps } from '../../../../utils'
import { useFormSizeProps } from '../../composables/use-component-common-props'

export const radioBaseProps = buildProps({
  /**
   * @description radio单选框尺寸
   */
  size: useFormSizeProps,
  /**
   * @description radio单选框是否禁用
   */
  disabled: Boolean,
  /**
   * @description radio禁止点击标签进行选择
   */
  labelDisabled: Boolean,
  /**
   * @description 是否显示边框
   */
  border: Boolean,
  /**
   * @description radio激活时的颜色，以tn开头则使用图鸟内置的颜色只支持普通颜色
   */
  activeColor: {
    type: String,
    default: '',
  },
} as const)
