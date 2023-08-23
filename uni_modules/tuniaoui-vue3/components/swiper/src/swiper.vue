<script lang="ts" setup>
import { swiperEmits, swiperProps } from './swiper'
import { useSwiper, useSwiperCustomStyle } from './composables'

const props = defineProps(swiperProps)
const emits = defineEmits(swiperEmits)

const { currentSwiperIndex, swiperCount, swiperChangeHandle, itemClickHandle } =
  useSwiper(props, emits)
const { ns, swiperStyle, indicatorColorClass, indicatorColorStyle } =
  useSwiperCustomStyle(props)
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
  <view :class="[ns.b()]" :style="swiperStyle" @tap.stop="itemClickHandle">
    <view :class="[ns.e('wrapper')]">
      <swiper
        :class="[ns.e('swiper')]"
        :current="currentSwiperIndex"
        :autoplay="autoplay"
        :interval="interval"
        :duration="duration"
        :circular="loop"
        :previous-margin="previousMargin"
        :next-margin="nextMargin"
        @change="swiperChangeHandle"
      >
        <swiper-item
          v-for="(item, index) in data"
          :key="index"
          :class="[ns.e('swiper-item')]"
        >
          <slot :active="index === currentSwiperIndex" :data="item" />
        </swiper-item>
      </swiper>
    </view>
    <!-- 指示器 -->
    <view
      v-if="indicator"
      :class="[ns.e('indicator'), ns.em('indicator', indicatorPosition)]"
    >
      <!-- 矩形 -->
      <view v-if="indicatorType === 'line'" :class="[ns.e('indicator-line')]">
        <view
          class="indicator-wrapper"
          :class="[indicatorColorClass(false)]"
          :style="indicatorColorStyle(false)"
        >
          <view
            class="active-block"
            :class="[indicatorColorClass(true)]"
            :style="{
              ...indicatorColorStyle(true),
              width: `${(100 / data.length).toFixed(2)}%`,
              transform: `translateX(${100 * currentSwiperIndex}%)`,
            }"
          />
        </view>
      </view>
      <!-- 点 -->
      <view v-if="indicatorType === 'dot'" :class="[ns.e('indicator-dot')]">
        <view class="indicator-wrapper">
          <view
            v-for="(_, i) in swiperCount"
            :key="i"
            class="dot-item"
            :class="[
              indicatorColorClass(i === currentSwiperIndex),
              { active: i === currentSwiperIndex },
            ]"
            :style="indicatorColorStyle(i === currentSwiperIndex)"
          />
        </view>
      </view>
      <!-- 数值 -->
      <view
        v-if="indicatorType === 'number'"
        :class="[ns.e('indicator-number')]"
      >
        <view
          class="indicator-wrapper"
          :class="[indicatorColorClass(false)]"
          :style="indicatorColorStyle(false)"
        >
          <view class="current-index">{{ currentSwiperIndex + 1 }}</view>
          <view class="sep">/</view>
          <view class="swiper-count">{{ swiperCount }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
@import '../../../theme-chalk/src/swiper.scss';
</style>
