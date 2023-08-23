<script lang="ts" setup>
import TnIcon from '../../icon/src/icon.vue'
import { weekCalendarEmits, weekCalendarProps } from './week-calendar'
import { useWeekCalendar, useWeekCalendarCustomStyle } from './composables'

const props = defineProps(weekCalendarProps)
const emits = defineEmits(weekCalendarEmits)

const {
  componentDateItemId,
  dateItemContainerHeight,
  weekCalendarData,
  weekText,
  currentSwiperIndex,
  dateItemClick,
  switchWeek,
  swiperChangeWeek,
} = useWeekCalendar(props, emits)
const { ns, itemClass, itemStyle } = useWeekCalendarCustomStyle(props)
</script>

<template>
  <view :class="[ns.b()]">
    <!-- 星期中文数据 -->
    <view :class="[ns.e('weeks')]">
      <view
        v-for="(item, index) in weekText"
        :key="index"
        :class="[ns.e('week')]"
      >
        {{ item }}
      </view>
    </view>

    <!-- 周日历数据 -->
    <view
      :class="[ns.e('data')]"
      :style="{
        height: `${
          dateItemContainerHeight ? `${dateItemContainerHeight}px` : 'auto'
        }`,
      }"
    >
      <!-- 星期切换 -->
      <view
        v-if="currentSwiperIndex > 0"
        class="left"
        :class="[ns.e('data__week-btn')]"
        @tap.stop="switchWeek('prev')"
      >
        <TnIcon name="left" />
      </view>
      <view
        v-if="currentSwiperIndex < weekCalendarData.length - 1"
        class="right"
        :class="[ns.e('data__week-btn')]"
        @tap.stop="switchWeek('next')"
      >
        <TnIcon name="right" />
      </view>
      <swiper
        :class="[ns.e('data__swiper')]"
        :indicator-dots="false"
        :autoplay="false"
        :circular="false"
        :current="currentSwiperIndex"
        @change="swiperChangeWeek"
      >
        <swiper-item
          v-for="(item, index) in weekCalendarData"
          :key="index"
          :class="[ns.e('data__swiper-item')]"
        >
          <view :class="[ns.e('data__dates')]">
            <template v-for="(dateItem, dateIndex) in item" :key="dateIndex">
              <view
                :id="`${componentDateItemId}-${index}-${dateIndex}`"
                :class="[ns.e('data__date')]"
                @tap.stop="dateItemClick(dateItem)"
              >
                <view
                  class="date"
                  :class="[itemClass(dateItem.status)]"
                  :style="itemStyle(dateItem.status)"
                >
                  <view v-if="dateItem.date" class="date-value">
                    <view class="value">
                      {{ dateItem.date }}
                    </view>
                    <view class="desc">
                      {{ dateItem.desc }}
                    </view>
                  </view>
                </view>
              </view>
            </template>
          </view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/week-calendar.scss';
</style>
