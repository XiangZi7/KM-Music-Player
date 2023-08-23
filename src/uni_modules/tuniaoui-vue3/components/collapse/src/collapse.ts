import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../constants'
import {
  buildProps,
  definePropType,
  isArray,
  isNumber,
  isString,
} from '../../../utils'

import type { ExtractPropTypes } from 'vue'
import type { Arrayable } from '../../../utils'

export type CollapseModelValue = Arrayable<number>

export const collapseProps = buildProps({
  /**
   * @description 当前激活的面板，如果是手风琴效果则传递string，否则传递string[]
   */
  modelValue: {
    type: definePropType<CollapseModelValue>([Number, Array]),
  },
  /**
   * @description 是否开启手风琴效果，每次只能打开一个面板
   */
  accordion: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 是否显示折叠面板的箭头
   */
  showArrow: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 折叠面板箭头的颜色，show-arrow为true时生效，以tn开头的颜色使用图鸟内置的颜色
   */
  arrowColor: String,
})

export const collapseEmits = {
  [UPDATE_MODEL_EVENT]: (value: CollapseModelValue) =>
    isArray(value) || isString(value) || isNumber(value),
  [CHANGE_EVENT]: (value: CollapseModelValue) =>
    isArray(value) || isString(value) || isNumber(value),
}

export type CollapseProps = ExtractPropTypes<typeof collapseProps>
export type CollapseEmits = typeof collapseEmits
