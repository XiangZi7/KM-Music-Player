import { nextTick, ref, toRef, watch } from 'vue'
import { useLongPress } from '../../../../hooks'
import { isEmptyVariableInDefault } from '../../../../utils'

import type { SetupContext } from 'vue'
import type { CarKeyboardLang, KeyboardEmits, KeyboardProps } from '../keyboard'

export const useKeyboard = (
  props: KeyboardProps,
  emits: SetupContext<KeyboardEmits>['emit']
) => {
  // 弹出隐藏键盘
  const showKeyboard = ref<boolean>(false)
  watch(
    () => props.show,
    (val) => {
      showKeyboard.value = val
    }
  )

  // popup弹框关闭事件
  const popupCloseEvent = () => {
    emits('close')
    emits('update:show', false)
  }

  // 用户输入的值
  const inputValue = ref<string>(props.modelValue || '')
  watch(
    () => props.modelValue,
    (val) => (inputValue.value = val)
  )

  // 键盘点击事件
  const keyboardClickEvent = (value: string, disabled: boolean) => {
    if (disabled) return
    if (props.vibrate) {
      uni.vibrateShort()
    }
    let concatValue = true
    if (value === 'confirm') {
      popupCloseEvent()
      emits('confirm')
      return
    } else if (value === 'cancel') {
      popupCloseEvent()
      return
    } else {
      // 处理小数的0位和小数点位置
      if (props.mode === 'digit') {
        // 判断当前点击的value是是否位.
        if (value === '.') {
          // 判断modelValue中是否已经存在.，如果存在，则直接return
          if (inputValue.value.includes('.')) {
            return
          }
          // 当小数点在第一位时，前面自动补0
          if (inputValue.value === '') {
            inputValue.value = '0.'
            concatValue = false
          }
        }
        // 判断当前点击的value是否为0
        if (value === '0') {
          // 判断第一位是否为0，如果是，直接return
          if (inputValue.value === '0') {
            return
          }
        }
        // 如果第一位为0，第二位不为.，则将第一位替换为当前点击的value
        if (inputValue.value === '0' && value !== '.') {
          inputValue.value = value
          concatValue = false
        }
      }
      if (
        props.mode === 'idcard' &&
        value === 'X' &&
        inputValue.value.includes('X')
      ) {
        return
      }
      if (concatValue) {
        inputValue.value += value
      }
    }

    emits('update:modelValue', inputValue.value)
    nextTick(() => {
      emits('change', inputValue.value)
    })
  }

  // 单独处理删除事件
  const backspaceEvent = () => {
    if (inputValue.value === '') {
      clearBackspaceLongPressEvent()
      return
    }
    if (props.vibrate) {
      uni.vibrateShort()
    }
    inputValue.value = inputValue.value.slice(0, -1)

    emits('backspace')
    emits('update:modelValue', inputValue.value)
    nextTick(() => {
      emits('change', inputValue.value)
    })
  }

  const {
    handleLongPressEvent: handleBackspaceEvent,
    clearLongPressTimer: clearBackspaceLongPressEvent,
  } = useLongPress(backspaceEvent, toRef(props, 'longPressDelete'))

  // 车牌键盘中英文切换
  const carKeyboardLang = ref<CarKeyboardLang>(
    isEmptyVariableInDefault(props.carLang, 'cn')
  )
  let updateCarLangInner = false
  watch(
    () => props.carLang,
    (val) => {
      if (updateCarLangInner) {
        updateCarLangInner = false
        return
      }
      carKeyboardLang.value = val
    }
  )

  const carKeyboardSwitchLang = () => {
    if (carKeyboardLang.value === 'cn') {
      carKeyboardLang.value = 'en'
    } else {
      carKeyboardLang.value = 'cn'
    }

    updateCarLangInner = true
    emits('update:carLangMode', carKeyboardLang.value)
  }

  return {
    showKeyboard,
    carKeyboardLang,
    popupCloseEvent,
    keyboardClickEvent,
    handleBackspaceEvent,
    clearBackspaceLongPressEvent,
    carKeyboardSwitchLang,
  }
}
