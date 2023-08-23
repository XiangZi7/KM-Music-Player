<script lang="ts" setup>
import TnIcon from '../../icon/src/icon.vue'
import TnLoading from '../../loading/src/loading.vue'
import { switchEmits, switchProps } from './switch'
import { useSwitch, useSwitchCustomStyle } from './composables'

const props = defineProps(switchProps)
defineEmits(switchEmits)

const { selected, switchClickEvent } = useSwitch(props)
const { ns, switchClass, switchStyle } = useSwitchCustomStyle(props, selected)
</script>

<template>
  <view
    :class="[
      switchClass,
      {
        [ns.is('content')]:
          props.activeText ||
          props.activeIcon ||
          props.inactiveText ||
          props.inactiveIcon,
      },
    ]"
    :style="switchStyle"
    @tap.stop="switchClickEvent"
  >
    <!-- switch小圆圈 -->
    <view :class="[ns.e('dot'), { [ns.em('dot', 'checked')]: selected }]">
      <TnLoading :show="loading" animation type="info" mode="flower" />
    </view>
    <view v-if="selected" :class="[ns.e('active-content')]">
      <!-- 激活时的文本 -->
      <view
        v-if="props.activeText && !props.activeIcon"
        class="tn-text-ellipsis-1"
        :class="[ns.em('active-content', 'text')]"
      >
        {{ props.activeText }}
      </view>
      <!-- 激活时的图标 -->
      <view v-if="props.activeIcon" :class="[ns.em('active-content', 'icon')]">
        <TnIcon :name="props.activeIcon" />
      </view>
    </view>
    <view v-else :class="[ns.e('inactive-content')]">
      <!-- 未激活时的文本 -->
      <view
        v-if="props.inactiveText && !props.inactiveIcon"
        class="tn-text-ellipsis-1"
        :class="[ns.em('inactive-content', 'text')]"
      >
        {{ props.inactiveText }}
      </view>
      <!-- 激活时的图标 -->
      <view
        v-if="props.inactiveIcon"
        :class="[ns.em('inactive-content', 'icon')]"
      >
        <TnIcon :name="props.inactiveIcon" />
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/switch.scss';
</style>
