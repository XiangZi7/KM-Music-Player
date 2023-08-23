import { buildProps, definePropType } from '../../../utils'

import type { ExtractPropTypes } from 'vue'

export const graphicCardProps = buildProps({
  /**
   * @description 头像地址
   */
  avatar: {
    type: String,
    required: true,
  },
  /**
   * @description 标题
   */
  title: {
    type: String,
    required: true,
  },
  /**
   * @description 描述
   */
  description: {
    type: String,
    required: true,
  },
  /**
   * @description 标签
   */
  tags: {
    type: definePropType<string[]>(Array),
    default: () => [],
  },
  /**
   * @description 标签背景颜色，以tn开头使用图鸟内置的颜色
   */
  tagBgColor: String,
  /**
   * @description 标签文字颜色，以tn开头使用图鸟内置的颜色
   */
  tagTextColor: String,
  /**
   * @description 内容
   */
  content: String,
  /**
   * @description 图片列表
   */
  images: {
    type: definePropType<string[]>(Array),
    default: () => [],
  },
  /**
   * @description 显示查看数量
   */
  showView: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 是否激活查看
   */
  activeView: Boolean,
  /**
   * @description 查看数量数据
   */
  viewCount: {
    type: Number,
    default: 0,
  },
  /**
   * @description 查看数量图标
   */
  viewIcon: {
    type: String,
    default: 'flower',
  },
  /**
   * @description 激活时查看数量图标
   */
  activeViewIcon: {
    type: String,
    default: 'flower-fill',
  },
  /**
   * @description 查看数量图标颜色
   */
  viewColor: String,
  /**
   * @description 激活时查看数量图标颜色
   */
  activeViewColor: String,
  /**
   * @description 显示评论数量
   */
  showComment: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 是否激活评论
   */
  activeComment: Boolean,
  /**
   * @description 评论数量数据
   */
  commentCount: {
    type: Number,
    default: 0,
  },
  /**
   * @description 评论数量图标
   */
  commentIcon: {
    type: String,
    default: 'message',
  },
  /**
   * @description 激活时评论数量图标
   */
  activeCommentIcon: {
    type: String,
    default: 'message-fill',
  },
  /**
   * @description 评论数量图标颜色
   */
  commentColor: String,
  /**
   * @description 激活时评论数量图标颜色
   */
  activeCommentColor: String,
  /**
   * @description 显示点赞数量
   */
  showLike: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 是否激活点赞
   */
  activeLike: Boolean,
  /**
   * @description 点赞数量数据
   */
  likeCount: {
    type: Number,
    default: 0,
  },
  /**
   * @description 点赞数量图标
   */
  likeIcon: {
    type: String,
    default: 'like-lack',
  },
  /**
   * @description 激活时点赞数量图标
   */
  activeLikeIcon: {
    type: String,
    default: 'like-fill',
  },
  /**
   * @description 点赞数量图标颜色
   */
  likeColor: String,
  /**
   * @description 激活时点赞数量图标颜色
   */
  activeLikeColor: String,
  /**
   * @description 显示查看用户信息
   */
  showViewUser: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 查看用户头像列表
   */
  viewUserAvatars: {
    type: definePropType<string[]>(Array),
    default: () => [],
  },
  /**
   * @description 最大显示用户头像数量
   */
  maxViewUserAvatarCount: {
    type: Number,
    default: 4,
  },
})

export const graphicCardEmits = {
  /**
   * @description 点击图文卡片
   */
  click: () => true,
  /**
   * @description 点击用户头像
   */
  'avatar-click': () => true,
  /**
   * @description 更多按钮点击
   */
  'more-click': () => true,
  /**
   * @description 点击查看数量
   */
  'view-click': () => true,
  /**
   * @description 点击评论数量
   */
  'comment-click': () => true,
  /**
   * @description 点击点赞数量
   */
  'like-click': () => true,
}

export type GraphicCardProps = ExtractPropTypes<typeof graphicCardProps>
export type GraphicCardEmits = typeof graphicCardEmits
