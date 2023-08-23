import { computed, nextTick, ref, watch } from 'vue'
import { isEmptyVariableInDefault } from '../../../../utils'

import type { CountScrollProps } from '../count-scroll'

// 使用Array生成0-9的数组
const defaultNumberList = Array.from({ length: 10 }, (_, i) => String(i))

export const useCountScroll = (props: CountScrollProps) => {
  // 每一列的数据
  const columns = ref<string[][]>([])
  // 每一列激活的数字的索引
  const activeIndex = ref<number[]>([])

  // 分割符保留字符
  const separator = computed<string[]>(() => {
    const { decimalSeparator, thousandsSeparator } = props
    const separatorList = [
      decimalSeparator,
      isEmptyVariableInDefault(thousandsSeparator, ''),
    ]
    return separatorList.filter((item) => item)
  })

  // 生成列数据并设置激活的索引
  const _generateColumns = () => {
    const { value } = props
    const valueArr = String(value).split('')

    // 如果是分割符则不填充defaultNumber数据
    const _fillDefaultNumber = (item: string) => {
      if (separator.value.includes(item)) return [item]
      return defaultNumberList
    }
    columns.value = valueArr.map(_fillDefaultNumber)
    nextTick(() => {
      setTimeout(() => {
        activeIndex.value = valueArr.map((item) => {
          if (separator.value.includes(item)) return 0
          return Number(item)
        })
      }, 50)
    })
  }

  watch(() => props.value, _generateColumns, { immediate: true })

  return {
    columns,
    activeIndex,
  }
}
