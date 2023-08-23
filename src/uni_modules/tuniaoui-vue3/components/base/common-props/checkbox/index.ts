import { buildProps } from '../../../../utils'
import { useFormSizeProps } from '../../composables/use-component-common-props'
import { checkboxCheckedShapes } from '../../types/checkbox'

export const checkboxBaseProps = buildProps({
  /**
   * @description 复选框尺寸
   */
  size: useFormSizeProps,
  /**
   * @description 复选框的形状
   */
  checkedShape: {
    type: String,
    values: checkboxCheckedShapes,
  },
  /**
   * @description 是否禁用
   */
  disabled: Boolean,
  /**
   * @description 是否禁用点击标签切换
   */
  labelDisabled: Boolean,
  /**
   * @description 是否显示边框
   */
  border: Boolean,
  /**
   * @description 激活时的颜色，以tn开头则使用图鸟内置的颜色只支持普通颜色
   */
  activeColor: {
    type: String,
    default: '',
  },
} as const)
