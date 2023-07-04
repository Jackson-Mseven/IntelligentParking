export default {
	// 为当前模块开启命名空间
	namespaced: true,

	// 模块的 state 数据
	state: () => ({
		// 用户手机的可用高度
		windowHeight: Number(uni.getStorageSync('windowHeight')) || 555,
		// 用户登录凭证
		token: uni.getStorageSync('token').slice(1, uni.getStorageSync('token').length - 1) || '',
		// 系统密钥
		secretKey: 'YC5$yU0fEVFme*2ub*4Wcr0y0C0kfrox&D!T!TMm',
		// 用户名
		nickname: uni.getStorageSync('nickname') || ''
	}),
	// 模块的 mutations 方法
	mutations: {
		// 更改state中的windowHeight
		updateWindowHeight(state, windowHeight) {
			state.windowHeight = windowHeight;
			// 调用user模块的saveWindowHeightToStorage方法
			this.commit('user/saveWindowHeightToStorage');
		},
		// 将windowHeight持久化存储到本地
		saveWindowHeightToStorage(state) {
			uni.setStorageSync('windowHeight', JSON.stringify(state.windowHeight));
		},
		// 更改state中的token
		updateToken(state, token) {
			state.token = token;
			// 调用user模块的saveTokenToStorage方法
			this.commit('user/saveTokenToStorage');
		},
		// 将token持久化存储到本地
		saveTokenToStorage(state) {
			console.log('将token保存到本地了');
			uni.setStorageSync('token', JSON.stringify(state.token));
		},
		// 更改state中的nickname
		updateNickname(state, nickname) {
			state.nickname = nickname;
			// 调用user模块的saveTokenToStorage方法
			this.commit('user/saveNicknameToStorage');
		},
		// 将nickname持久化存储到本地
		saveNicknameToStorage(state) {
			console.log('将nickname保存到本地了');
			uni.setStorageSync('nickname', JSON.stringify(state.nickname));
		},
	},

	// 模块的 getters 属性
	getters: {},
}
