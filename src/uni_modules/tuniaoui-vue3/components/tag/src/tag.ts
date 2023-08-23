import { buildProps } from '../../../utils'
import { componentShapes, componentTypes } from '../../../constants'
import {
  useComponentCustomStyleProp,
  useComponentSizeProp,
} from '../../base/composables/use-component-common-props'
import type { ExtractPropTypes } from 'vue'

/**
 * 标签形状
 */
export const tagShape = [
  ...componentShapes,
  'circleLeft',
  'circleRight',
] as const

/**
 * 标签属性
 */
export const tagProps = buildProps({
  /**
   * @description 按钮颜色类型
   */
  type: {
    type: String,
    values: componentTypes,
    default: 'primary',
  },
  /**
   * @description 背景颜色，以tn开头使用图鸟内置的颜色
   */
  bgColor: String,
  /**
   * @description 标签字体颜色，以tn开头使用图鸟内置的颜色
   */
  textColor: String,
  /**
   * @description 字体大小，默认单位 rpx
   */
  fontSize: String,
  /**
   * @description 宽度，默认单位 rpx
   */
  width: String,
  /**
   * @description 高度，默认单位 rpx
   */
  height: String,
  /**
   * @description 标签尺寸，内置`sm`、`lg`、`xl`，同时也可以传递指定的尺寸的值
   */
  size: useComponentSizeProp,
  /**
   * @description 标签形状
   */
  shape: {
    type: String,
    values: tagShape,
    default: '',
  },
  /**
   * @description 是否显示边框
   */
  border: Boolean,
  /**
   * @description 边框颜色，以tn开头使用图鸟内置的颜色
   */
  borderColor: String,
  /**
   * @description 边框加粗
   */
  borderBold: Boolean,
  /**
   * @description 自定义样式
   */
  customStyle: useComponentCustomStyleProp,
  /**
   * @description 自定义类
   */
  customClass: String,
})

export const tagEmits = {
  /**
   * @description 标签点击事件
   */
  click: () => true,
}

export type TagProps = ExtractPropTypes<typeof tagProps>
export type TagEmits = typeof tagEmits
