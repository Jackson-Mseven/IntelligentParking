<template>
	<view class="container">
		<!-- 停车场名称 -->
		<h1>{{title}}</h1>

		<!-- 楼层 -->
		<uni-data-select class="floorSelect" v-model="currentFloorIndex" :localdata="floorList" :clear="false"
			emptyText="" @change="changeFloor">
		</uni-data-select>

		<!-- 地图 -->
		<!-- 展示内容 -->
		<movable-area class="fatherView" :style="{height: `${windowHeight - 100}px`}">
			<!-- 全部内容 -->
			<!-- 
				direction：移动的方向（all——所有）
			 -->
			<movable-view class="childView" direction="all">
				<!-- 地图 -->
				<view class="map">
					<!-- 入口 -->
					<view :style="{top:`${entrance.y}px`,left:`${entrance.x}px`}" class="door">入口</view>

					<!-- 车位 -->
					<view class="parking">
						<view class="item" v-for="park of parks" :key="park.id"
							:style="{top:`${park.y}px`,left:`${park.x}px`}"
							:class="[park.occupy ? 'occupied' : '', selectedParkIndex === park.index ? 'select' : '']"
							@click="selectPark(park.index)">{{park.text}}</view>
					</view>
				</view>
				<!-- 导航画布 -->
				<canvas id="canvas" type="2d" class="canvas"></canvas>
			</movable-view>
		</movable-area>

		<!-- 结算 -->
		<button @click="pay" class="pay">结算</button>
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
				parkingID: 0, // 停车场id
				title: '', // 停车场名称
				currentFloorIndex: 0, // 当前楼层索引
				floorList: [], // 楼层列表
				entrance: {}, // 入口位置
				exports: {}, // 出口位置
				parks: [], // 车位信息
				selectedParkIndex: -1, // 选中的车位Index
				selectedParkID: -1, // 选中的车位的ID
				node: [], // 导航节点
				coordinate: {}, // 用户定位
				nodeType: 0
			};
		},
		computed: {
			// 登录凭证、密钥
			...mapState('user', ['token', 'secretKey', 'windowHeight']),
		},
		methods: {
			// 支付
			pay() {
				uni.showModal({
					title: '结算后请在30分钟以内离开',
					success: () => {
						uni.showToast({
							title: '结算成功',
							icon: "none"
						})
					},
					fail: () => {
						uni.showToast({
							title: '已取消结算',
							icon: "none"
						})
					}
				})
			},
			// 改变楼层
			changeFloor(index) {
				// currentFloorIndex赋值
				this.currentFloorIndex = index;

				// 获取停车场信息
				this.getParkInfo(this.currentFloorIndex)
			},
			// 获取停车场信息
			async getParkInfo(currentFloor) {
				// 时间戳
				const timestamp = Date.now();

				const realQuery = {
					token: this.token, // 用户凭证
					timestamp: timestamp, // 时间戳
					signType: 'MD5', // 签名类型
					currentFloorIndex: currentFloor, // 楼层
					entranceLatitude: this.coordinate.latitude, // 入口点纬度
					entranceLongitude: this.coordinate.longitude // 入口点经度
				}

				// 加密签名
				const signature = this.getSignature(realQuery);

				// 请求的参数
				const query = {
					token: this.token, // 用户凭证
					timestamp: timestamp, // 时间戳
					signType: 'MD5', // 签名类型
					signature: signature, // 签名
					currentFloorIndex: currentFloor, // 楼层
					entranceLatitude: this.coordinate.latitude, // 入口点纬度
					entranceLongitude: this.coordinate.longitude // 入口点经度
				}

				// 发起请求，获取停车场信息
				const {
					data: res
				} = await uni.$http.post('/api/park/parking', query);
				console.log(res);
				// 请求失败
				if (res.code != 200) {
					return uni.showToast({
						title: '获取停车场信息失败',
						icon: 'none'
					})
				}

				// 请求成功
				if (res.code === 200) {
					this.title = res.data.title; // 停车场名
					this.floorList = res.data.floorList; // 楼层列表
					this.entrance = res.data.entrance; // 入口位置
					this.parks = res.data.parks; // 车位信息
					this.parks.forEach((item, index) => {
						this.parks[index].x *= 30;
						this.parks[index].y *= 30;
						if (index === 0 || index === 1) {}
						this.parks[index].text = '';
						this.parks[index].index = index;
					})

					// 选中车位的ID
					this.selectedParkID = res.data.nearParkID;

					for (let i = 0; i < this.parks.length; i++) {
						if (this.parks[i].id === res.data.nearParkID) {
							this.selectedParkIndex = this.parks[i].index; // 选中车位的Index
							this.parks[i].text = '已选中';
							break;
						}
					}
				}
				this.getNode();
			},
			// 选择车位
			async selectPark(index) {
				// 选择车位被占用
				if (this.parks[index].occupy === true) return uni.showToast({
					title: '当前车位已被占用，请选择其他车位',
					icon: 'none'
				})
				// 清除上一次选中车位的标记
				if (this.selectedParkIndex != -1) {
					this.parks[this.selectedParkIndex].text = '';
				}
				// selectedParkIndex赋值
				this.selectedParkIndex = index;
				this.selectedParkID = this.parks[index].id;
				// 标记选中车位
				this.parks[this.selectedParkIndex].text = '已选中';

				// 获取导航节点
				this.getNode();
			},
			// 获取导航节点
			async getNode() {
				// 时间戳
				const timestamp = Date.now()

				const realQuery = {
					token: this.token, // 用户凭证
					timestamp: timestamp, // 时间戳
					signType: 'MD5', // 签名类型
					currentFloorIndex: this.currentFloorIndex, // 当前楼层索引
					selectParkID: this.selectedParkID, // 选择的车位ID
					entranceLatitude: this.coordinate.latitude, //入口点纬度
					entranceLongitude: this.coordinate.longitude //入口点经度
				}

				// 加密签名
				const signature = this.getSignature(realQuery);

				// 请求参数
				const query = {
					token: this.token, // 用户凭证
					timestamp: timestamp, // 时间戳
					signType: 'MD5', // 签名类型
					signature: signature, // 签名
					currentFloorIndex: this.currentFloorIndex, // 当前楼层索引
					selectParkID: this.selectedParkID, // 选择的车位ID
					entranceLatitude: this.coordinate.latitude, //入口点纬度
					entranceLongitude: this.coordinate.longitude //入口点经度
				}

				// 发起请求
				const {
					data: res
				} = await uni.$http.post('/api/park/navigate', query);

				// 请求失败
				if (res.code != 200) return uni.showToast({
					title: '导航失败',
					icon: 'none'
				})

				// 请求成功
				if (res.code === 200) {
					this.node = [];
					// node赋值
					res.data.node.forEach((item, index) => {
						this.node.push({
							x: item.x * 30,
							y: item.y * 30
						})
					})

					// 导航
					this.navigate();
				}
			},
			// 导航
			navigate() {
				uni.createSelectorQuery().select('#canvas').fields({
					node: true,
					size: true
				}).exec((res) => {
					// Canvas 对象
					const canvas = res[0].node;
					canvas.width = 2000;
					canvas.height = 2000;
					// 获取上下文（画笔）
					const ctx = canvas.getContext('2d');
					// 开启路径
					ctx.beginPath();
					// 清除画布
					ctx.clearRect(0, 0, 750, 800);
					// 线条颜色
					ctx.strokeStyle = '#2e8b57';
					ctx.lineWidth = 5;
					ctx.lineCap = 'round';
					ctx.lineJoin = 'round';
					// 定义线条的顶点
					this.node.forEach((item, index) => {
						ctx.lineTo(item.x, item.y);
					})
					// 路径画线
					ctx.stroke();
					// 关闭路径
					ctx.closePath();
				})
			},
			// 画布移动
			canvasMove() {
				console.log('画布移动了');
			}
		},
		onLoad(options) {
			const data = JSON.parse(options.coordinate);
			// 坐标赋值
			this.coordinate = data;
			// 获取停车场信息
			this.getParkInfo(0);
		}
	}
</script>

<style lang="scss">
	.container {
		position: relative;

		h1,
		h2 {
			text-align: center;
		}

		.floorSelect {
			text-align: center;
			width: 300rpx;
			border: 0px solid #fff;
		}

		.fatherView {
			width: 100%;
			overflow: hidden;

			.childView {
				width: 4000rpx;
				height: 4000rpx;

				.map {
					position: relative;


					.door {
						position: absolute;
					}

					.parking {
						.item {
							position: absolute;
							width: 200rpx;
							height: 100rpx;
							border: 2rpx dashed #ccc;
						}

						.select {
							background-color: aquamarine;
							color: #fff;
							text-align: center;
							line-height: 100rpx;
						}

						.occupied {
							background-image: url('../../static/car.png');
							background-size: 200rpx 100rpx;
						}
					}
				}

				.canvas {
					width: 100%;
					height: 100%;
					z-index: -1;
				}
			}
		}

		.pay {
			position: fixed;
			width: 400rpx;
			height: 120rpx;
			line-height: 120rpx;
			bottom: 40rpx;
			left: 50%;
			transform: translateX(-50%);
			background-color: #872657;
			color: #fff;
			font-size: 40rpx;
			border-radius: 50rpx;
		}
	}
</style>
