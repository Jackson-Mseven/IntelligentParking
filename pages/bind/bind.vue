<template>
	<view class="container">
		<view class="carNumber">
			<view class="title">
				车牌号码<span>*</span>
			</view>
			<view class="firstNumber">
				<uni-data-select v-model="carFirstIndex" :localdata="carFirst" :clear="false" class="carFirst">
				</uni-data-select>
			</view>

			<view class="number">
				<uni-data-select v-model="carSecondIndex" :localdata="carNumber" :clear="false">
				</uni-data-select>
			</view>
			<view class="number">
				<uni-data-select v-model="carNumber1Index" :localdata="carNumber" :clear="false">
				</uni-data-select>
			</view>
			<view class="number">
				<uni-data-select v-model="carNumber2Index" :localdata="carNumber" :clear="false">
				</uni-data-select>
			</view>
			<view class="number">
				<uni-data-select v-model="carNumber3Index" :localdata="carNumber" :clear="false">
				</uni-data-select>
			</view>
			<view class="number">
				<uni-data-select v-model="carNumber4Index" :localdata="carNumber" :clear="false">
				</uni-data-select>
			</view>
			<view class="number">
				<uni-data-select v-model="carNumber5Index" :localdata="carNumber" :clear="false">
				</uni-data-select>
			</view>

			<!-- <view class="new">
				<uni-data-select placeholder="" v-model="carNewIndex" :localdata="carNumber" @change="carNewChange"
					:clear="false">
					新能源
				</uni-data-select>
			</view> -->
		</view>
		<view class="attestation">
			<view class="title">
				认证信息
			</view>
			<view class="item">
				<text class="text">所有人</text>
				<view class="input">
					<uni-easyinput v-model="belongingPerson"></uni-easyinput>
				</view>
			</view>
			<view class="item">
				<text class="text">车辆识别代码</text>
				<view class="input">
					<uni-easyinput v-model="identificationCode"></uni-easyinput>
				</view>

			</view>
			<view class="item">
				<text class="text">发动机号码</text>
				<view class="input">
					<uni-easyinput v-model="engineNumber"></uni-easyinput>
				</view>

			</view>
			<view class="item">
				<text class="text">品牌型号</text>
				<view class="input">
					<uni-easyinput v-model="brand"></uni-easyinput>
				</view>

			</view>
		</view>
		<view class="replenish">
			<view class="title">
				补充信息
			</view>
			<view class="item">
				<text class="text">牌照颜色</text>
				<view class="select">
					<uni-data-select v-model="colorIndex" :localdata="colorRange">
					</uni-data-select>
				</view>
			</view>
			<view class="item">
				<text class="text">车辆类型</text>
				<view class="select">
					<uni-data-select v-model="modelIndex" :localdata="modelRange">
					</uni-data-select>
				</view>
			</view>
			<view class="item">
				<text class="text">使用性质</text>
				<view class="input">
					<uni-easyinput v-model="useNature"></uni-easyinput>
				</view>
			</view>
			<view class="item">
				<text class="text">排量</text>
				<view class="input">
					<uni-easyinput v-model="displacement"></uni-easyinput>
				</view>
			</view>
			<view class="item">
				<text class="text">核定载人数</text>
				<view class="input">
					<uni-easyinput v-model="passengersNumber"></uni-easyinput>
				</view>
			</view>
		</view>
		<button class="preserve" @click="bind">保存</button>
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
				belongingPerson: '', // 所有人
				identificationCode: '', // 识别代码
				engineNumber: '', // 发动机号码
				brand: '', // 品牌型号
				colorIndex: 0, // 牌照颜色
				modelIndex: 0, // 车辆类型
				useNature: '', // 使用性质
				displacement: '', // 排量
				passengersNumber: '', // 核定载人数
				modelRange: [{ // 可选车辆类型
					value: 0,
					text: '小型车'
				}, {
					value: 1,
					text: '中型车'
				}, {
					value: 2,
					text: '大型车'
				}, ],
				colorRange: [{ // 可选牌照颜色
					value: 0,
					text: '蓝牌车'
				}, {
					value: 1,
					text: '绿牌车'
				}, {
					value: 2,
					text: '黄牌车'
				}, {
					value: 3,
					text: '白牌车'
				}, {
					value: 4,
					text: '黑牌车'
				}, {
					value: 5,
					text: '其他颜色号牌'
				}],
				carFirstIndex: 0, // 车牌首位
				carSecondIndex: 0, // 车牌第二位
				carNumber1Index: 0, // 车牌第三位
				carNumber2Index: 0, // 车牌第四位
				carNumber3Index: 0, // 车牌第五位
				carNumber4Index: 0, // 车牌第六位
				carNumber5Index: 0, // 车牌第七位
				carNewIndex: -1, // 新能源位
				carNumber: [{ // 可选车牌号
					value: 0,
					text: '0'
				}, {
					value: 1,
					text: '1'
				}, {
					value: 2,
					text: '2'
				}, {
					value: 3,
					text: '3'
				}, {
					value: 4,
					text: '4'
				}, {
					value: 5,
					text: '5'
				}, {
					value: 6,
					text: '6'
				}, {
					value: 7,
					text: '7'
				}, {
					value: 8,
					text: '8'
				}, {
					value: 9,
					text: '9'
				}, {
					value: 10,
					text: 'A'
				}, {
					value: 11,
					text: 'B'
				}, {
					value: 12,
					text: 'C'
				}, {
					value: 13,
					text: 'D'
				}, {
					value: 14,
					text: 'E'
				}, {
					value: 15,
					text: 'F'
				}, {
					value: 16,
					text: 'G'
				}, {
					value: 17,
					text: 'H'
				}, {
					value: 18,
					text: 'I'
				}, {
					value: 19,
					text: 'J'
				}, {
					value: 20,
					text: 'K'
				}, {
					value: 21,
					text: 'L'
				}, {
					value: 22,
					text: 'M'
				}, {
					value: 23,
					text: 'N'
				}, {
					value: 24,
					text: 'O'
				}, {
					value: 25,
					text: 'P'
				}, {
					value: 26,
					text: 'Q'
				}, {
					value: 27,
					text: 'R'
				}, {
					value: 28,
					text: 'T'
				}, {
					value: 29,
					text: 'U'
				}, {
					value: 30,
					text: 'V'
				}, {
					value: 31,
					text: 'W'
				}, {
					value: 32,
					text: 'X'
				}, {
					value: 33,
					text: 'Y'
				}, {
					value: 34,
					text: 'Z'
				}, {
					value: 35,
					text: '警'
				}, {
					value: 36,
					text: '学'
				}, {
					value: 37,
					text: '港'
				}, {
					value: 38,
					text: '澳'
				}, ],
				carFirst: [{ // 可选车牌首位
					value: 0,
					text: '京'
				}, {
					value: 1,
					text: '津'
				}, {
					value: 2,
					text: '渝'
				}, {
					value: 3,
					text: '沪'
				}, {
					value: 4,
					text: '冀'
				}, {
					value: 5,
					text: '晋'
				}, {
					value: 6,
					text: '辽'
				}, {
					value: 7,
					text: '吉'
				}, {
					value: 8,
					text: '黑'
				}, {
					value: 9,
					text: '苏'
				}, {
					value: 10,
					text: '浙'
				}, {
					value: 11,
					text: '皖'
				}, {
					value: 12,
					text: '赣'
				}, {
					value: 13,
					text: '鲁'
				}, {
					value: 14,
					text: '豫'
				}, {
					value: 15,
					text: '鄂'
				}, {
					value: 16,
					text: '湘'
				}, {
					value: 17,
					text: '粤'
				}, {
					value: 18,
					text: '琼'
				}, {
					value: 19,
					text: '川'
				}, {
					value: 20,
					text: '贵'
				}, {
					value: 21,
					text: '云'
				}, {
					value: 22,
					text: '陕'
				}, {
					value: 23,
					text: '甘'
				}, {
					value: 24,
					text: '青'
				}, {
					value: 25,
					text: '蒙'
				}, {
					value: 26,
					text: '桂'
				}, {
					value: 27,
					text: '宁'
				}, {
					value: 28,
					text: '新'
				}, {
					value: 29,
					text: '藏'
				}]
			};
		},
		computed: {
			// 用户登录凭证
			...mapState('user', ['token']),
		},
		methods: {
			// 提交绑定
			async bind() {
				// 车牌号
				const carNumber = this.carFirst[this.carFirstIndex].text + this.carNumber[this.carSecondIndex].text +
					this
					.carNumber[this.carNumber1Index].text + this
					.carNumber[this.carNumber2Index].text + this
					.carNumber[this.carNumber3Index].text + this
					.carNumber[this.carNumber4Index].text + this
					.carNumber[this.carNumber5Index].text;

				console.log('carNumber', carNumber);

				const timestamp = Date.now();
				// 请求参数
				const realQuery = {
					token: this.token, // 用户凭证
					timestamp: timestamp, // 时间戳
					signType: 'MD5', // 加密类型
					carNumber: carNumber, // 车牌号
					belongingPerson: this.belongingPerson, // 所有人
					identificationCode: this.identificationCode, // 车辆识别代码
					engineNumber: this.engineNumber, // 发动机号码
					brand: this.brand, // 品牌
					licensePlateColor: this.colorRange[this.colorIndex].text, // 牌照颜色
					model: this.modelRange[this.modelIndex].text, // 车辆类型
					useNature: this.useNature, // 使用性质
					displacement: this.displacement, // 排量
					passengersNumber: this.passengersNumber, // 核定载人数
				}
				// 加密签名
				const signature = this.getSignature(realQuery);

				// 请求参数
				const query = {
					token: this.token, // 用户凭证
					timestamp: timestamp, // 时间戳
					signType: 'MD5', // 加密类型
					signature: signature, // 签名
					carNumber: carNumber, // 车牌号
					belongingPerson: this.belongingPerson, // 所有人
					identificationCode: this.identificationCode, // 车辆识别代码
					engineNumber: this.engineNumber, // 发动机号码
					brand: this.brand, // 品牌
					licensePlateColor: this.colorRange[this.colorIndex].text, // 牌照颜色
					model: this.modelRange[this.modelIndex].text, // 车辆类型
					useNature: this.useNature, // 使用性质
					displacement: this.displacement, // 排量
					passengersNumber: this.passengersNumber, // 核定载人数
				}
				console.log('query', query);

				// 发起请求
				const {
					data: res
				} = await uni.$http.post('/api/car/bind', query);

				console.log(res);

				// 请求失败
				if (res.code != 200) return uni.showToast({
					title: '绑定失败',
					icon: 'none'
				})

				// 请求成功
				if (res.code === 200) return uni.showToast({
					title: '绑定成功',
					icon: 'none'
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		background-color: #eaeded;
		height: 1640rpx;
		overflow: hidden;

		.carNumber {
			width: 85%;
			height: 200rpx;
			margin: 20rpx auto;
			background-color: #fff;
			border-radius: 10rpx;
			padding: 30rpx;

			.title {
				color: darkgray;
				margin-bottom: 50rpx;

				span {
					color: red;
				}
			}

			.firstNumber {
				display: inline-block;
				width: 100rpx;
				height: 80rpx;
				border: 1rpx solid #ccc;
			}

			.number {
				display: inline-block;
				width: 80rpx;
				height: 80rpx;
				margin-left: 4rpx;
				border: 1rpx solid #ccc;
			}

			.new {
				display: inline-block;
				width: 100rpx;
				height: 80rpx;
				overflow: hidden;
				margin-left: 4rpx;
				border: 1rpx solid greenyellow;
			}
		}

		.attestation {
			width: 85%;
			height: 470rpx;
			margin: 0 auto 20rpx;
			background-color: #fff;
			border-radius: 10rpx;
			padding: 30rpx;

			.title {
				color: #d4d4d4;
				margin-bottom: 30rpx;
			}

			.item {
				height: 80rpx;
				background-color: #f7f8fa;
				margin: 20rpx 0;
				border-radius: 10rpx;
				position: relative;

				.text {
					position: absolute;
					top: 20rpx;
					left: 10rpx;
				}

				.input {
					width: 70%;
					position: absolute;
					top: 3rpx;
					right: -30rpx;
				}
			}
		}

		.replenish {
			width: 85%;
			height: 585rpx;
			margin: 0 auto 20rpx;
			background-color: #fff;
			border-radius: 10rpx;
			padding: 30rpx;

			.title {
				color: #d4d4d4;
				margin-bottom: 30rpx;
			}

			.item {
				height: 80rpx;
				background-color: #f7f8fa;
				margin: 20rpx 0;
				border-radius: 10rpx;
				position: relative;

				.text {
					position: absolute;
					top: 20rpx;
					left: 10rpx;
				}

				.select {
					width: 40%;
					float: right;
				}

				.input {
					width: 70%;
					position: absolute;
					top: 3rpx;
					right: -30rpx;
				}
			}
		}

		.preserve {
			width: 90%;
			height: 100rpx;
			border-radius: 100rpx;
			background: #b9d1fe;
			color: #fff;
		}
	}
</style>
