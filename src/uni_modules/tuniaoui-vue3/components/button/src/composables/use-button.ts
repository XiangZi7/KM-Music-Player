import { debounce } from '../../../../libs/lodash'

import type { SetupContext } from 'vue'
import type { ButtonEmits, ButtonProps } from '../button'

export const useButton = (
  props: ButtonProps,
  emits: SetupContext<ButtonEmits>['emit']
) => {
  // 按钮点击事件
  const buttonClickHandle = () => {
    if (props.disabled || props.loading) return
    emits('click')
  }
  const buttonClick = props.debounce
    ? debounce(buttonClickHandle, 250)
    : buttonClickHandle
  // 获取手机号码回调
  const getPhoneNumber = (e: any) => {
    emits('getphonenumber', e)
  }
  // 打开设置面板
  const openSetting = (e: any) => {
    emits('opensetting', e)
  }
  // 打开App成功回调
  const launchApp = (e: any) => {
    emits('launchapp', e)
  }
  // 当使用开放能力时，发生错误的回调
  const openTypeError = (e: any) => {
    emits('error', e)
  }

  return {
    buttonClick,
    getPhoneNumber,
    openSetting,
    launchApp,
    openTypeError,
  }
}
