import { formComponentSizes } from '../../../constants'
import { buildProps, definePropType } from '../../../utils'

import type { ExtractPropTypes } from 'vue'
import type { Arrayable } from '../../../utils'
import type { FormItemRule } from './types'

export const formItemValidateStates = [
  '',
  'error',
  'validating',
  'success',
] as const

export const formItemProps = buildProps({
  /**
   * @description label文本
   */
  label: String,
  /**
   * @description label的宽度，默认单位为rpx，支持传入数字和auto
   */
  labelWidth: {
    type: [String, Number],
    default: '',
  },
  /**
   * @description label标签位置
   */
  labelPosition: {
    type: String,
    values: ['left', 'right', 'top'],
    default: '',
  },
  /**
   * @description model中的key，如果需要使用校验，该字段为必填，可以是一个路径数组(['user', 'name', 0])
   */
  prop: {
    type: definePropType<FormItemProp>([String, Array]),
  },
  /**
   * @description 标记字段是否为必填，如果不填写则根据校验规则自动生成
   */
  required: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @description 表单校验规则
   */
  rules: {
    type: definePropType<Arrayable<FormItemRule>>([Object, Array]),
  },
  /**
   * @description 字段错误信息，如果设置了该字段则校验状态会变成error，并显示该字段的内容
   */
  error: String,
  /**
   * @description 校验状态
   */
  validateStatus: {
    type: String,
    values: formItemValidateStates,
  },
  /**
   * @description 是否显示校验结果
   */
  showMessage: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 控制表单组件尺寸
   */
  size: {
    type: String,
    values: formComponentSizes,
  },
})
export type FormItemProps = ExtractPropTypes<typeof formItemProps>

export type FormItemValidateStates = (typeof formItemValidateStates)[number]
export type FormItemProp = Arrayable<string>
