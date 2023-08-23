<script lang="ts" setup>
import { useNamespace } from '../../../hooks'
import TnPopup from '../../popup/src/popup.vue'
import { actionSheetProps } from './action-sheet'
import { useActionSheet } from './composables'

defineProps(actionSheetProps)

const ns = useNamespace('action-sheet')

const {
  data,
  showTitle,
  title,
  showCancel,
  cancelText,
  overlay,
  openPopup,
  showActionSheet,
  popupCloseEvent,
  actionClickEvent,
} = useActionSheet()

defineExpose({
  /**
   * @description: 打开/显示 actionSheet 操作菜单
   */
  show: showActionSheet,
})
</script>

<template>
  <TnPopup
    :model-value="openPopup"
    open-direction="bottom"
    :overlay="overlay"
    :z-index="zIndex"
    bg-color="transparent"
    :safe-area-inset-bottom="false"
    @close="popupCloseEvent"
  >
    <view class="tn-u-safe-area" :class="[ns.b(), ns.is('shadow', !overlay)]">
      <!-- 标题 -->
      <view v-if="showTitle" :class="[ns.e('title')]">
        <slot name="title">
          {{ title }}
        </slot>
      </view>

      <!-- 选项 -->
      <view :class="[ns.e('actions')]">
        <view
          v-for="(item, index) in data"
          :key="index"
          :class="[ns.e('action')]"
          hover-class="tn-u-btn-hover"
          :hover-stay-time="150"
          @tap.stop="actionClickEvent(index)"
        >
          <!-- 选项显示内容 -->
          <view class="text">{{ item.text }}</view>
          <!-- 选项描述 -->
          <view v-if="item.desc" class="desc">{{ item.desc }}</view>
        </view>
      </view>

      <!-- 取消按钮 -->
      <view
        v-if="showCancel"
        :class="[ns.e('cancel')]"
        hover-class="tn-u-btn-hover"
        :hover-stay-time="150"
        @tap.stop="popupCloseEvent"
      >
        <slot name="cancel">
          {{ cancelText }}
        </slot>
      </view>
    </view>
  </TnPopup>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/action-sheet.scss';
</style>
