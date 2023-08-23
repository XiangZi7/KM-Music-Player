import { computed } from 'vue'
import { isNumber, isString } from '../../../../utils'

import type { SetupContext } from 'vue'
import type { BadgeEmits, BadgeProps } from '../badge'

export const badgeContentTypes = ['number', 'string', 'icon'] as const
export type BadgeContentType = (typeof badgeContentTypes)[number]

export const useBadge = (
  props: BadgeProps,
  emits?: SetupContext<BadgeEmits>['emit']
) => {
  // 判断是否需要显示角标
  const showBadge = computed<boolean>(() => {
    return !!props.dot || (props.value !== '' && props.value !== undefined)
  })
  // 显示的内容类型
  const contentType = computed<BadgeContentType>(() => {
    let type: BadgeContentType = 'string'
    if (isNumber(props.value)) type = 'number'
    if (isString(props.value) && props.value.startsWith('icon-')) type = 'icon'

    return type
  })

  // 显示的内容
  const content = computed<string>(() => {
    if (props.dot) return ''
    if (contentType.value === 'number' && props.max) {
      const value = Number(props.value || 0)
      const max = Number(props.max || 0)
      return value > max ? `${max}+` : `${value}`
    }
    if (contentType.value === 'icon')
      return (props.value as string).replace('icon-', '')

    return props.value as string
  })

  // 角标点击事件
  const badgeClick = () => {
    if (emits) emits('click', props.index)
  }

  return {
    showBadge,
    contentType,
    content,
    badgeClick,
  }
}
