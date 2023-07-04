<template>
	<view class="container">
		<view class="title">
			<view class="item" :class="active === index ? 'active' : ''" v-for="(item, index) of classifies"
				:key="index" @click="checkClassfy(index)">
				<view v-show="active === index"></view>
				{{item}}
			</view>
		</view>
		<scroll-view :scroll-y="true" class="content" :style="{height: `${windowHeight + 48}px`}">
			<!-- <view class="item" :style="{background-image: url(item.bgUrl)}" v-for="(item, index) of hotports"
				:key="index" v-show="item.belong === classifies[active]">
				<view class="text">{{item.name}}</view>
			</view> -->
			<view class="item" v-for="(item, index) of hotports" :key="index"
				:style="{backgroundImage: 'url(' + item.bgUrl + ')'}" v-show="item.belong === classifies[active]"
				@click="gotoHotDetail(item.id)">
				<view class="text">{{item.title}}</view>
			</view>
		</scroll-view>
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
				active: 0, // 选中的分类
				classifies: [], // 分类列表
				hotports: []
			};
		},
		computed: {
			// 屏幕高度、登陆凭证、密钥
			...mapState('user', ['windowHeight', 'token', 'secretKey'])
		},
		methods: {
			// 切换分类
			checkClassfy(index) {
				this.active = index;
			},
			// 获取热门区域
			async getPopularAreas(cityName) {
				const timestamp = Date.now();
				const realQuery = {
					token: this.token, // 用户凭证
					timestamp: timestamp, // 时间戳
					signType: 'MD5', // 签名类型
					cityName: cityName // 市区名称
				}

				// 请求参数
				const signature = this.getSignature(realQuery);

				// 请求参数
				const query = {
					token: this.token, // 用户凭证
					timestamp: timestamp, // 时间戳
					signType: 'MD5', // 签名类型
					signature: signature, // 签名
					cityName: cityName // 市区名称
				}
				// 发起请求
				const {
					data: res
				} = await uni.$http.post('/api/area/popularAreas', query);

				console.log('res', res);
				// 请求失败
				if (res.code !== 200) return uni.showToast({
					title: '获取热门区域失败',
					icon: 'none'
				})

				// 请求成功
				if (res.code === 200) {
					// classifies、hotports 赋值
					this.classifies = res.data.classifies;
					this.hotports = res.data.hotports;
				}
			},
			// 跳转到热门详细页面
			gotoHotDetail(id) {
				uni.navigateTo({
					url: `/pages/hotDetail/hotDetail?id=${id}`
				})
			}
		},
		onLoad() {
			this.getPopularAreas('万州区');
		}
	}
</script>

<style lang="scss">
	.container {
		.title {
			display: inline-block;
			width: 30%;

			.item {
				width: 100%;
				height: 100rpx;
				background-color: #fff;
				float: left;
				line-height: 100rpx;
				text-align: center;
				color: #b9b9b9;

				view {
					width: 0rpx;
					height: 100rpx;
					border: 4rpx solid #4188fd;
					float: left;
				}
			}

			.active {

				background-color: #f7f7f9;
				color: #000;
			}
		}

		.content {
			float: right;
			width: 70%;
			height: 1000rpx;
			background-color: #ecedef;

			.item {
				width: 90%;
				height: 140rpx;
				background-color: pink;
				margin: 20rpx auto 0;
				border-radius: 20rpx;
				overflow: hidden;

				.text {
					font-size: 40rpx;
					color: #fff;
					margin: 20rpx;
					/* 1、先强制一行内显示文本（默认 normal 自动换行） */
					white-space: nowrap;
					/* 2、超出的部分隐藏 */
					overflow: hidden;
					/* 3、文字用省略号替代超出的部分 */
					text-overflow: ellipsis;
				}
			}
		}
	}
</style>
