<script lang="ts" setup>
import TnSticky from '../../sticky/src/sticky.vue'
import { indexListEmits, indexListProps } from './index-list'
import { useIndexList, useIndexListCustomStyle } from './composables'

const props = defineProps(indexListProps)
const emits = defineEmits(indexListEmits)

const {
  componentContentClass,
  contentContainerHeight,
  keysData,
  listData,
  scrollViewTopValue,
  componentKeyListId,
  keyListTipsTopValue,
  currentTouchKeyIndex,
  currentTouchKeyValue,
  onKeyListTouchStart,
  onKeyListTouchMove,
  onKeyListTouchEnd,
} = useIndexList(props, emits)
const { ns, titleClass, titleStyle } = useIndexListCustomStyle(props)
</script>

// #ifdef MP-WEIXIN
<script lang="ts">
export default {
  options: {
    // 在微信小程序中将组件节点渲染为虚拟节点，更加接近Vue组件的表现(不会出现shadow节点下再去创建元素)
    virtualHost: true,
  },
}
</script>
// #endif

<template>
  <view :class="[ns.b()]" :style="{ height: `${contentContainerHeight}px` }">
    <!-- 列表内容 -->
    <scroll-view
      :class="[ns.e('scroll-view')]"
      scroll-y
      :scroll-top="scrollViewTopValue"
    >
      <view
        :style="{
          paddingTop: `${stickyOffsetTop || 0}px`,
        }"
      >
        <view
          v-for="(item, index) in listData"
          :key="index"
          :class="[componentContentClass]"
        >
          <TnSticky :offset-top="stickyOffsetTop">
            <view :class="[titleClass]" :style="titleStyle">
              {{ item.title }}
            </view>
          </TnSticky>
          <view :class="[ns.e('content')]">
            <view
              v-for="(dataItem, dataIndex) in item.data"
              :key="dataIndex"
              :class="[ns.e('content-item')]"
            >
              <slot :data="dataItem" />
            </view>
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- 右侧索引 -->
    <view
      v-if="showKeysList"
      :id="componentKeyListId"
      :class="[ns.e('key-list')]"
      @touchstart.stop.prevent="onKeyListTouchStart"
      @touchmove.stop.prevent="onKeyListTouchMove"
      @touchend.stop.prevent="onKeyListTouchEnd"
    >
      <view
        v-for="(item, index) in keysData"
        :key="index"
        :class="[ns.e('key-list-value'), 'key-value']"
      >
        {{ item }}
      </view>

      <!-- 提示框 -->
      <view
        v-if="currentTouchKeyIndex !== -1"
        :class="[ns.e('key-list-tips-value')]"
        :style="{ top: `${keyListTipsTopValue}px` }"
      >
        {{ currentTouchKeyValue }}
        <view class="auxiliary-element" />
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/index-list.scss';
</style>
