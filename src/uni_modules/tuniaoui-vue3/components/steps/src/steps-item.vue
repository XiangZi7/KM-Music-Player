<script lang="ts" setup>
import TnIcon from '../../icon/src/icon.vue'
import { stepEmits, stepProps } from './steps-item'
import { useStep, useStepCustomStyle } from './composables'

const props = defineProps(stepProps)
defineEmits(stepEmits)

const { isActive, stepMode, itemClickEvent } = useStep(props)
const { ns, stepClass, stepStyle, modeClass, modeStyle, lineClass, lineStyle } =
  useStepCustomStyle(props, isActive, stepMode)
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
  <view :class="[stepClass]" :style="stepStyle">
    <!-- 步骤内容容器 -->
    <view :class="[ns.e('container')]" @tap.stop="itemClickEvent">
      <!-- 模式 -->
      <view :class="[ns.e('mode-item')]">
        <slot>
          <!-- 点模式 -->
          <view
            v-if="stepMode === 'dot'"
            :class="[modeClass()]"
            :style="modeStyle()"
          />
          <!-- 数字模式 -->
          <view
            v-if="stepMode === 'number'"
            :class="[modeClass()]"
            :style="modeStyle()"
          >
            <view class="icon">
              <TnIcon name="check" />
            </view>
          </view>
          <!-- 点图标模式 -->
          <view
            v-if="stepMode === 'dotIcon'"
            :class="[modeClass()]"
            :style="modeStyle()"
          >
            <view
              class="dot"
              :class="[modeClass('dot')]"
              :style="modeStyle('dot')"
            />
            <view
              class="icon"
              :class="[modeClass('icon')]"
              :style="modeStyle('icon')"
            >
              <TnIcon :name="activeIcon" />
            </view>
          </view>
          <!-- 图标模式 -->
          <view
            v-if="stepMode === 'icon'"
            :class="[modeClass()]"
            :style="modeStyle()"
          >
            <view class="icon">
              <TnIcon :name="isActive ? activeIcon : icon" />
            </view>
          </view>
        </slot>
      </view>

      <!-- 标题 -->
      <view v-if="title" :class="[ns.e('mode-title')]">{{ title }}</view>
    </view>

    <!-- 横线 -->
    <view :class="[lineClass]" :style="lineStyle" />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/step.scss';
</style>
