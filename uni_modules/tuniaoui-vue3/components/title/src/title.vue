<script lang="ts" setup>
import { titleEmits, titleProps } from './title'
import { useTitleCustomStyle } from './composables'

const props = defineProps(titleProps)
const emits = defineEmits(titleEmits)

const { ns, titleClass, titleStyle, assistColorClass, assistColorStyle } =
  useTitleCustomStyle(props)

// 标题点击事件
const titleClickEvent = () => {
  emits('click')
}
</script>

<template>
  <view :class="[ns.b()]" @tap.stop="titleClickEvent">
    <!-- 内容 -->
    <view class="tn-text-ellipsis-1" :class="[titleClass]" :style="titleStyle">
      <slot>
        <view class="content tn-text-ellipsis-1">
          {{ title }}
        </view>
      </slot>
      <!-- 辅助元素 -->
      <view
        v-if="mode !== 'normal' && mode !== 'transparent'"
        :class="[ns.e(mode), assistColorClass]"
        :style="assistColorStyle"
      >
        <template v-if="mode === 'subTitle' && subTitle">
          {{ subTitle }}
        </template>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/title.scss';
</style>
