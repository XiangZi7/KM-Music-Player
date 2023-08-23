import type { InjectionKey } from 'vue'
import type { NoticeBarProps } from '../components/notice-bar'

export type NoticeBarContext = NoticeBarProps & {
  play: boolean
  click: (index: number) => void
}

export const noticeBarKey: InjectionKey<NoticeBarContext> = Symbol('noticeBar')
