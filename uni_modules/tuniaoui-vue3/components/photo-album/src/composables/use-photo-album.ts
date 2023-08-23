import { computed } from 'vue'
import {} from '../../../../utils'

import type { SetupContext } from 'vue'
import type { PhotoAlbumEmit, PhotoAlbumProps } from '../photo-album'

export const usePhotoAlbum = (
  props: PhotoAlbumProps,
  emits: SetupContext<PhotoAlbumEmit>['emit']
) => {
  // 相册图片数据
  const imageData = computed<string[]>(() => {
    const maxLength = Math.min(props.data.length, props.max)
    return props.data.slice(0, maxLength)
  })

  // 图片点击事件
  const imageClickEvent = (index: number) => {
    emits('click', index)
    if (!props.preview) return
    uni.previewImage({
      urls: imageData.value,
      current: index,
    })
  }

  return {
    imageData,
    imageClickEvent,
  }
}
