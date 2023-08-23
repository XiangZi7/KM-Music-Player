import {
  computed,
  getCurrentInstance,
  nextTick,
  onMounted,
  ref,
  watch,
} from 'vue'
import {
  useSelectorQuery,
  useTouch,
  useUniAppSystemRectInfo,
} from '../../../../hooks'
import { debugWarn, generateId } from '../../../../utils'

import type { SetupContext } from 'vue'
import type {
  IndexListEmits,
  IndexListKeys,
  IndexListProps,
} from '../index-list'
import type {
  IndexListData,
  IndexListDataItem,
  KeyListRectInfo,
} from '../types'

export const useIndexList = (
  props: IndexListProps,
  emits: SetupContext<IndexListEmits>['emit']
) => {
  const instance = getCurrentInstance()
  if (!instance) {
    debugWarn('TnIndexList', '请在 setup 中使用 useIndexList')
  }

  const componentId = generateId()
  const componentContentClass = `tilc-${componentId}`
  const componentKeyListId = `tilkl-${componentId}`
  const { getSelectorNodeInfo, getSelectorNodeInfos } =
    useSelectorQuery(instance)

  // 索引列表数据
  const keysData = computed<string[]>(() => Object.keys(props.data))

  // 列表数据
  const listData = ref<IndexListData>([])
  watch(
    () => props.data,
    (val) => {
      // 带星标的数据
      const starData: IndexListDataItem = {
        key: '★',
        title: '★',
        data: [],
      }
      listData.value = Object.entries(val).map(([key, value]) => {
        starData.data = starData.data.concat(
          value.data.filter((item) => item?.star)
        )
        return {
          key,
          title: value.title,
          data: value.data,
        }
      })
      if (starData.data.length) {
        if (!keysData.value.includes('★')) {
          keysData.value.unshift('★')
        }
        listData.value.unshift(starData)
      }
    },
    {
      immediate: true,
    }
  )

  // 容器的高度
  const { systemScreenInfo } = useUniAppSystemRectInfo()
  const contentContainerHeight = computed<number>(
    () => props.height || systemScreenInfo.height - props.stickyOffsetTop
  )

  // 内容节点的top值
  let contentTopValues: number[] = []
  // scroll-view的top值
  const scrollViewTopValue = ref<number>(0)

  // 获取全部列表项的节点信息
  let initCount = 0
  const getContentItemNodeInfo = async () => {
    try {
      const contentNodeInfos = await getSelectorNodeInfos(
        `.${componentContentClass}`
      )

      initCount = 0
      contentTopValues = contentNodeInfos.map((item) => item.top || 0)
    } catch (err) {
      if (initCount > 10) {
        initCount = 0
        debugWarn('TnIndexList', `获取全部列表项的节点信息失败：${err}`)
        return
      }
      initCount++
      setTimeout(() => {
        getContentItemNodeInfo()
      }, 150)
    }
  }

  const {
    currentY: keyListTouchCurrentY,
    updateOptions: updateKeyListTouchOptions,
    onTouchStart: keyListTouchStartEvent,
    onTouchMove: keyListTouchMoveEvent,
    onTouchEnd: keyListTouchEndEvent,
  } = useTouch()
  // 获取索引列表的容器信息
  let keyListTop = 0
  let keyListItemRectInfo: KeyListRectInfo[] = []
  const getKeyListNodeInfo = async () => {
    try {
      const keyListNodeInfo = await getSelectorNodeInfo(
        `#${componentKeyListId}`
      )
      const keyListItemNodeInfo = await getSelectorNodeInfos(
        `#${componentKeyListId} .key-value`
      )

      initCount = 0
      keyListTop = keyListNodeInfo.top || 0
      keyListItemRectInfo = keyListItemNodeInfo.map((item) => {
        return {
          top: (item.top || 0) - keyListTop,
          height: item.height || 0,
        }
      })
      updateKeyListTouchOptions({
        left: keyListNodeInfo.left,
        right: keyListNodeInfo.right,
        top: keyListNodeInfo.top,
        bottom: keyListNodeInfo.bottom,
      })
    } catch (err) {
      if (initCount > 10) {
        initCount = 0
        debugWarn('TnIndexList', `获取索引列表的容器信息失败：${err}`)
        return
      }
      initCount++
      setTimeout(() => {
        getKeyListNodeInfo()
      }, 150)
    }
  }

  // 提示框的top值
  const keyListTipsTopValue = ref<number>(0)

  const currentTouchKeyIndex = ref<number>(-1)
  const currentTouchKeyValue = computed<string>(
    () => keysData.value[currentTouchKeyIndex.value]
  )
  // 设置当前滑动、点击索引的值
  const updateKeyListIndexValue = () => {
    // 判断当前滑动位置在哪里
    let index = -1
    // #ifndef APP-PLUS || MP-ALIPAY
    index = keyListItemRectInfo.findLastIndex(
      (item) => item.top < keyListTouchCurrentY.value
    )
    // #endif
    // #ifdef APP-PLUS || MP-ALIPAY
    index = keyListItemRectInfo.findIndex(
      (item) => item.top > keyListTouchCurrentY.value
    )
    index = index - 1
    // #endif
    if (index !== -1) {
      const keyListRectItem = keyListItemRectInfo[index]
      keyListTipsTopValue.value =
        keyListRectItem.top + keyListRectItem.height / 2

      const top = contentTopValues[index]
      scrollViewTopValue.value = top - contentTopValues[0]
      // #ifdef MP-ALIPAY
      scrollViewTopValue.value = scrollViewTopValue.value + 1
      // #endif

      currentTouchKeyIndex.value = index
    }
  }

  // 触摸事件
  const onKeyListTouchStart = (event: any) => {
    keyListTouchStartEvent(event)
  }
  const onKeyListTouchMove = (event: any) => {
    keyListTouchMoveEvent(event)
    updateKeyListIndexValue()
  }
  const onKeyListTouchEnd = (event: any) => {
    keyListTouchEndEvent(event)
    updateKeyListIndexValue()

    emits('click', currentTouchKeyValue.value as IndexListKeys)
    currentTouchKeyIndex.value = -1
  }

  onMounted(() => {
    // #ifndef APP-PLUS || MP-ALIPAY
    nextTick(() => {
      getContentItemNodeInfo()
      if (props.showKeysList) getKeyListNodeInfo()
    })
    // #endif
    // #ifdef APP-PLUS || MP-ALIPAY
    setTimeout(() => {
      getContentItemNodeInfo()
      if (props.showKeysList) getKeyListNodeInfo()
    }, 500)
    // #endif
  })

  return {
    componentContentClass,
    contentContainerHeight,
    keysData,
    listData,
    scrollViewTopValue,
    componentKeyListId,
    keyListTipsTopValue,
    currentTouchKeyIndex,
    currentTouchKeyValue,
    onKeyListTouchStart,
    onKeyListTouchMove,
    onKeyListTouchEnd,
  }
}
