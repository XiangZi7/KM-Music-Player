<script lang="ts" setup>
import TnOverlay from '../../overlay/src/overlay.vue'
import TnIcon from '../../icon/src/icon.vue'
import { bubbleBoxEmits, bubbleBoxProps } from './bubble-box'
import {
  useBubbleBox,
  useBubbleBoxCustomStyle,
  useBubbleOptions,
} from './composables'

const props = defineProps(bubbleBoxProps)
const emits = defineEmits(bubbleBoxEmits)

const {
  showBubble,
  openBubbleOptions,
  closeBubbleOptions,
  bubbleOptionClickEvent,
} = useBubbleBox(props, emits)
const {
  ns,
  optionsClass,
  optionsStyle,
  optionsAuxiliaryElementClass,
  optionsAuxiliaryElementStyle,
  optionItemClass,
  optionItemStyle,
} = useBubbleBoxCustomStyle(props, showBubble)
const { bubbleOptions } = useBubbleOptions(props)
</script>

<template>
  <view :class="[ns.b()]">
    <!-- 遮罩 -->
    <TnOverlay
      :show="showBubble"
      :opacity="0"
      :z-index="zIndex - 1"
      @click="closeBubbleOptions"
    />
    <!-- 内容 -->
    <view :class="[ns.e('content')]" @tap.stop="openBubbleOptions">
      <slot />
      <!-- 气泡弹框选项 -->
      <view :class="[optionsClass]" :style="optionsStyle">
        <!-- 小三角 -->
        <view
          :class="[optionsAuxiliaryElementClass]"
          :style="optionsAuxiliaryElementStyle"
        />
        <!-- 选项内容 -->
        <scroll-view class="scroll-view" scroll-y>
          <view class="options-content">
            <view
              v-for="(item, index) in bubbleOptions"
              :key="index"
              :class="[optionItemClass(item)]"
              :style="optionItemStyle(item)"
              @tap.stop="bubbleOptionClickEvent(item, index)"
            >
              <view v-if="item.icon" class="icon">
                <TnIcon :name="item.icon" />
              </view>
              <view class="text">{{ item.text }}</view>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/bubble-box.scss';
</style>
