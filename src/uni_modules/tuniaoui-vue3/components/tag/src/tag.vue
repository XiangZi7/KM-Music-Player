<script lang="ts" setup>
import { tagEmits, tagProps } from './tag'
import { useTag, useTagCustomStyle } from './composables'

const props = defineProps(tagProps)
const emits = defineEmits(tagEmits)

const { tagClickHandle } = useTag(props, emits)
const { tagClass, tagStyle } = useTagCustomStyle(props)
</script>

<template>
  <span>
    <span
      class="tn-tag"
      :class="[tagClass]"
      :style="tagStyle"
      @tap.stop="tagClickHandle"
    >
      <slot />
    </span>
  </span>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/tag.scss';
</style>
