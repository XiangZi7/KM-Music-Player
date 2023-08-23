import type { CountDownSeparatorMode } from '../count-down'

interface CountDownSeparatorItem {
  day: string
  hour: string
  minute: string
  second: string
}
type CountDownSeparatorData = Record<
  CountDownSeparatorMode,
  CountDownSeparatorItem
>

export const useCountDownSeparatorData = () => {
  const countDownSeparatorData: CountDownSeparatorData = {
    cn: {
      day: '天',
      hour: '时',
      minute: '分',
      second: '秒',
    },
    en: {
      day: ':',
      hour: ':',
      minute: ':',
      second: '',
    },
  }

  const getSeparatorData = (
    mode: CountDownSeparatorMode,
    key: keyof CountDownSeparatorItem
  ) => {
    return countDownSeparatorData[mode][key]
  }

  return {
    getSeparatorData,
  }
}
