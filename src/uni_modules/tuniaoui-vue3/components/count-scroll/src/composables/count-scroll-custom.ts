import { computed, toRef } from 'vue'
import { useComponentColor, useNamespace } from '../../../../hooks'
import { formatDomSizeValue, isEmptyVariableInDefault } from '../../../../utils'

import type { CSSProperties } from 'vue'
import type { CountScrollProps } from '../count-scroll'

type CountScrollColumnStyleType = (activeIndex: number) => CSSProperties

export const useCountScrollCustomStyle = (props: CountScrollProps) => {
  const ns = useNamespace('count-scroll')

  // 解析颜色
  const [textColorClass, textColorStyle] = useComponentColor(
    toRef(props, 'textColor'),
    'text'
  )

  // 动画执行时间
  const duration = computed<number>(() =>
    isEmptyVariableInDefault(props?.duration, 1500)
  )

  // countScroll对应的类
  const countScrollClass = computed<string>(() => {
    const cls: string[] = [ns.b()]

    if (textColorClass.value) cls.push(textColorClass.value)

    return cls.join(' ')
  })

  // countScroll对应的样式
  const countScrollStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    if (props.fontSize) style.fontSize = formatDomSizeValue(props.fontSize)

    if (!textColorClass.value) {
      style.color = textColorStyle.value || 'var(--tn-text-color-primary)'
    }

    return style
  })

  // countScroll列对应的样式
  const countScrollColumnStyle = computed<CountScrollColumnStyleType>(() => {
    return (activeIndex: number) => {
      const style: CSSProperties = {}

      if (duration.value) style.transitionDuration = `${duration.value / 1000}s`
      style.transform = `translateY(-${activeIndex * 10}%)`

      return style
    }
  })

  return {
    ns,
    countScrollClass,
    countScrollStyle,
    countScrollColumnStyle,
  }
}
