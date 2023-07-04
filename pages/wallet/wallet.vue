<template>
	<view class="container" :style="{height: `${windowHeight + 48}px`}">
		<view class="top">
			<view class="content">
				<view class="title">
					可用金额（元）
				</view>
				<view class="money">{{money}}</view>
			</view>
		</view>
		<view class="detail">
			<view class="title">
				收支明细
			</view>
			<view class="pic">
				<img src="/static/noWallet.png" alt="">
			</view>
			<view class="text">暂无明细</view>
		</view>
		<view class="btn">
			<button>申请提现</button>
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
				money: '0.00'
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
			background-color: #fff;
			overflow: hidden;

			.content {
				width: 90%;
				height: 260rpx;
				margin: 20rpx auto;
				background-color: #293356;
				border-radius: 20rpx;
				padding: 30rpx;
				box-sizing: border-box;

				.title {
					color: #fff;
					font-size: 36rpx;
					padding-top: 10rpx;
				}

				.money {
					color: #fff;
					font-size: 50rpx;
					padding-top: 40rpx;
				}
			}
		}

		.detail {
			padding: 30rpx;

			.pic {
				width: 300rpx;
				height: 300rpx;
				margin: 80rpx auto 60rpx;

				img {
					width: 100%;
					height: 100%;
				}
			}

			.text {
				text-align: center;
				font-size: 26rpx;
				color: #a3a4a2;
			}
		}

		.btn {
			height: 120rpx;
			width: 100%;
			background-color: #fff;
			position: fixed;
			bottom: 0;
			display: flex;
			justify-content: space-between;
			align-items: center;

			button {
				width: 80%;
				height: 100rpx;
				background-color: #4186fd;
				text-align: center;
				line-height: 100rpx;
				color: #fff;
				border-radius: 50rpx;
			}
		}
	}
</style>
