// #ifndef VUE3
import Vue from 'vue'
import App from './App'

// 取消生产提示
Vue.config.productionTip = false

// 引入 request-miniprogram
import {
	$http
} from '@escook/request-miniprogram'

uni.$http = $http
// 配置请求根路径
$http.baseUrl = 'http://172.20.144.121:10000'

// 请求开始之前做一些事情
$http.beforeRequest = function(options) {
	uni.showLoading({
		title: 'Loading...',
	})
}

// 请求完成之后做一些事情
$http.afterRequest = function() {
	uni.hideLoading()
}

App.mpType = 'app'

// 引入全局组件——getSignature
import getSignature from './utils/getSignature.js'
// 使用全局组件
Vue.use(getSignature);

// 1. 导入 store 的实例对象
import store from './store/store.js'

const app = new Vue({
	...App,
	// 2. 将 store 挂载到 Vue 实例上
	store,
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
