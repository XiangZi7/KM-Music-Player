import {
  computed,
  getCurrentInstance,
  inject,
  nextTick,
  onMounted,
  ref,
  watch,
} from 'vue'
import { noticeBarKey } from '../../../../tokens'
import { useSelectorQuery } from '../../../../hooks'
import {
  debugWarn,
  generateId,
  isEmptyVariableInDefault,
} from '../../../../utils'

export const useRowNoticeBar = () => {
  const instance = getCurrentInstance()
  const noticeBar = inject(noticeBarKey, null)

  const { getSelectorNodeInfo } = useSelectorQuery(instance)

  const componentId = `trnb-${generateId()}`
  const componentTextId = `${componentId}-text`

  // 需要显示的数据
  const data = computed<string>(() => {
    if (!noticeBar?.data?.length) return ''
    return noticeBar.data.join(' ')
  })

  // 每秒显示的像素数
  const speed = computed<number>(() =>
    isEmptyVariableInDefault(noticeBar?.speed, 80)
  )

  // 动画参数
  let animationDuration = 0
  let animation: UniApp.Animation | null = null
  const animationData = ref<any>(null)
  let animationLoopTimer: ReturnType<typeof setInterval> | null = null

  // 创建动画
  const createAnimation = () => {
    animation = uni.createAnimation({
      duration: animationDuration,
      timingFunction: 'linear',
    })

    animation
      .translateX(
        -(contentWidth + contentTextWidth) + Number(Math.random() * 10)
      )
      .step({
        duration: animationDuration,
      })
    animation.translateX(0).step({
      duration: 0,
    })

    animationData.value = animation.export()
  }
  // 创建循环动画
  const createLoopAnimation = () => {
    createAnimation()
    animationLoopTimer = setInterval(() => {
      createAnimation()
    }, animationDuration + 80)
  }
  // 停止动画
  const stopAnimation = () => {
    animation = null
    animationData.value = null
    if (animationLoopTimer) {
      clearInterval(animationLoopTimer)
      animationLoopTimer = null
    }
  }

  watch(
    () => noticeBar?.play,
    (newVal) => {
      if (newVal) {
        createLoopAnimation()
      } else {
        stopAnimation()
      }
    }
  )

  let initCount = 0
  // 获取内容区域容器信息
  let contentWidth = 0
  let contentTextWidth = 0
  const getContentRectInfo = async () => {
    try {
      const contentRectInfo = await getSelectorNodeInfo(`#${componentId}`)
      const contentTextRectInfo = await getSelectorNodeInfo(
        `#${componentTextId}`
      )

      initCount = 0

      // 根据 t=s/v(时间=路程/速度)
      contentWidth = contentRectInfo.width || 0
      contentTextWidth = contentTextRectInfo.width || 0
      animationDuration =
        ((contentWidth + contentTextWidth) / speed.value) * 1000

      if (noticeBar?.play && noticeBar?.autoPlay) {
        setTimeout(() => {
          createLoopAnimation()
        }, 50)
      }
    } catch (err) {
      if (initCount > 10) {
        initCount = 0
        debugWarn('TnNoticeBar', `获取通知栏容器信息失败: ${err}`)
        return
      }
      initCount++
      setTimeout(() => {
        getContentRectInfo()
      }, 150)
    }
  }

  // 如果修改了speed重新初始化
  watch(
    () => noticeBar?.speed,
    () => {
      stopAnimation()
      getContentRectInfo()
    }
  )

  // 通知点击事件
  const noticeClickEvent = () => {
    noticeBar?.click(0)
  }

  onMounted(() => {
    nextTick(() => {
      getContentRectInfo()
    })
  })

  return {
    componentId,
    componentTextId,
    data,
    animationData,
    noticeClickEvent,
  }
}
