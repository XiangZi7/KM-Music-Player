import { useFormDisabled, useFormSize } from '../../../form'

import type { SliderProps } from '../slider'

export const useSliderCommonProps = (props: SliderProps) => {
  // 滑动条的尺寸
  const size = useFormSize(props.size)

  // 滑动条是否禁用
  const disabled = useFormDisabled(props.disabled)

  return {
    size,
    disabled,
  }
}
