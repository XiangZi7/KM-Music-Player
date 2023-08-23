<script lang="ts" setup>
import TnIcon from '../../icon/src/icon.vue'
import { lazyLoadEmits, lazyLoadProps } from './lazy-load'
import { useLazyLoad, useLazyLoadCustomStyle } from './composables'

const props = defineProps(lazyLoadProps)
defineEmits(lazyLoadEmits)

const {
  componentId,
  imageStatus,
  showImage,
  handleImageLoadedSuccess,
  handleImageLoadedFailed,
} = useLazyLoad(props)
const { ns, lazyLoadStyle } = useLazyLoadCustomStyle(props)
</script>

// #ifdef MP-WEIXIN
<script lang="ts">
export default {
  options: {
    // 在微信小程序中将组件节点渲染为虚拟节点，更加接近Vue组件的表现(不会出现shadow节点下再去创建元素)
    virtualHost: true,
  },
}
</script>
// #endif

<template>
  <view
    :id="componentId"
    :class="[ns.b(), ns.is('show-image', showImage && imageStatus !== 'error')]"
    :style="lazyLoadStyle"
  >
    <!-- 加载中 -->
    <view v-if="imageStatus === 'loading'" :class="[ns.e('container')]">
      <slot name="loading">
        <view :class="[ns.e('loading')]">
          <view :class="[ns.e('loading__icon')]">
            <TnIcon name="loading" />
          </view>
        </view>
      </slot>
    </view>
    <!-- 正式显示的图片 -->
    <view
      v-if="showImage && imageStatus !== 'error'"
      :class="[ns.e('container')]"
    >
      <image
        :class="[
          ns.e('image'),
          ns.is('animation', imageStatus === 'loaded' && transition),
          ns.is('no-animation', imageStatus === 'loaded' && !transition),
        ]"
        :src="src"
        :mode="mode"
        @load="handleImageLoadedSuccess"
        @error="handleImageLoadedFailed"
      />
    </view>
    <!-- 图片加载失败 -->
    <view v-if="imageStatus === 'error'" :class="[ns.e('container')]">
      <slot name="error">
        <view :class="[ns.e('error')]">
          <TnIcon name="image-fill" />
        </view>
      </slot>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/lazy-load.scss';
</style>
