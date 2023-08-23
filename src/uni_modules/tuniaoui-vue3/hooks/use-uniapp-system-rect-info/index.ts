import { reactive } from 'vue'
import { debugWarn } from '../../utils'

export interface NavBarInfo {
  height: number
  statusHeight: number
}

export interface NavbarBoundingInfo {
  width: number
  height: number
  top: number
  right: number
  bottom: number
  left: number
  marginRight: number
}

export interface SystemScreenInfo {
  width: number
  height: number
  operationHeight: number
}

// 默认状态栏高度
const DEFAULT_STATUS_BAR_HEIGHT = 45
// 默认胶囊的宽度
const DEFAULT_NAVBAR_BOUNDING_WIDTH = 87
// 默认胶囊的高度
const DEFAULT_NAVBAR_BOUNDING_HEIGHT = 32
// 默认胶囊的右边距
const DEFAULT_NAVBAR_BOUNDING_RIGHT = 7
// 默认胶囊的上边距
const DEFAULT_NAVBAR_BOUNDING_TOP = 4

export const useUniAppSystemRectInfo = () => {
  // 状态栏信息
  const navBarInfo = reactive<NavBarInfo>({
    height: 0,
    statusHeight: DEFAULT_STATUS_BAR_HEIGHT,
  })

  // 状态栏胶囊信息
  const navBarBoundingInfo = reactive<NavbarBoundingInfo>({
    width: 0,
    height: 32,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    marginRight: 0,
  })

  // 系统屏幕信息
  const systemScreenInfo = reactive<SystemScreenInfo>({
    width: 0,
    height: 0,
    operationHeight: 0,
  })

  const getSystemRectInfo = () => {
    try {
      const uniSystemInfo = uni.getSystemInfoSync()
      const { statusBarHeight, windowWidth, windowHeight, titleBarHeight } =
        uniSystemInfo

      let height = 0
      // #ifndef MP
      height = (statusBarHeight || 0) + DEFAULT_STATUS_BAR_HEIGHT
      navBarBoundingInfo.width = DEFAULT_NAVBAR_BOUNDING_WIDTH
      navBarBoundingInfo.height = DEFAULT_NAVBAR_BOUNDING_HEIGHT
      navBarBoundingInfo.right = windowWidth - DEFAULT_NAVBAR_BOUNDING_RIGHT
      navBarBoundingInfo.left =
        windowWidth -
        DEFAULT_NAVBAR_BOUNDING_RIGHT -
        DEFAULT_NAVBAR_BOUNDING_WIDTH
      navBarBoundingInfo.top = DEFAULT_NAVBAR_BOUNDING_TOP
      navBarBoundingInfo.bottom =
        DEFAULT_NAVBAR_BOUNDING_TOP + DEFAULT_NAVBAR_BOUNDING_HEIGHT
      navBarBoundingInfo.marginRight = DEFAULT_NAVBAR_BOUNDING_RIGHT
      // #endif
      // #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP_TOUTIAO || MP-QQ
      const {
        width: menuButtonWidth,
        height: menuButtonHeight,
        bottom: menuButtonBottom,
        top: menuButtonTop,
        left: menuButtonLeft,
        right: menuButtonRight,
      } = uni.getMenuButtonBoundingClientRect()
      navBarBoundingInfo.width = menuButtonWidth
      navBarBoundingInfo.height = menuButtonHeight + 2
      navBarBoundingInfo.bottom = menuButtonBottom
      navBarBoundingInfo.top = menuButtonTop
      navBarBoundingInfo.left = menuButtonLeft
      navBarBoundingInfo.right = menuButtonRight
      // #ifdef MP-ALIPAY
      navBarBoundingInfo.right = menuButtonLeft + menuButtonWidth
      // #endif
      navBarBoundingInfo.marginRight = windowWidth - navBarBoundingInfo.right

      // 防止导航栏内容区域太靠近底部
      // 菜单胶囊按钮距离顶部的高度
      const menuButtonMarginTopHeight = menuButtonTop - statusBarHeight!
      height =
        menuButtonBottom +
        (menuButtonMarginTopHeight < 4 ? 4 : menuButtonMarginTopHeight)
      // #endif
      // #ifdef MP-ALIPAY
      const { optionMenuLeft } = uni.getMenuButtonBoundingClientRect()
      height = statusBarHeight! + titleBarHeight!
      if (optionMenuLeft) {
        navBarBoundingInfo.left = optionMenuLeft
      }
      // #endif

      navBarInfo.height = height
      navBarInfo.statusHeight = statusBarHeight!

      systemScreenInfo.width = windowWidth
      systemScreenInfo.height = windowHeight
      systemScreenInfo.operationHeight = windowHeight - height
    } catch (err) {
      debugWarn(
        'useUniAppSystemRectInfo',
        `[TnGetSystemRectInfo]获取系统容器信息失败: ${err}`
      )
    }
  }
  getSystemRectInfo()

  return {
    navBarInfo,
    navBarBoundingInfo,
    systemScreenInfo,
    getSystemRectInfo,
  }
}
