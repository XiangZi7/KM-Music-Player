import { computed, toRef, watch } from 'vue'
import {
  useComponentColor,
  useComponentSize,
  useNamespace,
} from '../../../../hooks'
import { formatDomSizeValue } from '../../../../utils'

import type { CSSProperties, Ref } from 'vue'
import type { SubsectionProps } from '../subsection'
import type { SubsectionSliderRect } from '../types'

export const useSubsectionCustomStyle = (
  props: SubsectionProps,
  activeColor: Ref<string>,
  sliderRectInfo: Ref<SubsectionSliderRect>
) => {
  const ns = useNamespace('subsection')

  // 解析颜色
  const [activeBgColorClass, activeBgColorStyle, updateActiveBgColor] =
    useComponentColor(activeColor, 'bg')
  const [activeBorderColorClass, activeBorderColorStyle] = useComponentColor(
    toRef(props, 'activeColor'),
    'border'
  )
  watch(
    () => activeColor.value,
    (val) => {
      updateActiveBgColor(val)
    }
  )

  // 解析尺寸
  const { sizeType } = useComponentSize(props.size)

  // 分段器的类
  const subsectionClass = computed<string>(() => {
    const cls: string[] = [ns.b(), ns.m(props.mode)]

    // 设置尺寸
    if (props.size && sizeType.value === 'inner') cls.push(ns.m(props.size))

    // 如果是默认模式，设置激活颜色的边框
    if (props.mode === 'default') {
      if (activeBorderColorClass.value) cls.push(activeBorderColorClass.value)
    }

    return cls.join(' ')
  })
  // 分段器的样式
  const subsectionStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    // 如果是按钮模式，则设置背景颜色
    if (props.mode === 'button') {
      style.backgroundColor = 'var(--tn-color-gray-light)'
    }

    // 如果是默认模式，设置激活颜色的边框
    if (props.mode === 'default') {
      if (!activeBorderColorClass.value)
        style.borderColor =
          activeBorderColorStyle.value || 'var(--tn-color-primary)'
    }

    // 设置尺寸
    if (props.size && sizeType.value === 'custom')
      style.fontSize = formatDomSizeValue(props.size)

    // 设置圆角
    if (props.radius) {
      style.borderRadius = formatDomSizeValue(props.radius)
    }

    return style
  })

  // 滑块的类
  const subsectionSliderClass = computed<string>(() => {
    const cls: string[] = [ns.e('slider'), props.mode]

    if (props.mode === 'default') {
      if (activeBgColorClass.value) cls.push(activeBgColorClass.value)
    }

    return cls.join(' ')
  })
  // 滑块的样式
  const subsectionSliderStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    if (props.mode === 'default') {
      if (!activeBgColorClass.value)
        style.backgroundColor =
          activeBgColorStyle.value || 'var(--tn-color-primary)'
    } else {
      style.backgroundColor = 'var(--tn-color-white)'
    }

    // 滑动的位置
    if (sliderRectInfo.value) {
      style.left = `${sliderRectInfo.value.left}px`
      style.width = `${sliderRectInfo.value.width}px`
    }

    return style
  })

  return {
    ns,
    subsectionClass,
    subsectionStyle,
    subsectionSliderClass,
    subsectionSliderStyle,
  }
}
