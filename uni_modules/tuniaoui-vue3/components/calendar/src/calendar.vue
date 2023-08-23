<script lang="ts" setup>
import TnIcon from '../../icon/src/icon.vue'
import { calendarEmits, calendarProps } from './calendar'
import { useCalendar, useCalendarCustomStyle } from './composables'

const props = defineProps(calendarProps)
const emit = defineEmits(calendarEmits)

const {
  calendarId,
  dateContainerHeight,
  calendarData,
  weekText,
  currentMonthIndex,
  currentSelectedDate,
  minDate,
  maxDate,
  swiperSwitchMonthEvent,
  swiperSwitchMonthAnimationFinishEvent,
  dateItemClickEvent,
  switchMonth,
  switchYear,
} = useCalendar(props, emit)
const { ns, itemClass, itemStyle } = useCalendarCustomStyle(props)
</script>

<template>
  <view :id="calendarId" :class="[ns.b(), ns.m(mode)]">
    <!-- 操作区域 -->
    <view :class="[ns.e('operation')]">
      <!-- 年切换按钮 -->
      <view
        v-if="allowChangeYear && currentSelectedDate.year !== minDate.year"
        :class="[ns.e('operation__year-btn')]"
        @tap.stop="switchYear('prev')"
      >
        <TnIcon name="left-triangle" />
      </view>
      <!-- 年月显示 -->
      <view :class="[ns.e('operation__value')]">
        {{ currentSelectedDate.year }}年
      </view>
      <!-- 年切换按钮 -->
      <view
        v-if="allowChangeYear && currentSelectedDate.year !== maxDate.year"
        :class="[ns.e('operation__year-btn')]"
        @tap.stop="switchYear('next')"
      >
        <TnIcon name="right-triangle" />
      </view>
    </view>

    <!-- 星期文字提示 -->
    <view :class="[ns.e('week-text')]">
      <view
        v-for="(item, index) in weekText"
        :key="index"
        :class="[ns.e('week-text__item')]"
      >
        {{ item }}
      </view>
    </view>

    <!-- 数据展示区域 -->
    <view
      :class="[ns.e('data')]"
      :style="{
        height: `${dateContainerHeight ? `${dateContainerHeight}px` : 'auto'}`,
      }"
    >
      <!-- 月份背景 -->
      <view :class="[ns.e('data__month-bg')]">
        {{ currentSelectedDate.month }}
      </view>
      <!-- 月份切换按钮 -->
      <view
        v-if="
          allowChangeMonth &&
          !(
            (currentSelectedDate.year === minDate.year &&
              currentSelectedDate.month === minDate.month) ||
            currentSelectedDate.month === 1
          )
        "
        class="left"
        :class="[ns.e('data__month-btn')]"
        @tap.stop="switchMonth('prev')"
      >
        <TnIcon name="left" />
      </view>
      <view
        v-if="
          allowChangeMonth &&
          !(
            (currentSelectedDate.year === maxDate.year &&
              currentSelectedDate.month === maxDate.month) ||
            currentSelectedDate.month === 12
          )
        "
        class="right"
        :class="[ns.e('data__month-btn')]"
        @tap.stop="switchMonth('next')"
      >
        <TnIcon name="right" />
      </view>
      <swiper
        :class="[ns.e('data__swiper')]"
        :current="currentMonthIndex"
        :indicator-dots="false"
        :autoplay="false"
        :circular="false"
        adjust-height="none"
        @change="swiperSwitchMonthEvent"
        @animationfinish="swiperSwitchMonthAnimationFinishEvent"
      >
        <swiper-item
          v-for="(item, index) in calendarData"
          :key="index"
          :class="[ns.e('data__swiper-item')]"
        >
          <view :class="[ns.e('data__dates')]">
            <view
              v-for="(dateItem, dateIndex) in item.data"
              :key="dateIndex"
              :class="[ns.e('data__date'), itemClass(dateItem.status)]"
              :style="itemStyle(dateItem.status)"
            >
              <view
                v-if="dateItem.date != 0"
                :class="[ns.e('data__date__content')]"
                @tap.stop="dateItemClickEvent(dateItem)"
              >
                <view class="date">{{ dateItem.date }}</view>
                <view v-if="dateItem.desc" class="desc">
                  {{ dateItem.desc }}
                </view>
              </view>
            </view>
          </view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/calendar.scss';
</style>
