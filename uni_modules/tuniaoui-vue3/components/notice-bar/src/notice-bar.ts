import { buildProps, definePropType, isNumber } from '../../../utils'

import type { ExtractPropTypes } from 'vue'

export const noticeBarScrollDirection = ['horizontal', 'vertical'] as const

export const noticeBarProps = buildProps({
  /**
   * @description 是否显示通知栏
   */
  show: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 通知栏显示的数据
   */
  data: {
    type: definePropType<string[]>(Array),
    default: () => [],
  },
  /**
   * @description 背景颜色，以tn开头则使用图鸟内置的颜色
   */
  bgColor: String,
  /**
   * @description 文字颜色，以tn开头则使用图鸟内置的颜色
   */
  textColor: String,
  /**
   * @description 字体大小
   */
  fontSize: String,
  /**
   * @description 通知栏左边显示的图标
   */
  leftIcon: String,
  /**
   * @description 左图标颜色，以tn开头则使用图鸟内置的颜色
   */
  leftIconColor: String,
  /**
   * @description 通知栏右边显示的图标
   */
  rightIcon: String,
  /**
   * @description 右图标颜色，以tn开头则使用图鸟内置的颜色
   */
  rightIconColor: String,
  /**
   * @description 通知暂停播放
   */
  pause: Boolean,
  /**
   * @description 自动播放
   */
  autoPlay: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 滚动方向
   */
  direction: {
    type: String,
    values: noticeBarScrollDirection,
    default: 'horizontal',
  },
  /**
   * @description 是否采用衔接滚动，在 direction 为 horizontal 时有效
   */
  loop: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 滚动速度，在 direction 为 horizontal 以及 loop 为 true 时表示 每秒滚动的像素数，在 direction 为 vertical 或者 direction 为 horizontal 且 loop 为 false 时表示 切换的时间间隔单位ms
   */
  speed: Number,
  /**
   * @description 在data为空时是否自动隐藏
   */
  autoHide: {
    type: Boolean,
    default: true,
  },
})

export const noticeBarEmits = {
  /**
   * @description 点击通知栏
   */
  click: (index: number) => isNumber(index),
  /**
   * @description 左图标点击事件
   */
  'left-icon-click': () => true,
  /**
   * @description 右图标点击事件
   */
  'right-icon-click': () => true,
}

export type NoticeBarProps = ExtractPropTypes<typeof noticeBarProps>
export type NoticeBarEmits = typeof noticeBarEmits

export type NoticeBarScrollDirection = (typeof noticeBarScrollDirection)[number]
