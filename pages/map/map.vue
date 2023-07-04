<template>
	<view>
		<view class="top">
			<view class="search" @click="searchClick">
				<uni-icons type="search" size="20" color="#ccc"></uni-icons>
				<span>搜索目的地</span>
			</view>
			<view class="router">
				<view @click="checkRoute(0)" :class="currentRoute === 0 ? 'active' : ''">临停</view>
				<view @click="checkRoute(1)" :class="currentRoute === 1 ? 'active' : ''">预约</view>
				<view @click="checkRoute(2)" :class="currentRoute === 2 ? 'active' : ''">长租</view>
			</view>
		</view>
		<view class="map" :style="{height:`${mapHeight}px`}">
			<map id="map" :style="{height:`${mapHeight}px`}" :markers="markers" :longitude="myLongitude"
				:latitude="myLatitude" :polyline="polyline" @markertap="markerClick">
			</map>
		</view>
		<view class="near">
			<view class="twig"></view>
			<view class="pointer">上拉展开附近停车场</view>
			<span class="title" @click="checkType(0)" :class="activeType === 0 ? 'active' : ''">全部</span>
			<span class="title" @click="checkType(1)" :class="activeType === 1 ? 'active' : ''">路边停车场</span>
			<view class="details">
				<view class="detail" v-for="item of showMarkers" :key="item.index" @click="goDetail(item.index)">
					<h1>{{item.title}}</h1>
					<view>
						<span class="left1">{{item.address}}</span>
						<span class="right1">{{distance[item.index]}}m</span>
					</view>
					<view>
						<span class="left2">
							<span class="car" :class="routerColor[currentRoute]">{{routeName[currentRoute]}}</span>
							<span class="surplus">{{result[item.index].surplus}}</span>
						</span>
						<span class=" right2">{{result[item.index].price}}</span>
					</view>
					<img src="/static/map-go.png" class="go" @click="goParking(item.index)">
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// 引入 vuex 的 map 函数
	import {
		mapState,
		mapMutations
	} from 'vuex';

	export default {
		data() {
			return {
				subKey: 'MSTBZ-V3FKD-Y6X4K-PZEFD-JWUF5-R2B2J', // 管理员的AppID
				latitude: 0, // 纬度
				longitude: 0, // 经度
				index: 0, // 当前地点的索引
				markers: [], // 原始的标记点信息
				showMarkers: [], // 展示的标记点信息
				myLatitude: 0, // 用户的纬度
				myLongitude: 0, // 用户的经度
				polyline: [], // 导航线段
				result: [], // 标记点的信息
				isSearch: false, // 是否搜索最近的停车位
				currentRoute: 0, // 当前路由
				routeName: ['临停', '预约', '长租'], // 路由的名称
				routerColor: ['blue', 'green', 'purple'], // 路由的颜色
				markerIcon: [
					'/static/map-temporary-parking.png',
					'/static/map-parking-reservation.png',
					'/static/map-long-parking.png'
				], // 标记点图标
				selectedMarkerIcon: [
					'/static/map-selected-temporary-parking.png',
					'/static/map-selected-parking-reservation.png',
					'/static/map-selected-long-parking.png'
				], // 选中的标记点图标
				activeType: 0, // 选中的停车场类型
				isNavigate: true, // 是否跳转
				arriveTime: 0, // 判断到达的
				getLocationTimer: null, // 获取定位定时器
			};
		},
		computed: {
			// 屏幕高度、登录凭证、密钥
			...mapState('user', ['windowHeight', 'token']),
			// 与每个标记点的距离
			distance() {
				let arr = []
				this.markers.forEach(item => {
					arr.push(Math.ceil(Math.sqrt(Math.pow(item.latitude - this.myLatitude, 2) + Math.pow(item
						.longitude - this
						.myLongitude, 2)) / 360 * 300000000))
				})
				return arr
			},
			// 地图组件的高度
			mapHeight() {
				return this.windowHeight - 325;
			},
			// 与导航的标记点的距离
			currentDistance() {
				let dis = Math.ceil(Math.sqrt(Math.pow(this.latitude - this.myLatitude, 2) + Math.pow(this.longitude - this
					.myLongitude, 2)) / 360 * 300000000);
				return dis;
			}
		},
		watch: {
			isSearch: {
				handler() {
					this.searchParking();
					this.searchDetails();
				}
			},
			currentDistance: {
				handler() {
					if (this.arriveTime === 0) {
						this.isArrive();
					}
				}
			}
		},
		methods: {
			...mapMutations('user', ['updateWindowHeight', 'token']),
			// 点击搜索按钮
			searchClick() {
				uni.navigateTo({
					url: '/pages/search/search'
				})
			},
			// 切换路由
			checkRoute(index) {
				// 修改 data 中的当前路由
				this.currentRoute = index;
				// 将标记点索引重置为0
				this.index = 0
				// 刷新地图
				this.searchParking()
			},
			// 切换类型
			checkType(index) {
				this.activeType = index
			},
			// 跳转到详细页面
			goDetail(index) {
				if (this.isNavigate) {
					// 跳转携带的参数——标记点详细信息
					let detailMsg = {
						lat: this.markers[index].latitude, // 纬度
						lng: this.markers[index].longitude, // 经度
						title: this.markers[index].title, // 名称
						address: this.markers[index].address, // 地址
						distance: this.distance[index], // 距离
						routeName: this.routeName[this.currentRoute], // 路由名称
						// surplus: this.surplus[index], // 剩余空位
						surplus: this.result[index].surplus,
						price: this.result[index].price // 价格
					}

					// 路由跳转
					uni.navigateTo({
						url: `/pages/detail/detail?detailMsg=${JSON.stringify(detailMsg)}`,
					})
				}
			},
			// 获取当前手机的尺寸
			async getPhoneSize() {
				// 手机的可用高度
				const windowHeight = await uni.getWindowInfo().windowHeight
				// 修改 vuex 中的 windowHeight
				this.updateWindowHeight(windowHeight)
			},
			// 获取用户定位
			getUserLocation() {
				const _this = this;
				// 判断用户授权
				uni.getSetting({
					success(res) {
						// 如果用户没有授权定位，则申请授权
						if (!res.authSetting['scope.userLocation']) {
							uni.authorize({
								scope: 'scope.userLocation'
							})
						}
						// 如果用户没有授权后台持续定位，则申请授权
						if (!res.authSetting['scope.userLocationBackground']) {
							uni.authorize({
								scope: 'scope.userLocationBackground'
							})
						}
					}
				})
				// 获取用户定位
				uni.getLocation({
					type: 'gcj02', //默认为 wgs84 返回 gps 坐标，gcj02 返回可用于wx.openLocation的坐标
					success(res) {
						_this.myLatitude = res.latitude;
						_this.myLongitude = res.longitude;
						if (_this.token !== '') _this.isSearch = true;
						else uni.showToast({
							title: '请先登录',
							icon: 'none'
						})
					},
					fail(err) {
						uni.showToast({
							title: '请打开定位',
							icon: 'error'
						})
					}
				})

				// 实时监听用户定位
				uni.onLocationChange(function(res) {
					_this.myLatitude = res.latitude;
					_this.myLongitude = res.longitude;
					if (_this.token !== '') _this.isSearch = true;
				})
				// 后台监听用户定位
				uni.startLocationUpdateBackground({
					type: 'gcj02'
				})
				// 前台监听用户定位
				uni.startLocationUpdate({
					type: 'gcj02'
				})
			},
			// 搜索最近的10个停车场
			searchParking() {
				const _this = this;
				let allMarkers = []; // 标记点的数组
				let lats = []; // 停车场的维度
				let lngs = []; // 停车场的经度
				// 发请求获取地图
				uni.request({
					/* 
					 key：开发密钥
					 keyword：关键字（通过 encodeURL 编码）
					 boundary：边界
					 */
					url: `https://apis.map.qq.com/ws/place/v1/search?boundary=nearby(${_this.myLatitude},${_this.myLongitude},1000)&keyword=${encodeURI('停车场')}&key=${this.subKey}`,
					// 成功的回调
					success(res) {
						let pois = res.data.data // 所有地点的信息
						// 遍历所有地点信息的数组，将各种数据赋值
						for (let i = 0; i < pois.length; i++) {
							// 标记点
							let marker = {
								index: i, // 标记点的索引
								id: Number(pois[i].id), // 标记点的ID
								title: pois[i].title, // 店名
								address: pois[i].address, // 地址
								latitude: pois[i].location.lat, // 纬度
								longitude: pois[i].location.lng, // 精度
								iconPath: _this.markerIcon[_this.currentRoute], // 显示的图标
								width: 30, // 图标的宽
								height: 30, // 图标的高
								callout: { // 点击气泡
									content: pois[i].title,
									borderRadius: 10,
									borderWidth: 10
								}
							}

							// 将标记点添加到标记点的数组的后面
							allMarkers.push(marker);
							// 将标记点清空
							marker = null;

							// 向parkingIDs数组添加停车场的ID
							lats.push(String(pois[i].location.lat));
							lngs.push(String(pois[i].location.lng));
						}

						// 修改 data 中的 latitude、longitude、markers
						if (_this.index < allMarkers.length) {
							_this.latitude = allMarkers[_this.index].latitude;
							_this.longitude = allMarkers[_this.index].longitude;
							_this.index++;
						} else {
							_this.index = 0;
							_this.latitude = allMarkers[_this.index].latitude;
							_this.longitude = allMarkers[_this.index].longitude;
						}
						_this.markers = allMarkers;
						// 默认选中最近的车位
						_this.markerClick({
							markerId: _this.markers[0].id
						})

						// 搜索详细信息
						_this.searchDetails(lats, lngs);
					}
				})
				uni.showToast({
					title: '已为您查询最近的停车场',
					icon: 'none'
				})
			},
			// 标记点点击
			markerClick(e) {
				// 存放上一次点击的index
				const _index = this.index
				for (const value of this.markers) {
					if (value.id === e.markerId) {
						this.index = value.index; // 终点索引
						break;
					}
				}

				// 切换普通标记点的图片路径
				this.markers[_index].iconPath = this.markerIcon[this.currentRoute];

				// 切换选中标记点的图片路径
				this.markers[this.index].iconPath = this.selectedMarkerIcon[this.currentRoute];
				this.showMarkers = [];
				this.markers.forEach((item, index) => {
					if (index === this.index) return this.showMarkers.unshift(item);
					this.showMarkers.push(item);
				})
			},
			// 导航
			goParking(index) {
				const _this = this;
				// isNavigate赋值：用于防止导航过程中跳转到标记点详细页面
				this.isNavigate = false;
				this.latitude = this.markers[index].latitude; // 终点的纬度
				this.longitude = this.markers[index].longitude; // 终点的经度

				// 发起请求展示导航路线
				uni.request({
					/* 
					 key：开发key
					 from：起点位置坐标
					 to：终点位置坐标
					 */
					url: `https://apis.map.qq.com/ws/direction/v1/driving/?key=${_this.subKey}&from=${_this.myLatitude},${_this.myLongitude}&to=${_this.latitude},${_this.longitude}`,
					success(res) {
						// 路线方案
						let route = res.data.result.routes[0]
						// 方案路线坐标点串
						let coors = route.polyline
						// 导航线段的坐标点
						let pl = []
						//坐标解压（返回的点串坐标，通过前向差分进行压缩）
						const kr = 1000000;
						for (let i = 2; i < coors.length; i++) {
							coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
						}
						//将解压后的坐标放入点串数组pl中
						for (let i = 0; i < coors.length; i += 2) {
							pl.push({
								latitude: coors[i],
								longitude: coors[i + 1]
							})
						}
						_this.latitude = pl[0].latitude
						_this.longitude = pl[0].longitude
						_this.polyline = [{
							points: pl,
							color: '#58c16c',
							width: 6,
							borderColor: '#2f693c',
							borderWidth: 1
						}]
					}
				});

				// 定时器
				let timer = function() {
					// isNavigate赋值
					this.isNavigate = true
					// 展示model框，判断是否到达
					uni.showModal({
						title: '是否已经到达目的地',
						success(res) {
							if (res.confirm === true) {
								// 用户坐标
								const coordinate = {
									latitude: _this.result[index].entranceLat,
									longitude: _this.result[index].entranceLng
								}

								// 跳转到parking页面
								uni.navigateTo({
									url: `/pages/parking/parking?coordinate=${JSON.stringify(coordinate)}`
								})
							}
						}
					})
				}
				setTimeout(timer, 5000);

				// 滚动到页面顶部
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 1000
				});
			},
			// 判断是否到达
			isArrive() {
				const _this = this;
				// 判断到达定时器是否为0（即可以显示model框）
				if (this.arriveTime == 0) {
					// 判断距离是否小于等于10m
					if (this.currentDistance <= 10) {
						// 将到达定时器设置为1
						this.arriveTime = 1;
						uni.showModal({
							title: '是否已经到达目的地',
							success(res) {
								if (res.confirm === true) {
									// 用户坐标
									const coordinate = {
										latitude: _this.result[index].entranceLat,
										longitude: _this.result[index].entranceLng
									}

									// 跳转到parking页面
									uni.navigateTo({
										url: `/pages/parking/parking?coordinate=${JSON.stringify(coordinate)}`
									})
								}
								if (res.cancel === true) {
									setTimeout(() => {
										this.arriveTime = 0
									}, 10000)
								}
							}
						})
					}
				}
			},
			// 搜索详细信息
			async searchDetails(lats, lngs) {
				if (this.token == '') return uni.showToast({
					title: '请先登录',
					icon: 'none'
				})

				// 时间戳
				const timestamp = Date.now();

				let realQuery = {
					token: this.token, // 用户凭证
					timestamp: timestamp, // 时间戳
					signType: 'MD5', // 签名类型
					lats: lats, // 停车场的维度
					lngs: lngs // 停车场的经度
				}

				// 加密签名
				let signature = this.getSignature(realQuery);

				// 请求参数
				let query = {
					token: this.token, // 用户凭证
					timestamp: timestamp, // 时间戳
					signType: 'MD5', // 签名类型
					signature: signature, // 签名
					lats: lats, // 纬度
					lngs: lngs // 经度
				}

				// 发起请求
				const {
					data: res
				} = await uni.$http.post('/api/park/areaDetails', query);


				// 请求失败
				if (res.code != 200) return uni.showToast({
					title: '获取信息失败',
					icon: 'none'
				})

				// 请求成功
				if (res.code === 200) {
					this.result = [];
					const data = res.data.result;
					// 向this.result中填充数据
					for (let i = 0; i < lats.length; i++) {
						for (let j = 0; j < lats.length; j++) {
							if (data[j] != null && j != lats.length - 1) {
								if (data[j].lat === Number(lats[i]) && data[j].lng === Number(lngs[i])) {
									this.result.push(data[j]);
									break;
								}
							}
							if (j == lats.length - 1) {
								if (data[j] == null) {
									this.result.push({
										price: '-',
										surplus: '-'
									})
									break;
								}
								if (data[j].latitude !== Number(lats[i]) || data[j].lng !== Number(lngs[i])) {
									this.result.push({
										price: '-',
										surplus: '-'
									})
									break;
								}
							}
						}
					}
				}
			}
		},
		onLoad() {
			this.getPhoneSize()
			this.getUserLocation()
		}
	}
