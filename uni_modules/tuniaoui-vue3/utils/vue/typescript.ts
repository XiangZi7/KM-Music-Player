import type { AppContext, Plugin, Ref } from 'vue'

export type SFCWithInstall<T> = T & Plugin

export type SFCInstallWithContext<T> = SFCWithInstall<T> & {
  _content: AppContext | null
}

export type MaybeRef<T> = T | Ref<T>
