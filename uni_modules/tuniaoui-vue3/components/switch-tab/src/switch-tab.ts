import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../constants'
import { buildProps, definePropType, isNumber } from '../../../utils'

import type { ExtractPropTypes } from 'vue'

export const switchTabProps = buildProps({
  /**
   * @description 当前激活的标签索引
   */
  modelValue: {
    type: Number,
    default: 0,
  },
  /**
   * @description 标签列表
   */
  tabs: {
    type: definePropType<string[]>(Array),
    default: () => [],
  },
  /**
   * @description 是否禁用
   */
  disabled: Boolean,
  /**
   * @description 未选中时标签的背景颜色，以tn开头使用图鸟内置的颜色
   */
  inactiveBgColor: String,
  /**
   * @description 选中时标签的背景颜色，以tn开头使用图鸟内置的颜色
   */
  activeBgColor: String,
  /**
   * @description 未选中时标签的字体颜色，以tn开头使用图鸟内置的颜色
   */
  inactiveTextColor: String,
  /**
   * @description 选中时标签的字体颜色，以tn开头使用图鸟内置的颜色
   */
  activeTextColor: String,
})

export const switchTabEmits = {
  [UPDATE_MODEL_EVENT]: (value: number) => isNumber(value),
  [CHANGE_EVENT]: (value: number) => isNumber(value),
}

export type SwitchTabProps = ExtractPropTypes<typeof switchTabProps>
export type SwitchTabEmits = typeof switchTabEmits
