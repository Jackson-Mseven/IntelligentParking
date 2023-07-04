<template>
	<view class="container" :style="{height: `${windowHeight}px`}">
		<view class="prompt">
			最多添加3个车牌，认证后可查看完整停车记录。
		</view>
		<view class="carBind" v-for="(item, index) of bindCar" :key="index">
			<view class="carNumber">
				{{item.carNumber}}
			</view>
			<view class="belongingPerson">
				{{item.belongingPerson}}
			</view>
			<view class="model">
				{{item.model}}
			</view>
			<view class="">
				{{item.carModel}}
			</view>
		</view>
		<div class="bind" @click="gotoBind">
			<img src="/static/add.png" alt="">
		</div>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				bindCar: []
			};
		},
		computed: {
			// 屏幕高度、登陆凭证、密钥
			...mapState('user', ['windowHeight', 'token', 'secretKey'])
		},
		methods: {
			// 跳转到bind页面
			gotoBind() {
				uni.navigateTo({
					url: '/pages/bind/bind'
				})
			},
			// 搜索已经绑定的车牌
			async searchBind() {
				const timestamp = Date.now();

				const realQuery = {
					token: this.token, // 用户凭证
					timestamp: timestamp, // 时间戳
					signType: 'MD5', // 签名类型
				}

				// 加密签名
				const signature = this.getSignature(realQuery);

				// 请求参数
				const query = {
					token: this.token, // 用户凭证
					timestamp: timestamp, // 时间戳
					signType: 'MD5', // 签名类型
					signature: signature, // 签名
				}

				// 发起请求
				const {
					data: res
				} = await uni.$http.post('/api/car/searchBind', query);

				console.log('res', res);

				// 请求失败
				if (res.code != 200) return uni.showToast({
					title: '查询失败',
					icon: 'none'
				})

				// 请求成功
				if (res.code === 200) {
					this.bindCar = res.data;
				}
			}
		},
		onLoad() {
			this.searchBind();
		}
	}
</script>

<style lang="scss">
	.container {
		background-color: #ebecee;

		.prompt {
			padding: 20rpx 40rpx;
			font-size: 24rpx;
			color: #bbbdbb;
		}

		.carBind {
			width: 90%;
			height: 200rpx;
			background-color: #fff;
			border-radius: 10rpx;
			margin: 0 auto 40rpx;
			position: relative;
			display: flex;
			flex-wrap: wrap;

			view {
				width: 45%;
				height: 100rpx;
				text-align: center;
				line-height: 100rpx;
			}
		}

		.bind {
			width: 90%;
			height: 200rpx;
			background-color: #fff;
			border-radius: 10rpx;
			margin: 0 auto;
			position: relative;

			img {
				width: 60rpx;
				height: 60rpx;
				position: absolute;
				top: calc(50% - 30rpx);
				left: calc(50% - 30rpx);
			}
		}
	}
</style>
