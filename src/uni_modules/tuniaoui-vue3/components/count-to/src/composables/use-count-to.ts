import { computed, ref, watch } from 'vue'
import { isEmptyVariableInDefault } from '../../../../utils'

import type { SetupContext } from 'vue'
import type { CountToEmits, CountToProps } from '../count-to'

export const useCountTo = (
  props: CountToProps,
  emits: SetupContext<CountToEmits>['emit']
) => {
  // 开始值
  const startValue = computed<number>(() =>
    Number(isEmptyVariableInDefault(props.start, 0))
  )
  // 结束值
  const endValue = computed<number>(() =>
    Number(isEmptyVariableInDefault(props.end, 0))
  )
  // 判断是往下计数还是往上计数
  const countDown = computed<boolean>(() => startValue.value > endValue.value)

  // 动画执行时间
  const duration = computed<number>(() =>
    isEmptyVariableInDefault(props.duration, 1500)
  )

  // 待显示的内容
  const content = ref<string>('')

  // 格式化需要显示的内容
  const _formatContent = (value: number) => {
    const throusandNumberReg = /(\d+)(\d{3})/
    const valueStr = value.toFixed(props.decimals)
    const valueArr = valueStr.split('.')
    let firestValue = valueArr[0]
    let secondValue = ''
    if (valueArr.length > 1) {
      secondValue = `${isEmptyVariableInDefault(props.decimalSeparator, '.')}${
        valueArr[1]
      }`
    }
    if (props?.thousandsSeparator) {
      while (throusandNumberReg.test(firestValue)) {
        firestValue = firestValue.replace(
          throusandNumberReg,
          `$1${props.thousandsSeparator}$2`
        )
      }
    }

    return `${firestValue}${secondValue}`
  }

  // 计算缓动动画时间函数
  function _easeOutCubic(t: number, b: number, c: number, d: number) {
    return (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b
  }

  /* 数值动画操作 start */
  // 动画执行开始时间
  let startTime: number | null = null
  // 开始执行动画
  const countToAnimation = () => {
    if (!startTime) startTime = Date.now()
    const elapsed = Date.now() - startTime
    let currentValue = 0
    if (countDown.value) {
      currentValue =
        startValue.value -
        _easeOutCubic(
          elapsed,
          0,
          startValue.value - endValue.value,
          duration.value
        )
      currentValue =
        currentValue < endValue.value ? endValue.value : currentValue
    } else {
      currentValue = _easeOutCubic(
        elapsed,
        startValue.value,
        endValue.value - startValue.value,
        duration.value
      )
      currentValue =
        currentValue > endValue.value ? endValue.value : currentValue
    }
    content.value = _formatContent(currentValue)
    if (elapsed < duration.value) {
      // 使用settimeout来模拟requestAnimationFrame
      setTimeout(countToAnimation, 16)
    } else {
      // 动画执行结束
      emits('end')
    }
  }
  /* 数值动画操作 end */

  // 监听endValue和startValue的变化
  watch(
    [endValue, startValue],
    () => {
      startTime = null
      countToAnimation()
    },
    {
      immediate: true,
    }
  )

  return {
    content,
  }
}
