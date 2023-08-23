import { computed, toRef } from 'vue'
import { useComponentColor, useNamespace } from '../../../../hooks'
import { formatDomSizeValue, isEmptyVariableInDefault } from '../../../../utils'

import type { CSSProperties, Ref } from 'vue'
import type { NotifyOptions, NotifyProps } from '../notify'

export const useNotifyCustomStyle = (
  props: NotifyProps,
  options: Ref<NotifyOptions>,
  isActive: Ref<boolean>
) => {
  const ns = useNamespace('notify')

  // 解析颜色
  const [bgColorClass, bgColorStyle] = useComponentColor(
    toRef(options.value, 'bgColor'),
    'bg'
  )
  const [textColorClass, textColorStyle] = useComponentColor(
    toRef(options.value, 'textColor'),
    'text'
  )

  // notify对应的类
  const notifyClass = computed<string>(() => {
    const cls: string[] = [ns.b()]

    // 设置类型和颜色
    if (options.value.type) cls.push(`tn-type-${options.value.type}_bg`)
    if (bgColorClass.value) cls.push(bgColorClass.value)
    if (textColorClass.value) cls.push(textColorClass.value)

    // 设置弹出位置
    cls.push(ns.m(isEmptyVariableInDefault(options?.value.position, 'top')))

    if (isActive.value) cls.push(ns.is('active'))

    return cls.join(' ')
  })
  // notify对应的样式
  const notifyStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    if (!bgColorClass.value && !options.value.type) {
      style.backgroundColor = bgColorStyle.value || 'var(--tn-color-primary)'
    }

    if (textColorStyle.value) {
      style.color = textColorStyle.value
    } else if (
      !bgColorClass.value &&
      !textColorClass.value &&
      !options.value.type
    ) {
      style.color = 'var(--tn-color-white)'
    }

    // 如果当前是顶部弹出，则设置顶部距离
    if (options.value.position === 'top' && props.offsetTop) {
      style.top = formatDomSizeValue(props.offsetTop, 'px')
    }

    if (props.zIndex) style.zIndex = props.zIndex

    return style
  })

  return {
    notifyClass,
    notifyStyle,
  }
}
