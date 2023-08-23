<script lang="ts" setup>
import TnIcon from '../../icon/src/icon.vue'
import { collapseItemProps } from './collapse-item'
import { useCollapseItem, useCollapseItemCustomStyle } from './composables'

const props = defineProps(collapseItemProps)

const {
  componentContentId,
  showArrow,
  isActive,
  componentHeight,
  collapseItemClick,
} = useCollapseItem(props)
const { ns, arrowClass, arrowStyle } = useCollapseItemCustomStyle()
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
    :class="[ns.b(), ns.is('active', isActive), ns.is('disabled', disabled)]"
    :style="{ height: componentHeight }"
  >
    <!-- 标题 -->
    <view :class="[ns.e('title')]" @tap.stop="collapseItemClick">
      <view class="content tn-text-ellipsis-1">
        <slot name="title">
          {{ title }}
        </slot>
      </view>
      <view
        v-if="showArrow"
        class="arrow"
        :class="[arrowClass]"
        :style="arrowStyle"
      >
        <TnIcon name="right" />
      </view>
    </view>

    <!-- 内容区域 -->
    <view :id="componentContentId" :class="[ns.e('content')]">
      <slot />
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/collapse-item.scss';
</style>
