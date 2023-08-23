import { computed, getCurrentInstance } from 'vue'
import {
  debugWarn,
  isBoolean,
  isPromise,
  throwError,
  tnNavBack,
  tnNavPage,
} from '../../../../utils'

import type { NavbarProps } from '../navbar'
import type { NavbackButtonType } from '../types'

export const useNavbar = (props: NavbarProps) => {
  const { slots } = getCurrentInstance()!

  // 返回按钮类型
  const navbackButtonType = computed<NavbackButtonType>(() => {
    if (slots?.back) return 'custom'
    if (props?.backText) return 'text'
    if (!!props?.backIcon && !!props?.homeIcon) return 'multi'
    else if (!!props?.backIcon || !!props?.homeIcon) return 'single'

    return 'none'
  })

  // 点击返回按钮
  const clickBackEvent = () => {
    const { beforeBack } = props

    if (!beforeBack) {
      tnNavBack(props.indexUrl)
      return
    }

    const shouldBack = beforeBack()
    const isPromiseOrBool = [
      isPromise(shouldBack),
      isBoolean(shouldBack),
    ].includes(true)
    if (!isPromiseOrBool) {
      throwError(
        'TnNavbar',
        'beforeBack 返回值必须是 Promise 或者 Boolean 类型'
      )
    }

    if (isPromise(shouldBack)) {
      shouldBack
        .then((res) => {
          if (res) tnNavBack(props.indexUrl)
        })
        .catch((err) => {
          debugWarn('TnNavbar', `beforeBack 函数执行出错: ${err}`)
        })
    } else {
      if (shouldBack) tnNavBack(props.indexUrl)
    }
  }

  // 点击返回首页按钮
  const clickHomeEvent = () => {
    const { beforeHome } = props

    if (!beforeHome) {
      tnNavPage(props.indexUrl, 'reLaunch')
      return
    }

    const shouldBack = beforeHome()
    const isPromiseOrBool = [
      isPromise(shouldBack),
      isBoolean(shouldBack),
    ].includes(true)
    if (!isPromiseOrBool) {
      throwError(
        'TnNavbar',
        'beforeHome 返回值必须是 Promise 或者 Boolean 类型'
      )
    }

    if (isPromise(shouldBack)) {
      shouldBack
        .then((res) => {
          if (res) tnNavPage(props.indexUrl, 'reLaunch')
        })
        .catch((err) => {
          debugWarn('TnNavbar', `beforeHome 函数执行出错: ${err}`)
        })
    } else {
      if (shouldBack) tnNavPage(props.indexUrl, 'reLaunch')
    }
  }

  return {
    navbackButtonType,
    clickBackEvent,
    clickHomeEvent,
  }
}
