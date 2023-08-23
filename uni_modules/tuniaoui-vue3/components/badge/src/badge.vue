<script lang="ts" setup>
import { computed, useSlots } from 'vue'
import TnIcon from '../../icon/src/icon.vue'
import { badgeEmits, badgeProps } from './badge'
import { useBadge, useBadgeCustomStyle } from './composables'

const props = defineProps(badgeProps)
const emits = defineEmits(badgeEmits)

const slots = useSlots()

const { ns, contentNs, badgeContentClass, badgeContentStyle } =
  useBadgeCustomStyle(props)
const { showBadge, contentType, content, badgeClick } = useBadge(props, emits)

// badge所属类
const badgeClass = computed<string>(() => {
  const cls: string[] = []
  cls.push(ns.b())
  if (!slots?.default) {
    // 绝对定位
    if (props.absolute) {
      cls.push(ns.e('absolute'))
      if (props.absoluteCenter) cls.push(ns.em('absolute', 'center'))
    }
  }
  return cls.join(' ')
})
</script>

<template>
  <view :class="[badgeClass]">
    <slot />
    <!-- 徽标 -->
    <view
      v-if="showBadge"
      :class="[badgeContentClass]"
      :style="badgeContentStyle"
      @tap.stop="badgeClick"
    >
      <template v-if="content">
        <TnIcon v-if="contentType === 'icon'" :name="content" />
        <span v-else :class="`${contentNs.e('data')}`">{{ content }}</span>
      </template>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/badge.scss';
</style>
