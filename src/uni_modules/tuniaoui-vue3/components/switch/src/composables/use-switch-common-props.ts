import { useFormDisabled, useFormSize } from '../../../form'
import type { SwitchProps } from '../switch'

export const useSwitchCommonProps = (props: SwitchProps) => {
  // Switch开关的尺寸
  const size = useFormSize(props.size)

  // Switch开关是否禁用
  const disabled = useFormDisabled(props.disabled)

  return {
    size,
    disabled,
  }
}
