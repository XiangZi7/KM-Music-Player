<script lang="ts" setup>
import TnIcon from '../../icon/src/icon.vue'
import { listEmits, listProps } from './list-item'
import { useListCustomStyle } from './composables'

const props = defineProps(listProps)
const emits = defineEmits(listEmits)

const { ns, listClass, listStyle, rightIconClass, rightIconStyle } =
  useListCustomStyle(props)

// list点击事件
const listClickEvent = () => {
  emits('click')
}
</script>

<template>
  <view
    :class="[listClass]"
    :style="listStyle"
    :hover-class="hoverClass"
    :hover-stay-time="150"
    @tap.stop="listClickEvent"
  >
    <!-- 内容 -->
    <view class="tn-text-ellipsis-1" :class="[ns.e('content')]">
      <slot />
    </view>

    <!-- 右图标 -->
    <view v-if="rightIcon" :class="rightIconClass" :style="rightIconStyle">
      <TnIcon :name="rightIcon" />
    </view>

    <!-- 底部边框 -->
    <view
      v-if="bottomBorder"
      :class="[ns.e('bottom-border'), ns.is('indent', bottomBorderIndent)]"
    />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/list.scss';
</style>
