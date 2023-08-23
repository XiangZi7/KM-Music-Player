<script lang="ts" setup>
import TnIcon from '../../icon/src/icon.vue'
import { inputEmits, inputProps } from './input'
import { useInput, useInputCustomStyle } from './composables'

const props = defineProps(inputProps)
const emits = defineEmits(inputEmits)

const {
  inputText,
  validateState,
  validateIcon,
  passwordVisible,
  passwordIcon,
  showIcon,
  disabled,
  togglePasswordVisible,
  inputInputEvent,
  inputFocusEvent,
  inputBlurEvent,
  clearClickEvent,
  confirmEvent,
  inputClickEvent,
} = useInput(props, emits)
const { ns, inputClass, inputStyle, placeholderStyle } = useInputCustomStyle(
  props,
  validateState,
  disabled
)
</script>

<template>
  <view
    :class="[
      inputClass,
      `${type === 'textarea' ? ns.m('textarea') : ns.m('input')}`,
    ]"
    :style="inputStyle"
    @tap="inputClickEvent"
  >
    <view v-if="$slots.prefix" :class="[ns.em('slot', 'left')]">
      <slot name="prefix" />
    </view>
    <!-- 文本域 -->
    <textarea
      v-if="type === 'textarea'"
      :class="[
        ns.e('base'),
        ns.e('textarea'),
        ns.is('custom-height', !!height),
      ]"
      :value="inputText"
      :placeholder="placeholder"
      :placeholder-style="placeholderStyle"
      :disabled="disabled"
      :maxlength="maxlength"
      :focus="focus"
      :confirm-type="confirmType"
      :auto-height="!height && autoHeight"
      :selection-start="selectionStart"
      :selection-end="selectionEnd"
      :cursor-spacing="cursorSpacing"
      :show-confirm-bar="showConfirmBar"
      @input="inputInputEvent"
      @focus="inputFocusEvent"
      @blur="inputBlurEvent"
      @confirm="confirmEvent"
    />

    <!-- 文本框 -->
    <input
      v-else
      :class="[ns.e('base'), ns.e('input')]"
      :type="type === 'password' ? 'text' : type"
      :value="inputText"
      :placeholder="placeholder"
      :password="type === 'password' && !passwordVisible"
      :placeholder-style="placeholderStyle"
      :disabled="disabled || type === 'select'"
      :maxlength="maxlength"
      :focus="focus"
      :confirm-type="confirmType"
      :selection-start="selectionStart"
      :selection-end="selectionEnd"
      :cursor-spacing="cursorSpacing"
      :show-confirm-bar="showConfirmBar"
      @input="inputInputEvent"
      @focus="inputFocusEvent"
      @blur="inputBlurEvent"
      @confirm="confirmEvent"
    />
    <!-- 图标 -->
    <view v-if="showIcon" :class="[ns.e('icon')]">
      <!-- 右边图标 -->
      <view v-if="rightIcon" :class="[ns.em('icon', 'custom')]">
        <TnIcon :name="rightIcon" />
      </view>
      <!-- 密码显示/隐藏 -->
      <view
        v-if="type === 'password' && showPassword"
        :class="[ns.em('icon', 'password')]"
        @tap.stop="togglePasswordVisible"
      >
        <TnIcon :name="passwordIcon" />
      </view>
      <!-- 清除按钮 -->
      <view
        v-else-if="clearable && inputText"
        :class="[ns.em('icon', 'clear')]"
        @tap.stop="clearClickEvent"
      >
        <TnIcon name="close" />
      </view>
      <!-- 错误提示图标 -->
      <view
        v-if="validateState && validateIcon"
        :class="[ns.em('icon', `validate-${validateState}`)]"
      >
        <TnIcon :name="validateIcon" />
      </view>
    </view>
    <view v-if="$slots.suffix" :class="[ns.em('slot', 'right')]">
      <slot name="suffix" />
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/input.scss';
</style>
