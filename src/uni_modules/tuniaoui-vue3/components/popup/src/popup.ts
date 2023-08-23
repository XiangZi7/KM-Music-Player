import { UPDATE_MODEL_EVENT, ZIndex } from '../../../constants'
import { buildProps, isBoolean } from '../../../utils'
import { useComponentSafeAreaInsetBottomProp } from '../../base/composables/use-component-common-props'
import { overlayProps } from '../../overlay'

import type { ExtractPropTypes } from 'vue'

export const popupOpenDirection = [
  'top',
  'bottom',
  'left',
  'right',
  'center',
] as const

export const popupCloseBtnPosition = [
  'left-top',
  'right-top',
  'left-bottom',
  'right-bottom',
] as const

export const popupProps = buildProps({
  /**
   * @description 控制弹框是否显示
   */
  modelValue: Boolean,
  /**
   * @description 弹框打开的方向
   */
  openDirection: {
    type: String,
    values: popupOpenDirection,
    default: 'center',
  },
  /**
   * @description 弹窗的宽度，在 openDirection 为 left 或 right 或 center 时生效
   */
  width: {
    type: [String, Number],
  },
  /**
   * @description 弹窗的高度，在 openDirection 为 top 或 bottom 或 center 时生效
   */
  height: {
    type: [String, Number],
  },
  /**
   * @description 弹框的内容的背景颜色
   */
  bgColor: {
    type: String,
    default: '#fff',
  },
  /**
   * @description 弹框的内容的圆角
   */
  radius: {
    type: [String, Number],
    default: 15,
  },
  /**
   * @description 是否显示overlay遮罩层
   */
  overlay: {
    type: Boolean,
    default: true,
  },
  /**
   * @description overlay遮罩层的透明度
   */
  overlayOpacity: overlayProps['opacity'],
  /**
   * @description 点击overlay关闭弹框
   */
  overlayCloseable: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 是否显示关闭按钮
   */
  closeBtn: Boolean,
  /**
   * @description 关闭按钮的位置
   */
  closeBtnPosition: {
    type: String,
    values: popupCloseBtnPosition,
    default: 'right-top',
  },
  /**
   * @description 底部是否开启安全区域
   */
  safeAreaInsetBottom: useComponentSafeAreaInsetBottomProp,
  /**
   * @description zIndex
   */
  zIndex: {
    type: Number,
    default: ZIndex.popup,
  },
  /**
   * @description 距离顶部的距离，在 openDirection 为 top 或 left 或 right 时生效，默认单位为`px`
   */
  top: {
    type: [String, Number],
  },
})

export const popupEmits = {
  [UPDATE_MODEL_EVENT]: (value: boolean) => isBoolean(value),
  open: () => true,
  close: () => true,
}

export type PopupProps = ExtractPropTypes<typeof popupProps>
export type PopupEmits = typeof popupEmits

export type PopupOpenDirection = (typeof popupOpenDirection)[number]
export type PopupCloseBtnPosition = (typeof popupCloseBtnPosition)[number]
