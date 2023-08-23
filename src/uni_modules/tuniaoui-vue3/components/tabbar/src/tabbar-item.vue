<script lang="ts" setup>
import TnIcon from '../../icon/src/icon.vue'
import { tabbarItemProps, tabbatItemEmits } from './tabbar-item'
import { useTabbarItem, useTabbarItemCustomStyle } from './composables'

const props = defineProps(tabbarItemProps)
const emits = defineEmits(tabbatItemEmits)
const { itemId, isActive, itemRectInfo, iconSize, itemClick } = useTabbarItem(
  props,
  emits
)

const {
  ns,
  tabbarItemClass,
  tabbarItemStyle,
  tabbarItemElementStyle,
  bulgeClass,
  bulgeStyle,
} = useTabbarItemCustomStyle(props, isActive)
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
    :id="itemId"
    :class="[tabbarItemClass]"
    :style="tabbarItemStyle"
    @tap.stop="itemClick"
  >
    <slot>
      <!-- 图标 -->
      <template v-if="bulge">
        <view :class="[bulgeClass]" :style="bulgeStyle(itemRectInfo)">
          <TnIcon :name="isActive ? activeIcon : icon" :size="iconSize" />
        </view>
      </template>
      <template v-else>
        <view
          v-if="icon && activeIcon"
          :class="[ns.e('icon')]"
          :style="tabbarItemElementStyle('icon')"
        >
          <TnIcon :name="isActive ? activeIcon : icon" :size="iconSize" />
        </view>
      </template>
      <!-- 文字 -->
      <view
        v-if="text"
        :class="[ns.e('text')]"
        :style="tabbarItemElementStyle('text')"
      >
        {{ text }}
      </view>
    </slot>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/tabbar-item.scss';
</style>
