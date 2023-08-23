import { ref } from 'vue'
import { formatNumber } from '../../../../utils'

import type { SetupContext } from 'vue'
import type { CountDownEmits, CountDownProps } from '../count-down'

const SECOND = 1
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

export const useCountDown = (
  props: CountDownProps,
  emits: SetupContext<CountDownEmits>['emit']
) => {
  // 当前倒计时时间
  let time = props.time || 0

  // 时间定义
  const day = ref<string>('')
  const hour = ref<string>('')
  const minute = ref<string>('')
  const second = ref<string>('')

  // 将时间戳转换为对应的时间
  const splitCountDownData = () => {
    const { showDay, showHour, showMinute, showSecond, autoHideDay } = props

    const _day = Math.floor(time / DAY)

    // 如果不显示天数则将天的时间加到小时上，后面的分钟和秒如此累加
    const _hour = showDay
      ? Math.floor((time % DAY) / HOUR)
      : Math.floor(time / HOUR)
    const _minute = Math.floor((time % HOUR) / MINUTE)
    const _second = Math.floor(time % MINUTE)

    // 判断是否自动隐藏天数
    if (!showDay || (autoHideDay && _day === 0)) day.value = ''
    else day.value = formatNumber(_day, 4)

    hour.value = showHour ? formatNumber(_hour, 4) : ''
    minute.value = showMinute ? formatNumber(_minute) : ''
    second.value = showSecond ? formatNumber(_second) : ''
  }
  splitCountDownData()

  // 倒计时定时器
  let countDownTimer: ReturnType<typeof setInterval> | null = null
  // 开始倒计时
  const startCountDown = () => {
    // 如果倒计时时间为0，重新设置倒计时时间
    if (time <= 0) time = props.time
    else {
      // 先渲染一次
      time--
    }
    // 先停止之前的倒计时
    stopCountDown()
    emits('start')
    // 开始倒计时
    countDownTimer = setInterval(() => {
      if (time < 0) {
        stopCountDown()
        emits('end')
        return
      }

      splitCountDownData()
      time--
    }, 1000)
  }
  // 停止倒计时
  const stopCountDown = () => {
    if (countDownTimer) {
      clearInterval(countDownTimer)
      countDownTimer = null
    }
  }
  // 重置定时器
  const resetCountDown = () => {
    stopCountDown()
    time = props.time
    splitCountDownData()
  }

  // 自动开始倒计时
  if (props.autoStart && props.time > 0) {
    startCountDown()
  }

  return {
    day,
    hour,
    minute,
    second,
    startCountDown,
    stopCountDown,
    resetCountDown,
  }
}
