import { buildProps, definePropType, isNumber } from '../../../utils'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../constants'

import type { ExtractPropTypes } from 'vue'

export const swiperIndicatorPosition = [
  'left-top',
  'center-top',
  'right-top',
  'left-bottom',
  'center-bottom',
  'right-bottom',
] as const
export type SwiperIndicatorPosition = (typeof swiperIndicatorPosition)[number]

export const swiperIndicatorType = ['line', 'dot', 'number'] as const
export type SwiperIndicatorType = (typeof swiperIndicatorType)[number]

export const swiperProps = buildProps({
  /**
   * @description 当前选中item的索引值
   */
  modelValue: {
    type: Number,
    default: 0,
  },
  /**
   * @description swiper数据源
   */
  data: {
    type: definePropType<any[]>(Array),
    default: [],
  },
  /**
   * @description 轮播图的宽度，默认单位rpx
   */
  width: String,
  /**
   * @description 轮播图的高度，默认单位rpx
   */
  height: String,
  /**
   * @description 是否自动播放
   */
  autoplay: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 自动播放的时间间隔，单位ms
   */
  interval: {
    type: Number,
    default: 5000,
  },
  /**
   * @description 动画时长，单位ms
   */
  duration: {
    type: Number,
    default: 500,
  },
  /**
   * @description 是否循环播放
   */
  loop: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值
   */
  previousMargin: {
    type: String,
    default: '0px',
  },
  /**
   * @description 后边距，可用于露出后一项的一小部分，接受 px 和 rpx 值
   */
  nextMargin: {
    type: String,
    default: '0px',
  },
  /**
   * @description 是否显示指示器
   */
  indicator: Boolean,
  /**
   * @description 指示器的位置
   */
  indicatorPosition: {
    type: String,
    values: swiperIndicatorPosition,
    default: 'center-bottom',
  },
  /**
   * @description 指示器的类型
   */
  indicatorType: {
    type: String,
    values: swiperIndicatorType,
    default: 'dot',
  },
  /**
   * @description 指示器颜色，以tn开头使用图鸟内置的颜色
   */
  indicatorBgColor: String,
  /**
   * @description 指示器激活时的颜色，以tn开头使用图鸟内置的颜色
   */
  indicatorActiveBgColor: String,
  /**
   * @description 指示器文本颜色，以tn开头使用图鸟内置的颜色
   */
  indicatorTextColor: String,
})

export const swiperEmits = {
  [UPDATE_MODEL_EVENT]: (value: number) => isNumber(value),
  /**
   * @description 选项发生改变时触发
   */
  [CHANGE_EVENT]: (value: number) => isNumber(value),
  /**
   * @description item点击事件
   */
  'item-click': (value: number) => isNumber(value),
}

export type SwiperProps = ExtractPropTypes<typeof swiperProps>
export type SwiperEmits = typeof swiperEmits
