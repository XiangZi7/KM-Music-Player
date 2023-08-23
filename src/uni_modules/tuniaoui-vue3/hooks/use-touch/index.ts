import { ref } from 'vue'

export interface TouchOptions {
  /**
   * @description 是否禁用
   */
  disabled: boolean
  /**
   * @description 容器节点的左边界坐标
   */
  left: number
  /**
   * @description 容器节点的右边界坐标
   */
  right: number
  /**
   * @description 容器节点的上边界坐标
   */
  top: number
  /**
   * @description 容器节点的下边界坐标
   */
  bottom: number
  /**
   * @description 方向判断容错值
   */
  faultTolerance: number
}

export const useTouch = () => {
  // 触摸事件配置
  const options: TouchOptions = {
    disabled: false,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    faultTolerance: 10,
  }

  // 开始坐标，减去开始坐标
  const startX = ref(0)
  const startY = ref(0)
  // 当前坐标，减去开始坐标
  const currentX = ref(0)
  const currentY = ref(0)
  // 移动偏移量
  const deltaX = ref(0)
  const deltaY = ref(0)
  // 移动距离
  const distanceX = ref(0)
  const distanceY = ref(0)
  // 移动方向
  const isVertical = ref(false)
  const isHorizontal = ref(false)
  // 是否为点击
  const isClick = ref(false)

  // 标记开始触摸
  let touchFlag: 'touch' | 'moving' | 'end'

  // 更新配置
  const updateOptions = (newOptions: Partial<TouchOptions>) => {
    Object.assign(options, newOptions)
  }

  // 开始触摸事件
  const onTouchStart = (event: TouchEvent) => {
    if (options.disabled || !event.changedTouches[0]) return
    startX.value = _edgeProcessing(event.changedTouches[0].pageX, 'x')
    startY.value = _edgeProcessing(event.changedTouches[0].pageY, 'y')
    touchFlag = 'touch'
  }

  // 开始滑动事件
  const onTouchMove = (event: TouchEvent) => {
    if (options.disabled || !event.changedTouches[0]) return
    currentX.value = _edgeProcessing(event.changedTouches[0].pageX, 'x')
    currentY.value = _edgeProcessing(event.changedTouches[0].pageY, 'y')
    updateDistanceInfo()

    touchFlag = 'moving'
  }

  // 触摸结束事件
  const onTouchEnd = (event: TouchEvent) => {
    if (options.disabled || !event.changedTouches[0] || touchFlag === 'end')
      return
    currentX.value = _edgeProcessing(event.changedTouches[0].pageX, 'x')
    currentY.value = _edgeProcessing(event.changedTouches[0].pageY, 'y')
    updateDistanceInfo()

    isVertical.value =
      distanceX.value < options.faultTolerance &&
      distanceY.value >= options.faultTolerance
    isHorizontal.value =
      distanceX.value >= options.faultTolerance &&
      distanceY.value < options.faultTolerance
    isClick.value = !isHorizontal.value && !isVertical.value

    touchFlag = 'end'
  }

  // 更新距离信息
  const updateDistanceInfo = () => {
    deltaX.value = currentX.value - startX.value
    deltaY.value = currentY.value - startY.value
    distanceX.value = Math.abs(deltaX.value)
    distanceY.value = Math.abs(deltaY.value)
  }

  // 边缘位置处理
  const _edgeProcessing = (
    touchPosition: number,
    direction: 'x' | 'y'
  ): number => {
    const { left, right, top, bottom } = options

    if (direction === 'x') {
      if (touchPosition < left) return 0
      if (touchPosition > right) return right - left
      return touchPosition - left
    } else {
      if (touchPosition < top) return 0
      if (touchPosition > bottom) return bottom - top
      return touchPosition - top
    }
  }

  return {
    startX,
    startY,
    currentX,
    currentY,
    deltaX,
    deltaY,
    distanceX,
    distanceY,
    isVertical,
    isHorizontal,
    isClick,
    updateOptions,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  }
}
