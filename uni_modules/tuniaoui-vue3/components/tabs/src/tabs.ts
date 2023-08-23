import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../constants'
import { buildProps, definePropType, isNumber } from '../../../utils'
import { tabsBaseProps } from '../../base/common-props/tabs'

import type { ExtractPropTypes } from 'vue'

export type TabsSwitchBeforeFunc = (index: number) => Promise<boolean> | boolean

export const tabsProps = buildProps({
  ...tabsBaseProps,
  /**
   * @description tabs绑定的值，与tabsItem name属性对应值，如果tabsItem没有设置name，则默认为索引值
   */
  modelValue: {
    type: Number,
    default: 0,
  },
  /**
   * @description tabs高度
   */
  height: {
    type: String,
    default: '80rpx',
  },
  /**
   * @description 滑块的宽度
   */
  barWidth: {
    type: String,
    default: '40rpx',
  },
  /**
   * @description 背景颜色，以tn开头时使用图鸟内置的颜色
   */
  bgColor: String,
  /**
   * @description bar滑块颜色，以tn开头时使用图鸟内置的颜色
   */
  barColor: String,
  /**
   * @description 显示底部阴影
   */
  bottomShadow: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 是否可以滚动
   */
  scroll: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 是否显示滑块
   */
  bar: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 选中后的字体是否加粗
   */
  activeBold: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 距离顶部的距离，默认单位 px
   */
  offsetTop: {
    type: Number,
    default: 0,
  },
  /**
   * @description 切换前回调
   */
  beforeSwitch: {
    type: definePropType<TabsSwitchBeforeFunc>(Function),
  },
})

export const tabsEmits = {
  [UPDATE_MODEL_EVENT]: (index: number) => isNumber(index),
  [CHANGE_EVENT]: (index: number) => isNumber(index),
}

export type TabsProps = ExtractPropTypes<typeof tabsProps>
export type TabsEmits = typeof tabsEmits
