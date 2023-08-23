<script lang="ts" setup>
import TnIcon from '../../icon/src/icon.vue'
import TnPhotoAlbum from '../../photo-album/src/photo-album.vue'
import TnAvatar from '../../avatar/src/avatar.vue'
import TnAvatarGroup from '../../avatar/src/avatar-group.vue'
import { graphicCardEmits, graphicCardProps } from './graphic-card'
import { useGraphicCard, useGraphicCardCustomStyle } from './composables'

const props = defineProps(graphicCardProps)
const emits = defineEmits(graphicCardEmits)

const {
  viewUserAvatars,
  viewUserCount,
  cardClickEvent,
  handleAvatarClick,
  handleMoreClick,
  handleCommentClick,
  handleViewClick,
  handleLikeClick,
} = useGraphicCard(props, emits)
const {
  ns,
  tagClass,
  tagStyle,
  viewClass,
  viewStyle,
  commentClass,
  commentStyle,
  likeClass,
  likeStyle,
} = useGraphicCardCustomStyle(props)
</script>

<template>
  <view :class="[ns.b()]" @tap.stop="cardClickEvent">
    <!-- 简要信息 -->
    <view :class="[ns.e('brief-info')]">
      <view :class="[ns.e('brief-info__content')]">
        <view
          :class="[ns.e('brief-info__avatar')]"
          @tap.stop="handleAvatarClick"
        >
          <image class="image" :src="avatar" mode="aspectFill" />
        </view>
        <view :class="[ns.e('brief-info__data')]">
          <view class="title tn-text-ellipsis-1">{{ title }}</view>
          <view v-if="description" class="desc tn-text-ellipsis-1">
            {{ description }}
          </view>
        </view>
      </view>
      <view
        :class="[ns.e('brief-info__operation')]"
        @tap.stop="handleMoreClick"
      >
        <TnIcon name="more-vertical" />
      </view>
    </view>
    <!-- 内容容器 -->
    <view :class="[ns.e('container')]">
      <!-- 内容 -->
      <view :class="[ns.e('content')]">
        <!-- 标签和内容 -->
        <view :class="[ns.e('content__tags')]">
          <view
            v-for="(tagItem, tagIndex) in tags"
            :key="tagIndex"
            class="tag-item"
            :class="[tagClass]"
            :style="tagStyle"
          >
            <TnIcon name="topics-fill" />
            {{ tagItem }}
          </view>
        </view>
        <view :class="[ns.e('content__data')]">
          {{ content }}
        </view>
      </view>
      <!-- 图片列表 -->
      <view v-if="images.length" :class="[ns.e('images')]">
        <TnPhotoAlbum :data="images" />
      </view>
    </view>

    <!-- 底部信息 -->
    <view :class="[ns.e('bottom-info')]">
      <view :class="[ns.e('bottom-info__left')]">
        <view
          v-if="showView"
          class="count-item-data"
          :class="[viewClass]"
          :style="viewStyle"
          @tap.stop="handleViewClick"
        >
          <TnIcon :name="activeView ? activeViewIcon : viewIcon" />
          <view class="count">{{ viewCount }}</view>
        </view>
        <view
          v-if="showComment"
          class="count-item-data"
          :class="[commentClass]"
          :style="commentStyle"
          @tap.stop="handleCommentClick"
        >
          <TnIcon :name="activeComment ? activeCommentIcon : commentIcon" />
          <view class="count">{{ commentCount }}</view>
        </view>
        <view
          v-if="showLike"
          class="count-item-data"
          :class="[likeClass]"
          :style="likeStyle"
          @tap.stop="handleLikeClick"
        >
          <TnIcon :name="activeLike ? activeLikeIcon : likeIcon" />
          <view class="count">{{ likeCount }}</view>
        </view>
      </view>
      <view
        v-if="showViewUser && viewUserAvatars.length"
        :class="[ns.e('bottom-info__right')]"
      >
        <!-- 查看用户头像列表 -->
        <view :class="[ns.e('view-user-list')]">
          <TnAvatarGroup border size="sm">
            <TnAvatar
              v-for="(viewUserAvatar, viewUserIndex) in viewUserAvatars"
              :key="viewUserIndex"
              :url="viewUserAvatar"
            />
          </TnAvatarGroup>
        </view>
        <!-- 查看用户数量 -->
        <view :class="[ns.e('view-user-count')]">{{ viewUserCount }}人</view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/grapgic-card.scss';
</style>
