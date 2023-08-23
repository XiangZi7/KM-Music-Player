<script lang="ts" setup>
import TnBadge from '../../badge/src/badge.vue'
import { tabsItemEmits, tabsItemProps } from './tabs-item'
import { useTabsItem, useTabsItemCustomStyle } from './composables'

const props = defineProps(tabsItemProps)
defineEmits(tabsItemEmits)

const { componentId, isActive, hasBadge, itemClickEvent } = useTabsItem(props)
const { ns, tabsItemClass, tabsItemStyle } = useTabsItemCustomStyle(
  props,
  isActive
)
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
    :class="[tabsItemClass]"
    :style="tabsItemStyle"
    @tap.stop="itemClickEvent"
  >
    <slot>
      <view :class="[ns.e('content')]">
        <view :class="[ns.e('content__value')]">
          <!-- 角标 -->
          <TnBadge
            v-if="hasBadge"
            :value="badgeConfig.value"
            :dot="badgeConfig.dot"
            :size="badgeConfig.dot ? '16' : ''"
            type="danger"
          />
          {{ title }}
        </view>
      </view>
    </slot>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/tabs-item.scss';
</style>
