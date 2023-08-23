import { buildProps } from '../../../utils'
import { stepsBaseProps } from '../../base/common-props/steps'

import type { ExtractPropTypes } from 'vue'

export const stepProps = buildProps({
  ...stepsBaseProps,
  /**
   * @description 标题
   */
  title: String,
  /**
   * @description 默认的图标
   */
  icon: String,
  /**
   * @description 激活时的图标
   */
  activeIcon: String,
})

export const stepEmits = {
  /**
   * @description 点击事件
   */
  click: () => true,
}

export type StepProps = ExtractPropTypes<typeof stepProps>
export type StepEmits = typeof stepEmits
