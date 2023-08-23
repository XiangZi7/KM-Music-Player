import { nextTick, ref, watch } from 'vue'
import regionJsonData from '../../libs/region-data.json'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../../constants'
import { cloneDeep } from '../../../../utils'

import type { SetupContext } from 'vue'
import type { RegionDataItem } from '../../libs'
import type {
  RegionPickerEmits,
  RegionPickerModelValueType,
  RegionPickerProps,
} from '../region-picker'

type RegionModelValueMode = 'code' | 'name'

export const useRegionPicker = (
  porps: RegionPickerProps,
  emits: SetupContext<RegionPickerEmits>['emit']
) => {
  // 列表数据
  const pickerSelectData = regionJsonData

  // 显示/隐藏地址选择器
  const showPicker = ref(false)
  watch(
    () => porps.open,
    (val) => {
      showPicker.value = val
    }
  )
  // picker关闭事件
  const handlePickerCloseEvent = () => {
    emits('update:open', false)
    emits('close')
  }

  // 当前选中的值
  const currentSelectValue = ref<RegionPickerModelValueType>([])
  // 标记当前传递的值的类型
  let userRegionValueMode: RegionModelValueMode = 'code'

  // 根据name获取code
  const getCodeByNames = (names: string[]): string[] => {
    const code: string[] = []
    let data: RegionDataItem[] = regionJsonData
    do {
      const name = names.shift()
      const regionItem: RegionDataItem =
        data.find((item) => item.name === name) || data[0]
      if (regionItem) {
        code.push(regionItem.code)
      }
      data = regionItem?.children || []
    } while (data.length)

    return code
  }
  // 根据code获取name
  const getNameByCodes = (codes: string[]): string[] => {
    const name: string[] = []
    let data: RegionDataItem[] = regionJsonData

    do {
      const code = codes.shift()
      const regionItem: RegionDataItem =
        data.find((item) => item.code === code) || data[0]
      if (regionItem) {
        name.push(regionItem.name)
      }
      data = regionItem?.children || []
    } while (data.length)

    return name
  }

  /**
   * 填充code
   * @example 传递的是['44', '4401'] 返回 ['44', '4401', '440113']
   */
  const fillCode = (codes: string[]): string[] => {
    const result: string[] = []
    let data: RegionDataItem[] = regionJsonData
    do {
      const code = codes.shift()
      const regionItem: RegionDataItem =
        data.find((item) => item.code === code) || data[0]
      if (regionItem) {
        result.push(regionItem.code)
      }
      data = regionItem?.children || []
    } while (data.length)

    return result
  }

  // 标记是否内部更新
  let isInnerUpdate = false
  watch(
    () => porps.modelValue,
    (val) => {
      if (isInnerUpdate) {
        isInnerUpdate = false
        return
      }

      const chineseReg = /^[\u4E00-\u9FA5]+$/ // 中文正则
      const codeReg = /^\d{2,6}$/ // 地区编码正则

      if (val.length) {
        const value = cloneDeep(val)
        if (chineseReg.test(value[0])) {
          userRegionValueMode = 'name'
          currentSelectValue.value = getCodeByNames(value)
          isInnerUpdate = true
          emits(
            UPDATE_MODEL_EVENT,
            getNameByCodes(cloneDeep(currentSelectValue.value))
          )
        } else if (codeReg.test(value[0])) {
          userRegionValueMode = 'code'
          currentSelectValue.value = fillCode(value)
          isInnerUpdate = true
          emits(UPDATE_MODEL_EVENT, currentSelectValue.value)
        }
      }
    },
    {
      immediate: true,
    }
  )

  // picker发生改变回调
  const handlePickerChangeEvent = (
    value: string | number | (string | number)[],
    index: number,
    item: any
  ) => {
    if (userRegionValueMode === 'name') {
      value = getNameByCodes(value as string[])
    }
    isInnerUpdate = true
    emits(CHANGE_EVENT, value as string[], item)
  }

  // picker确认事件
  const handlePickerConfirmEvent = (
    value: string | number | (string | number)[],
    item: any
  ) => {
    if (userRegionValueMode === 'name') {
      value = getNameByCodes(value as string[])
    }
    emits(UPDATE_MODEL_EVENT, value as string[])
    nextTick(() => {
      emits('confirm', value as string[], item)
    })
  }

  // picker取消事件
  const handlePickerCancelEvent = () => {
    emits('cancel')
  }

  return {
    pickerSelectData,
    showPicker,
    currentSelectValue,
    handlePickerCloseEvent,
    handlePickerChangeEvent,
    handlePickerConfirmEvent,
    handlePickerCancelEvent,
  }
}
