import { buildProps, definePropType } from '../../../utils'

import type { ExtractPropTypes } from 'vue'

export interface FooterNavigator {
  /**
   * @description 导航标题
   */
  title: string
  /**
   * @description 导航链接
   */
  url?: string
  /**
   * @description 导航连接字体颜色，以tn开头使用图鸟内置的颜色
   */
  textColor?: string
}

export type FooterNavigatorData = FooterNavigator[]

export const footerFixedMode = ['page', 'container'] as const

export const footerProps = buildProps({
  /**
   * @description 页脚内容
   */
  content: String,
  /**
   * @description 页脚导航信息
   */
  navigator: {
    type: definePropType<FooterNavigatorData>(Array),
    default: () => [],
  },
  /**
   * @description 内容字体颜色，以tn开头使用图鸟内置的颜色
   */
  textColor: String,
  /**
   * @description 页脚字体尺寸大小，内置了 `sm` 、 `lg` 、 `xl` 三种尺寸，可以传递指定的尺寸设置
   */
  size: String,
  /**
   * @description 导航信息字体颜色，以tn开头使用图鸟内置的颜色
   */
  navigatorTextColor: String,
  /**
   * @description 页脚距离底部的距离，默认单位 rpx
   */
  offsetBottom: String,
  /**
   * @description 是否固定在底部
   */
  fixed: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 固定在底部的方式，`page`  固定在页面底部，`container`  固定在容器底部
   */
  fixedMode: {
    type: String,
    values: footerFixedMode,
    default: 'container',
  },
  /**
   * @description 是否开启底部安全边距
   */
  safeAreaInsetBottom: {
    type: Boolean,
    default: true,
  },
})

export const footerEmits = {
  /**
   * @description 点击页脚内容
   */
  click: () => true,
  /**
   * @description 点击页脚导航
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  navigatorClick: (navigator: FooterNavigator) => true,
}

export type FooterProps = ExtractPropTypes<typeof footerProps>
export type FooterEmits = typeof footerEmits

export type FooterFixedMode = (typeof footerFixedMode)[number]
