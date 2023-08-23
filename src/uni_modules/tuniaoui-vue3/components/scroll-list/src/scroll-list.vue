<script lang="ts" setup>
import { scrollListEmits, scrollListProps } from './scroll-list'
import { useScrollList, useScrollListCustomStyle } from './composables'

const props = defineProps(scrollListProps)
const emits = defineEmits(scrollListEmits)

const {
  componentId,
  componentContentId,
  indicatorBlockScrollDistance,
  scrollViewScrollEvent,
  scrollToLeftEvent,
  scrollToRightEvent,
} = useScrollList(props, emits)
const {
  ns,
  indicatorClass,
  indicatorStyle,
  indicatorBlockClass,
  indicatorBlockStyle,
} = useScrollListCustomStyle(props)
</script>

<template>
  <view :id="componentId" :class="[ns.b(), ns.is('indicator', indicator)]">
    <!-- 内容 -->
    <view :class="[ns.e('content')]">
      <scroll-view
        :class="[ns.e('scroll-view')]"
        scroll-x
        @scroll="scrollViewScrollEvent"
        @scrolltoupper="scrollToLeftEvent"
        @scrolltolower="scrollToRightEvent"
      >
        <view :id="componentContentId" class="data">
          <slot />
        </view>
      </scroll-view>
    </view>

    <!-- 指示器 -->
    <view v-if="indicator" :class="[indicatorClass]" :style="indicatorStyle">
      <!-- 滑块 -->
      <view
        :class="[indicatorBlockClass]"
        :style="indicatorBlockStyle(indicatorBlockScrollDistance)"
      />
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/scroll-list.scss';
</style>
