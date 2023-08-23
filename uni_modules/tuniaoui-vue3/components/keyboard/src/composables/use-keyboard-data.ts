import { computed } from 'vue'
import {
  carKeyboardCnData,
  carKeyboardEnData,
  carKeyboardSpecialData,
} from '../../libs'

import type { Ref } from 'vue'
import type { CarKeyboardLang, KeyboardProps } from '../keyboard'

type KeyboardDataItem = {
  value: string
  disabled: boolean
}
type KeyboardData = Array<KeyboardDataItem>

export const useKeyboardData = (
  props: KeyboardProps,
  carLang: Ref<CarKeyboardLang>
) => {
  // 生成普通键盘数据
  const generateNormalKeyboardData = (
    digit = false,
    idcard = false,
    random = false
  ): KeyboardData => {
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    if (digit) numbers.push('.')
    if (idcard) numbers.push('X')
    if (random) numbers.sort(() => Math.random() - 0.5)

    return numbers.map((item) => {
      return {
        value: item,
        disabled: props.disabled,
      }
    })
  }

  const keyboardData = computed<KeyboardData>(() => {
    let data: KeyboardData = []
    switch (props.mode) {
      case 'number':
        data = generateNormalKeyboardData()
        break
      case 'digit':
        data = generateNormalKeyboardData(true)
        break
      case 'idcard':
        data = generateNormalKeyboardData(false, true)
        break
      case 'random':
        data = generateNormalKeyboardData(false, false, true && props.show)
        break
    }
    return data
  })

  // 车牌键盘数据
  const carKeyboardData = computed<KeyboardData[]>(() => {
    const data: KeyboardData[] = []

    const _fillCarKeyboardData = (rawData: string[]): KeyboardData => {
      return rawData.map((item) => {
        return {
          value: item,
          disabled: carKeyboardSpecialData.includes(item) || props.disabled,
        }
      })
    }

    if (props.mode === 'car') {
      if (carLang.value === 'cn') {
        const fillCnData = _fillCarKeyboardData(carKeyboardCnData)
        data.push(
          fillCnData.slice(0, 10),
          fillCnData.slice(10, 20),
          fillCnData.slice(20, 30),
          fillCnData.slice(30, 37)
        )
      } else {
        const fillEnData = _fillCarKeyboardData(carKeyboardEnData)
        data.push(
          fillEnData.slice(0, 10),
          fillEnData.slice(10, 20),
          fillEnData.slice(20, 29),
          fillEnData.slice(29, 36)
        )
      }
    }

    return data
  })

  return {
    keyboardData,
    carKeyboardData,
  }
}
