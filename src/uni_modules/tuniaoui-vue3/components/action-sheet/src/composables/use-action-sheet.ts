import { computed, getCurrentInstance, reactive, ref } from 'vue'
import {
  debugWarn,
  isBoolean,
  isEmptyVariableInDefault,
  isPromise,
} from '../../../../utils'

import type { ActionSheetOptions } from '../action-sheet'

export const useActionSheet = () => {
  const instance = getCurrentInstance()
  if (!instance) {
    debugWarn('TnActionSheet', '请在 setup 中使用 useActionSheet')
  }

  const { slots } = instance!

  // 默认配置项
  const defaultOptions: ActionSheetOptions = {
    actions: [],
    title: '',
    cancelText: '取 消',
    mask: true,
    cancel: undefined,
    select: undefined,
  }
  // 配置项
  const options = reactive<ActionSheetOptions>({
    actions: [],
    title: '',
    cancelText: '取 消',
    mask: true,
    cancel: undefined,
    select: undefined,
  })

  // 操作菜单数据
  const data = computed(() => options.actions)
  // 是否显示标题
  const showTitle = computed(() => !!slots?.title || !!options.title)
  const title = computed(() => options.title)
  // 是否显示取消按钮
  const showCancel = computed(() => !!slots?.cancel || !!options.cancelText)
  const cancelText = computed(() => options.cancelText)
  // 是否显示遮罩
  const overlay = computed(() => isEmptyVariableInDefault(options.mask, true))

  // 弹出popup弹框
  const openPopup = ref<boolean>(false)

  // popup弹框关闭事件
  const popupCloseEvent = () => {
    if (!options.cancel) {
      openPopup.value = false
      return
    }

    const shouldCancel = options.cancel()
    const isPromiseOrBoolean = [
      isPromise(shouldCancel),
      isBoolean(shouldCancel),
    ].includes(true)
    if (!isPromiseOrBoolean) {
      debugWarn(
        'TnActionSheet',
        'cancel 函数返回值必须是 Promise 或者 Boolean 类型'
      )
      return
    }

    if (isPromise(shouldCancel)) {
      shouldCancel.then((res) => {
        if (res) {
          openPopup.value = false
        }
      })
    } else {
      if (shouldCancel) {
        openPopup.value = false
      }
    }
  }

  // 选项点击事件
  const actionClickEvent = (index: number) => {
    if (!options.select) {
      openPopup.value = false
      return
    }

    const shouldSelect = options.select(index, options.actions[index].value!)
    const isPromiseOrBoolean = [
      isPromise(shouldSelect),
      isBoolean(shouldSelect),
    ].includes(true)
    if (!isPromiseOrBoolean) {
      debugWarn(
        'TnActionSheet',
        'select 函数返回值必须是 Promise 或者 Boolean 类型'
      )
      return
    }

    if (isPromise(shouldSelect)) {
      shouldSelect.then((res) => {
        if (res) {
          openPopup.value = false
        }
      })
    } else {
      if (shouldSelect) {
        openPopup.value = false
      }
    }
  }

  const showActionSheet = (_options: ActionSheetOptions) => {
    Object.assign(options, defaultOptions, _options)
    openPopup.value = true
  }

  return {
    data,
    showTitle,
    title,
    showCancel,
    cancelText,
    overlay,
    openPopup,
    showActionSheet,
    popupCloseEvent,
    actionClickEvent,
  }
}
