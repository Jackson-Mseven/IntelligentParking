<template>
	<view class="container" :style="{height: `${windowHeight + 48}px`}">
		<view class="list">
			<view class="item" style="border-bottom: 1rpx solid #ccc;">
				<text>用户注册协议</text>
				<uni-icons type="forward" size="24" class="go"></uni-icons>
			</view>
			<view class="item">
				<text>隐私协议</text>
				<uni-icons type="forward" size="24" class="go"></uni-icons>
			</view>
		</view>
		<view class="meta">
			温馨提示：注销账户并清除个人数据请联系客服.
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

		.list {
			background-color: #fff;
			margin: 20rpx 0;

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

		.meta {
			color: #b1b2b0;
			margin-left: 40rpx;
			font-size: 24rpx;
		}
	}
</style>
