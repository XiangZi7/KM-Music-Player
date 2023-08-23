<script lang="ts" setup>
import TnIcon from '../../icon/src/icon.vue'
import { useNamespace } from '../../../hooks'
import TnColumnNoticeBar from './column-notice-bar.vue'
import TnRowNoticeBar from './row-notice-bar.vue'
import { noticeBarEmits, noticeBarProps } from './notice-bar'
import { useNoticeBar, useNoticeBarCommonProps } from './composables'

const props = defineProps(noticeBarProps)
const emits = defineEmits(noticeBarEmits)

const ns = useNamespace('notice-bar')

const { showNoticeBar, leftIconClick, rightIconClick } = useNoticeBar(
  props,
  emits
)
const { commonClass, commonStyle } = useNoticeBarCommonProps(props)
</script>

<template>
  <view
    v-if="showNoticeBar"
    :class="[ns.b(), commonClass('normal')]"
    :style="commonStyle('normal')"
  >
    <!-- 左图标 -->
    <view
      v-if="leftIcon"
      :class="[ns.e('left-icon'), commonClass('leftIcon')]"
      :style="commonStyle('leftIcon')"
      @tap.stop="leftIconClick"
    >
      <TnIcon :name="leftIcon" />
    </view>

    <!-- 内容 -->
    <view :class="[ns.e('content')]">
      <TnColumnNoticeBar
        v-if="direction === 'vertical' || (direction === 'horizontal' && !loop)"
      />
      <TnRowNoticeBar v-else />
    </view>

    <!-- 右图标 -->
    <view
      v-if="rightIcon"
      :class="[ns.e('right-icon'), commonClass('rightIcon')]"
      :style="commonStyle('rightIcon')"
      @tap.stop="rightIconClick"
    >
      <TnIcon :name="rightIcon" />
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/notice-bar.scss';
</style>
