<template>
	<view class="container" :style="{height:`${windowHeight}px`}">
		<!-- 遮盖层 -->
		<cover-view class="mask" :style="{height:`${windowHeight - 290}px`}" v-if="isLogin" @click="cancelLogin">
		</cover-view>
		<!-- 内容 -->
		<view class="top">
			<img src="/static/my-head.png" class="head">
			<view class="phone" v-if="token != ''">
				{{nickName}}
			</view>
			<view v-if="token == ''" class="login" @click="login">点击登录</view>
		</view>
		<view class="firstFloor">
			<view class="flexBox" @click="gotoOrder">
				<img src="/static/my-order.png" alt="">
				<view class="text">
					订单
				</view>
			</view>
			<view class="flexBox" @click="gotoManagement">
				<img src="/static/my-car.png" alt="">
				<view class="text">
					车辆
				</view>
			</view>
			<view class="flexBox" @click="gotoCoupon">
				<img src="/static/my-coupon.png" alt="">
				<view class="text">
					优惠券
				</view>
			</view>
		</view>
		<view class="secondFloor">
			<view class="item borB" @click="gotoInvoice">
				<img src="/static/my-printer.png">
				<text class="title">开具发票</text>
				<uni-icons type="right" size="16" color="darkgray"></uni-icons>
			</view>
			<view class="item borB" @click="gotoPublish">
				<img src="/static/my-parking.png">
				<text class="title">车位发布</text>
				<uni-icons type="right" size="16" color="darkgray"></uni-icons>
			</view>
			<view class="item" @click="gotoWallet">
				<img src="/static/my-wallet.png">
				<text class="title">我的钱包</text>
				<uni-icons type="right" size="16" color="darkgray"></uni-icons>
			</view>
		</view>
		<view class="thirdFloor">
			<view class="item borB" @click="gotoTouch">
				<img src="/static/my-phone.png">
				<text class="title">联系我们</text>
				<uni-icons type="right" size="16" color="darkgray"></uni-icons>
			</view>
			<view class="item" @click="gotoSetting">
				<img src="/static/my-setting.png">
				<text class="title">更多</text>
				<uni-icons type="right" size="16" color="darkgray"></uni-icons>
			</view>
		</view>
		<!-- 登录弹窗 -->
		<view class="login-mask" v-if="isLogin">
			<view class="title">
				欢迎使用智能停车系统
			</view>
			<view class="subtitle">
				登录后可体验更好服务，立享便捷交通出行
			</view>
			<img src="/static/loginShow.png" alt="" class="pic">
			<button class="loginBtn" open-type="getUserInfo" @getuserinfo="getUserInfo">微信快速登录</button>
			<radio value="isAgree" color="#3e87fd" @click="agree" />
			<text class="agreement">登录即表示同意
				<text>《用户注册协议》</text>
				与<text>《隐私协议》</text> </text>
		</view>
	</view>
</template>

