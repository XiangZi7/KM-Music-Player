<script lang="ts" setup>
import TnPopup from '../../popup/src/popup.vue'
import TnIcon from '../../icon/src/icon.vue'
import { useNamespace } from '../../../hooks'
import { keyboardEmits, keyboardProps } from './keyboard'
import { useKeyboard, useKeyboardData } from './composables'

const props = defineProps(keyboardProps)
const emits = defineEmits(keyboardEmits)

const ns = useNamespace('keyboard')

const {
  showKeyboard,
  carKeyboardLang,
  popupCloseEvent,
  keyboardClickEvent,
  handleBackspaceEvent,
  clearBackspaceLongPressEvent,
  carKeyboardSwitchLang,
} = useKeyboard(props, emits)
const { keyboardData, carKeyboardData } = useKeyboardData(
  props,
  carKeyboardLang
)
</script>

<template>
  <TnPopup
    v-model="showKeyboard"
    open-direction="bottom"
    bg-color="transparent"
    radius=""
    overlay
    :overlay-opacity="0"
    :overlay-closeable="overlayCloseable"
    :safe-area-inset-bottom="false"
    :z-index="zIndex"
    @close="popupCloseEvent"
  >
    <view class="tn-u-safe-area" :class="[ns.b(), ns.e(mode)]">
      <!-- 普通键盘 -->
      <template v-if="mode !== 'car'">
        <!-- 左边操作区域 -->
        <view class="left" :class="ns.e('normal-container')">
          <view
            v-for="(item, index) in keyboardData"
            :key="index"
            class="normal-item"
            :class="[
              {
                full: keyboardData.length === 10 && index === 9,
                fill: keyboardData.length === 11 && index === 9,
                disabled: item.disabled,
              },
            ]"
            :hover-class="item.disabled ? '' : 'keyboard-btn-hover'"
            :hover-stay-time="150"
            @tap.stop="keyboardClickEvent(item.value, item.disabled)"
          >
            {{ item.value }}
          </view>
        </view>
        <!-- 右边操作区域 -->
        <view class="right" :class="ns.e('normal-container')">
          <view
            class="normal-item delete"
            hover-class="keyboard-btn-hover"
            :hover-stay-time="150"
            @touchstart.stop.prevent="handleBackspaceEvent"
            @touchend.stop.prevent="clearBackspaceLongPressEvent"
          >
            <TnIcon name="backspace-fill" />
          </view>
          <view
            class="normal-item confirm"
            hover-class="keyboard-btn-hover"
            :hover-stay-time="150"
            @tap.stop="keyboardClickEvent('confirm', false)"
          >
            确认
          </view>
        </view>
      </template>

      <!-- 汽车键盘 -->
      <template v-if="mode === 'car'">
        <!-- 顶部操作栏 -->
        <view :class="[ns.e('car-top-operation-bar')]">
          <view
            class="operation-btn cancel"
            @tap.stop="keyboardClickEvent('cancel', false)"
          >
            取消
          </view>
          <view
            class="operation-btn confirm"
            @tap.stop="keyboardClickEvent('confirm', false)"
          >
            确认
          </view>
        </view>
        <view :class="[ns.e('car-container')]">
          <!-- 行数据 -->
          <view
            v-for="(item, index) in carKeyboardData"
            :key="index"
            class="column-data"
          >
            <!-- 如果是最后一行，显示切换按钮 -->
            <view
              v-if="index === 3"
              class="car-item switch-mode"
              hover-class="keyboard-btn-hover"
              :hover-stay-time="150"
              @tap.stop="carKeyboardSwitchLang"
            >
              {{ carKeyboardLang === 'cn' ? 'ABC' : '返回' }}
            </view>

            <!-- 列数据 -->
            <view
              v-for="(rowData, rowIndex) in item"
              :key="rowIndex"
              class="car-item"
              :class="[{ disabled: rowData.disabled }]"
              :hover-class="rowData.disabled ? '' : 'keyboard-btn-hover'"
              :hover-stay-time="150"
              @tap.stop="keyboardClickEvent(rowData.value, rowData.disabled)"
            >
              {{ rowData.value }}
            </view>

            <!-- 如果是最后一行，显示删除按钮 -->
            <view
              v-if="index === 3"
              class="car-item delete"
              hover-class="keyboard-btn-hover"
              :hover-stay-time="150"
              @touchstart.stop.prevent="handleBackspaceEvent"
              @touchend.stop.prevent="clearBackspaceLongPressEvent"
            >
              <TnIcon name="backspace-fill" />
            </view>
          </view>
        </view>
      </template>
    </view>
  </TnPopup>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/keyboard.scss';
</style>

<style>
/* 按钮点击效果 */
.keyboard-btn-hover {
  box-shadow: inset 0rpx 0rpx 30rpx 2rpx rgba(0, 0, 0, 0.8);
  opacity: 0.8;
}
</style>
