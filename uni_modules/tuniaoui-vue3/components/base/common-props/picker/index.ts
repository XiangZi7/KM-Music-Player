import { buildProps } from '../../../../utils'
import { ZIndex } from '../../../../constants'

export const pickerBaseProps = buildProps({
  /**
   * @description 显示取消按钮
   */
  showCancel: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 取消按钮的文本
   */
  cancelText: {
    type: String,
    default: '取 消',
  },
  /**
   * @description 取消按钮的字体颜色，支持图鸟内置的字体颜色
   */
  cancelColor: String,
  /**
   * @description 显示确定按钮
   */
  showConfirm: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 确定按钮的文本
   */
  confirmText: {
    type: String,
    default: '确 定',
  },
  /**
   * @description 确定按钮的字体颜色，支持图鸟内置的字体颜色
   */
  confirmColor: String,
  /**
   * @description 显示遮罩
   */
  mask: Boolean,
  /**
   * zIndex
   */
  zIndex: {
    type: Number,
    default: ZIndex.popup,
  },
} as const)
