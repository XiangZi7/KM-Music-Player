<script lang="ts" setup>
import { formatDomSizeValue } from '../../../utils'
import { tabsEmits, tabsProps } from './tabs'
import { useTabs, useTabsCustomStyle } from './composables'

const props = defineProps(tabsProps)
defineEmits(tabsEmits)

const { tabItems, componentId, barComponentId, barOffsetLeft, scrollLeft } =
  useTabs(props)
const { ns, tabsClass, tabsStyle, barClass, barStyle } =
  useTabsCustomStyle(props)
</script>

<template>
  <view :id="componentId" :class="[tabsClass]" :style="tabsStyle">
    <!-- 距离顶部的距离占位 -->
    <view
      v-if="offsetTop"
      :class="[ns.e('top-placeholder')]"
      :style="{ height: `${offsetTop}px` }"
    />
    <!-- 内容区域 -->
    <scroll-view
      :class="[ns.e('scroll-view')]"
      :style="{
        height: formatDomSizeValue(height || '100%'),
      }"
      :scroll-x="scroll"
      scroll-with-animation
      :scroll-left="scrollLeft"
    >
      <view :class="[ns.e('container'), ns.is('scroll', scroll)]">
        <slot />
        <!-- 滑块 -->
        <view
          v-if="bar || $slots.bar"
          :id="barComponentId"
          :class="[ns.e('bar-container')]"
          :style="{
            left: `${barOffsetLeft}px`,
            opacity: `${barOffsetLeft && tabItems.length ? 1 : 0}`,
          }"
        >
          <slot name="bar">
            <view :class="[barClass]" :style="barStyle" />
          </slot>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/tabs.scss';
</style>
