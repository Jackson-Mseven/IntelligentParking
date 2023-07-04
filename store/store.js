// 1. 导入 Vue 和 Vuex
import Vue from 'vue'
import Vuex from 'vuex'

// 1. 导入用户的 vuex 模块
import user from './user.js'

// 2. 将 Vuex 安装为 Vue 的插件
Vue.use(Vuex)

// 3. 创建 Store 的实例对象
const store = new Vuex.Store({
	// TODO：挂载 store 模块
	modules: {
		// 2. 挂载用户的 vuex 模块，模块内成员的访问路径为 user，例如：
		// 用户模块中 windowHeight 的访问路径是 user/windowHeight
		user: user,
	},
})

// 4. 向外共享 Store 的实例对象
export default store
