import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../constants'
import { buildProps, isNumber } from '../../../utils'
import { stepsBaseProps } from '../../base/common-props/steps'

import type { ExtractPropTypes } from 'vue'

export const stepModes = ['dot', 'number', 'dotIcon', 'icon'] as const

export const stepsProps = buildProps({
  ...stepsBaseProps,
  /**
   * @description 当前激活步骤绑定的index
   */
  modelValue: Number,
  /**
   * @description 步骤条模式
   */
  mode: {
    type: String,
    values: stepModes,
    default: 'dot',
  },
})

export const stepsEmits = {
  [UPDATE_MODEL_EVENT]: (index: number) => isNumber(index),
  [CHANGE_EVENT]: (index: number) => isNumber(index),
}

export type StepsProps = ExtractPropTypes<typeof stepsProps>
export type StepsEmits = typeof stepsEmits

export type StepsMode = (typeof stepModes)[number]
