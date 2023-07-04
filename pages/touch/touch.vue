<template>
	<view class="container" :style="{height: `${windowHeight + 48}px`}">
		<view class="list">
			<view class="item">
				<img src="/static/touch-phone.png" alt="">
				<view class="text">
					<view class="title">
						联系电话
					</view>
					<view class="meta">
						在线时间 8:30-21:00
					</view>
				</view>
				<uni-icons type="forward" size="24" color="#d4d4d4" class="go"></uni-icons>
			</view>
			<view class="item">
				<img src="/static/touch-online.png" alt="">
				<view class="text">
					<view class="title">
						在线客服
					</view>
					<view class="meta">
						停车违规行为在线举报
					</view>
				</view>
				<uni-icons type="forward" size="24" color="#d4d4d4" class="go"></uni-icons>
			</view>
			<view class="item">
				<img src="/static/touch-opinion.png" alt="">
				<view class="text">
					<view class="title">
						意见反馈
					</view>
					<view class="meta">
						问题反馈，产品建议
					</view>
				</view>
				<uni-icons type="forward" size="24" color="#d4d4d4" class="go"></uni-icons>
			</view>
			<view class="item">
				<img src="/static/touch-interest.png" alt="">
				<view class="text">
					<view class="title">
						关注公众号
					</view>
					<view class="meta">
						出行指南，车主福利
					</view>
				</view>
				<uni-icons type="forward" size="24" color="#d4d4d4" class="go"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	// 引入vuex中的map函数
	import {
		mapState
	} from 'vuex';

	export default {
		data() {
			return {

			};
		},
		computed: {
			// 屏幕高度
			...mapState('user', ['windowHeight']),
		}
	}
</script>

<style lang="scss">
	.container {
		background-color: #ecedef;

		.list {
			overflow: hidden;

			.item {
				width: 90%;
				height: 140rpx;
				background-color: #fff;
				margin: 20rpx auto;
				box-sizing: border-box;
				padding: 20rpx;
				display: flex;
				align-items: center;
				position: relative;
				border-radius: 6rpx;

				img {
					width: 76rpx;
					height: 76rpx;
					margin: 0 30rpx 0 10rpx;
				}

				.text {
					.title {
						font-size: 30rpx;
						padding-bottom: 10rpx;
					}

					.meta {
						font-size: 24rpx;
						color: #cbcacb;
					}
				}

				.go {
					position: absolute;
					right: 20rpx;
				}
			}
		}
	}
</style>
