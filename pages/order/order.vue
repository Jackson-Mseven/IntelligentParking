<template>
	<view class="container" :style="{height: `${windowHeight}px`}">
		<view class="top">
			<view class="left" :class="activeTypeIndex === 0 ? 'active' : ''" @click="checkType(0)">停车订单</view>
			<view class="right" :class="activeTypeIndex === 1 ? 'active' : ''" @click="checkType(1)">长租/日租</view>
		</view>
		<view class="model">
			<view class="left" :class="activeModelIndex === 0 ? 'active' : ''" @click="checkModel(0)">
				进行中
				<view class="leftActive" v-show="activeModelIndex === 0"></view>
			</view>
			<view class="right" :class="activeModelIndex === 1 ? 'active' : ''" @click="checkModel(1)">
				历史订单
				<view class="rightActive" v-show="activeModelIndex === 1"></view>
			</view>
		</view>
		<view class="noneOrder" v-if="orderList.length == 0">
			<img src="/static/noneOrder.png" alt="">
			<view class="text">
				暂无订单信息
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				activeTypeIndex: 0, // 选中的类型（停车订单 / 长租）
				activeModelIndex: 0, // 选中的模式（进行中 / 历史订单）
				orderList: [] // 订单列表
			};
		},
		computed: {
			...mapState('user', ['windowHeight'])
		},
		methods: {
			checkType(index) {
				this.activeTypeIndex = index;
			},
			checkModel(index) {
				this.activeModelIndex = index;
			}
		}
	}
</script>

<style lang="scss">
	.container {
		background-color: #ebecee;

		.top {
			height: 100rpx;
			background-color: #fff;

			.left,
			.right {
				width: 47%;
				color: #000;
				height: 70rpx;
				line-height: 70rpx;
				text-align: center;
				border-radius: 10rpx;
			}

			.left {
				float: left;
				margin-left: 2%;
			}

			.right {
				float: right;
				margin-right: 2%;
			}

			.active {
				color: #fff;
				background-color: #4186fd;
			}
		}

		.model {
			height: 92rpx;
			background-color: #fff;

			.left,
			.right {
				width: 50%;
				color: #c1c1c1;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
			}

			.left {
				float: left;

				.leftActive {
					width: 80rpx;
					border: 6rpx solid #4288fd;
					margin: 0 auto;
					border-radius: 6rpx;
				}
			}

			.right {
				float: right;

				.rightActive {
					width: 110rpx;
					border: 6rpx solid #4288fd;
					margin: 0 auto;
					border-radius: 6rpx;
				}
			}

			.active {
				color: #4286fa;
			}
		}

		.noneOrder {
			width: 200rpx;
			height: 220rpx;
			margin: 200rpx auto;

			img {
				width: 100%;
				height: 100%;
			}

			.text {
				margin-top: 100rpx;
				color: #a8a9a8;
			}
		}
	}
</style>
