<script lang="ts" setup>
import TnIcon from '../../icon/src/icon.vue'
import { useNamespace } from '../../../hooks'
import { swipeActionItemProps } from './swipe-action-item'
import { useSwipeActionItem, useSwipeActionOptions } from './composables'

const props = defineProps(swipeActionItemProps)

const ns = useNamespace('swipe-action-item')

const {
  componentId,
  optionComponentClass,
  optionsMenuWidth,
  contentRightDistance,
  isSwipe,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  optionClickEvent,
} = useSwipeActionItem(props)
const { options, optionColorClass, optionColorStyle } =
  useSwipeActionOptions(props)
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
  <view :id="componentId" :class="[ns.b()]">
    <!-- 操作菜单 -->
    <view :class="[ns.e('options')]">
      <view
        v-for="(item, index) in options"
        :key="index"
        :class="[
          optionComponentClass,
          ns.e('option-item'),
          ns.is('disabled', item.disabled),
          ns.is('round', item.round),
        ]"
        :style="{
          right: `-${optionsMenuWidth - contentRightDistance}px`,
          transitionDuration: `${isSwipe ? 0 : 300}ms`,
        }"
        @tap.stop="optionClickEvent(index)"
      >
        <view
          :class="[ns.e('option-item-content'), optionColorClass(index)]"
          :style="optionColorStyle(index)"
        >
          <view v-if="item.icon" class="icon">
            <TnIcon :name="item.icon" />
          </view>
          <view v-if="item.text && !item.round" class="text">
            {{ item.text }}
          </view>
        </view>
      </view>
    </view>

    <!-- 内容 -->
    <view
      :class="[ns.e('content')]"
      :style="{
        right: `${contentRightDistance}px`,
        transitionDuration: `${isSwipe ? 0 : 300}ms`,
      }"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
    >
      <slot />
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/swipe-action-item.scss';
</style>
