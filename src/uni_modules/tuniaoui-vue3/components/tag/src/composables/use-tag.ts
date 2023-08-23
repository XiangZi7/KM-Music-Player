import type { SetupContext } from 'vue'
import type { TagEmits, TagProps } from '../tag'

export const useTag = (
  props: TagProps,
  emits: SetupContext<TagEmits>['emit']
) => {
  // 标签点击事件
  const tagClickHandle = () => {
    emits('click')
  }
  return {
    tagClickHandle,
  }
}
