<template>
	<view>
		<view class="top">
			<view class="bind" @click="goBind">
				<img src="/static/serve-add.png" class="add">
				<view class="text">
					绑定车辆，快捷缴费
				</view>
			</view>
		</view>
		<view class="bottom">
			<view class="firstFloor">
				<div class="classify">
					<img src="/static/serve-query.png" class="classifyPic">
					<view class="title">缴费查询</view>
				</div>
				<div class="classify">
					<img src="/static/serve-appointment.png" class="classifyPic">
					<view class="title">车位预约</view>
				</div>
				<div class="classify">
					<img src="/static/serve-rent.png" class="classifyPic">
					<view class="title">长租/日租</view>
				</div>
				<div class="classify">
					<img src="/static/serve-plane.png" class="classifyPic">
					<view class="title">天府机场</view>
				</div>
				<div class="classify">
					<img src="/static/serve-oil.png" class="classifyPic">
					<view class="title">优惠加油</view>
				</div>
				<div class="classify">
					<img src="/static/serve-ETC.png" class="classifyPic">
					<view class="title">ETC授权</view>
				</div>
				<div class="classify">
					<img src="/static/serve-publish.png" class="classifyPic">
					<view class="title">车位发布</view>
				</div>
				<div class="classify">
					<img src="/static/serve-online.png" class="classifyPic">
					<view class="title">在线客服</view>
				</div>
				<img src="/static/serve-advertisement.png" class="advertisement">
			</view>
			<view class="secendFloor">
				<view class="title">
					<view class="text">
						热门区域
					</view>
					<view class="more" @click="gotoHot">
						查看更多
						<uni-icons type="forward" size="20" class="go"></uni-icons>
					</view>
				</view>
				<view class="content">
					<view class="item">
						<img src="/static/serve-airport.png" alt="">
					</view>
					<view class="item">
						<img src="/static/serve-hospital.png" alt="">
					</view>
					<view class="item">
						<img src="/static/serve-traffic.png" alt="">
					</view>
					<view class="item">
						<img src="/static/serve-business.png" alt="">
					</view>
					<view class="item">
						<img src="/static/serve-scenicSpot.png" alt="">
					</view>
					<view class="item">
						<img src="/static/serve-politics.png" alt="">
					</view>
				</view>
			</view>
			<view class="thirdFloor">
				<view class="title">
					<view class="text">
						停车头条
					</view>
					<view class="more">
						查看更多
						<uni-icons type="forward" size="20" class="go"></uni-icons>
					</view>
				</view>
				<view class="content">
					<view class="item" v-for="(item, index) of news" :key="index">
						<view class=" left">
							<view class="text">{{item.title}}</view>
							<view class="date">{{item.date}}</view>
						</view>
						<view class="right">
							<img :src="item.imgUrl" alt="">
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				news: []
			};
		},
		methods: {
			// 跳转到bind页面
			goBind() {
				uni.navigateTo({
					url: '/pages/bind/bind'
				})
			},
			// 跳转到hot页面
			gotoHot() {
				uni.navigateTo({
					url: '/pages/hot/hot'
				})
			},
			// 获取新闻信息
			async getNews() {
				// // 发起请求
				// const {
				// 	date: res
				// } = await uni.$http.get('/api/serve/headlines')

				// // 请求失败
				// if (res.code !== 200) return uni.showToast({
				// 	title: '获取新闻信息失败',
				// 	icon: 'none'
				// })

				// // 请求成功
				// if (res.code === 200) {
				// 	// news赋值
				// 	this.news = res.data.result;
				// }
				this.news = [{
					title: '今天起，万州出行有变！还需注意xxx', // 标题
					imgUrl: '/static/serve-airport.png', // 图片地址
					date: '2023-03-20' // 日期
				}, {
					title: '今天起，万州出行有变！还需注意xxx',
					imgUrl: '/static/serve-airport.png',
					date: '2023-03-20'
				}, {
					title: '今天起，万州出行有变！还需注意xxx',
					imgUrl: '/static/serve-airport.png',
					date: '2023-03-20'
				}]
			},
		},
		onLoad() {
			this.getNews();
		}
	}
</script>

<style lang="scss">
	view {
		.top {
			height: 360rpx;
			padding: 30rpx 0;
			background-color: #4186fd;

			.bind {
				width: 86%;
				height: 300rpx;
				border-radius: 20rpx;
				margin: 0 auto;
				background-color: #054bc4;
				position: relative;

				.add {
					position: absolute;
					width: 40rpx;
					height: 40rpx;
					top: 130rpx;
					left: 160rpx;
				}

				.text {
					color: #4186fd;
					position: absolute;
					top: 130rpx;
					left: 210rpx;
				}
			}
		}

		.bottom {
			height: 2300rpx;
			background-color: #ecedef;
			border-top-left-radius: 30rpx;
			border-top-right-radius: 30rpx;
			overflow: hidden;
			position: relative;
			top: -40rpx;

			.firstFloor {
				background-color: white;
				height: 680rpx;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-evenly;
				margin-bottom: 30rpx;

				.classify {
					width: 21%;
					height: 21%;
					margin-top: 30rpx;

					.classifyPic {
						width: 100rpx;
						height: 100rpx;
						position: relative;
						left: 38rpx;
					}

					.title {
						margin-top: 10rpx;
						font-size: 24rpx;
						text-align: center;
						// color: darkgray;
					}
				}

				.advertisement {
					width: 90%;
					height: 260rpx;
					margin: 40rpx 0 30rpx 0;
				}
			}

			.secendFloor {
				height: 640rpx;
				padding: 0 40rpx;
				background-color: white;
				margin-bottom: 30rpx;

				.title {
					height: 50rpx;
					padding: 40rpx 0;
					line-height: 50rpx;

					.text {
						font-size: 40rpx;
						float: left;
					}

					.more {
						color: darkgray;
						float: right;
						position: relative;
						padding-right: 60rpx;

						.go {
							position: absolute;
							top: 0rpx;
							right: 0rpx;
						}
					}
				}

				.content {
					height: 500rpx;
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;

					.item {
						width: 31%;
						aspect-ratio: 1;
						margin-bottom: 30rpx;
						border-radius: 20rpx;
						overflow: hidden;

						img {
							width: 100%;
							height: 100%;
						}
					}
				}
			}

			.thirdFloor {
				height: 860rpx;
				padding: 0 40rpx;
				background-color: white;

				.title {
					height: 50rpx;
					padding: 40rpx 0;
					line-height: 50rpx;

					.text {
						font-size: 40rpx;
						float: left;
					}

					.more {
						color: darkgray;
						float: right;
						position: relative;
						padding-right: 60rpx;

						.go {
							position: absolute;
							top: 0rpx;
							right: 0rpx;
						}
					}
				}

				.content {
					height: 400rpx;

					.item {
						height: 200rpx;
						border-bottom: 1rpx solid #ccc;
						padding: 20rpx 0;

						.left {
							height: 200rpx;
							float: left;
							width: 70%;
							position: relative;

							.text {
								/* 1、先强制一行内显示文本（默认 normal 自动换行） */
								white-space: nowrap;
								/* 2、超出的部分隐藏 */
								overflow: hidden;
								/* 3、文字用省略号替代超出的部分 */
								text-overflow: ellipsis;
							}

							.date {
								position: absolute;
								bottom: 0;
								color: darkgray;
								font-size: 28rpx;
							}
						}

						.right {
							float: right;
							width: 30%;
							height: 200rpx;
							border-radius: 10rpx;
							overflow: hidden;

							img {
								width: 100%;
								height: 100%;
							}
						}
					}
				}
			}
		}
	}
</style>
