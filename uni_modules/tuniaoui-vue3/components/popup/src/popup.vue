<script lang="ts" setup>
import TnOverlay from '../../overlay/src/overlay.vue'
import TnIcon from '../../icon/src/icon.vue'
import { popupEmits, popupProps } from './popup'
import { usePopup, usePopupCustomStyle } from './composables'

const props = defineProps(popupProps)
defineEmits(popupEmits)

const {
  showOverlay,
  showPopup,
  visiblePopup,
  overlayZIndex,
  zIndex,
  onClickCloseBtn,
  onClickOverlay,
} = usePopup(props)
const { ns, popupContentClass, popupContentStyle } = usePopupCustomStyle(props)
</script>

<template>
  <view
    :class="[ns.b(), ns.is('show', showPopup), ns.is('visible', visiblePopup)]"
    :style="{
      zIndex,
    }"
  >
    <!-- 遮罩层 -->
    <TnOverlay
      :show="showOverlay"
      :z-index="overlayZIndex"
      :opacity="overlayOpacity"
      @click="onClickOverlay"
    />

    <!-- 弹框内容 -->
    <view :class="[popupContentClass]" :style="popupContentStyle">
      <slot />

      <!-- 关闭按钮 -->
      <view
        v-if="closeBtn"
        :class="[ns.e('close-btn'), ns.em('close-btn', closeBtnPosition)]"
        @tap.stop="onClickCloseBtn"
      >
        <slot name="closeBtn">
          <TnIcon name="close" />
        </slot>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/popup.scss';
</style>
