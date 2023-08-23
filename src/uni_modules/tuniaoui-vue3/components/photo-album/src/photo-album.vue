<script lang="ts" setup>
import { computed } from 'vue'
import TnLazyLoad from '../../lazy-load/src/lazy-load.vue'
import { useNamespace } from '../../../hooks'
import { photoAlbumEmits, photoAlbumProps } from './photo-album'
import { usePhotoAlbum } from './composables'

import type { CSSProperties } from 'vue'

const props = defineProps(photoAlbumProps)
const emits = defineEmits(photoAlbumEmits)

const ns = useNamespace('photo-album')

const { imageData, imageClickEvent } = usePhotoAlbum(props, emits)

const containerStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}

  let width = `calc(100% / ${props.column} - 20rpx)`
  // #ifdef MP-ALIPAY
  width = `calc(100% / ${props.column} - 22rpx)`
  // #endif

  style.width = style.paddingBottom = width

  return style
})
</script>

<template>
  <view :class="[ns.b()]">
    <view
      v-for="(item, index) in imageData"
      :key="index"
      :class="[ns.e('container')]"
      :style="containerStyle"
      @tap.stop="imageClickEvent(index)"
    >
      <view :class="ns.e('item')">
        <TnLazyLoad v-if="lazyLoad" :src="item" :mode="props.imgMode" />
        <image
          v-else
          :class="ns.e('item__image')"
          :src="item"
          :mode="props.imgMode"
        />
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/photo-album.scss';
</style>
