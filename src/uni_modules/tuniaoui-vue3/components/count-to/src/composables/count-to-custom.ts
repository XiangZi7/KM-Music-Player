import { computed, toRef } from 'vue'
import { useComponentColor, useNamespace } from '../../../../hooks'
import { formatDomSizeValue } from '../../../../utils'

import type { CSSProperties } from 'vue'
import type { CountToProps } from '../count-to'

export const useCountToCustomStyle = (props: CountToProps) => {
  const ns = useNamespace('count-to')
  // 解析文字颜色
  const [textColorClass, textColorStyle] = useComponentColor(
    toRef(props, 'textColor'),
    'text'
  )

  // countTo对应的类
  const countToClass = computed<string>(() => {
    const cls: string[] = [ns.b()]

    if (textColorClass.value) cls.push(textColorClass.value)

    return cls.join(' ')
  })

  // countTo对应的样式
  const countToStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    if (!textColorClass.value) {
      style.color = textColorStyle.value || 'var(--tn-text-color-primary)'
    }

    if (props.fontSize) style.fontSize = formatDomSizeValue(props.fontSize)

    return style
  })

  return {
    ns,
    countToClass,
    countToStyle,
  }
}
