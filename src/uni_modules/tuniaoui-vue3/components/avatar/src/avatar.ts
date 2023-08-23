import { useComponentBoolean } from '../../base/composables/use-component-common-props'
import { buildProps, definePropType } from '../../../utils'
import { componentImgModes, componentTypes } from '../../../constants'

import type { ExtractPropTypes } from 'vue'
import type { BadgeProps } from '../../badge'
import type { IconProps } from '../../icon'

/**
 * @description 头像形状
 */
export const avatarShape = ['circle', 'square'] as const

/**
 * @description 图标参数配置
 */
export interface AvatarIconProps {
  /**
   * @description 图标颜色
   */
  color?: IconProps['color']
  /**
   * @description 图标大小
   */
  size?: IconProps['size']
  /**
   * @description 图标加粗
   */
  bold?: IconProps['bold']
}

/**
 * @description 徽标参数属性
 */
export type AvatarBadgeProps = Partial<
  Pick<
    BadgeProps,
    | 'max'
    | 'type'
    | 'size'
    | 'bgColor'
    | 'textColor'
    | 'fontSize'
    | 'bold'
    | 'dot'
    | 'absolute'
    | 'absolutePosition'
    | 'absoluteCenter'
  >
>

export const avatarProps = buildProps({
  /**
   * @description 头像地址(url地址和绝对地址)
   */
  url: String,
  /**
   * @descripttion 头像图标
   */
  icon: String,
  /**
   * @description 头像图标配置
   */
  iconConfig: {
    type: definePropType<AvatarIconProps>(Object),
    default: () => ({}),
  },
  /**
   * @description 头像颜色类型
   */
  type: {
    type: String,
    values: componentTypes,
    default: '',
  },
  /**
   * @description 头像大小
   */
  size: {
    type: [String, Number],
  },
  /**
   * @description 头像形状
   */
  shape: {
    type: String,
    values: avatarShape,
    default: 'circle',
  },
  /**
   * @description 头像图片模式
   */
  imgMode: {
    type: String,
    values: componentImgModes,
    default: 'aspectFill',
  },
  /**
   * @description 背景颜色
   */
  bgColor: String,
  /**
   * @description 显示边框
   */
  border: useComponentBoolean,
  /**
   * @description 边框颜色
   */
  borderColor: String,
  /**
   * @description 是否加粗边框
   */
  borderBold: useComponentBoolean,
  /**
   * @description 显示阴影
   */
  shadow: useComponentBoolean,
  /**
   * @description 阴影颜色
   */
  shadowColor: String,
  /**
   * @description 角标内容
   */
  badge: {
    type: [String, Number],
  },
  /**
   * @description 角标配置
   */
  badgeConfig: {
    type: definePropType<AvatarBadgeProps>(Object),
    default: () => ({}),
  },
})
export const avatarEmits = {
  /**
   * @description 点击事件
   */
  click: () => true,
}

export type AvatarProps = ExtractPropTypes<typeof avatarProps>
export type AvatarEmits = typeof avatarEmits
