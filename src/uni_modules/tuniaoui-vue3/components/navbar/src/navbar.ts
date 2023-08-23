import { ZIndex } from '../../../constants'
import { buildProps, definePropType } from '../../../utils'

import type { ExtractPropTypes } from 'vue'

export type NavbarBeforeOperationFunc = () => Promise<boolean> | boolean

export type NavbarRectInfo = {
  statusHeight: number
  height: number
}

export const navBarProps = buildProps({
  /**
   * @description 导航栏高度，如果不传递这个值则会根据系统自动计算
   */
  height: String,
  /**
   * @description 导航栏背景色，如果需要设置毛玻璃的背景颜色，只能传递rgba的颜色值
   */
  bgColor: String,
  /**
   * @description 导航栏字体颜色
   */
  textColor: String,
  /**
   * @description 开启毛玻璃效果
   */
  frosted: Boolean,
  /**
   * @description 导航栏透明度，有效值为0~1
   */
  opacity: {
    type: Number,
    default: 1,
  },
  /**
   * @description 返回按钮图标
   */
  backIcon: {
    type: String,
    default: 'left',
  },
  /**
   * @description 返回按钮文字
   */
  backText: String,
  /**
   * @description 返回首页图标
   */
  homeIcon: {
    type: String,
    default: 'home-capsule-fill',
  },
  /**
   * @description 是否显示底部阴影
   */
  bottomShadow: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 是否预留右边胶囊安全距离
   */
  safeAreaInsetRight: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 居中显示内容
   */
  center: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 返回前回调
   */
  beforeBack: {
    type: definePropType<NavbarBeforeOperationFunc>(Function),
  },
  /**
   * @description 返回首页前回调
   */
  beforeHome: {
    type: definePropType<NavbarBeforeOperationFunc>(Function),
  },
  /**
   * @description 首页地址
   */
  indexUrl: {
    type: String,
    default: '/pages/index/index',
  },
  /**
   * @description 是否固定在顶部
   */
  fixed: Boolean,
  /**
   * @description 在固定模式下是否开启占位
   */
  placeholder: {
    type: Boolean,
    default: true,
  },
  /**
   * @description ZIndex
   */
  zIndex: {
    type: Number,
    default: ZIndex.navbar,
  },
})

export const navbarEmits = {
  /**
   * @description navbar初始化完成
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  initFinish: (info: NavbarRectInfo) => true,
}

export type NavbarProps = ExtractPropTypes<typeof navBarProps>
