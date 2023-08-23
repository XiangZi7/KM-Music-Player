<script lang="ts" setup>
import { useNamespace } from '../../../hooks'
import { useRowNoticeBar } from './composables'

const ns = useNamespace('row-notice-bar')
const { componentId, componentTextId, data, animationData, noticeClickEvent } =
  useRowNoticeBar()
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
    :class="[ns.b()]"
    :animation="animationData"
    @tap.stop="noticeClickEvent"
  >
    <view :id="componentTextId" :class="[ns.e('value')]">
      {{ data }}
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/row-notice-bar.scss';
</style>
