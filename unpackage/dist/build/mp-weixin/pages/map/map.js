(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/map/map"],{"12d6":function(t,e,n){"use strict";n.r(e);var r=n("5002"),i=n.n(r);for(var a in r)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return r[t]}))}(a);e["default"]=i.a},"1eef":function(t,e,n){},"1fba":function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return r}));var r={uniIcons:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(n.bind(null,"39a7"))}},i=function(){var t=this.$createElement;this._self._c},a=[]},5002:function(t,e,n){"use strict";(function(t){var r=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=r(n("2eee")),a=r(n("c973")),o=r(n("9523")),u=n("26cb");function s(t,e){var n="undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"===typeof t)return c(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return c(t,e)}(t))||e&&t&&"number"===typeof t.length){n&&(t=n);var r=0,i=function(){};return{s:i,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,o=!0,u=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return o=t.done,t},e:function(t){u=!0,a=t},f:function(){try{o||null==n.return||n.return()}finally{if(u)throw a}}}}function c(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function l(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function d(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?l(Object(n),!0).forEach((function(e){(0,o.default)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var h={data:function(){return{subKey:"MSTBZ-V3FKD-Y6X4K-PZEFD-JWUF5-R2B2J",latitude:0,longitude:0,index:0,markers:[],showMarkers:[],myLatitude:0,myLongitude:0,polyline:[],result:[],isSearch:!1,currentRoute:0,routeName:["临停","预约","长租"],routerColor:["blue","green","purple"],markerIcon:["/static/map-temporary-parking.png","/static/map-parking-reservation.png","/static/map-long-parking.png"],selectedMarkerIcon:["/static/map-selected-temporary-parking.png","/static/map-selected-parking-reservation.png","/static/map-selected-long-parking.png"],activeType:0,isNavigate:!0,arriveTime:0,getLocationTimer:null}},computed:d(d({},(0,u.mapState)("user",["windowHeight","token"])),{},{distance:function(){var t=this,e=[];return this.markers.forEach((function(n){e.push(Math.ceil(Math.sqrt(Math.pow(n.latitude-t.myLatitude,2)+Math.pow(n.longitude-t.myLongitude,2))/360*3e8))})),e},mapHeight:function(){return this.windowHeight-325},currentDistance:function(){var t=Math.ceil(Math.sqrt(Math.pow(this.latitude-this.myLatitude,2)+Math.pow(this.longitude-this.myLongitude,2))/360*3e8);return t}}),watch:{isSearch:{handler:function(){this.searchParking(),this.searchDetails()}},currentDistance:{handler:function(){0===this.arriveTime&&this.isArrive()}}},methods:d(d({},(0,u.mapMutations)("user",["updateWindowHeight","token"])),{},{searchClick:function(){t.navigateTo({url:"/pages/search/search"})},checkRoute:function(t){this.currentRoute=t,this.index=0,this.searchParking()},checkType:function(t){this.activeType=t},goDetail:function(e){if(this.isNavigate){var n={lat:this.markers[e].latitude,lng:this.markers[e].longitude,title:this.markers[e].title,address:this.markers[e].address,distance:this.distance[e],routeName:this.routeName[this.currentRoute],surplus:this.result[e].surplus,price:this.result[e].price};t.navigateTo({url:"/pages/detail/detail?detailMsg=".concat(JSON.stringify(n))})}},getPhoneSize:function(){var e=this;return(0,a.default)(i.default.mark((function n(){var r;return i.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.getWindowInfo().windowHeight;case 2:r=n.sent,e.updateWindowHeight(r);case 4:case"end":return n.stop()}}),n)})))()},getUserLocation:function(){var e=this;t.getSetting({success:function(e){e.authSetting["scope.userLocation"]||t.authorize({scope:"scope.userLocation"}),e.authSetting["scope.userLocationBackground"]||t.authorize({scope:"scope.userLocationBackground"})}}),t.getLocation({type:"gcj02",success:function(n){e.myLatitude=n.latitude,e.myLongitude=n.longitude,""!==e.token?e.isSearch=!0:t.showToast({title:"请先登录",icon:"none"})},fail:function(e){t.showToast({title:"请打开定位",icon:"error"})}}),t.onLocationChange((function(t){e.myLatitude=t.latitude,e.myLongitude=t.longitude,""!==e.token&&(e.isSearch=!0)})),t.startLocationUpdateBackground({type:"gcj02"}),t.startLocationUpdate({type:"gcj02"})},searchParking:function(){var e=this,n=[],r=[],i=[];t.request({url:"https://apis.map.qq.com/ws/place/v1/search?boundary=nearby(".concat(e.myLatitude,",").concat(e.myLongitude,",1000)&keyword=").concat(encodeURI("停车场"),"&key=").concat(this.subKey),success:function(t){for(var a=t.data.data,o=0;o<a.length;o++){var u={index:o,id:Number(a[o].id),title:a[o].title,address:a[o].address,latitude:a[o].location.lat,longitude:a[o].location.lng,iconPath:e.markerIcon[e.currentRoute],width:30,height:30,callout:{content:a[o].title,borderRadius:10,borderWidth:10}};n.push(u),u=null,r.push(String(a[o].location.lat)),i.push(String(a[o].location.lng))}e.index<n.length?(e.latitude=n[e.index].latitude,e.longitude=n[e.index].longitude,e.index++):(e.index=0,e.latitude=n[e.index].latitude,e.longitude=n[e.index].longitude),e.markers=n,e.markerClick({markerId:e.markers[0].id}),e.searchDetails(r,i)}}),t.showToast({title:"已为您查询最近的停车场",icon:"none"})},markerClick:function(t){var e,n=this,r=this.index,i=s(this.markers);try{for(i.s();!(e=i.n()).done;){var a=e.value;if(a.id===t.markerId){this.index=a.index;break}}}catch(o){i.e(o)}finally{i.f()}this.markers[r].iconPath=this.markerIcon[this.currentRoute],this.markers[this.index].iconPath=this.selectedMarkerIcon[this.currentRoute],this.showMarkers=[],this.markers.forEach((function(t,e){if(e===n.index)return n.showMarkers.unshift(t);n.showMarkers.push(t)}))},goParking:function(e){var n=this;this.isNavigate=!1,this.latitude=this.markers[e].latitude,this.longitude=this.markers[e].longitude,t.request({url:"https://apis.map.qq.com/ws/direction/v1/driving/?key=".concat(n.subKey,"&from=").concat(n.myLatitude,",").concat(n.myLongitude,"&to=").concat(n.latitude,",").concat(n.longitude),success:function(t){for(var e=t.data.result.routes[0],r=e.polyline,i=[],a=2;a<r.length;a++)r[a]=Number(r[a-2])+Number(r[a])/1e6;for(var o=0;o<r.length;o+=2)i.push({latitude:r[o],longitude:r[o+1]});n.latitude=i[0].latitude,n.longitude=i[0].longitude,n.polyline=[{points:i,color:"#58c16c",width:6,borderColor:"#2f693c",borderWidth:1}]}});setTimeout((function(){this.isNavigate=!0,t.showModal({title:"是否已经到达目的地",success:function(r){if(!0===r.confirm){var i={latitude:n.result[e].entranceLat,longitude:n.result[e].entranceLng};t.navigateTo({url:"/pages/parking/parking?coordinate=".concat(JSON.stringify(i))})}}})}),5e3),t.pageScrollTo({scrollTop:0,duration:1e3})},isArrive:function(){var e=this;0==this.arriveTime&&this.currentDistance<=10&&(this.arriveTime=1,t.showModal({title:"是否已经到达目的地",success:function(n){var r=this;if(!0===n.confirm){var i={latitude:e.result[index].entranceLat,longitude:e.result[index].entranceLng};t.navigateTo({url:"/pages/parking/parking?coordinate=".concat(JSON.stringify(i))})}!0===n.cancel&&setTimeout((function(){r.arriveTime=0}),1e4)}}))},searchDetails:function(e,n){var r=this;return(0,a.default)(i.default.mark((function a(){var o,u,s,c,l,d,h,f,p;return i.default.wrap((function(i){while(1)switch(i.prev=i.next){case 0:if(""!=r.token){i.next=2;break}return i.abrupt("return",t.showToast({title:"请先登录",icon:"none"}));case 2:return o=Date.now(),u={token:r.token,timestamp:o,signType:"MD5",lats:e,lngs:n},s=r.getSignature(u),c={token:r.token,timestamp:o,signType:"MD5",signature:s,lats:e,lngs:n},i.next=8,t.$http.post("/api/park/areaDetails",c);case 8:if(l=i.sent,d=l.data,200==d.code){i.next=12;break}return i.abrupt("return",t.showToast({title:"获取信息失败",icon:"none"}));case 12:if(200!==d.code){i.next=36;break}r.result=[],h=d.data.result,f=0;case 16:if(!(f<e.length)){i.next=36;break}p=0;case 18:if(!(p<e.length)){i.next=33;break}if(null==h[p]||p==e.length-1){i.next=23;break}if(h[p].lat!==Number(e[f])||h[p].lng!==Number(n[f])){i.next=23;break}return r.result.push(h[p]),i.abrupt("break",33);case 23:if(p!=e.length-1){i.next=30;break}if(null!=h[p]){i.next=27;break}return r.result.push({price:"-",surplus:"-"}),i.abrupt("break",33);case 27:if(h[p].latitude===Number(e[f])&&h[p].lng===Number(n[f])){i.next=30;break}return r.result.push({price:"-",surplus:"-"}),i.abrupt("break",33);case 30:p++,i.next=18;break;case 33:f++,i.next=16;break;case 36:case"end":return i.stop()}}),a)})))()}}),onLoad:function(){this.getPhoneSize(),this.getUserLocation()}};e.default=h}).call(this,n("543d")["default"])},"65a4":function(t,e,n){"use strict";n.r(e);var r=n("1fba"),i=n("12d6");for(var a in i)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n("706e");var o=n("f0c5"),u=Object(o["a"])(i["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],void 0);e["default"]=u.exports},"706e":function(t,e,n){"use strict";var r=n("1eef"),i=n.n(r);i.a},9224:function(t,e,n){"use strict";(function(t,e){var r=n("4ea4");n("6c77");r(n("66fd"));var i=r(n("65a4"));t.__webpack_require_UNI_MP_PLUGIN__=n,e(i.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])}},[["9224","common/runtime","common/vendor"]]]);