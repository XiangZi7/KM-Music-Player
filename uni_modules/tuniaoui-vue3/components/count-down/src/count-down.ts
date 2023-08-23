import { buildProps } from '../../../utils'

import type { ExtractPropTypes } from 'vue'

export const countDownSeparatorMode = ['cn', 'en'] as const

export const countDownProps = buildProps({
  /**
   * @description 倒计时时间，单位 秒
   */
  time: {
    type: Number,
    required: true,
    default: 0,
  },
  /**
   * @description 是否自动开始倒计时
   */
  autoStart: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 尺寸，内置 `sm` 、 `lg` 、 `xl`，也可以传递指定数值
   */
  size: String,
  /**
   * @description 字体颜色，以tn开头使用图鸟内置的颜色
   */
  textColor: String,
  /**
   * @description 是否显示天数
   */
  showDay: Boolean,
  /**
   * @description 是否显示小时
   */
  showHour: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 是否显示分钟
   */
  showMinute: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 是否显示秒数
   */
  showSecond: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 自动隐藏天数
   */
  autoHideDay: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 分割符类型，`cn` 显示 对应语言的中文分割符，`en` 显示 : 分割符
   */
  separatorMode: {
    type: String,
    values: countDownSeparatorMode,
    default: 'en',
  },
  /**
   * @description 分割符颜色，以tn开头使用图鸟内置的颜色
   */
  separatorColor: String,
  /**
   * @description 是否显示边框
   */
  border: Boolean,
  /**
   * @description 边框颜色，以tn开头使用图鸟内置的颜色
   */
  borderColor: String,
})

export const countDownEmits = {
  /**
   * @description 倒计时开始时触发
   */
  start: () => true,
  /**
   * @description 倒计时结束时触发
   */
  end: () => true,
}

export type CountDownProps = ExtractPropTypes<typeof countDownProps>
export type CountDownEmits = typeof countDownEmits

export type CountDownSeparatorMode = (typeof countDownSeparatorMode)[number]
