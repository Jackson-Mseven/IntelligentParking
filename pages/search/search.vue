<template>
	<view class="container" :style="{height:`${searchHeight}px`}">
		<view class="top">
			<uni-search-bar v-model="keyword" placeholder="请输入目的地" bgColor="#e8e8e8" :radius="30" :focus="true"
				@input="search" cancelButton="none">
			</uni-search-bar>
		</view>
		<scroll-view class="searchResult" :scroll-y="true" :style="{height:`${searchHeight - 8}px`}">
			<view class="resultItem" v-for="(item, index) of result" :key="index" @click="gotoDetail(item)">
				<img src="/static/place.png" class="location">
				<view class="title">
					{{result[index].title}}
				</view>
				<view class="address">
					{{result[index].address}}
				</view>
			</view>
		</scroll-view>
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
				keyword: '', // 关键词
				result: [], // 搜索结果
				timer: null // 用于防抖的定时器
			};
		},
		computed: {
			// 屏幕高度、登录凭证、密钥
			...mapState('user', ['windowHeight', 'token']),
			// 搜索栏的高度
			searchHeight() {
				return this.windowHeight + 48
			}
		},
		methods: {
			// 关键词搜索（通过节流操作提高效率）
			search(keyword) {
				// 清除定时器 timer
				clearTimeout(this.timer)
				// 为 timer 变量赋值为一个定时器，1s后执行
				this.timer = setTimeout(async () => {
					const timestamp = Date.now();
					const realQuery = {
						token: this.token, // 用户凭证
						timestamp: timestamp, // 时间戳
						signType: 'MD5', // 签名类型
						keyword: keyword // 关键词
					}

					// 加密签名
					const signature = this.getSignature(realQuery);

					// 请求参数
					const query = {
						token: this.token, // 用户凭证
						timestamp: timestamp, // 时间戳
						signType: 'MD5', // 签名类型
						signature: signature, // 签名
						keyword: keyword // 关键词
					}

					// 发起请求
					const {
						data: res
					} = await uni.$http.post('/api/park/search', query);
					console.log(res);

					// 请求失败
					if (res.code != 200) {
						uni.showToast({
							title: '搜索失败',
							icon: 'none'
						})
					}

					// 请求成功
					if (res.code === 200) {
						// 搜索结果为空
						if (res.data.result === []) {
							uni.showToast({
								title: '搜索结果为空',
								icon: 'none'
							})
						} else {
							// 搜索成功，赋值
							this.result = res.data;
						}
					}
				}, 1000)
			},
			// 跳转到停车场详细页面
			gotoDetail(info) {
				console.log(info);
				let carInfo = {
					title: info.title,
					address: info.address,
					distance: '500m',
					routeName: '临停',
					surplus: '10/30',
					price: '10元/小时'
				}
				uni.navigateTo({
					url: `/pages/detail/detail?carInfo=${carInfo}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		background-color: lightgray;

		.top {
			height: 110rpx;
			background-color: white;
		}

		.searchResult {
			background-color: white;

			.resultItem {
				position: relative;
				width: 90%;
				height: 110rpx;
				padding: 30rpx 0;
				margin: 0 auto;
				border-bottom: 1rpx solid #ccc;

				.location {
					position: absolute;
					top: 38rpx;
					left: 0;
					width: 40rpx;
					height: 40rpx;
				}

				.title {
					width: 80%;
					margin: 0 auto;
					font-size: 42rpx;
					/* 1、先强制一行内显示文本（默认 normal 自动换行） */
					white-space: nowrap;
					/* 2、超出的部分隐藏 */
					overflow: hidden;
					/* 3、文字用省略号替代超出的部分 */
					text-overflow: ellipsis;
				}

				.address {
					width: 80%;
					margin: 0 auto;
					font-size: 36rpx;
					color: darkgrey;
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
