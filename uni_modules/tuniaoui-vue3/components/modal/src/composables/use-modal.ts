import { ref } from 'vue'
import {
  isBoolean,
  isEmptyVariableInDefault,
  isPromise,
} from '../../../../utils'

import type { ModalOptions } from '../modal'

export const useModal = () => {
  const openModal = ref(false)

  // 弹框标题
  const title = ref<Required<ModalOptions>['title']>('')

  // 弹框内容
  const content = ref<Required<ModalOptions>['content']>('')

  // 是否显示取消按钮
  const showCancel = ref<Required<ModalOptions>['showCancel']>(false)

  // 取消按钮的文字
  const cancelText = ref<Required<ModalOptions>['cancelText']>('')

  // 取消按钮的样式
  const cancelStyle = ref<Required<ModalOptions>['cancelStyle']>({})

  // 确认按钮的文字
  const confirmText = ref<Required<ModalOptions>['confirmText']>('')

  // 确认按钮的样式
  const confirmStyle = ref<Required<ModalOptions>['confirmStyle']>({})

  // 是否显示遮罩
  const mask = ref<Required<ModalOptions>['mask']>(true)

  // 是否允许点击遮罩关闭
  const maskClosable = ref<Required<ModalOptions>['maskClosable']>(false)

  // 点击取消按钮触发的回调函数
  const cancelFunc = ref<ModalOptions['cancel']>(undefined)

  // 点击确认按钮触发的回调函数
  const confirmFunc = ref<ModalOptions['confirm']>(undefined)

  // 打开弹窗
  const showModal = (options: ModalOptions) => {
    openModal.value = true

    title.value = isEmptyVariableInDefault(options.title, '')
    content.value = options.content

    showCancel.value = isEmptyVariableInDefault(options?.showCancel, false)
    cancelText.value = isEmptyVariableInDefault(options?.cancelText, '取 消')
    cancelStyle.value = isEmptyVariableInDefault(options?.cancelStyle, {})
    confirmText.value = isEmptyVariableInDefault(options?.confirmText, '确 认')
    confirmStyle.value = isEmptyVariableInDefault(options?.confirmStyle, {})
    mask.value = isEmptyVariableInDefault(options?.mask, true)
    maskClosable.value = isEmptyVariableInDefault(options?.maskClosable, false)
    cancelFunc.value = options?.cancel
    confirmFunc.value = options?.confirm
  }

  // 关闭弹窗
  const closeModal = () => {
    openModal.value = false
  }

  // 点击取消按钮
  const clickCancel = () => {
    if (!cancelFunc.value) {
      closeModal()
      return
    }

    const func = cancelFunc.value()

    const isPromiseOrBool = [isPromise(func), isBoolean(func)].includes(true)

    if (!isPromiseOrBool) {
      // 传递的是普通函数
      closeModal()
      return
    }

    if (isPromise(func)) {
      func
        .then((res) => {
          if (res) closeModal()
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.warn(`[TnModal] some error occured: ${err}`)
        })
    } else if (func) {
      closeModal()
    }
  }

  // 点击确认按钮
  const clickConfirm = () => {
    if (!confirmFunc.value) {
      closeModal()
      return
    }

    const func = confirmFunc.value()

    const isPromiseOrBool = [isPromise(func), isBoolean(func)].includes(true)

    if (!isPromiseOrBool) {
      // 传递的是普通函数
      closeModal()
      return
    }

    if (isPromise(func)) {
      func
        .then((res) => {
          if (res) closeModal()
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.warn(`[TnModal] some error occured: ${err}`)
        })
    } else if (func) {
      closeModal()
    }
  }

  return {
    openModal,
    showModal,
    title,
    content,
    showCancel,
    cancelText,
    cancelStyle,
    confirmText,
    confirmStyle,
    mask,
    maskClosable,
    cancelFunc,
    confirmFunc,
    clickCancel,
    clickConfirm,
  }
}
