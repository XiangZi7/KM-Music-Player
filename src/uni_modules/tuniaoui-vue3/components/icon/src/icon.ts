import { buildProps, iconPropType } from '../../../utils'
import { componentImgModes, componentTypes } from '../../../constants'
import { useComponentCustomStyleProp } from '../../base/composables/use-component-common-props'

import type { ExtractPropTypes } from 'vue'

export const iconProps = buildProps({
  /**
   * @description 图标名称，支持图鸟内置图标和图片地址(只支持绝对路径)
   */
  name: {
    type: iconPropType,
    required: true,
  },
  /**
   * @description 图标颜色类型
   */
  type: {
    type: String,
    values: componentTypes,
    default: '',
  },
  /**
   * @description 图标颜色, 以tn开头则使用图鸟内置的颜色
   */
  color: String,
  /**
   * @description 图标大小
   */
  size: {
    type: [String, Number],
  },
  /**
   * @description 图标加粗
   */
  bold: Boolean,
  /**
   * @description 图标是否为透明
   */
  transparent: Boolean,
  /**
   * @description 透明图标背景
   */
  transparentBg: String,
  /**
   * @description 图片模式，当name为图片地址时生效
   */
  imgMode: {
    type: String,
    values: componentImgModes,
    default: 'aspectFill',
  },
  /**
   * @description 垂直方向上的偏移量
   */
  offsetTop: {
    type: [String, Number],
  },
  /**
   * @description 自定义样式
   */
  customStyle: useComponentCustomStyleProp,
  /**
   * @description 自定义类
   */
  customClass: String,
})
export const iconEmits = {
  /**
   * @description 点击图标时触发
   */
  click: () => true,
}

export type IconProps = ExtractPropTypes<typeof iconProps>
export type IconEmits = typeof iconEmits
