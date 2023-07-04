<template>
	<view class="container">
		<view class="top">
			<view class="title">{{title}}</view>
			<view class="address">{{address}}</view>
			<view class="distance">{{distance}}m</view>
			<img src="/static/map-go.png" class="go">
		</view>
		<view class="temporary">
			<view class="car">
				<div class="left">
					<span class="route">{{routeName}}</span>
					<span>{{surplus}}</span>
				</div>
				<div class="right">
					<span>{{price}}</span>
				</div>
			</view>
			<view class="middle">
				<view class="flexBox">
					<view class="title">
						营业时间
					</view>
					<view>
						{{businessHours}}
					</view>
				</view>
				<view class="flexBox">
					<view class="title">
						免费时长
					</view>
					<view>
						{{freeHours}}
					</view>
				</view>
				<view class="flexBox">
					<view class="title">
						24小时封顶
					</view>
					<view>
						{{capping}}
					</view>
				</view>
			</view>
			<view class="price">
				{{meta}}
			</view>
		</view>
		<view class="reservation">
			<icon type="info" size="15" color="darkgray" class="info"></icon>
			<text class="text">暂未开通预约服务</text>
			<button @click="apply" class="applyBtn" size="mini">申请开通</button>
		</view>
	</view>
</template>

<script>
	// 引入 vuex 的 map 函数
	import {
		mapState
	} from 'vuex'

	export default {
		data() {
			return {
				title: '', // 停车场名称
				address: '', // 停车场地址
				distance: 0, // 距离
				routeName: '', // 路由名称
				surplus: '', // 剩余空位
				price: '', // 价格
				businessHours: '', // 营业时间
				freeHours: '', // 免费时长
				capping: '-', // 封顶费用
				// meta: '前15分钟免费，前2小时25元，后每小时10元'
				meta: '' // 备注信息
			};
		},
		computed: {
			// 登录凭证
			...mapState('user', ['token']),
		},
		methods: {
			// 申请开通预约
			apply() {
				uni.showToast({
					title: '感谢您的反馈',
					icon: 'none'
				})
			},
			// 获取停车场信息
			async getDetailMsg(lat, lng) {
				// 时间戳
				const timestamp = Date.now();

				const realQuery = {
					token: this.token, // 用户凭证
					timestamp: timestamp, // 时间戳
					signType: 'MD5', // 签名类型
					lat: lat, // 纬度
					lng: lng // 经度
				}

				// 加密签名
				let signature = this.getSignature(realQuery);

				// 请求参数
				const query = {
					token: this.token, // 用户凭证
					timestamp: timestamp, // 时间戳
					signType: 'MD5', // 签名类型
					signature: signature, // 签名
					lat: lat, // 纬度
					lng: lng // 经度
				}

				console.log('query', query);

				// 发起请求
				const {
					data: res
				} = await uni.$http.post('/api/park/searchDetails', query);

				console.log('res', res);

				// 请求失败
				if (res.code != 200) {
					return uni.showToast({
						title: '获取停车场信息失败',
						icon: 'none'
					})
				}

				// 请求成功
				if (res.code === 200) {
					this.businessHours = res.data.businessHours; // 营业时间
					this.freeHours = res.data.freeHours; // 免费时长
					this.capping = res.data.capping; // 封顶费用
					this.meta = res.data.meta; // 备注信息
				}
			}
		},
		onLoad(option) {
			const details = JSON.parse(option.detailMsg)
			console.log(details);
			this.title = details.title; // 名称
			this.address = details.address; // 地址
			this.distance = details.distance; // 距离
			this.routeName = details.routeName; // 路由类型（临停，长租）
			this.surplus = details.surplus; // 剩余空位
			this.price = details.price; // 价格
			// 获取停车场详细信息
			// this.getDetailMsg('14490c356da54ea8a30bf145fc6221e4')
			this.getDetailMsg(details.lat, details.lng)
		}
	}
</script>

<style lang="scss">
	.container {
		font-size: 24rpx;
		background-color: lightgray;
		height: 1334rpx;

		.top {
			position: relative;
			height: 130rpx;
			background-color: white;
			padding: 30rpx 20rpx;
			margin-bottom: 20rpx;

			.title {
				width: 80%;
				font-size: 36rpx;
				margin-bottom: 30rpx;
			}

			.address {
				width: 70%;
				display: inline-block;
				float: left;
				color: darkgray;
			}

			.distance {
				display: inline-block;
				float: right;
			}

			.go {
				position: absolute;
				top: 30rpx;
				right: 24rpx;
				width: 60rpx;
				height: 60rpx;
			}
		}

		.temporary {
			height: 270rpx;
			background-color: white;
			padding: 40rpx 20rpx 30rpx;
			margin-bottom: 20rpx;

			.car {
				padding-bottom: 90rpx;

				.left {
					float: left;

					.route {
						padding: 6rpx;
						background-color: lightblue;
						color: blue;
						margin-right: 10rpx;
					}
				}

				.right {
					float: right;

					span {
						color: darkgray;
					}
				}

			}

			.middle {
				display: flex;
				justify-content: space-between;
				height: 120rpx;
				margin-bottom: 30rpx;

				.flexBox {
					width: 30%;
					height: 100%;
					border-radius: 10rpx;
					box-shadow: 0 0 10rpx darkgray;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-evenly;

					.title {
						color: darkgray;
					}
				}
			}

			.price {
				color: darkgrey;
			}
		}

		.reservation {
			height: 80rpx;
			padding: 30rpx;
			background-color: white;
			position: relative;

			.info {
				line-height: 110rpx;
			}

			.text {
				color: darkgray;
				position: absolute;
				left: 80rpx;
				top: 50rpx;
			}

			.applyBtn {
				position: absolute;
				top: 40rpx;
				right: 30rpx;
				border: 1rpx solid #8c8cff;
				border-radius: 50rpx;
				color: #8c8cff;
			}
		}
	}
</style>
