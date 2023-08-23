import {
	createSSRApp
} from "vue";

import './uni.scss'
import pinia from "./stores/index";

// 挂载全局方法
import './api/index'
import App from "./App.vue";
export function createApp() {
	const app = createSSRApp(App)
	app.use(pinia)
	return {
		app,
	};
}
