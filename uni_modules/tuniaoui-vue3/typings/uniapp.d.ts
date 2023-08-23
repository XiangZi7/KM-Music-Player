import '@dcloudio/types'

declare global {
  namespace UniNamespace {
    export interface GetMenuButtonBoundingClientRectRes {
      /**
       * 小程序胶囊菜单按钮的宽度
       */
      width: number
      /**
       * 小程序胶囊菜单按钮的高度
       */
      height: number
      /**
       * 小程序胶囊菜单按钮的上边界坐标
       */
      top: number
      /**
       * 小程序胶囊菜单按钮的右边界坐标
       */
      right: number
      /**
       * 小程序胶囊菜单按钮的下边界坐标
       */
      bottom: number
      /**
       * 小程序胶囊菜单按钮的左边界坐标
       */
      left: number
      /**
       * 自定义按钮左边界坐标，单位 px，以屏幕左上角为原点
       */
      optionMenuLeft: number
    }
  }
}

export {}
