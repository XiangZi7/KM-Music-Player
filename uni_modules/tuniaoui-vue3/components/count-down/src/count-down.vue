<script lang="ts" setup>
import { countDownEmits, countDownProps } from './count-down'
import {
  useCountDown,
  useCountDownCustomStyle,
  useCountDownSeparatorData,
} from './composables'

const props = defineProps(countDownProps)
const emits = defineEmits(countDownEmits)

const {
  day,
  hour,
  minute,
  second,
  startCountDown,
  stopCountDown,
  resetCountDown,
} = useCountDown(props, emits)
const {
  countDownClass,
  countDownStyle,
  textClass,
  textStyle,
  separatorClass,
  separatorStyle,
} = useCountDownCustomStyle(props)
const { getSeparatorData } = useCountDownSeparatorData()

defineExpose({
  /**
   * @description 开始倒计时
   */
  start: startCountDown,
  /**
   * @description 停止倒计时
   */
  stop: stopCountDown,
  /**
   * @description 重置倒计时
   */
  reset: resetCountDown,
})
</script>

<template>
  <view :class="[countDownClass]" :style="countDownStyle">
    <!-- 日 -->
    <template v-if="day">
      <view class="day" :class="[textClass]" :style="textStyle">{{ day }}</view>
      <view class="day" :class="[separatorClass]" :style="separatorStyle">
        {{ getSeparatorData(separatorMode, 'day') }}
      </view>
    </template>
    <!-- 时 -->
    <template v-if="hour">
      <view class="hour" :class="[textClass]" :style="textStyle">
        {{ hour }}
      </view>
      <view class="hour" :class="[separatorClass]" :style="separatorStyle">
        {{ getSeparatorData(separatorMode, 'hour') }}
      </view>
    </template>
    <!-- 分 -->
    <template v-if="minute">
      <view class="minute" :class="[textClass]" :style="textStyle">
        {{ minute }}
      </view>
      <view class="minute" :class="[separatorClass]" :style="separatorStyle">
        {{ getSeparatorData(separatorMode, 'minute') }}
      </view>
    </template>
    <!-- 秒 -->
    <template v-if="second">
      <view class="second" :class="[textClass]" :style="textStyle">
        {{ second }}
      </view>
      <view
        v-if="getSeparatorData(separatorMode, 'second')"
        class="minute"
        :class="[separatorClass]"
        :style="separatorStyle"
      >
        {{ getSeparatorData(separatorMode, 'second') }}
      </view>
    </template>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/count-down.scss';
</style>
