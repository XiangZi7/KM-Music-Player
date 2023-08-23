import type { ComponentInternalInstance } from 'vue'

/**
 * 获取 SelectorQuery 对象实例
 * @param instance 当前组件实例
 * @returns SelectorQuery 对象实例
 */
export const createSelectorQuery = (instance: ComponentInternalInstance) => {
  let query: UniApp.SelectorQuery | null = null
  // #ifndef MP-ALIPAY
  query = uni.createSelectorQuery().in(instance)
  // #endif
  // #ifdef MP-ALIPAY
  query = uni.createSelectorQuery().in(null)
  // #endif

  return query
}

/**
 * 获取节点布局信息
 * @param query SelectorQuery 对象实例
 * @param selector 需要查询的节点
 * @returns 节点布局信息
 */
export const getSelectorNodeInfo = (
  query: UniApp.SelectorQuery,
  selector: string
): Promise<UniApp.NodeInfo> => {
  return new Promise((resolve, reject) => {
    query
      .select(selector)
      .boundingClientRect((res) => {
        const selectRes: UniApp.NodeInfo = res as UniApp.NodeInfo
        if (selectRes) {
          resolve(selectRes)
        } else {
          reject(new Error(`未找到对应节点: ${selector}`))
        }
      })
      .exec()
  })
}
