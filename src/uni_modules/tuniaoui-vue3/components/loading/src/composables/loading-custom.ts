import { computed, toRef } from 'vue'
import {
  useComponentColor,
  useComponentSize,
  useNamespace,
} from '../../../../hooks'
import { formatDomSizeValue } from '../../../../utils'

import type { CSSProperties } from 'vue'
import type { LoadingProps } from '../loading'

export const useLoadingCustomStyle = (props: LoadingProps) => {
  const ns = useNamespace('loading')

  // 解析颜色
  const [colorClass, colorStyle, updateColor] = useComponentColor(
    toRef(props, 'color'),
    'bg'
  )

  // 解析尺寸
  const { sizeType } = useComponentSize(props.size)

  // 加载动画所属类
  const loadingClass = computed<string>(() => {
    const cls: string[] = []
    cls.push(ns.b())

    // 设置尺寸
    if (props.size && sizeType.value === 'inner')
      cls.push(ns.m(props.size as string))

    return cls.join(' ')
  })
  // 加载动画所属样式
  const loadingStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    // 设置尺寸
    if (props.size && sizeType.value === 'custom')
      style.width = style.height = formatDomSizeValue(props.size)

    return style
  })

  // 加载内容所属类
  const loadingContentClass = computed<string>(() => {
    const cls: string[] = []
    cls.push(ns.b())

    // 是否开启动画
    if (props.animation) cls.push(ns.m('animation'))
    return cls.join(' ')
  })
  // 加载内容所属样式
  const loadingContentStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    // 加载颜色类型
    if (props.type) style['--loading-color'] = `var(--tn-color-${props.type})`

    // 加载内容颜色
    if (props.color && colorClass.value) {
      const color = props.color.replace('tn-', '')
      style['--loading-color'] = `var(--tn-color-${color})`
    }

    // 加载内容颜色
    if (colorStyle.value) style['--loading-color'] = colorStyle.value

    // 设置动画执行时间
    if (props.duration) style.animationDuration = `${props.duration}s`

    // 设置动画执行时间函数
    if (props.mode === 'circle' || props.mode === 'semicircle') {
      if (props.timeFunction) style.animationTimingFunction = props.timeFunction
    }
    return style
  })

  return {
    ns,
    loadingClass,
    loadingStyle,
    loadingContentClass,
    loadingContentStyle,
    updateColor,
  }
}
