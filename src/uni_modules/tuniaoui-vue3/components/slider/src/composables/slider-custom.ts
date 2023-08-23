import { computed, toRef } from 'vue'
import { useComponentColor, useNamespace } from '../../../../hooks'
import { formatDomSizeValue } from '../../../../utils'
import { useSliderCommonProps } from './use-slider-common-porps'

import type { CSSProperties, Ref } from 'vue'
import type { SliderMode, SliderProps, SliderValueType } from '../slider'

export const useSliderCustomStyle = (
  props: SliderProps,
  sliderValue: Ref<SliderValueType>,
  mode: Ref<SliderMode>
) => {
  const ns = useNamespace('slider')

  const { size, disabled } = useSliderCommonProps(props)

  // 解析颜色
  const [activeBgColorClass, activeBgColorStyle] = useComponentColor(
    toRef(props, 'activeColor'),
    'bg'
  )
  const [inactiveBgColorClass, inactiveBgColorStyle] = useComponentColor(
    toRef(props, 'inactiveColor'),
    'bg'
  )

  // 滑块的位置
  const sliderBarPosition = computed<[string, string]>(() => {
    if (mode.value === 'single') {
      return [
        `${
          (((sliderValue.value as number) - props.min) /
            (props.max - props.min)) *
          100
        }%`,
        '0',
      ]
    } else {
      return [
        `${
          (((sliderValue.value as number[])[0] - props.min) /
            (props.max - props.min)) *
          100
        }%`,
        `${
          (((sliderValue.value as number[])[1] - props.min) /
            (props.max - props.min)) *
          100
        }%`,
      ]
    }
  })

  // 滑动条所属类
  const sliderClass = computed<string>(() => {
    const cls: string[] = [ns.b()]

    // 设置滑动条的尺寸
    if (size.value) cls.push(ns.m(size.value))

    // 设置禁用状态
    if (disabled.value) cls.push(ns.m('disabled'))

    // 设置未激活时的颜色
    if (inactiveBgColorClass.value) cls.push(inactiveBgColorClass.value)

    return cls.join(' ')
  })

  // 滑动条样式
  const sliderStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    // 设置滑动条的高度
    if (props.sliderHeight)
      style.height = formatDomSizeValue(props.sliderHeight)

    // 设置未激活时的颜色
    if (!inactiveBgColorClass.value)
      style.backgroundColor =
        inactiveBgColorStyle.value || 'var(--tn-color-grey-light)'

    return style
  })

  // 激活时滑动条所属类
  const activeSliderClass = computed<string>(() => {
    const cls: string[] = [ns.e('active')]

    // 设置激活时的颜色
    if (activeBgColorClass.value) cls.push(activeBgColorClass.value)

    return cls.join(' ')
  })

  // 激活时滑动条样式
  const activeSliderStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    // 设置激活时的颜色
    if (!activeBgColorClass.value)
      style.backgroundColor =
        activeBgColorStyle.value || 'var(--tn-color-primary)'

    // 激活时显示对应的宽度
    if (mode.value === 'single') {
      style.width = sliderBarPosition.value[0]
    } else if (mode.value === 'range') {
      style.width = `calc(${sliderBarPosition.value[1]} - ${sliderBarPosition.value[0]})`
      style.left = sliderBarPosition.value[0]
    }
    return style
  })

  // 滑块所属类
  const sliderBarClass = computed<string>(() => {
    const cls: string[] = [ns.e('bar')]

    return cls.join(' ')
  })

  // 滑块样式
  const sliderBarStyle = computed<(type: 'min' | 'max') => CSSProperties>(
    () => {
      return (type) => {
        const style: CSSProperties = {}

        // 设置滑块的尺寸
        if (props.sliderBarSize)
          style.width = style.height = formatDomSizeValue(props.sliderBarSize)

        // 更新滑块的位置
        style.left =
          type === 'min'
            ? sliderBarPosition.value[0]
            : sliderBarPosition.value[1]

        return style
      }
    }
  )

  return {
    ns,
    sliderClass,
    sliderStyle,
    activeSliderClass,
    activeSliderStyle,
    sliderBarClass,
    sliderBarStyle,
  }
}
