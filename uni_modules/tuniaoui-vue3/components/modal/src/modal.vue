<script lang="ts" setup>
import TnPopup from '../../popup/src/popup.vue'
import { modalProps } from './modal'
import { useModal, useModalCustomStyle } from './composables'

defineProps(modalProps)

const {
  openModal,
  showModal,
  title,
  content,
  showCancel,
  cancelText,
  confirmText,
  mask,
  maskClosable,
  cancelStyle,
  confirmStyle,
  clickCancel,
  clickConfirm,
} = useModal()
const { ns, operationBtnClass, operationBtnStyle } = useModalCustomStyle(
  cancelStyle,
  confirmStyle
)

defineExpose({
  /**
   * @description 打开模态框
   */
  showModal,
})
</script>

<template>
  <TnPopup
    v-model="openModal"
    open-direction="center"
    bg-color="transparent"
    radius="0"
    width="80%"
    :overlay="mask"
    :overlay-closeable="maskClosable"
    :z-index="zIndex"
  >
    <view :class="[ns.b()]">
      <view v-if="title" class="tn-text-ellipsis-1" :class="[ns.e('title')]">
        {{ title }}
      </view>
      <view :class="[ns.e('content')]">
        <slot>
          <view class="tn-gray_text" :class="[ns.em('content', 'text')]">
            {{ content }}
          </view>
        </slot>
      </view>
      <view :class="[ns.e('operation')]">
        <view
          v-if="showCancel"
          :class="[operationBtnClass('cancel')]"
          :style="operationBtnStyle('cancel')"
          hover-class="tn-u-btn-hover"
          :hover-stay-time="300"
          @tap.stop="clickCancel"
        >
          {{ cancelText }}
        </view>
        <view
          :class="[operationBtnClass('confirm')]"
          :style="operationBtnStyle('confirm')"
          hover-class="tn-u-btn-hover"
          :hover-stay-time="300"
          @tap.stop="clickConfirm"
        >
          {{ confirmText }}
        </view>
      </view>
    </view>
  </TnPopup>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/modal.scss';
</style>
