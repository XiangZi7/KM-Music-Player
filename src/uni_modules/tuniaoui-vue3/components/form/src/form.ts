import {
  buildProps,
  definePropType,
  isArray,
  isBoolean,
  isString,
} from '../../../utils'
import { formMetaProps } from '../../base/common-props/form-meta'

import type { ExtractPropTypes } from 'vue'
import type { FormItemProp } from './form-item'
import type { FormRules } from './types'

export const formProps = buildProps({
  ...formMetaProps,
  /**
   * @description 表单数据对象
   */
  model: Object,
  /**
   * @description 表单校验规则
   */
  rules: {
    type: definePropType<FormRules>([Object, Array]),
  },
  /**
   * @description label标签位置
   */
  labelPosition: {
    type: String,
    values: ['left', 'right', 'top'],
    default: 'right',
  },
  /**
   * @description 必填星号显示位置
   */
  requireAsteriskPosition: {
    type: String,
    values: ['left', 'right'],
    default: 'left',
  },
  /**
   * @description label的宽度，默认单位为rpx，支持传入数字、带单位的数值和auto
   */
  labelWidth: {
    type: [String, Number],
    default: '',
  },
  /**
   * @description 表单域标签的后缀
   */
  labelSuffix: {
    type: String,
    default: '',
  },
  /**
   * @description 是否在输入框中显示校验结果反馈图标
   */
  statusIcon: Boolean,
  /**
   * @description 是否显示校验结果
   */
  showMessage: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 是否在校验规则修改后立马触发一次校验
   */
  validateOnRuleChange: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 是否隐藏必填星号
   */
  hideRequiredAsterisk: Boolean,
})
export const formEmits = {
  validate: (prop: FormItemProp, isValid: boolean, message: string) =>
    (isArray(prop) || isString(prop)) &&
    isBoolean(isValid) &&
    isString(message),
}

export type FormProps = ExtractPropTypes<typeof formProps>
export type FormMetaProps = ExtractPropTypes<typeof formMetaProps>
export type FormEmits = typeof formEmits
