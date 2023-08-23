import { computed } from 'vue'
import { useNamespace } from '../../../../hooks'
import { formatDomSizeValue } from '../../../../utils'
import { useProgressProps } from '../../../base/composables/use-progress-props'

import type { CSSProperties } from 'vue'
import type { LineProgressProps } from '../line-progress'

export const useLineProgressCustomStyle = (props: LineProgressProps) => {
  const ns = useNamespace('line-progress')

  const {
    percent,
    activeColorClass,
    activeColorStyle,
    inactiveColorClass,
    inactiveColorStyle,
  } = useProgressProps(props)

  // 进度条所对应的类
  const progressClass = computed<string>(() => {
    const cls: string[] = [ns.b()]

    // 设置进度条颜色
    if (inactiveColorClass.value) cls.push(inactiveColorClass.value)

    return cls.join(' ')
  })

  // 进度条所对应的样式
  const progressStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    // 设置进度条颜色
    if (!inactiveColorClass.value)
      style.backgroundColor =
        inactiveColorStyle.value || 'var(--tn-color-gray-disabled)'

    // 设置进度条高度
    if (props.height) {
      style.height = formatDomSizeValue(props.height)
      // 设置文字的大小
      style.fontSize = style.height
    }

    return style
  })

  // 已激活进度条所对应的类
  const activeProgressClass = computed<string>(() => {
    const cls: string[] = [ns.e('active')]

    // 设置进度条颜色
    if (activeColorClass.value) cls.push(activeColorClass.value)

    // 是否显示波纹
    if (props.stripe) {
      cls.push(ns.em('active', 'stripe'))
      // 波纹是否运动
      if (props.stripeAnimated) cls.push(ns.em('active', 'stripe--animation'))
    }

    return cls.join(' ')
  })

  // 已激活进度条所对应的样式
  const activeProgressStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    // 根据进度设置进度条宽度
    if (percent.value) style.width = `${percent.value}%`

    // 动画执行时间
    if (props.duration) style.transitionDuration = `${props.duration}ms`

    // 设置进度条颜色
    if (!activeColorClass.value)
      style.backgroundColor =
        activeColorStyle.value || 'var(--tn-color-primary)'

    return style
  })

  return {
    ns,
    progressClass,
    progressStyle,
    activeProgressClass,
    activeProgressStyle,
  }
}
