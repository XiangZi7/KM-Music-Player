import { computed, getCurrentInstance, nextTick, watch } from 'vue'
import { useNamespace } from '../../../../hooks'
import { generateId, isEmptyVariableInDefault } from '../../../../utils'

import type { ComponentInternalInstance } from 'vue'
import type { CircleProgressProps } from '../circle-progress'

export const useCircleProgress = (props: CircleProgressProps) => {
  const instance = getCurrentInstance() as ComponentInternalInstance

  const ns = useNamespace('circle-progress')

  // 圆环的直径
  const radius = computed<number>(() => {
    return isEmptyVariableInDefault(props?.radius, 50)
  })
  // 圆环的宽度
  const ringWidth = computed<number>(() => {
    return isEmptyVariableInDefault(props?.ringWidth, 14)
  })

  // 圆环的颜色
  const circleColor = computed<string>(() => {
    return isEmptyVariableInDefault(props?.inactiveColor, '#e6e6e6')
  })

  // 圆环激活时的颜色
  const activeCircleColor = computed<string>(() => {
    return isEmptyVariableInDefault(props?.activeColor, '#01beff')
  })

  // 动画执行时间
  const duration = computed<number>(() => {
    return isEmptyVariableInDefault(props?.duration, 1500)
  })

  // 进度信息，为了产生动画效果，需要在进度条变化时，将进度信息保存下来
  let currentPercent = 0
  let prevPercent = 0

  // 生成canvas圆环id
  const canvasId = String(generateId())

  // canvas容器对象
  let progressCanvas: UniApp.CanvasContext | null = null

  // 圆环开始角度
  const startAngle = -90 * (Math.PI / 180)

  // 绘制progress圆环
  const drawProgressCircle = (percent: number) => {
    if (!progressCanvas) {
      progressCanvas = uni.createCanvasContext(canvasId, instance)
    }
    // 清空画布
    progressCanvas.clearRect(0, 0, radius.value * 2, radius.value * 2)

    // 绘制底部圆环
    progressCanvas.beginPath()
    // 设置颜色\线框
    progressCanvas.setLineWidth(ringWidth.value)
    progressCanvas.setStrokeStyle(circleColor.value)
    // 绘制圆环
    progressCanvas.arc(
      radius.value,
      radius.value,
      radius.value - ringWidth.value / 2,
      startAngle,
      Math.PI * 1.5,
      false
    )
    progressCanvas.stroke()

    // 如果进度为0，不绘制进度圆环
    if (percent === 0) {
      progressCanvas.draw()
      return
    }
    // 绘制进度圆环
    progressCanvas.beginPath()
    // 设置颜色\线框
    progressCanvas.setLineCap('round')
    progressCanvas.setLineWidth(ringWidth.value)
    progressCanvas.setStrokeStyle(activeCircleColor.value)

    // 结束角度
    const endAngle = (Math.PI * 2 * percent) / 100 - Math.PI / 2
    progressCanvas.arc(
      radius.value,
      radius.value,
      radius.value - ringWidth.value / 2,
      startAngle,
      endAngle,
      false
    )
    progressCanvas.stroke()

    progressCanvas.draw()
  }

  // 计算缓动动画时间函数
  function easeOutCubic(t: number, b: number, c: number, d: number) {
    return c * ((t = t / d - 1) * t * t + 1) + b
  }

  // 开始执行动画
  let startTime: number | null = null
  const progressAnimation = () => {
    if (!startTime) startTime = Date.now()
    const elapsed = Date.now() - startTime
    let percent = easeOutCubic(
      elapsed,
      prevPercent,
      currentPercent - prevPercent,
      duration.value
    )
    if (percent < 0) percent = 0
    drawProgressCircle(percent)
    if (elapsed < duration.value) {
      setTimeout(progressAnimation, 16)
    }
  }

  watch(
    () => props.percent,
    (nVal: number, oVal: number | undefined) => {
      currentPercent = nVal > 100 ? 100 : nVal
      prevPercent = !oVal || oVal < 0 ? 0 : oVal

      nextTick(() => {
        startTime = null
        progressAnimation()
      })
    },
    {
      immediate: true,
    }
  )

  return {
    ns,
    canvasId,
    radius,
    activeCircleColor,
  }
}
