import { computed } from 'vue'
import { useNamespace } from '../../../../hooks'
import { formatDomSizeValue } from '../../../../utils'

import type { CSSProperties } from 'vue'
import type { LazyLoadProps } from '../lazy-load'

export const useLazyLoadCustomStyle = (props: LazyLoadProps) => {
  const ns = useNamespace('lazy-load')

  // lazyLoad的样式
  const lazyLoadStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    // 设置宽高
    if (props.width) style.width = formatDomSizeValue(props.width)
    if (props.height) style.height = formatDomSizeValue(props.height)

    return style
  })

  return {
    ns,
    lazyLoadStyle,
  }
}
