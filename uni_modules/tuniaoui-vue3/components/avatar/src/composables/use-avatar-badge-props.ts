import { computed, inject } from 'vue'
import { avatarGroupContextKey } from '../../../../tokens'
import { isEmptyDoubleVariableInDefault } from '../../../../utils'

import type { AvatarProps } from '../avatar'
import type { BadgeProps } from '../../../badge'

export const useAvatarBadgeProps = (props: AvatarProps) => {
  const avatarGroup = inject(avatarGroupContextKey, undefined)

  // 徽标最大值
  const max = computed<BadgeProps['max']>(() => {
    return isEmptyDoubleVariableInDefault(
      props?.badgeConfig?.max,
      avatarGroup?.badgeConfig?.max
    )
  })

  // 徽标类型
  const type = computed<BadgeProps['type']>(() => {
    return isEmptyDoubleVariableInDefault(
      props?.badgeConfig?.type,
      avatarGroup?.badgeConfig?.type,
      'primary'
    )
  })

  // 徽标背景颜色
  const bgColor = computed<BadgeProps['bgColor']>(() => {
    return isEmptyDoubleVariableInDefault(
      props?.badgeConfig?.bgColor,
      avatarGroup?.badgeConfig?.bgColor
    )
  })

  // 徽标文本颜色
  const textColor = computed<BadgeProps['textColor']>(() => {
    return isEmptyDoubleVariableInDefault(
      props?.badgeConfig?.textColor,
      avatarGroup?.badgeConfig?.textColor
    )
  })

  // 徽标字体大小
  const fontSize = computed<BadgeProps['fontSize']>(() => {
    return isEmptyDoubleVariableInDefault(
      props?.badgeConfig?.fontSize,
      avatarGroup?.badgeConfig?.fontSize
    )
  })

  // 徽标大小
  const size = computed<BadgeProps['size']>(() => {
    return isEmptyDoubleVariableInDefault(
      props?.badgeConfig?.size,
      avatarGroup?.badgeConfig?.size
    )
  })

  // 徽标加粗
  const bold = computed<BadgeProps['bold']>(() => {
    return isEmptyDoubleVariableInDefault(
      props?.badgeConfig?.bold,
      avatarGroup?.badgeConfig?.bold,
      false
    )
  })

  // 设置点徽标
  const dot = computed<BadgeProps['dot']>(() => {
    return isEmptyDoubleVariableInDefault(
      props?.badgeConfig?.dot,
      avatarGroup?.badgeConfig?.dot,
      false
    )
  })

  // 设置徽标的位置
  const absolutePosition = computed<BadgeProps['absolutePosition']>(() => {
    return isEmptyDoubleVariableInDefault(
      props?.badgeConfig?.absolutePosition,
      avatarGroup?.badgeConfig?.absolutePosition,
      {}
    )
  })

  // 设置徽标是否居中
  const absoluteCenter = computed<BadgeProps['absoluteCenter']>(() => {
    return isEmptyDoubleVariableInDefault(
      props?.badgeConfig?.absoluteCenter,
      avatarGroup?.badgeConfig?.absoluteCenter,
      true
    )
  })

  // 徽标配置
  const badgeConfig = computed<BadgeProps>(() => {
    return {
      value: props.badge,
      max: max.value,
      type: type.value,
      bgColor: bgColor.value,
      textColor: textColor.value,
      fontSize: fontSize.value,
      size: size.value,
      bold: bold.value,
      customClass: '',
      customStyle: {},
      dot: dot.value,
      absolute: true,
      absolutePosition: absolutePosition.value,
      absoluteCenter: absoluteCenter.value,
      index: '',
    }
  })

  return {
    badgeConfig,
  }
}
