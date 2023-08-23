import { reactive, watch } from 'vue'
import { debugWarn, generateId } from '../../../../utils'
import { useSelectorQuery, useTouch } from '../../../../hooks'
import { useSliderCommonProps } from './use-slider-common-porps'
import { useSlider } from './use-slider'

import type { SliderProps } from '../slider'

export interface SliderNode {
  left: number
  top: number
  right: number
  bottom: number
  width: number
  height: number
}

export const useSliderNodeInfo = (props: SliderProps) => {
  const sliderId = `slider-${generateId()}`

  const { getSelectorNodeInfo } = useSelectorQuery()

  const { disabled } = useSliderCommonProps(props)

  const { mode, sliderValue, precision, updateSliderValue, changeSliderValue } =
    useSlider(props)

  const sliderNodeInfo = reactive<SliderNode>({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    width: 0,
    height: 0,
  })

  const {
    currentX: sliderBarCurrentX,
    updateOptions: sliderTouchUpdateOptions,
    onTouchStart: sliderTouchStart,
    onTouchMove: sliderTouchMove,
    onTouchEnd: sliderTouchEnd,
  } = useTouch()

  // 更新禁用状态
  watch(
    () => disabled,
    (val) => {
      sliderTouchUpdateOptions({
        disabled: val.value,
      })
    }
  )

  // 初始化滑动条的布局信息
  // 初始化次数
  let initCount = 0
  const initSliderNodeInfo = async () => {
    try {
      const sliderRectInfo = await getSelectorNodeInfo(`#${sliderId}`)
      if (!sliderRectInfo) {
        throw new Error('获取滑动条的布局信息失败')
      }
      initCount = 0
      sliderNodeInfo.left = sliderRectInfo.left || 0
      sliderNodeInfo.top = sliderRectInfo.top || 0
      sliderNodeInfo.right = sliderRectInfo.right || 0
      sliderNodeInfo.bottom = sliderRectInfo.bottom || 0
      sliderNodeInfo.width = sliderRectInfo.width || 0
      sliderNodeInfo.height = sliderRectInfo.height || 0

      // 初始化触摸的参数
      sliderTouchUpdateOptions({
        left: sliderNodeInfo.left,
        right: sliderNodeInfo.right,
        top: sliderNodeInfo.top,
        bottom: sliderNodeInfo.bottom,
      })
    } catch (err) {
      initCount++
      if (initCount > 10) {
        initCount = 0
        debugWarn('TnSilider', `获取滑动条的布局信息失败: ${err}`)
        return
      }
      setTimeout(() => {
        initSliderNodeInfo()
      }, 150)
    }
  }

  // 滑块滑动中
  const onSliderBarTouchMove = (event: TouchEvent, type: 'min' | 'max') => {
    sliderTouchMove(event)
    // 滑块的位置
    const sliderBarPosition =
      (sliderBarCurrentX.value / sliderNodeInfo.width) * 100
    const value = setPosiiton(sliderBarPosition)
    updateSliderValue(value, type)
  }

  // 滑块滑动结束
  const onSliderBarTouchEnd = (event: TouchEvent, type: 'min' | 'max') => {
    sliderTouchEnd(event)
    // 滑块的位置
    const sliderBarPosition =
      (sliderBarCurrentX.value / sliderNodeInfo.width) * 100
    const value = setPosiiton(sliderBarPosition)
    changeSliderValue(value, type)
  }

  // 滑动条点击事件
  const sliderClickEvent = (event: any) => {
    if (disabled.value) return
    let touchX = 0
    // #ifndef MP-ALIPAY
    touchX = event.detail.x
    // #endif
    // #ifdef MP-ALIPAY
    touchX = event.detail.clientX
    // #endif
    const sliderBarPosition =
      ((touchX - sliderNodeInfo.left) / sliderNodeInfo.width) * 100
    const value = setPosiiton(sliderBarPosition)
    if (mode.value === 'single') {
      updateSliderValue(value)
      changeSliderValue(value)
    } else if (mode.value === 'range') {
      // 判断当前点击位置靠近那个值
      const minValue = (sliderValue.value as number[])[0]
      const maxValue = (sliderValue.value as number[])[1]
      const minDistance = Math.abs(minValue - value)
      const maxDistance = Math.abs(maxValue - value)
      if (minDistance < maxDistance) {
        updateSliderValue(value, 'min')
        changeSliderValue(value, 'min')
      } else {
        updateSliderValue(value, 'max')
        changeSliderValue(value, 'max')
      }
    }
  }

  // 设置滑块的位置
  const setPosiiton = (position: number): number => {
    if (position === null || Number.isNaN(+position)) return 0
    if (position < 0) position = 0
    else if (position > 100) position = 100

    // 每一步的长度
    const lengthPerStep = 100 / ((props.max - props.min) / props.step)
    // 当前在第几步
    const steps = Math.round(position / lengthPerStep)
    // 计算当前的值
    let value =
      steps * lengthPerStep * (props.max - props.min) * 0.01 + props.min
    value = Number.parseFloat(value.toFixed(precision.value))

    return value
  }

  return {
    sliderId,
    initSliderNodeInfo,
    onSliderBarTouchStart: sliderTouchStart,
    onSliderBarTouchMove,
    onSliderBarTouchEnd,
    sliderClickEvent,
  }
}
