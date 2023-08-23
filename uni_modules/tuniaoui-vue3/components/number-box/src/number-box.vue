<script lang="ts" setup>
import TnIcon from '../../icon/src/icon.vue'
import { numberBoxEmits, numberBoxProps } from './number-box'
import { useNumberBox, useNumberBoxCustomStyle } from './composables'

const props = defineProps(numberBoxProps)
defineEmits(numberBoxEmits)

const {
  inputValue,
  handleOperationEvent,
  clearLongPressTimer,
  numberBoxInputEvent,
} = useNumberBox(props)
const {
  ns,
  numberBoxClass,
  numberBoxStyle,
  numberBoxOperationWrapperClass,
  numberBoxOperationWrapperStyle,
} = useNumberBoxCustomStyle(props, inputValue)
</script>

<template>
  <view :class="[numberBoxClass]" :style="numberBoxStyle">
    <!-- 减操作按钮 -->
    <view
      :class="[
        ns.e('operation-btn'),
        ns.em('operation-btn', 'minus'),
        numberBoxOperationWrapperClass('minus'),
      ]"
      :style="numberBoxOperationWrapperStyle('minus')"
      hover-class="tn-u-btn-hover"
      :hover-stay-time="250"
      @touchstart.stop.prevent="handleOperationEvent('minus')"
      @touchend.stop.prevent="clearLongPressTimer"
    >
      <slot name="minus">
        <TnIcon name="reduce" />
      </slot>
    </view>

    <!-- 输入框 -->
    <view
      :class="[ns.e('input'), numberBoxOperationWrapperClass('input')]"
      :style="numberBoxOperationWrapperStyle('input')"
    >
      <input
        v-model.number="inputValue"
        type="digit"
        :disabled="disabled || inputDisabled"
        @input="numberBoxInputEvent"
      />
    </view>

    <!-- 加操作按钮 -->
    <view
      :class="[
        ns.e('operation-btn'),
        ns.em('operation-btn', 'plus'),
        numberBoxOperationWrapperClass('plus'),
      ]"
      :style="numberBoxOperationWrapperStyle('plus')"
      hover-class="tn-u-btn-hover"
      :hover-stay-time="250"
      @touchstart.stop.prevent="handleOperationEvent('plus')"
      @touchend.stop.prevent="clearLongPressTimer"
    >
      <slot name="plus">
        <TnIcon name="add" />
      </slot>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/number-box.scss';
</style>
