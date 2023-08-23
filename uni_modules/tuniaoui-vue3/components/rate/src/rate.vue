<script lang="ts" setup>
import TnIcon from '../../icon/src/icon.vue'
import { rateEmits, rateProps } from './rate'
import { useRate, useRateCustomStyle } from './composables'

const props = defineProps(rateProps)
const emits = defineEmits(rateEmits)

const {
  componentId,
  rateItemData,
  activeItemWidth,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
} = useRate(props, emits)
const { ns, rateClass, itemClass, itemStyle } = useRateCustomStyle(props)
</script>

<template>
  <view
    :id="componentId"
    :class="[rateClass]"
    @touchstart.stop.prevent="onTouchStart"
    @touchmove.stop.prevent="onTouchMove"
    @touchend.stop.prevent="onTouchEnd"
  >
    <!-- 默认显示的图标 -->
    <view :class="[ns.e('container'), ns.e('inactive-container')]">
      <view
        v-for="(item, index) in rateItemData"
        :key="index"
        :class="[itemClass('inactive', item.inactive)]"
        :style="itemStyle('inactive', item.inactive)"
      >
        <TnIcon :name="item.inactive.icon" />
      </view>
    </view>
    <!-- 选中显示的图标 -->
    <view
      :class="[ns.e('container'), ns.e('active-container')]"
      :style="{
        width: `${activeItemWidth}px`,
      }"
    >
      <view
        v-for="(item, index) in rateItemData"
        :key="index"
        :class="[itemClass('active', item.active)]"
        :style="itemStyle('active', item.active)"
      >
        <TnIcon :name="item.active.icon" />
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/rate.scss';
</style>
