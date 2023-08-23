import { computed, getCurrentInstance, nextTick, ref, watch } from 'vue'
import { UPDATE_MODEL_EVENT } from '../../../../constants'

import type { PopupProps } from '../popup'

export const usePopup = (props: PopupProps) => {
  const { emit } = getCurrentInstance()!

  // 是否显示遮罩层
  const showOverlay = ref(false)
  // 是否显示弹框
  const showPopup = ref(false)
  const visiblePopup = ref(false)
  watch(
    () => props.modelValue,
    (value) => {
      if (value) {
        visiblePopup.value = true
        showPopup.value = true
        if (props.overlay) showOverlay.value = true
      } else {
        showPopup.value = false
        showOverlay.value = false
        setTimeout(() => {
          visiblePopup.value = false
        }, 250)
      }
    }
  )

  // 当前模态框的zIndex
  const zIndex = computed(() => Number(props.zIndex))

  // 遮罩层的zIndex
  const overlayZIndex = computed(() => zIndex.value - 1)

  // 更新模态框的状态
  const updateModelValue = (value: boolean) => {
    emit(UPDATE_MODEL_EVENT, value)

    nextTick(() => {
      emit(value ? 'open' : 'close')
    })
  }

  // 点击关闭按钮
  const onClickCloseBtn = () => {
    updateModelValue(false)
  }

  // 点击遮罩层关闭模态框
  const onClickOverlay = () => {
    if (props.overlayCloseable) updateModelValue(false)
  }

  return {
    showOverlay,
    showPopup,
    visiblePopup,
    zIndex,
    overlayZIndex,
    updateModelValue,
    onClickCloseBtn,
    onClickOverlay,
  }
}
