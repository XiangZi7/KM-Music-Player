<script lang="ts" setup>
import { radioEmits, radioProps } from './radio'
import { useRadio, useRadioCustomStyle } from './composables'

const props = defineProps(radioProps)
const emits = defineEmits(radioEmits)

const { isGroup, modelValue, radioClickEvent } = useRadio(props, emits)
const { ns, radioClass, radioDotClass, radioStyle, radioDotStyle } =
  useRadioCustomStyle(props)
</script>

<template>
  <view
    :class="[radioClass(modelValue === label), { [ns.m('group')]: isGroup }]"
    :style="radioStyle(modelValue === label)"
    @tap.stop="radioClickEvent('label')"
  >
    <!-- 左边内容 -->
    <view
      v-if="$slots.left && !$slots.default"
      :class="[ns.em('content', 'left')]"
    >
      <slot name="left" />
    </view>
    <!-- 选中小点 -->
    <view
      :class="[radioDotClass(modelValue === label)]"
      :style="radioDotStyle(modelValue === label)"
      @tap.stop="radioClickEvent('radio')"
    />
    <!-- 右边内容 -->
    <view v-if="$slots.default" :class="[ns.em('content', 'right')]">
      <slot />
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/radio.scss';
</style>