</script>

<style lang="scss">
	view {
		.top {
			padding-top: 10rpx;

			.search {
				width: 90%;
				height: 80rpx;
				background-color: #e6e6e6;
				line-height: 80rpx;
				margin: 0 auto;
				padding-left: 30rpx;
				border-radius: 50rpx;
				color: #ccc;

				span {
					padding-left: 20rpx;
				}
			}

			.router {
				display: flex;
				padding: 20rpx 0;

				view {
					flex: 1;
					text-align: center;
					color: #000;
				}

				.active {
					color: #4186fd;
				}
			}
		}

		.map {
			overflow: hidden;
			// height: 520rpx;

			#map {
				width: 100%;
				// height: 520rpx;
			}
		}

		.near {
			overflow: hidden;
			height: 3100rpx;
			// background-color: pink;

			.twig {
				width: 100rpx;
				margin: 20rpx auto;
				border: 6rpx solid darkgray;
				border-radius: 6rpx;
			}

			.pointer {
				color: darkgray;
				text-align: center;
				font-size: 26rpx;
				margin-bottom: 40rpx;
			}

			.title {
				background-color: #e6e6e6;
				color: darkgray;
				margin-left: 20rpx;
				border-radius: 20rpx;
				padding: 8rpx 16rpx;
				font-size: 26rpx;

			}

			.active {
				color: #4186fd;
				background-color: #b6e5f8;
			}

			.details {
				margin: 40rpx auto 0rpx;
				height: 2500rpx;

				.detail {
					position: relative;
					margin: 0rpx auto 40rpx;
					height: 250rpx;
					width: 90%;
					border-radius: 20rpx;
					box-shadow: 0rpx 0rpx 10rpx darkgray;

					h1 {
						padding: 30rpx 0 30rpx 30rpx;
						display: inline-block;
						width: 80%;
						/* 1、先强制一行内显示文本（默认 normal 自动换行） */
						white-space: nowrap;
						/* 2、超出的部分隐藏 */
						overflow: hidden;
						/* 3、文字用省略号替代超出的部分 */
						text-overflow: ellipsis;
					}

					view {
						position: relative;

						.left1 {
							position: absolute;
							left: 30rpx;
							display: inline-block;
							width: 60%;
							/* 1、先强制一行内显示文本（默认 normal 自动换行） */
							white-space: nowrap;
							/* 2、超出的部分隐藏 */
							overflow: hidden;
							/* 3、文字用省略号替代超出的部分 */
							text-overflow: ellipsis;
						}

						.right1 {
							position: absolute;
							right: 30rpx;
						}

						.left2 {
							position: absolute;
							left: 30rpx;

							top: 66rpx;

							.car {
								padding: 8rpx;
								border-radius: 4rpx;
								font-size: 26rpx;
							}

							.blue {
								color: blue;
								background-color: lightblue;
							}

							.green {
								color: green;
								background-color: lightgreen;
							}

							.purple {
								color: purple;
								background-color: lightsteelblue;
							}

							.surplus {
								padding-left: 10rpx;
							}
						}

						.right2 {
							position: absolute;
							right: 30rpx;
							top: 66rpx
						}
					}

					.go {
						position: absolute;
						width: 60rpx;
						height: 60rpx;
						top: 30rpx;
						right: 40rpx;
					}
				}
			}
		}
	}
</style>
