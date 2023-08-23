import { computed, getCurrentInstance, nextTick, ref, watch } from 'vue'
import { debugWarn, isArray, isEmptyVariableInDefault } from '../../../../utils'
import {
  CHANGE_EVENT,
  INPUT_EVENT,
  UPDATE_MODEL_EVENT,
} from '../../../../constants'
import { useFormItem } from '../../../form'

import type { SliderMode, SliderProps, SliderValueType } from '../slider'

export const useSlider = (props: SliderProps) => {
  const { emit } = getCurrentInstance()!

  const { formItem } = useFormItem()

  // 是否搭配FormItem一起使用
  const isFormItem = computed(() => !!formItem)

  const sliderValue = ref<SliderValueType>(
    isEmptyVariableInDefault(props.modelValue, 0)
  )

  // 初始化数据
  const initSliderValue = () => {
    let val = props.modelValue
    if (isArray(val)) {
      // 判断是否为空数组
      if (val.length === 0) {
        val = [0, 0]
      } else if (val.length === 1) {
        val = [0, Math.min(val[0], props.max)]
      } else {
        val = [
          Math.max(Math.min(val[0], val[1]), props.min),
          Math.min(Math.max(val[0], val[1], props.min), props.max),
        ]
      }
    } else {
      val = Math.min(
        Math.max(isEmptyVariableInDefault(val, 0), props.min),
        props.max
      )
    }

    nextTick(() => {
      emit(UPDATE_MODEL_EVENT, val)
    })
  }
  initSliderValue()
  watch(
    () => props.modelValue,
    (val) => {
      sliderValue.value = val
    }
  )

  // 滑动条的模式，如果modelValue是数组则为范围模式
  const mode = computed<SliderMode>(() =>
    isArray(sliderValue.value) ? 'range' : 'single'
  )

  // 精确的小数点位数
  const precision = computed(() => {
    const precision = [props.min, props.max, props.step].map((item) => {
      const decimal = `${item}`.split('.')[1]
      return decimal ? decimal.length : 0
    })
    return Math.max.apply(null, precision)
  })

  // 获取处理传递过来的值
  const handleInputValue = (value: number, type?: 'min' | 'max') => {
    if (mode.value === 'single') {
      return value
    } else {
      const minValue = (sliderValue.value as number[])![0]
      const maxValue = (sliderValue.value as number[])![1]
      if (type === 'min') {
        return [
          Math.min(Math.max(props.min, value), maxValue),
          (sliderValue.value as number[])![1],
        ]
      } else {
        return [
          (sliderValue.value as number[])![0],
          Math.max(Math.min(value, props.max), minValue),
        ]
      }
    }
  }

  // 更新滑动条的值
  const updateSliderValue = (_value: number, type?: 'min' | 'max') => {
    const value = handleInputValue(_value, type)
    emit(UPDATE_MODEL_EVENT, value)

    nextTick(() => {
      emit(INPUT_EVENT, value)
    })

    if (props.validateEvent) {
      formItem?.validate('input').catch((err) => {
        debugWarn(err)
      })
    }
  }

  // 修改滑动条的值
  const changeSliderValue = (_value: number, type?: 'min' | 'max') => {
    const value = handleInputValue(_value, type)
    emit(CHANGE_EVENT, value)

    if (props.validateEvent) {
      formItem?.validate('change').catch((err) => {
        debugWarn(err)
      })
    }
  }

  return {
    isFormItem,
    sliderValue,
    mode,
    precision,
    updateSliderValue,
    changeSliderValue,
  }
}
