<script lang="ts" setup>
import TnIcon from '../../icon/src/icon.vue'
import { searchBoxEmits, searchBoxProps } from './search-box'
import { useSearchBox, useSearchBoxCustomStyle } from './composables'

const props = defineProps(searchBoxProps)
const emits = defineEmits(searchBoxEmits)

const {
  showPlaceholder,
  inputValue,
  inputFocus,
  searchBoxClickEvent,
  inputFocusEvent,
  inputBlurEvent,
  inputValueEvent,
  clearClickEvent,
  searchBtnClickEvent,
} = useSearchBox(props, emits)
const {
  ns,
  searchBoxClass,
  searchBoxStyle,
  placeholderClass,
  placeholderStyle,
  searchButtonClass,
  searchButtonStyle,
} = useSearchBoxCustomStyle(props)
</script>

<template>
  <view
    :class="[searchBoxClass]"
    :style="searchBoxStyle"
    @tap.stop="searchBoxClickEvent"
  >
    <!-- 搜索框内容输入区 -->
    <view :class="[ns.e('content')]">
      <view
        v-if="showPlaceholder"
        :class="[placeholderClass]"
        :style="placeholderStyle"
      >
        <slot name="placeholder">
          <view v-if="placeholderIcon" :class="[ns.e('placeholder-icon')]">
            <TnIcon :name="placeholderIcon" />
          </view>
          <view v-if="placeholder" :class="[ns.e('placeholder-text')]">
            {{ placeholder }}
          </view>
        </slot>
      </view>
      <template v-else>
        <!-- input输入框 -->
        <input
          v-model="inputValue"
          :class="[ns.e('input'), ns.em('input', textAlign)]"
          :focus="inputFocus"
          confirm-type="search"
          @focus="inputFocusEvent"
          @blur="inputBlurEvent"
          @input="inputValueEvent"
          @confirm="searchBtnClickEvent"
        />
        <!-- 清除按钮 -->
        <view
          v-if="clearable && inputValue"
          :class="[ns.e('clear-button')]"
          @tap.stop="clearClickEvent"
        >
          <TnIcon name="close-fill" />
        </view>
      </template>
    </view>

    <!-- 搜索按钮 -->
    <view
      v-if="searchButton"
      :class="[searchButtonClass]"
      :style="searchButtonStyle"
      hover-class="tn-u-btn-hover"
      :hover-stay-time="150"
      @tap.stop="searchBtnClickEvent"
    >
      <slot name="search">
        {{ searchButtonText }}
      </slot>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/search-box.scss';
</style>
