import { isEmptyVariableInDefault } from '../is-empty'
import type { App, Directive } from 'vue'
import type { SFCInstallWithContext, SFCWithInstall } from './typescript'

// 注册组件
export const withInstall = <T, E extends Record<string, any>>(
  main: T,
  extra?: E
) => {
  // 将组件注册到应用程序中
  ;(main as SFCWithInstall<T>).install = (app: App) => {
    for (const comp of [
      main,
      ...Object.values(isEmptyVariableInDefault<E>(extra, {})),
    ]) {
      app.component(comp.name, comp)
    }
  }

  // 为组件添加额外的属性
  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      ;(main as any)[key] = comp
    }
  }

  return main as SFCWithInstall<T> & E
}

// 将 fn 包装成一个带有 install 方法的 Vue 3 插件，并返回包装后的插件函数
export const withInstallFunction = <T>(fn: T, name: string) => {
  ;(fn as SFCWithInstall<T>).install = (app: App) => {
    ;(fn as SFCInstallWithContext<T>)._content = app._context
    app.config.globalProperties[name] = fn
  }

  return fn as SFCInstallWithContext<T>
}

// 注册指令
export const withInstallDirective = <T extends Directive>(
  directive: T,
  name: string
) => {
  ;(directive as SFCWithInstall<T>).install = (app: App) => {
    app.directive(name, directive)
  }
}

// 返回一个新的组件对象，这个组件对象具有一个空的 install 方法
export const withNoopInstall = <T>(component: T) => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ;(component as SFCWithInstall<T>).install = () => {}

  return component as SFCWithInstall<T>
}
