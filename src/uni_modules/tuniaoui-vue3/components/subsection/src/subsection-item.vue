<script lang="ts" setup>
import { subsectionItemEmits, subsectionItemProps } from './subsection-item'
import { useSubsectionItem, useSubsectionItemCustomStyle } from './composables'

const props = defineProps(subsectionItemProps)
const emits = defineEmits(subsectionItemEmits)

const { componentId, active, itemClickEvent } = useSubsectionItem(props, emits)
const { subsectionItemClass, subsectionItemStyle } =
  useSubsectionItemCustomStyle(props, active)
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
    :class="[subsectionItemClass]"
    :style="subsectionItemStyle"
    @tap.stop="itemClickEvent"
  >
    <slot>
      {{ title }}
    </slot>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/subsection-item.scss';
</style>
