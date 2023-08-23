<script lang="ts" setup>
import { useNamespace } from '../../../hooks'
import { useColumnNoticeBar } from './composables'

const ns = useNamespace('column-notice-bar')

const { data, interval, play, vertical, noticeClickEvent } =
  useColumnNoticeBar()
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
  <view :class="[ns.b()]">
    <swiper
      :class="[ns.e('swiper')]"
      :autoplay="play"
      :interval="interval"
      :vertical="vertical"
      circular
    >
      <swiper-item
        v-for="(item, index) in data"
        :key="index"
        class="tn-text-ellipsis-1"
        :class="[ns.e('swiper-item')]"
        @tap.stop="noticeClickEvent(index)"
      >
        {{ item }}
      </swiper-item>
    </swiper>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/column-notice-bar.scss';
</style>
