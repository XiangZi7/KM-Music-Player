<script lang="ts" setup>
import { useNamespace } from '../../../hooks'

import { avatarGroupEmits, avatarGroupProps } from './avatar-group'
import { useAvatarGroup } from './composables'

const props = defineProps(avatarGroupProps)
const emits = defineEmits(avatarGroupEmits)

const ns = useNamespace('avatar')

useAvatarGroup(props, emits)
</script>

<template>
  <view :class="`${ns.b('group')}`">
    <slot />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/avatar-group.scss';
</style>
