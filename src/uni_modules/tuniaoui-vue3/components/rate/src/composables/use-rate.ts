import { getCurrentInstance, nextTick, onMounted, ref, watch } from 'vue'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../../constants'
import { useSelectorQuery, useTouch } from '../../../../hooks'
import { debugWarn, generateId } from '../../../../utils'
import { useFormItem } from '../../../form'
import useRateItemData from './use-rate-item-data'

import type { SetupContext } from 'vue'
import type { RateEmits, RateProps } from '../rate'

export const useRate = (
  props: RateProps,
  emits: SetupContext<RateEmits>['emit']
) => {
  const instance = getCurrentInstance()
  if (!instance) {
    debugWarn('TnRate', '请在setup函数中使用useRate')
  }

  // 生成唯一id
  const componentId = `tr-${generateId()}`
  const { getSelectorNodeInfo } = useSelectorQuery(instance)

  const { formItem } = useFormItem()

  const { rateItemData } = useRateItemData(props)

  const {
    currentX: rateCurrentX,
    updateOptions: updateRateTouchOptions,
    onTouchStart: rateTouchStartHandler,
    onTouchMove: rateTouchMoveHandler,
    onTouchEnd: rateTouchEndHandler,
  } = useTouch()

  // 更新选中的值
  const updateValue = (value: number) => {
    if (Number.isNaN(value)) {
      debugWarn('TnRate', 'Rate回填数据发生错误')
      value = 0
    }
    emits(UPDATE_MODEL_EVENT, value)
    nextTick(() => {
      emits(CHANGE_EVENT, value)
      if (props.validateEvent) {
        formItem?.validate('change').catch((err) => {
          debugWarn('TnRate', `Rate验证发生错误: ${err}`)
        })
      }
    })
  }

  // 容器的宽度
  let componentItemWidth = 0

  const activeItemWidth = ref<number>(0)
  watch(
    () => props.modelValue,
    (val) => {
      if (!props.allowHalf) {
        val = Math.ceil(val)
      }
      activeItemWidth.value = val * componentItemWidth
    }
  )

  let initCount = 0
  // 获取组件和item的宽度信息
  const getComponentRectInfo = async () => {
    try {
      const itemRectInfo = await getSelectorNodeInfo(
        `#${componentId} .tn-rate__item`
      )
      if (!itemRectInfo?.width) {
        throw new Error('获取组件容器宽度失败')
      }

      componentItemWidth = itemRectInfo.width || 0
      const left = itemRectInfo.left || 0

      updateRateTouchOptions({
        left,
        right: componentItemWidth * props.max + left,
        top: itemRectInfo.top,
        bottom: itemRectInfo.bottom,
      })
      let initValue = props.modelValue || 0
      // 初始化完成后，选中值为min
      if (props.modelValue && props.modelValue < props.min) {
        initValue = props.min
      }
      activeItemWidth.value = initValue * componentItemWidth
      updateValue(initValue)
    } catch (err) {
      if (initCount > 10) {
        initCount = 0
        debugWarn('TnRate', `获取组件容器信息失败: ${err}`)
        return
      }
      initCount++
      setTimeout(() => {
        getComponentRectInfo()
      }, 300)
    }
  }

  // 组件滑动事件
  const onTouchStart = (event: TouchEvent) => {
    rateTouchStartHandler(event)
  }
  const onTouchMove = (event: TouchEvent) => {
    rateTouchMoveHandler(event)
    // // #ifdef APP-PLUS
    // return
    // // #endif
    if (props.readonly) return
    activeItemWidth.value = rateCurrentX.value
  }
  const onTouchEnd = (event: TouchEvent) => {
    rateTouchEndHandler(event)
    if (props.readonly) return
    if (props.allowHalf) {
      // 滑动结束后，判断当前滑动的距离是否为item的宽度的一半
      const componentItemWidthHalf = componentItemWidth / 2
      let count = Math.ceil(rateCurrentX.value / componentItemWidthHalf)
      if (count % 2 !== 0) {
        if (
          rateCurrentX.value <
          componentItemWidthHalf * (count - 1) + componentItemWidthHalf / 2
        ) {
          count -= 1
        }
      } else {
        if (
          rateCurrentX.value <
          componentItemWidthHalf * (count - 1) + componentItemWidthHalf / 3
        ) {
          count -= 1
        }
      }
      if (
        rateCurrentX.value <
          componentItemWidthHalf * (count - 1) + componentItemWidthHalf / 2 &&
        count % 2 !== 0
      ) {
        count -= 1
      }

      // 判断是否小于最小值
      if (count < props.min * 2) {
        count = props.min * 2
      }

      activeItemWidth.value = componentItemWidthHalf * count
      updateValue(count / 2)
    } else {
      let count = Math.ceil(rateCurrentX.value / componentItemWidth)
      if (count > 1 && rateCurrentX.value < componentItemWidth * (count - 1)) {
        count -= 1
      }

      // 判断是否小于最小值
      if (count < props.min) {
        count = props.min
      }

      activeItemWidth.value = componentItemWidth * count
      updateValue(count)
    }
  }

  onMounted(() => {
    // #ifndef APP-PLUS || MP-ALIPAY
    nextTick(() => {
      getComponentRectInfo()
    })
    // #endif
    // #ifdef APP-PLUS || MP-ALIPAY
    setTimeout(() => {
      getComponentRectInfo()
    }, 500)
    // #endif
  })

  return {
    componentId,
    rateItemData,
    activeItemWidth,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  }
}
