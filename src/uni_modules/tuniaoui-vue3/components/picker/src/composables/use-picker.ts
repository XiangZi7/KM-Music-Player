import { getCurrentInstance, nextTick, ref, watch } from 'vue'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../../constants'
import {
  cloneDeep,
  isArray,
  isEmptyVariableInDefault,
  isObject,
  throwError,
} from '../../../../utils'

import type {
  PickerDataType,
  PickerMode,
  PickerProps,
  PickerValueType,
} from '../picker'

type PickerData = Array<Array<PickerDataItem>>
interface PickerDataItem {
  label: string | number
  value: string | number
  originalData: any
  children?: Array<PickerDataItem>
}

export const usePicker = (props: PickerProps) => {
  const { emit } = getCurrentInstance()!

  // 显示popup弹框
  const openPopup = ref(false)
  const showPicker = ref(true)
  // #ifdef MP-ALIPAY
  showPicker.value = false
  // #endif
  watch(
    () => props.open,
    (value) => {
      openPopup.value = value
      // #ifdef MP-ALIPAY
      if (value) {
        setTimeout(() => {
          nextTick(() => {
            showPicker.value = value
          })
        }, 350)
      }
      // #endif
    }
  )
  // 关闭popup弹框
  const closePopupEvent = () => {
    // #ifdef MP-ALIPAY
    showPicker.value = false
    // #endif
    emit('close')
    emit('update:open', false)
  }

  // picker选择器类型
  let pickerMode: PickerMode = 'signle'

  // 生成指定格式的数据
  const _generateData = (
    data: PickerDataType
  ): Pick<PickerDataItem, 'label' | 'value' | 'originalData'> => {
    if (isObject(data)) {
      return {
        label: data[props.labelKey],
        value: data[props.valueKey],
        originalData: {
          [props.labelKey]: data[props.labelKey],
          [props.valueKey]: data[props.valueKey],
        },
      }
    } else {
      return {
        label: data as string | number,
        value: data as string | number,
        originalData: data,
      }
    }
  }

  // 更新/生成级联选择器的数据
  const _generateOrUpdateCascadeData = (
    data: any[],
    generateIndex = 1,
    defaultValue: Array<string | number> = []
  ) => {
    // 判断生成的的级联数据是否已经有数据，如果有数据则更新，否则生成
    if (pickerData.value.length < generateIndex) {
      pickerData.value.push(
        ...Array.from(
          { length: generateIndex - pickerData.value.length },
          () => []
        )
      )
    }

    pickerData.value[generateIndex - 1] = [
      ...data.map((item) => _generateData(item)),
    ]
    // 判断从第几个子级开始生成级联数据
    let childrenIndex = 0
    if (defaultValue.length) {
      childrenIndex = pickerData.value[generateIndex - 1].findIndex(
        (item) => item.value === defaultValue[generateIndex - 1]
      )
      childrenIndex = ~childrenIndex ? childrenIndex : 0
    }
    if (
      data[childrenIndex] &&
      Object.prototype.hasOwnProperty.call(
        data[childrenIndex],
        props.childrenKey
      )
    ) {
      _generateOrUpdateCascadeData(
        data[childrenIndex][props.childrenKey] as PickerDataItem[],
        generateIndex + 1,
        defaultValue
      )
    }
  }

  // picker选择器的数据
  const pickerData = ref<PickerData>([])
  // 当前选中picker-view的索引
  const currentPickerIndex = ref<Array<number>>([])
  // 初始化选中的默认Index
  const initDefaultPickerIndex = () => {
    let indexValue: number[] = []
    // 如果没有设置默认值，则默认选中第一项
    if (
      !props.modelValue ||
      (isArray(props.modelValue) && !props.modelValue.length)
    ) {
      indexValue = Array.from({ length: pickerData.value.length }, () => 0)
    } else {
      if (isArray(props.modelValue)) {
        indexValue = pickerData.value.map((item, index) => {
          let pickerIndex = 0
          if (!(props.modelValue as (string | number)[])[index]) pickerIndex = 0
          else {
            pickerIndex = item.findIndex((childItem) => {
              return (
                childItem.value ===
                (props.modelValue as (string | number)[])[index]
              )
            })
          }
          return ~pickerIndex ? pickerIndex : 0
        })
      } else {
        indexValue = [
          pickerData.value[0].findIndex(
            (item) => item.value === props.modelValue
          ),
        ]
      }
    }
    currentPickerIndex.value = indexValue
  }
  // 处理用户传递的数据
  const splitUserPickerData = () => {
    const { data } = props
    if (!data) return
    // 判断用户是否有传递数据，并且数据格式是否正确
    if (!isArray(data)) {
      throwError('TnPicker', 'picker选择器数据不正确，请传递数组格式的数据')
    }

    if (data.length === 0) return

    // 根据用户传递的数据来判断是什么类型的选择器
    if (isArray(data[0])) {
      // 多选选择器
      pickerMode = 'multiple'
      pickerData.value = (data as PickerDataType[][]).reduce(
        (prev: PickerData, cur: Array<PickerDataType>) => {
          prev.push(cur.map((item) => _generateData(item)))
          return prev
        },
        []
      )
    } else if (
      !isArray(data[0]) &&
      isObject(data[0]) &&
      Object.prototype.hasOwnProperty.call(data[0], props.childrenKey)
    ) {
      // 级联选择器
      pickerMode = 'cascade'
      _generateOrUpdateCascadeData(
        data as PickerDataItem[],
        1,
        props.modelValue as Array<string | number>
      )
    } else {
      // 单列选择器
      pickerMode = 'signle'
      pickerData.value = [data.map((item) => _generateData(item))]
    }
    // console.log(JSON.stringify(pickerData.value))
    nextTick(() => {
      initDefaultPickerIndex()
    })
  }
  watch(
    () => props.data,
    () => {
      splitUserPickerData()
    },
    {
      immediate: true,
    }
  )

  // 获取当前选中的值
  const _getCurrentPickerValue = (): PickerValueType => {
    if (pickerMode === 'signle' && !isArray((props.data as any[])[0])) {
      return pickerData.value[0][currentPickerIndex.value[0]].value
    } else {
      // currentPickerIndex.value.splice(pickerData.value.length)
      const pickerIndex = cloneDeep(currentPickerIndex.value)
      pickerIndex.splice(pickerData.value.length)
      return pickerIndex.map((item, index) =>
        isEmptyVariableInDefault(pickerData.value[index][item]?.value, 0)
      )
    }
  }

  // 根据用户选中的索引获取当前用户传入的数据
  const _getCurrentPickerOriginData = (): any => {
    if (pickerMode === 'signle' && !isArray((props.data as any[])[0])) {
      return pickerData.value[0][currentPickerIndex.value[0]].originalData
    } else {
      // currentPickerIndex.value.splice(pickerData.value.length)
      const pickerIndex = cloneDeep(currentPickerIndex.value)
      pickerIndex.splice(pickerData.value.length)
      return pickerIndex.map((item, index) =>
        isEmptyVariableInDefault(
          pickerData.value[index][item]?.originalData,
          undefined
        )
      )
    }
  }

  // 标记是否内部更新
  let isInnerUpdate = false
  watch(
    () => props.modelValue,
    (val) => {
      if (isInnerUpdate) {
        isInnerUpdate = false
        return
      }
      // 如果是级联选择器，对应的级联数据也要更新
      if (pickerMode === 'cascade') {
        _generateOrUpdateCascadeData(
          props.data as PickerDataItem[],
          1,
          val as Array<string | number>
        )
      }
      nextTick(() => {
        initDefaultPickerIndex()
      })
    },
    {
      deep: true,
    }
  )

  // picker-view选择发生改变事件
  let changeTimer: ReturnType<typeof setTimeout> | null = null
  let continuousChangeStatus = false
  const pickerViewChangeEvent = (e: any) => {
    if (continuousChangeStatus) {
      return
    }
    changeTimer = setTimeout(() => {
      continuousChangeStatus = false
      changeTimer && clearTimeout(changeTimer)
      changeTimer = null
    }, 300)
    continuousChangeStatus = true
    // 比较上一次的值，判断是那一列发生了改变
    let changePickerColumnIndex = currentPickerIndex.value.findIndex(
      (item, index) => item !== e.detail.value[index]
    )
    changePickerColumnIndex = ~changePickerColumnIndex
      ? changePickerColumnIndex
      : 0
    currentPickerIndex.value = e.detail.value

    // 如果是级联选择器，对应的列有children的值，则需要更新后面的数据，并且重置后面选中的索引
    if (pickerMode === 'cascade') {
      let data: any[] = props.data as any[]
      for (let i = 0; i < changePickerColumnIndex; i++) {
        data = data[currentPickerIndex.value[i]][props.childrenKey]
      }
      const pickerIndex = currentPickerIndex.value[changePickerColumnIndex]
      pickerData.value.splice(changePickerColumnIndex + 1)
      if (
        data[pickerIndex] &&
        Object.prototype.hasOwnProperty.call(
          data[pickerIndex],
          props.childrenKey
        )
      ) {
        _generateOrUpdateCascadeData(
          data[pickerIndex][props.childrenKey] as PickerDataItem[],
          changePickerColumnIndex + 2
        )
        currentPickerIndex.value = pickerData.value.map((item, index) => {
          return index <= changePickerColumnIndex
            ? currentPickerIndex.value[index]
            : 0
        })
      }
    }

    isInnerUpdate = true
    const value = _getCurrentPickerValue()
    const originData = _getCurrentPickerOriginData()
    emit(CHANGE_EVENT, value, changePickerColumnIndex, originData)
    // emit(UPDATE_MODEL_EVENT, value)
  }

  // 重置指定位置的数据
  const resetPickerIndexWithPosition = (start: number, end?: number) => {
    currentPickerIndex.value = currentPickerIndex.value.map((item, index) => {
      return index >= start && (!end || index <= end) ? 0 : item
    })
  }

  // 点击确认按钮
  const confirmEvent = () => {
    const value = _getCurrentPickerValue()
    const originData = _getCurrentPickerOriginData()
    isInnerUpdate = true
    emit(UPDATE_MODEL_EVENT, value)
    nextTick(() => {
      emit('confirm', value, originData)
    })

    closePopupEvent()
  }

  // 点击取消按钮
  const cancelEvent = () => {
    emit('cancel')

    closePopupEvent()
  }

  return {
    openPopup,
    showPicker,
    pickerData,
    currentPickerIndex,
    closePopupEvent,
    pickerViewChangeEvent,
    confirmEvent,
    cancelEvent,
    initDefaultPickerIndex,
    resetPickerIndexWithPosition,
  }
}
