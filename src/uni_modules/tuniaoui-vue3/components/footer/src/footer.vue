<script lang="ts" setup>
import { footerEmits, footerProps } from './footer'
import { useFooter, useFooterCustomStyle } from './composables'

const props = defineProps(footerProps)
const emits = defineEmits(footerEmits)

const { navigatorData, footerClickEvent, navigatorClickEvent } = useFooter(
  props,
  emits
)
const {
  ns,
  footerClass,
  footerStyle,
  contentClass,
  contentStyle,
  navigatorClass,
  navigatorStyle,
} = useFooterCustomStyle(props)
</script>

<template>
  <view
    :class="[footerClass]"
    :style="footerStyle"
    @tap.stop="footerClickEvent"
  >
    <!-- 导航内容 -->
    <view v-if="navigatorData.length" :class="[ns.e('navigators')]">
      <view
        v-for="(item, index) in navigatorData"
        :key="index"
        :class="[navigatorClass(item)]"
        :style="navigatorStyle(item)"
        @tap.stop="navigatorClickEvent(item)"
      >
        {{ item.title }}
      </view>
    </view>

    <!-- 页脚内容 -->
    <view v-if="content" :class="[contentClass]" :style="contentStyle">
      {{ content }}
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/footer.scss';
</style>
