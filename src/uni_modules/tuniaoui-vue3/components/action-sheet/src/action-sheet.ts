import { ZIndex } from '../../../constants'
import { buildProps } from '../../../utils'

import type { ExtractPropTypes } from 'vue'

export interface ActionSheetAction {
  /**
   * @description 选项文字
   */
  text: string
  /**
   * @description 选项备注
   */
  desc?: string
  /**
   * @description 选项的值
   */
  value?: string | number
}

/**
 * @description ActionSheet options配置项
 */
export interface ActionSheetOptions {
  /**
   * @description 选项列表
   */
  actions: ActionSheetAction[]
  /**
   * @description 标题
   */
  title?: string
  /**
   * @description 取消按钮文字，如果为空则不显示取消按钮
   */
  cancelText?: string
  /**
   * @description 是否显示遮罩
   */
  mask?: boolean
  /**
   * @description 点击取消按钮触发的回调函数，返回 false 或者返回 Promise 且被 reject 则取消关闭
   */
  cancel?: () => (Promise<boolean> | void) | boolean
  /**
   * @description 点击选项触发的回调函数，返回 false 或者返回 Promise 且被 reject 则取消关闭
   */
  select?: (
    index: number,
    value: string | number
  ) => (Promise<boolean> | void) | boolean
}

export const actionSheetProps = buildProps({
  /**
   * @description ZIndex
   */
  zIndex: {
    type: Number,
    default: ZIndex.popup,
  },
})

export type ActionSheetProps = ExtractPropTypes<typeof actionSheetProps>
