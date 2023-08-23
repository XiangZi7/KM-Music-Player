import {
  useComponentCustomStyleProp,
  useComponentIndexProp,
} from '../../base/composables/use-component-common-props'
import { buildProps, definePropType } from '../../../utils'
import { componentTypes } from '../../../constants'

import type { ExtractPropTypes } from 'vue'
import type { ComponentIndex } from '../../base/composables/use-component-common-props'

/**
 * @description 绝对定位的位置配置
 */
export interface BadgeAbsolutePositionConfig {
  /**
   * @description 上边距
   */
  top?: string | number
  /**
   * @description 右边距
   */
  right?: string | number
}

export const badgeProps = buildProps({
  /**
   * @description 徽标内容，可以是数字或者字符串，当为数字时，超过max会显示{max}+，以icon-开头则显示图标
   */
  value: {
    type: [String, Number],
  },
  /**
   * @description 徽标内容最大值，在value为number时有效，超过最大值会显示{max}+
   */
  max: {
    type: [String, Number],
  },
  /**
   * @description 徽标颜色类型
   */
  type: {
    type: String,
    values: componentTypes,
    default: 'primary',
  },
  /**
   * @description 徽标背景颜色, 以tn开头则使用图鸟内置的颜色
   */
  bgColor: String,
  /**
   * @description 徽标文字颜色, 以tn开头则使用图鸟内置的颜色
   */
  textColor: String,
  /**
   * @description 徽标大小
   */
  size: {
    type: [String, Number],
  },
  /**
   * @description 字体大小
   */
  fontSize: {
    type: [String, Number],
  },
  /**
   * @description 徽标加粗
   */
  bold: Boolean,
  /**
   * @description 自定义徽标样式
   */
  customStyle: useComponentCustomStyleProp,
  /**
   * @description 自定义徽标类
   */
  customClass: String,
  /**
   * @description 是否显示点徽标
   */
  dot: Boolean,
  /**
   * @description 是否绝对定位徽标
   */
  absolute: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 绝对定位的位置
   */
  absolutePosition: {
    type: definePropType<BadgeAbsolutePositionConfig>(Object),
    default: () => ({}),
  },
  /**
   * @description 绝对居中对齐
   */
  absoluteCenter: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 点击标识
   */
  index: useComponentIndexProp,
})
export const badgeEmits = {
  /**
   * @description 点击事件
   */
  click: (index: ComponentIndex) =>
    typeof index === 'number' || typeof index === 'string',
}

export type BadgeProps = ExtractPropTypes<typeof badgeProps>
export type BadgeEmits = typeof badgeEmits
