<template>
	<view class="container" :style="{height: `${windowHeight + 48}px`}">
		<view class="top">
			<view class="item">
				<view class="pic">
					<img src="/static/publish-temporary.png" alt="">
				</view>
				<view class="text">
					临停开票
				</view>
			</view>
			<view class="item">
				<view class="pic">
					<img src="/static/publish-reservation.png" alt="">
				</view>
				<view class="text">
					预约开票
				</view>
			</view>
			<view class="item">
				<view class="pic">
					<img src="/static/publish-long.png" alt="">
				</view>
				<view class="text">
					长租开票
				</view>
			</view>
		</view>
		<view class="list">
			<view class="item">
				<text>开票历史</text>
				<uni-icons type="forward" size="24" class="go"></uni-icons>
			</view>
			<view class="item">
				<text>常用抬头</text>
				<uni-icons type="forward" size="24" class="go"></uni-icons>
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

		.top {
			height: 320rpx;
			display: flex;
			justify-content: space-evenly;
			align-items: center;

			.item {
				width: 30%;
				height: 240rpx;
				background-color: #fff;
				border-radius: 20rpx;

				.pic {
					width: 100rpx;
					height: 100rpx;
					margin: 40rpx auto 20rpx;

					img {
						width: 100%;
						height: 100%;
					}
				}

				.text {
					text-align: center;
				}
			}
		}

		.list {
			background-color: #fff;

			.item {
				height: 100rpx;
				width: 90%;
				line-height: 100rpx;
				margin: 0 auto;
				position: relative;
				color: #323232;

				.go {
					position: absolute;
					right: 0;
				}
			}
		}
	}
</style>
