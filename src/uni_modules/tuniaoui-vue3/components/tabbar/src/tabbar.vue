<script lang="ts" setup>
import { tabbarEmits, tabbarProps } from './tabbar'
import { useTabbar, useTabbarCustomStyle } from './composables'

const props = defineProps(tabbarProps)
defineEmits(tabbarEmits)

const { rectId, bulgeRectInfo, hasBulgeButton, setActiveItemByValue } =
  useTabbar(props)
const { ns, tabbarClass, tabbarStyle, bgClass, bgStyle, placeholderStyle } =
  useTabbarCustomStyle(props)

defineExpose({
  /**
   * @description 手动设置当前激活的item
   */
  setActiveItem: setActiveItemByValue,
})
</script>

<template>
  <view :id="rectId" :class="[tabbarClass]" :style="tabbarStyle">
    <!-- 凸起按钮 -->
    <view
      v-if="hasBulgeButton"
      :class="[
        ns.e('bulge'),
        {
          'top-shadow': topShadow,
        },
      ]"
      :style="{
        width: `${bulgeRectInfo.width}px`,
        height: `${bulgeRectInfo.height}px`,
        left: `${bulgeRectInfo.left}px`,
        top: `-${bulgeRectInfo.height * 0.35}px`,
        zIndex: zIndex ? zIndex - 1 : 'inherit',
      }"
    />
    <!-- 背景颜色 -->
    <view :class="[bgClass]" :style="bgStyle" />
    <!-- 内容 -->
    <view :class="[ns.e('content'), { 'tn-u-safe-area': safeAreaInsetBottom }]">
      <slot />
    </view>
  </view>
  <!-- 占位容器 -->
  <view
    v-if="fixed && placeholder"
    :class="[ns.e('placeholder'), { 'tn-u-safe-area': safeAreaInsetBottom }]"
    :style="placeholderStyle"
  />
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/tabbar.scss';
</style>
