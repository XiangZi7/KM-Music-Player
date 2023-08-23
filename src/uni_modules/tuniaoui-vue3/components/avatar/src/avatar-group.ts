import { buildProps } from '../../../utils'
import { avatarProps } from './avatar'

import type { ExtractPropTypes } from 'vue'

export const avatarGroupProps = buildProps({
  /**
   * @description 头像图标配置
   */
  iconConfig: avatarProps.iconConfig,
  /**
   * @description 头像颜色类型
   */
  type: avatarProps.type,
  /**
   * @description 头像大小
   */
  size: avatarProps.size,
  /**
   * @description 头像形状
   */
  shape: avatarProps.shape,
  /**
   * @description 头像图片模式
   */
  imgMode: avatarProps.imgMode,
  /**
   * @description 背景颜色
   */
  bgColor: avatarProps.bgColor,
  /**
   * @description 显示边框
   */
  border: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 边框颜色
   */
  borderColor: {
    type: String,
    default: 'tn-white',
  },
  /**
   * @description 是否加粗边框
   */
  borderBold: avatarProps.borderBold,
  /**
   * @description 显示阴影
   */
  shadow: avatarProps.shadow,
  /**
   * @description 阴影颜色
   */
  shadowColor: avatarProps.shadowColor,
  /**
   * @description 头像角标配置
   */
  badgeConfig: avatarProps.badgeConfig,
  /**
   * @description 头像之间遮挡比例
   */
  gap: {
    type: [String, Number],
    default: 0.4,
  },
})
export const avatarGroupEmits = {
  /**
   * @description 点击头像
   */
  click: (index: number) => typeof index === 'number',
}

export type AvatarGroupProps = ExtractPropTypes<typeof avatarGroupProps>
export type AvatarGroupEmits = typeof avatarGroupEmits
