(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/bind/bind"],{"25ce":function(e,t,a){"use strict";(function(e){var n=a("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u=n(a("2eee")),r=n(a("c973")),l=n(a("9523")),c=a("26cb");function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}a("1c46");var i={data:function(){return{belongingPerson:"",identificationCode:"",engineNumber:"",brand:"",colorIndex:0,modelIndex:0,useNature:"",displacement:"",passengersNumber:"",modelRange:[{value:0,text:"小型车"},{value:1,text:"中型车"},{value:2,text:"大型车"}],colorRange:[{value:0,text:"蓝牌车"},{value:1,text:"绿牌车"},{value:2,text:"黄牌车"},{value:3,text:"白牌车"},{value:4,text:"黑牌车"},{value:5,text:"其他颜色号牌"}],carFirstIndex:0,carSecondIndex:0,carNumber1Index:0,carNumber2Index:0,carNumber3Index:0,carNumber4Index:0,carNumber5Index:0,carNewIndex:-1,carNumber:[{value:0,text:"0"},{value:1,text:"1"},{value:2,text:"2"},{value:3,text:"3"},{value:4,text:"4"},{value:5,text:"5"},{value:6,text:"6"},{value:7,text:"7"},{value:8,text:"8"},{value:9,text:"9"},{value:10,text:"A"},{value:11,text:"B"},{value:12,text:"C"},{value:13,text:"D"},{value:14,text:"E"},{value:15,text:"F"},{value:16,text:"G"},{value:17,text:"H"},{value:18,text:"I"},{value:19,text:"J"},{value:20,text:"K"},{value:21,text:"L"},{value:22,text:"M"},{value:23,text:"N"},{value:24,text:"O"},{value:25,text:"P"},{value:26,text:"Q"},{value:27,text:"R"},{value:28,text:"T"},{value:29,text:"U"},{value:30,text:"V"},{value:31,text:"W"},{value:32,text:"X"},{value:33,text:"Y"},{value:34,text:"Z"},{value:35,text:"警"},{value:36,text:"学"},{value:37,text:"港"},{value:38,text:"澳"}],carFirst:[{value:0,text:"京"},{value:1,text:"津"},{value:2,text:"渝"},{value:3,text:"沪"},{value:4,text:"冀"},{value:5,text:"晋"},{value:6,text:"辽"},{value:7,text:"吉"},{value:8,text:"黑"},{value:9,text:"苏"},{value:10,text:"浙"},{value:11,text:"皖"},{value:12,text:"赣"},{value:13,text:"鲁"},{value:14,text:"豫"},{value:15,text:"鄂"},{value:16,text:"湘"},{value:17,text:"粤"},{value:18,text:"琼"},{value:19,text:"川"},{value:20,text:"贵"},{value:21,text:"云"},{value:22,text:"陕"},{value:23,text:"甘"},{value:24,text:"青"},{value:25,text:"蒙"},{value:26,text:"桂"},{value:27,text:"宁"},{value:28,text:"新"},{value:29,text:"藏"}]}},computed:function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){(0,l.default)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},(0,c.mapState)("user",["token"])),methods:{bind:function(){var t=this;return(0,r.default)(u.default.mark((function a(){var n,r,l,c,o,i,x;return u.default.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n=t.carFirst[t.carFirstIndex].text+t.carNumber[t.carSecondIndex].text+t.carNumber[t.carNumber1Index].text+t.carNumber[t.carNumber2Index].text+t.carNumber[t.carNumber3Index].text+t.carNumber[t.carNumber4Index].text+t.carNumber[t.carNumber5Index].text,console.log("carNumber",n),r=Date.now(),l={token:t.token,timestamp:r,signType:"MD5",carNumber:n,belongingPerson:t.belongingPerson,identificationCode:t.identificationCode,engineNumber:t.engineNumber,brand:t.brand,licensePlateColor:t.colorRange[t.colorIndex].text,model:t.modelRange[t.modelIndex].text,useNature:t.useNature,displacement:t.displacement,passengersNumber:t.passengersNumber},c=t.getSignature(l),o={token:t.token,timestamp:r,signType:"MD5",signature:c,carNumber:n,belongingPerson:t.belongingPerson,identificationCode:t.identificationCode,engineNumber:t.engineNumber,brand:t.brand,licensePlateColor:t.colorRange[t.colorIndex].text,model:t.modelRange[t.modelIndex].text,useNature:t.useNature,displacement:t.displacement,passengersNumber:t.passengersNumber},console.log("query",o),a.next=9,e.$http.post("/api/car/bind",o);case 9:if(i=a.sent,x=i.data,console.log(x),200==x.code){a.next=14;break}return a.abrupt("return",e.showToast({title:"绑定失败",icon:"none"}));case 14:if(200!==x.code){a.next=16;break}return a.abrupt("return",e.showToast({title:"绑定成功",icon:"none"}));case 16:case"end":return a.stop()}}),a)})))()}}};t.default=i}).call(this,a("543d")["default"])},"3fee":function(e,t,a){"use strict";(function(e,t){var n=a("4ea4");a("6c77");n(a("66fd"));var u=n(a("acc8"));e.__webpack_require_UNI_MP_PLUGIN__=a,t(u.default)}).call(this,a("bc2e")["default"],a("543d")["createPage"])},"421b":function(e,t,a){"use strict";a.r(t);var n=a("25ce"),u=a.n(n);for(var r in n)["default"].indexOf(r)<0&&function(e){a.d(t,e,(function(){return n[e]}))}(r);t["default"]=u.a},"6ac9":function(e,t,a){"use strict";a.d(t,"b",(function(){return u})),a.d(t,"c",(function(){return r})),a.d(t,"a",(function(){return n}));var n={uniDataSelect:function(){return Promise.all([a.e("common/vendor"),a.e("uni_modules/uni-data-select/components/uni-data-select/uni-data-select")]).then(a.bind(null,"53b8"))},uniEasyinput:function(){return a.e("uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput").then(a.bind(null,"de10"))}},u=function(){var e=this.$createElement;this._self._c},r=[]},"9df7":function(e,t,a){"use strict";var n=a("adff"),u=a.n(n);u.a},acc8:function(e,t,a){"use strict";a.r(t);var n=a("6ac9"),u=a("421b");for(var r in u)["default"].indexOf(r)<0&&function(e){a.d(t,e,(function(){return u[e]}))}(r);a("9df7");var l=a("f0c5"),c=Object(l["a"])(u["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],void 0);t["default"]=c.exports},adff:function(e,t,a){}},[["3fee","common/runtime","common/vendor"]]]);