<script>
	// 引入 vuex 的 map 方法
	import {
		mapState,
		mapMutations
	} from 'vuex';

	export default {
		data() {
			return {
				isLogin: false, // 是否登录
				isAgree: false, // 是否同意协议
			};
		},
		computed: {
			...mapState('user', ['windowHeight', 'token', 'nickname'])
		},
		methods: {
			...mapMutations('user', ['updateSignature', 'updateToken', 'updateNickname']),
			// 展示登录弹窗
			login() {
				this.isLogin = true
			},
			// 关闭登录弹窗
			cancelLogin() {
				this.isLogin = false
			},
			// 同意协议
			agree() {
				this.isAgree = true
			},
			// 获取用户信息
			getUserInfo(e) {
				if (this.isAgree === false) return uni.showToast({
					title: '请先同意协议',
					icon: 'none'
				})

				// 判断是否获取用户信息成功
				if (e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权！')
				// 调用自定义得 getToken 方法获取登录凭证 token
				this.getToken(e.detail)
			},
			// 调用登录接口，换取永久的 token
			async getToken(info) {
				// 调用微信登录接口
				const [err, res] = await uni.login().catch(err => err)
				// 判断是否 uni.login() 调用失败
				if (err || res.errMsg !== 'login:ok') return uni.showToast({
					title: 'login调用失败！'
				})

				// 准备参数对象
				const query = {
					type: 1, // 登录类型（1表示移动端）
					jsCode: res.code, // 用户登录凭证
					encryptedData: info.encryptedData, // 完整用户信息的加密数据
					iv: info.iv, // 加密算法的初始向量
					rawData: info.rawData, // 不包括敏感信息的原始数据字符串
					signature: info.signature, // 用户签名
					signType: 'MD5' // 加密方式
				}

				// 换取 token
				const {
					data: loginResult
				} = await uni.$http.post('/api/user/login', query);

				// 请求失败
				if (loginResult.code !== 200) return uni.showToast({
					title: '登录失败!',
					icon: 'none'
				})

				// 更新 vuex 中的 token
				this.updateToken(loginResult.data.token);
				this.updateNickname(info.userInfo.nickName);


				// 请求成功
				uni.showToast({
					title: '登录成功!',
					icon: 'none'
				})

				// isLogin 赋值
				this.isLogin = false;
			},
			// 跳转到订单页面
			gotoOrder() {
				if (this.token === '') return uni.showToast({
					title: '请先登录',
					icon: 'none'
				})
				uni.navigateTo({
					url: '/pages/order/order'
				})
			},
			// 跳转到车辆管理页面
			gotoManagement() {
				if (this.token === '') return uni.showToast({
					title: '请先登录',
					icon: 'none'
				})
				uni.navigateTo({
					url: '/pages/management/management'
				})
			},
			// 跳转到优惠券页面
			gotoCoupon() {
				if (this.token === '') return uni.showToast({
					title: '请先登录',
					icon: 'none'
				})
				uni.navigateTo({
					url: '/pages/coupon/coupon'
				})
			},
			// 跳转到发票页面
			gotoInvoice() {
				if (this.token === '') return uni.showToast({
					title: '请先登录',
					icon: 'none'
				})
				uni.navigateTo({
					url: '/pages/invoice/invoice'
				})
			},
			// 跳转到车位发布页面
			gotoPublish() {
				if (this.token === '') return uni.showToast({
					title: '请先登录',
					icon: 'none'
				})
				uni.navigateTo({
					url: '/pages/publish/publish'
				})
			},
			// 跳转到钱包页面
			gotoWallet() {
				if (this.token === '') return uni.showToast({
					title: '请先登录',
					icon: 'none'
				})
				uni.navigateTo({
					url: '/pages/wallet/wallet'
				})
			},
			// 跳转到联系我们页面
			gotoTouch() {
				if (this.token === '') return uni.showToast({
					title: '请先登录',
					icon: 'none'
				})
				uni.navigateTo({
					url: '/pages/touch/touch'
				})
			},
			// 跳转到更多页面
			gotoSetting() {
				if (this.token === '') return uni.showToast({
					title: '请先登录',
					icon: 'none'
				})
				uni.navigateTo({
					url: '/pages/setting/setting'
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		position: relative;
		background-color: #ecedef;

		.mask {
			position: absolute;
			background-color: rgba(0, 0, 0, .6);
			width: 100%;
			z-index: 6;
		}

		.top {
			height: 300rpx;
			background-color: #4186fd;
			position: relative;

			.head {
				width: 120rpx;
				height: 120rpx;
				position: absolute;
				top: 40rpx;
				left: 40rpx;
			}

			.phone {
				position: absolute;
				top: 80rpx;
				left: 180rpx;
				font-size: 44rpx;
				color: #fff;
			}

			.login {
				position: absolute;
				top: 80rpx;
				left: 180rpx;
				background-color: rgba(255, 255, 255, 0);
				border: 1px solid #4186fd;
				color: #fff;
			}
		}

		.firstFloor {
			width: 90%;
			height: 200rpx;
			background-color: white;
			position: absolute;
			top: 200rpx;
			left: 5%;
			border-radius: 10rpx;
			display: flex;
			margin-bottom: 30rpx;

			.flexBox {
				width: 33.33%;
				height: 100%;
				text-align: center;

				img {
					width: 60rpx;
					height: 60rpx;
					padding: 40rpx 0 10rpx;
				}
			}
		}

		.secondFloor,
		.thirdFloor {
			height: 300rpx;
			width: 90%;
			position: absolute;
			top: 430rpx;
			left: 5%;
			background-color: white;
			border-radius: 10rpx;

			.item {
				height: 100rpx;
				width: 90%;
				margin: 0 auto;

				img {
					width: 40rpx;
					height: 40rpx;
					margin-top: 28rpx;
				}

				.title {
					position: relative;
					top: -8rpx;
					padding-left: 20rpx;
				}

				uni-icons {
					float: right;
					position: relative;
					top: 28rpx;
				}
			}

			.borB {
				border-bottom: 1rpx solid #ccc;
			}
		}

		.thirdFloor {
			height: 200rpx;
			top: 760rpx;
		}

		.login-mask {
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 600rpx;
			background-color: #fff;
			z-index: 999;
			border-top-left-radius: 20rpx;
			border-top-right-radius: 20rpx;

			.title {
				margin-top: 60rpx;
				text-align: center;
				font-size: 40rpx;
			}

			.subtitle {
				margin-top: 40rpx;
				text-align: center;
				color: #cfcfcf;
				font-size: 26rpx;
			}

			.pic {
				width: 540rpx;
				height: 130rpx;
				display: block;
				margin: 40rpx auto;
			}

			.loginBtn {
				width: 560rpx;
				height: 100rpx;
				line-height: 100rpx;
				color: #fff;
				background-color: #02c05e;
				border-radius: 60rpx;
				margin-bottom: 30rpx;
			}

			radio {
				margin-left: 8%;
			}

			.agreement {
				font-size: 26rpx;
				color: #cfcfcf;

				text {
					color: #85b2fc;
				}
			}
		}
	}
</style>
