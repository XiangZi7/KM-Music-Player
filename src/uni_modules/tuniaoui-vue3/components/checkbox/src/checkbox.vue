<script lang="ts" setup>
import TnIcon from '../../icon/src/icon.vue'
import { checkboxEmits, checkboxProps } from './checkbox'
import { useCheckbox, useCheckboxCustomStyle } from './composables'

const props = defineProps(checkboxProps)
defineEmits(checkboxEmits)

const { isGroup, selected, handleCheckboxClick } = useCheckbox(props)

const {
  ns,
  checkboxClass,
  checkboxStyle,
  checkboxCheckedBoxClass,
  checkboxCheckedBoxStyle,
} = useCheckboxCustomStyle(Object.assign(props))
</script>

<template>
  <view
    :class="[checkboxClass(selected), { [ns.m('group')]: isGroup }]"
    :style="checkboxStyle(selected)"
    @tap.stop="handleCheckboxClick('label')"
  >
    <!-- 左边内容 -->
    <view
      v-if="$slots.left && !$slots.default"
      :class="[ns.em('content', 'left')]"
    >
      <slot name="left" />
    </view>
    <!-- 选择框 -->
    <view
      :class="[
        checkboxCheckedBoxClass(selected),
        { [ns.em('checked-box', 'indeterminate')]: !selected && indeterminate },
      ]"
      :style="checkboxCheckedBoxStyle(selected)"
      @tap.stop="handleCheckboxClick('checkbox')"
    >
      <TnIcon v-if="selected" name="check" />
    </view>
    <!-- 右边内容 -->
    <view v-if="$slots.default" :class="[ns.em('content', 'right')]">
      <slot />
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/checkbox.scss';
</style>
