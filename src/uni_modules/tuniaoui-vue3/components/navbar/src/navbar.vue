<script lang="ts" setup>
import { nextTick, onMounted } from 'vue'
import TnIcon from '../../icon/src/icon.vue'
import { navBarProps, navbarEmits } from './navbar'
import { useNavbar, useNavbarCustomStyle } from './composables'

const props = defineProps(navBarProps)
const emits = defineEmits(navbarEmits)

const { navbackButtonType, clickBackEvent, clickHomeEvent } = useNavbar(props)
const {
  ns,
  backNs,
  navBarInfo,
  navbarClass,
  navbarStyle,
  navbarBgClass,
  navbarBgStyle,
  navbarPlaceholderStyle,
  navbarWrapperStyle,
  backStyle,
  contentStyle,
} = useNavbarCustomStyle(props, navbackButtonType)

// 动态调用是返回首页还是返回上一页
const backEvent = (type: 'back' | 'home') => {
  if (type === 'back') {
    clickBackEvent()
  } else {
    clickHomeEvent()
  }
}

// 组件初始化完成
onMounted(() => {
  nextTick(() => {
    emits('initFinish', navBarInfo)
  })
})
</script>

<template>
  <view :class="[navbarClass]" :style="navbarStyle">
    <!-- 背景颜色 -->
    <view :class="navbarBgClass" :style="navbarBgStyle" />
    <!-- 容器 -->
    <view :class="[ns.e('wrapper')]" :style="navbarWrapperStyle">
      <!-- 返回按钮区域 -->
      <view
        v-if="navbackButtonType !== 'none'"
        :class="[backNs.b()]"
        :style="backStyle"
      >
        <slot name="back">
          <!-- 双图标 -->
          <view
            v-if="navbackButtonType === 'multi'"
            :class="[backNs.e('multi')]"
          >
            <view :class="[backNs.e('multi__item')]" @tap.stop="clickBackEvent">
              <TnIcon :name="props.backIcon" />
            </view>
            <view :class="[backNs.e('multi__item')]" @tap.stop="clickHomeEvent">
              <TnIcon :name="props.homeIcon" />
            </view>
          </view>

          <!-- 单图标 -->
          <view
            v-if="navbackButtonType === 'single'"
            :class="[backNs.e('single')]"
            @tap.stop="backEvent(props.backIcon ? 'back' : 'home')"
          >
            <TnIcon v-if="props.backIcon" :name="props.backIcon" />
            <TnIcon v-else-if="props.homeIcon" :name="props.homeIcon" />
          </view>

          <!-- 文字返回 -->
          <view
            v-if="navbackButtonType === 'text'"
            :class="[backNs.e('text')]"
            @tap.stop="clickBackEvent"
          >
            <view :class="[backNs.e('text__icon')]">
              <TnIcon :name="backIcon || 'left'" />
            </view>
            <view class="tn-text-ellipsis-1" :class="[backNs.e('text__value')]">
              {{ backText || '返回' }}
            </view>
          </view>
        </slot>
      </view>

      <!-- 内容数据 -->
      <view
        v-if="$slots.default"
        :class="[
          ns.e('content'),
          {
            [ns.em('content', 'center')]: props.center,
          },
        ]"
        :style="contentStyle"
      >
        <slot />
      </view>
    </view>
  </view>
  <!-- 固定之后会导致容器塌陷 -->
  <view
    v-if="fixed && placeholder"
    :class="[ns.e('placeholder')]"
    :style="navbarPlaceholderStyle"
  />
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/navbar.scss';
</style>
