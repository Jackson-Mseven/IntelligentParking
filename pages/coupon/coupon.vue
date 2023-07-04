<template>
	<view class="container">
		<div class="navigationBar">
			<view class="item" :class="activeIndex == 0 ? 'active' : ''" @click="checkActive(0)">
				未使用
				<view class="itemActive" v-show="activeIndex === 0"></view>
			</view>
			<view class="item" :class="activeIndex == 1 ? 'active' : ''" @click="checkActive(1)">
				已使用
				<view class="itemActive" v-show="activeIndex === 1"></view>
			</view>
			<view class="item" :class="activeIndex == 2 ? 'active' : ''" @click="checkActive(2)">
				已过期
				<view class="itemActive" v-show="activeIndex === 2"></view>
			</view>
			<view class="explain" @click="gotoExplain">`
				<img src="/static/question.png" alt="">
				说明
			</view>
		</div>
		<div class="noneCoupon" v-if="couponList.length == 0">
			<img src="/static/coupon.png" alt="">
			<div class="text">暂无优惠券</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: 0,
				couponList: [] // 优惠券
			};
		},
		methods: {
			// 跳转到说明页面
			gotoExplain() {
				uni.navigateTo({
					url: '/pages/explain/explain'
				})
			},
			// 切换活动的 navigationBar
			checkActive(index) {
				this.activeIndex = index;
			}
		}
	}
</script>

<style lang="scss">
	.container {
		height: 1334rpx;
		background-color: #ecedef;

		.navigationBar {
			height: 120rpx;
			background-color: #fff;

			.item {
				width: 26%;
				color: #bcbcbc;
				float: left;
				height: 120rpx;
				line-height: 120rpx;
				text-align: center;
				position: relative;

				.itemActive {
					position: absolute;
					bottom: 0;
					left: calc(50% - 46rpx);
					width: 80rpx;
					border: 6rpx solid #4288fd;
					border-radius: 6rpx;
				}
			}

			.active {
				color: #4087fe;
			}

			.explain {
				width: 20%;
				height: 60rpx;
				line-height: 60rpx;
				margin-top: 30rpx;
				float: right;
				text-align: center;
				border-left: 1px solid #eeeeee;

				img {
					width: 30rpx;
					height: 30rpx;
					position: relative;
					top: 5rpx;
					left: -10rpx;
				}
			}
		}

		.noneCoupon {
			width: 220rpx;
			height: 300rpx;
			margin: 200rpx auto;
			// background-color: pink;

			img {
				width: 220rpx;
				height: 200rpx;
			}

			.text {
				font-size: 24rpx;
				color: #aaaaa9;
				margin-top: 50rpx;
				text-align: center;
			}
		}
	}
</style>
