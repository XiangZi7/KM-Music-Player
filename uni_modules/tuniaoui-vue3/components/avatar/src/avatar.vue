<script lang="ts" setup>
import TnIcon from '../../icon/src/icon.vue'
import TnBadge from '../../badge/src/badge.vue'
import { avatarEmits, avatarProps } from './avatar'

import {
  useAvatar,
  useAvatarBadgeProps,
  useAvatarCustomStyle,
  useAvatarIconConfig,
  useAvatarProps,
} from './composables'

const props = defineProps(avatarProps)
const emits = defineEmits(avatarEmits)

const { componentId, avatarGroupIndex, avatarWidth, avatarClick } = useAvatar(
  props,
  emits
)
const { ns, avatarClass, avatarStyle } = useAvatarCustomStyle(
  props,
  avatarGroupIndex,
  avatarWidth
)
const { imgMode } = useAvatarProps(props)
const { iconSize, iconColor, iconBold } = useAvatarIconConfig(props.iconConfig)
const { badgeConfig } = useAvatarBadgeProps(props)
</script>

<template>
  <view
    :id="componentId"
    :class="[avatarClass]"
    :style="avatarStyle"
    @tap.stop="avatarClick"
  >
    <!-- 图片头像 -->
    <view v-if="url" :class="[ns.e('image')]">
      <image class="image" :src="url" :mode="imgMode" />
    </view>
    <!-- 图标头像 -->
    <view v-else-if="icon" :class="[ns.e('icon')]">
      <TnIcon
        :name="icon"
        :color="iconColor"
        :size="iconSize"
        :bold="iconBold"
      />
    </view>
    <!-- 自定义 -->
    <view v-else :class="[ns.e('custom')]">
      <slot />
    </view>
    <!-- 角标 -->
    <TnBadge v-bind="badgeConfig" />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/avatar.scss';
</style>
