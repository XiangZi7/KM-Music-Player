<script lang="ts" setup>
import { loadingProps } from './loading'
import { useLoadingCustomStyle } from './composables'

const props = defineProps(loadingProps)

const {
  ns,
  loadingClass,
  loadingStyle,
  loadingContentClass,
  loadingContentStyle,
} = useLoadingCustomStyle(props)
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
  <view v-if="show" :class="[loadingClass]" :style="loadingStyle">
    <view v-if="mode === 'semicircle'" :class="[ns.e('semicircle')]" />
    <view
      v-if="mode === 'circle' || mode === 'semicircle'"
      :class="[ns.e('circle'), loadingContentClass]"
      :style="loadingContentStyle"
    />
    <view
      v-if="mode === 'flower'"
      :class="[ns.e('flower'), loadingContentClass]"
      :style="loadingContentStyle"
    >
      <view v-for="i in 12" :key="i" :class="[ns.em('flower', 'item')]" />
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/loading.scss';
</style>
