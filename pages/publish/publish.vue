<template>
	<view class="container" :style="{height: `${windowHeight + 48}px`}">
		<view class="pic">
			<img src="/static/publish.png" alt="">
		</view>
		<view class="title">您还没有开启车位共享</view>
		<view class="text">为什么开启车位共享？</view>
		<view class="text">将闲置车位资源共享给需要的人</view>
		<view class="text">您也会获得相应的收益</view>
		<view class="btn">
			<button>发布车位</button>
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
		overflow: hidden;

		.pic {
			width: 340rpx;
			height: 400rpx;
			margin: 60rpx auto 40rpx;

			img {
				width: 100%;
				height: 100%;
			}
		}

		.title {
			font-size: 50rpx;
			text-align: center;
			margin-bottom: 60rpx;
		}

		.text {
			text-align: center;
			font-size: 24rpx;
			color: #a8a9a7;
			margin-bottom: 40rpx;
		}

		.btn {
			height: 100rpx;
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
