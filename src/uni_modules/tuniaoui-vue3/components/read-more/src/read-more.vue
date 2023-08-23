<script lang="ts" setup>
import TnIcon from '../../icon/src/icon.vue'
import { readMoreEmits, readMoreProps } from './read-more'
import { useReadMore, useReadMoreCustomStyle } from './composables'

const props = defineProps(readMoreProps)
const emits = defineEmits(readMoreEmits)

const {
  componentContentId,
  showOperationArea,
  foldOperationAreaHeight,
  containerHeight,
  expandStatus,
  toggleExpandStatus,
  resetContentHeight,
} = useReadMore(props, emits)
const { ns, operationAreaClass, operationAreaStyle } =
  useReadMoreCustomStyle(props)

defineExpose({
  /**
   * @description 重新设置内容容器的高度
   */
  resetContentHeight,
})
</script>

<template>
  <view :class="[ns.b()]" :style="{ height: containerHeight }">
    <!-- 内容区域 -->
    <view :id="componentContentId" :class="[ns.e('content')]">
      <slot />
    </view>

    <!-- 操作区域 -->
    <view
      v-if="showOperationArea"
      :class="[
        operationAreaClass,
        expandStatus ? ns.is('fold') : ns.is('expand'),
      ]"
      :style="operationAreaStyle"
      @tap.stop="toggleExpandStatus"
    >
      <template v-if="!expandStatus">
        <slot name="expand">
          <view class="expand" :class="[ns.e('operation-content')]">
            <view class="text">{{ expandText }}</view>
            <view class="icon">
              <TnIcon :name="expandIcon" />
            </view>
          </view>
        </slot>
      </template>
      <template v-else>
        <slot name="fold">
          <view
            class="fold"
            :class="[ns.e('operation-content')]"
            :style="{ height: `${foldOperationAreaHeight}rpx` }"
          >
            <view class="text">{{ foldText }}</view>
            <view class="icon">
              <TnIcon :name="foldIcon" />
            </view>
          </view>
        </slot>
      </template>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/read-more.scss';
</style>
