<script lang="ts" setup>
import TnLoading from '../../loading/src/loading.vue'
import { isEmptyVariableInDefault } from '../../../utils'
import { loadmoreEmits, loadmoreProps } from './loadmore'
import { useLoadmoreCustomStyle } from './composables'

const props = defineProps(loadmoreProps)
const emits = defineEmits(loadmoreEmits)

const { ns, loadmoreClass, loadmoreStyle, dotClass, dotStyle } =
  useLoadmoreCustomStyle(props)

// loadmore点击事件
const loadMoreClickEvent = () => {
  emits('click')
}
</script>

<template>
  <view
    :class="[loadmoreClass]"
    :style="loadmoreStyle"
    @tap.stop="loadMoreClickEvent"
  >
    <view :class="[ns.e('content')]">
      <!-- 加载图标 -->
      <TnLoading
        v-if="status === 'loading' && loadingIcon"
        show
        animation
        :mode="loadingIconMode"
        :size="size"
        :color="isEmptyVariableInDefault(color, 'tn-gray')"
      />
      <view v-if="loadingText" :class="[ns.e('text')]">
        <!-- 加载更多文案 -->
        <text
          v-if="status === 'loadmore' && text?.loadmore"
          :class="[ns.em('text', 'loadmore')]"
        >
          {{ text.loadmore }}
        </text>
        <!-- 加载文案 -->
        <text
          v-if="status === 'loading' && text?.loading"
          :class="[ns.em('text', 'loading')]"
        >
          {{ text.loading }}
        </text>
        <!-- 加载完成文案 -->
        <text
          v-if="status === 'nomore' && text?.nomore"
          :class="[ns.em('text', 'nomore')]"
        >
          {{ text.nomore }}
        </text>
        <!-- 数据为空 -->
        <text
          v-if="status === 'empty' && text?.empty"
          :class="[ns.em('text', 'empty')]"
        >
          {{ text.empty }}
        </text>
      </view>

      <!-- 显示点替代内容 -->
      <view
        v-if="
          (!loadingText && status !== 'loading') ||
          (status === 'loading' && !loadingIcon && !loadingText)
        "
        :class="[dotClass]"
        :style="dotStyle"
      />
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/loadmore.scss';
</style>
