import { componentImgModes } from '../../../constants'
import { buildProps } from '../../../utils'

import type { ExtractPropTypes } from 'vue'

export const lazyLoadProps = buildProps({
  /**
   * @description 图片地址
   */
  src: String,
  /**
   * @description 图片高度
   */
  height: String,
  /**
   * @description 图片宽度
   */
  width: String,
  /**
   * @description 图片裁剪模式
   */
  mode: {
    type: String,
    values: componentImgModes,
    default: 'aspectFill',
  },
  /**
   * @description 开始加载图片的位置，单位为 px，如果设置为负数表示距离底部还有多少个像素就开始加载
   */
  threshold: {
    type: Number,
    default: 100,
  },
  /**
   * @description 是否开启过度效果
   */
  transition: {
    type: Boolean,
    default: true,
  },
})

export const lazyLoadEmits = {
  /**
   * @description 图片加载完成
   */
  loaded: () => true,
  /**
   * @description 图片加载失败
   */
  error: () => true,
}

export type LazyLoadProps = ExtractPropTypes<typeof lazyLoadProps>
export type LazyLoadEmits = typeof lazyLoadEmits
