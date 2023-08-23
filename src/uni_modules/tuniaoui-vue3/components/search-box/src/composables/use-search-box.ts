import { nextTick, ref, watch } from 'vue'
import { debounce, throttle } from '../../../../libs/lodash'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../../constants'

import type { SetupContext } from 'vue'
import type { SearchBoxEmits, SearchBoxProps } from '../search-box'

export const useSearchBox = (
  props: SearchBoxProps,
  emits: SetupContext<SearchBoxEmits>['emit']
) => {
  // 是否显示placeholder
  const showPlaceholder = ref<boolean>(!props.modelValue)

  // 输入框的值
  const inputValue = ref<string>(props.modelValue)
  watch(
    () => props.modelValue,
    (val) => {
      if (props.modelValue === inputValue.value) return
      inputValue.value = val
      showPlaceholder.value = !val
    }
  )
  // 输入框聚焦
  const inputFocus = ref<boolean>(false)
  if (props.focus) {
    showPlaceholder.value = false
    nextTick(() => {
      inputFocus.value = true
    })
  }

  // searchBox点击事件
  const searchBoxClickEvent = () => {
    emits('click')
    if (props.disabled) return
    showPlaceholder.value = false
    inputFocus.value = true
  }

  // 输入框获取焦点事件
  const inputFocusEvent = () => {
    emits('focus')
  }

  // 输入框失去焦点事件
  const inputBlurEvent = () => {
    showPlaceholder.value = !inputValue.value
    inputFocus.value = false
    emits('blur')
  }

  // 输入框输入事件
  const inputHandle = () => {
    emits(UPDATE_MODEL_EVENT, inputValue.value)

    nextTick(() => {
      emits(CHANGE_EVENT, inputValue.value)
      emits('input', inputValue.value)
    })
  }
  const inputValueEvent = props.throllte
    ? throttle(inputHandle, props.throllteTime)
    : inputHandle

  // 清除按钮点击事件
  const clearClickEvent = () => {
    inputValue.value = ''
    emits(UPDATE_MODEL_EVENT, '')

    nextTick(() => {
      inputFocus.value = true
      emits(CHANGE_EVENT, '')
      emits('clear')
    })
  }

  // 点击search按钮事件
  const searchBtnClickEvent = debounce(() => {
    if (props.disabled) return
    emits('search', inputValue.value)
  }, 250)

  return {
    showPlaceholder,
    inputValue,
    inputFocus,
    searchBoxClickEvent,
    inputFocusEvent,
    inputBlurEvent,
    inputValueEvent,
    clearClickEvent,
    searchBtnClickEvent,
  }
}
