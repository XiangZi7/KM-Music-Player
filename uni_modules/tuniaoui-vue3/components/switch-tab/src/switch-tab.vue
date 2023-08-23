<script lang="ts" setup>
import { switchTabEmits, switchTabProps } from './switch-tab'
import { useSwitchTab, useSwitchTabCustomStyle } from './composables'

const props = defineProps(switchTabProps)
const emits = defineEmits(switchTabEmits)

const { tabClickEvent } = useSwitchTab(props, emits)
const { ns, tabClass, tabStyle, switchTabClass, switchTabStyle } =
  useSwitchTabCustomStyle(props)
</script>

<template>
  <view :class="[switchTabClass]" :style="switchTabStyle">
    <!-- 标签栏 -->
    <view :class="[ns.e('tabs')]">
      <view
        v-for="(tabItem, tabIndex) in tabs"
        :key="tabIndex"
        :class="[tabClass(tabIndex)]"
        :style="tabStyle(tabIndex)"
        @tap.stop="tabClickEvent(tabIndex)"
      >
        <view class="tab-item bg" />
        <view class="tab-item text">{{ tabItem }}</view>
      </view>
    </view>
    <!-- 内容区域 -->
    <view :class="[ns.e('content')]">
      <slot />
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/switch-tab.scss';
</style>
