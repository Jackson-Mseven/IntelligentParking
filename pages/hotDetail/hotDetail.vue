<template>
	<view class="container">
		<swiper :autoplay="true" :interval="3000" :duration="1000" class="swiper">
			<swiper-item v-for="(item, index) of swiperUrls" :key="index">
				<view class="swiper-item">
					<img :src="item" alt="">
				</view>
			</swiper-item>
		</swiper>
		<view class="info">
			<view class="title">{{title}}</view>
			<view class="text">
				<img src="/static/hot-place.png" alt="">
				{{address}}
			</view>
			<view class="text">
				<img src="/static/hot-time.png" alt="">
				{{businessTime}}
			</view>
			<view class="text">
				<img src="/static/hot-phone.png" alt="">
				{{phone}}
			</view>
		</view>
		<view class="parks">
			<view class="item" v-for="(item, index) of nearParking" :key="index">
				<view class="title text">{{item.title}}</view>
				<view class="address text">{{item.address}}</view>
				<view class="other">
					<text class="type">{{item.type}}</text>
					<text class="price">{{item.price}}</text>
				</view>
				<img src="/static/map-go.png" class="go">
				<view class="distance">{{item.distance}}</view>
				<button class="order">在线下单</button>
			</view>
		</view>
	</view>
</template>

<script>
	// 引入 vuex 的 map 函数
	import {
		mapState
	} from 'vuex'

	// 引入 MD5 加密算法
	const crypto = require('crypto');

	export default {
		data() {
			return {
				title: '', // 名称
				address: '', // 地址
				businessTime: '', // 运营时间
				phone: '', // 电话
				nearParking: [], // 周边停车场
				swiperUrls: [] // 轮播图
			};
		},
		computed: {
			...mapState('user', ['windowHeight', 'token', 'secretKey'])
		},
		methods: {
			// 获取热门区域详细信息
			async getPopularAreaInfo(id) {
				const timestamp = Date.now()
				const realQuery = {
					token: this.token, // 用户凭证
					timestamp: timestamp, // 时间戳
					signType: 'MD5', // 签名类型
					id: id // 热门区域的唯一标识
				}

				// 加密签名
				const signature = this.getSignature(realQuery);

				// 请求参数
				let query = {
					token: this.token, // 用户凭证
					timestamp: timestamp, // 时间戳
					signType: 'MD5', // 签名类型
					signature: signature, // 签名
					id: id // 热门区域的唯一标识
				}
				console.log('query', query);
				// 发起请求
				const {
					data: res
				} = await uni.$http.post('/api/area/popularDetailsAreas', query);

				console.log('res', res);

				// 请求失败
				if (res.code !== 200) return uni.showToast({
					title: '获取热门区域详细信息失败',
					icon: 'none'
				})

				// 请求成功
				if (res.code === 200) {
					this.title = res.data.title; // 名称
					this.address = res.data.address; // 地址
					this.businessTime = res.data.businessTime; // 营业时间
					this.phone = res.data.phone; // 电话
					this.swiperUrls = res.data.swiperUrls; // 轮播图
					this.nearParking = res.data.nearParking; // 附近场
				}
			}
		},
		onLoad(options) {
			this.getPopularAreaInfo(Number(options.id))
		}
	}
</script>

<style lang="scss">
	.container {
		background-color: #ebecee;

		.swiper {
			width: 100%;
			height: 400rpx;
			text-align: center;
			line-height: 400rpx;
			font-size: 100rpx;
			color: #fff;
		}

		.info {
			box-sizing: border-box;
			width: 90%;
			height: 310rpx;
			border-radius: 20rpx;
			position: relative;
			top: -40rpx;
			margin: 0 auto;
			background-color: #fff;
			padding: 30rpx;

			.title {
				font-size: 40rpx;
				margin-bottom: 30rpx;
			}

			.text {
				margin-bottom: 20rpx;
				/* 1、先强制一行内显示文本（默认 normal 自动换行） */
				white-space: nowrap;
				/* 2、超出的部分隐藏 */
				overflow: hidden;
				/* 3、文字用省略号替代超出的部分 */
				text-overflow: ellipsis;

				img {
					width: 36rpx;
					height: 36rpx;
					margin-right: 26rpx;
					position: relative;
					top: 4rpx;
				}
			}
		}

		.parks {
			width: 90%;
			margin: 0 auto;

			.item {
				box-sizing: border-box;
				width: 100%;
				height: 260rpx;
				border-radius: 20rpx;
				background-color: #fff;
				margin-bottom: 20rpx;
				padding: 30rpx;
				position: relative;

				.title {
					width: 80%;
					font-size: 36rpx;
					margin-bottom: 30rpx;
				}

				.address {
					width: 60%;
					font-size: 30rpx;
					color: #a6a6a6;
				}

				.text {
					/* 1、先强制一行内显示文本（默认 normal 自动换行） */
					white-space: nowrap;
					/* 2、超出的部分隐藏 */
					overflow: hidden;
					/* 3、文字用省略号替代超出的部分 */
					text-overflow: ellipsis;
				}

				.other {
					font-size: 30rpx;
					margin-top: 40rpx;

					.type {
						padding: 12rpx;
						color: #efb150;
						background-color: #fdf7df;
					}

					.price {
						margin-left: 20rpx;
					}
				}

				.go {
					position: absolute;
					width: 60rpx;
					height: 60rpx;
					top: 40rpx;
					right: 40rpx;
				}

				.distance {
					position: absolute;
					top: 110rpx;
					right: 30rpx;
				}

				.order {
					font-size: 30rpx;
					position: absolute;
					bottom: 20rpx;
					right: 20rpx;
					width: 200rpx;
					height: 70rpx;
					background-color: #4186fd;
					line-height: 70rpx;
					text-align: center;
					color: #fff;
					border-radius: 35rpx;
				}
			}
		}
	}
</style>
