// 容器钩子
import { defineStore, createPinia } from "pinia";

export const GlobalStore = defineStore({
    // id: 必须的，在所有 Store 中唯一
    id: "GlobalState",
    // 创建state
    state: () => {
        return {
            // 个人的用户信息
            userInfo: { id: 1, nickname: 'yxcr', avatarUrl: "https://img2.baidu.com/it/u=2979343759,1090469389&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" },
            // 登录状态
            isLogin: true,
            // 主题
            themeConfig: {
                primary: "#409EFF",
                // 深色模式
                isDark: false,
            },
            // 视频选集信息
            anthologyObj: {},
            // 底部导航栏索引
            navIdx: 0,
            // 搜索内容历史
            historcontent: ['千板','per se'],
            currentTabbar: 0
        }
    },
    // 方法
    actions: {
        change() {
            this.count += 2;
            this.msg = "哈哈哈"
        },
        setHistorcontent(kw) {
            if (kw != "") {
                if (!this.historcontent.includes(kw)) {
                    if (this.historcontent.length >= 6) {
                        this.historcontent.pop();
                        this.historcontent.unshift(kw)
                    } else {
                        this.historcontent.unshift(kw)
                    }
                }
            }
        }
    },
})
const pinia = createPinia();
export default pinia;