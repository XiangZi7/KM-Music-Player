import { componentImgModes } from '../../../constants'
import { buildProps, definePropType, isNumber } from '../../../utils'

import type { ExtractPropTypes } from 'vue'

export const photoAlbumProps = buildProps({
  /**
   * @description 图片地址列表
   */
  data: {
    type: definePropType<Array<string>>(Array),
    default: () => [],
  },
  /**
   * @description 最大允许显示图片的数量
   */
  max: {
    type: Number,
    default: 9,
  },
  /**
   * @description 一行显示的图片数量
   */
  column: {
    type: Number,
    default: 3,
  },
  /**
   * @description 图片模式
   */
  imgMode: {
    type: String,
    values: componentImgModes,
    default: 'aspectFill',
  },
  /**
   * @description 是否开启懒加载
   */
  lazyLoad: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 点击图片进行预览
   */
  preview: {
    type: Boolean,
    default: true,
  },
})

export const photoAlbumEmits = {
  /**
   * @description 点击图片时触发
   */
  click: (index: number) => isNumber(index),
}

export type PhotoAlbumProps = ExtractPropTypes<typeof photoAlbumProps>
export type PhotoAlbumEmit = typeof photoAlbumEmits
