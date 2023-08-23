import { computed, toRef } from 'vue'
import { useComponentColor } from '../../../../hooks'
import { formatDomSizeValue } from '../../../../utils'

import type { CSSProperties } from 'vue'
import type { NoticeBarProps } from '../notice-bar'

type NoticeBarCommonColorClass = (
  type: 'normal' | 'leftIcon' | 'rightIcon'
) => string
type NoticeBarCommonColorStyle = (
  type: 'normal' | 'leftIcon' | 'rightIcon'
) => CSSProperties

export const useNoticeBarCommonProps = (props: NoticeBarProps) => {
  // 解析颜色
  const [bgColorClass, bgColorStyle] = useComponentColor(
    toRef(props, 'bgColor'),
    'bg'
  )
  const [textColorClass, textColorStyle] = useComponentColor(
    toRef(props, 'textColor'),
    'text'
  )
  const [leftIconColorClass, leftIconColorStyle] = useComponentColor(
    toRef(props, 'leftIconColor'),
    'text'
  )
  const [rightIconColorClass, rightIconColorStyle] = useComponentColor(
    toRef(props, 'rightIconColor'),
    'text'
  )

  // 公共类
  const commonClass = computed<NoticeBarCommonColorClass>(() => {
    return (type: 'normal' | 'leftIcon' | 'rightIcon' = 'normal') => {
      const cls: string[] = []

      if (type === 'normal') {
        // 设置颜色
        if (bgColorClass.value) cls.push(bgColorClass.value)
        if (textColorClass.value) cls.push(textColorClass.value)
      } else if (type === 'leftIcon') {
        // 设置左图标颜色
        if (leftIconColorClass.value) cls.push(leftIconColorClass.value)
      } else if (type === 'rightIcon') {
        // 设置右图标颜色
        if (rightIconColorClass.value) cls.push(rightIconColorClass.value)
      }

      return cls.join(' ')
    }
  })

  // 公共样式
  const commonStyle = computed<NoticeBarCommonColorStyle>(() => {
    return (type: 'normal' | 'leftIcon' | 'rightIcon' = 'normal') => {
      const style: CSSProperties = {}

      if (type === 'normal') {
        // 设置颜色
        if (!bgColorClass.value) {
          style.backgroundColor = bgColorStyle.value || 'var(--tn-color-white)'
        }
        if (textColorStyle.value) {
          style.color = textColorStyle.value
        } else if (!bgColorClass.value && !textColorClass.value) {
          style.color = 'var(--tn-text-color-primary)'
        }
        // 如果有设置字体大小，则设置字体大小
        if (props.fontSize) style.fontSize = formatDomSizeValue(props.fontSize)
      } else if (type === 'leftIcon') {
        if (!leftIconColorClass.value) {
          style.color =
            leftIconColorStyle.value || 'var(--tn-text-color-primary)'
        }
        if (props.fontSize) style.fontSize = formatDomSizeValue(props.fontSize)
      } else if (type === 'rightIcon') {
        if (!rightIconColorClass.value) {
          style.color =
            rightIconColorStyle.value || 'var(--tn-text-color-secondary)'
        }
        if (props.fontSize)
          style.fontSize = `calc(${formatDomSizeValue(props.fontSize)} * 1.2)`
      }

      return style
    }
  })

  return {
    commonClass,
    commonStyle,
  }
}
