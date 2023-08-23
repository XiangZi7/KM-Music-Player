import {
  getCurrentInstance,
  nextTick,
  onMounted,
  provide,
  reactive,
  ref,
  toRefs,
  watch,
} from 'vue'
import { subsectionContextKey } from '../../../../tokens'
import { useOrderedChildren, useSelectorQuery } from '../../../../hooks'
import {
  debugWarn,
  generateId,
  isEmptyDoubleVariableInDefault,
} from '../../../../utils'

import type { SetupContext } from 'vue'
import type { SubsectionItemContext } from '../../../../tokens'
import type { SubsectionEmits, SubsectionProps } from '../subsection'
import type { SubsectionSliderRect } from '../types'

export const useSubsection = (
  props: SubsectionProps,
  emits: SetupContext<SubsectionEmits>['emit']
) => {
  const instance = getCurrentInstance()
  if (!instance) {
    debugWarn('TnSubsection', '请在 setup 中使用 useSubsection')
  }

  const {
    children: items,
    addChild,
    removeChild: removeItem,
  } = useOrderedChildren<SubsectionItemContext>()

  const componentId = `ts-${generateId()}`
  const { getSelectorNodeInfo } = useSelectorQuery(instance)

  // 当前激活的item的uid
  const activeUid = ref<number>(0)
  // 当前选中的Index
  const currentActiveIndex = ref<number>(0)

  // 添加ChildrenItem
  const addItem = (item: SubsectionItemContext) => {
    if (props.modelValue !== undefined) {
      if (props.modelValue === items.value.length) {
        currentActiveIndex.value = props.modelValue
        activeUid.value = item.uid
        // #ifndef APP-PLUS || MP-ALIPAY
        nextTick(() => {
          updateSliderRectInfo(item)
        })
        // #endif
        // #ifdef APP-PLUS || MP-ALIPAY
        setTimeout(() => {
          updateSliderRectInfo(item)
        }, 50)
        // #endif
      }
    }
    addChild(item)
  }

  // 根据当前激活的Index更新activeUid
  const updateActiveUidWithIndex = () => {
    nextTick(() => {
      const item = items.value[currentActiveIndex.value]
      if (item) {
        activeUid.value = item.uid
        updateSliderRectInfo(item)
      }
    })
  }

  let innerUpdate = false
  watch(
    () => props.modelValue,
    (val) => {
      if (innerUpdate) {
        innerUpdate = false
        return
      }
      if (val === undefined || val > items.value.length - 1) {
        currentActiveIndex.value = 0
      } else {
        currentActiveIndex.value = val
      }
      updateActiveUidWithIndex()
    }
  )

  // 获取组件节点信息
  let componentLeft = 0
  let initCount = 0
  const getComponentRectInfo = async () => {
    try {
      const rectInfo = await getSelectorNodeInfo(`#${componentId}`)

      initCount = 0
      componentLeft = rectInfo.left || 0
    } catch (err) {
      if (initCount > 10) {
        initCount = 0
        debugWarn('TnSubsection', `获取组件节点信息失败: ${err}`)
        return
      }
      initCount++
      setTimeout(() => {
        getComponentRectInfo()
      }, 150)
    }
  }

  // 设置当前被点击的activeUID
  const setActiveItem = (uid: number) => {
    const index = items.value.findIndex((item) => item.uid === uid)
    if (index !== -1) {
      innerUpdate = true
      activeUid.value = uid
      currentActiveIndex.value = index
      updateSliderRectInfo(items.value[index])
      emits('update:modelValue', index)
      nextTick(() => {
        emits('change', index)
      })
    }
  }

  // 更新滑动样式容器信息
  const activeColor = ref<string>('')
  const sliderRectInfo = ref<SubsectionSliderRect>({
    left: 0,
    width: 0,
  })
  const updateSliderRectInfo = (item: SubsectionItemContext) => {
    if (!item) return

    sliderRectInfo.value.left = item.element.left - componentLeft
    sliderRectInfo.value.width = item.element.width
    if (props.mode === 'default') {
      sliderRectInfo.value.left -= 1
      if (props.modelValue === items.value.length - 1) {
        sliderRectInfo.value.width += 2
      }
    }
    activeColor.value = isEmptyDoubleVariableInDefault(
      item.activeColor,
      props.activeColor,
      ''
    )
  }

  onMounted(() => {
    nextTick(() => {
      getComponentRectInfo()
    })
  })

  provide(
    subsectionContextKey,
    reactive({
      ...toRefs(props),
      items,
      addItem,
      removeItem,

      activeUid,
      setActiveItem,
    })
  )

  return {
    componentId,
    activeColor,
    sliderRectInfo,
  }
}
