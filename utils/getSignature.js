// 定义全局事件——获取signature
import store from '../store/store.js';

// 引入 MD5 加密算法
const crypto = require('crypto');

exports.install = function(Vue) {
	Vue.prototype.getSignature = function(obj) {
		let str = '';
		// 对象的键
		const keys = Object.keys(obj);
		// 对象的值
		const values = Object.values(obj);
		// 键值对
		for (let i = 0; i < keys.length; i++) {
			if (values[i] instanceof Array) {
				if (typeof values[i][0] === 'string') {
					let arrStrValue = values[i].map(item => {
						return '"' + item + '"';
					})
					str += keys[i].toString() + '[' + arrStrValue.toString() + ']';
				} else {
					str += keys[i].toString() + '[' + values[i].toString() + ']';
				}
			} else {
				str += keys[i].toString() + values[i].toString();
			}
		}
		// 密钥
		str += store.state.user.secretKey;
		// console.log('str', str);
		// MD5加密
		str = crypto.createHash('md5').update(str, 'utf-8').digest('hex');
		return str;
	}
};
