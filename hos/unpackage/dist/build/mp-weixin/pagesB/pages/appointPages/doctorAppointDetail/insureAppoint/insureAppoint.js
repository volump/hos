(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesB/pages/appointPages/doctorAppointDetail/insureAppoint/insureAppoint"],{"18da":function(t,e,n){"use strict";var a,i=function(){var t=this,e=t.$createElement,n=(t._self._c,t._f("getDate")(t.visitInfo.date)),a=t._f("getTimePeriod")(t.visitInfo.timePeriod);t.$mp.data=Object.assign({},{$root:{f0:n,f1:a}})},c=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return c})),n.d(e,"a",(function(){return a}))},"60cf":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n("0c3d"),i=n("941f"),c=n("8339"),o=n("cc2e");function d(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var r={data:function(){var e;return e={showCardId:!1,selectId:0,isOverLimit:!1,cardList:[],iconURL:"/static/center/card/",cardID:!0,cardName:"",selectName:""},d(e,"selectId",t.getStorageSync("cardID")||""),d(e,"visitInfo",{}),d(e,"clinicName",""),d(e,"hospital",""),e},methods:{showModal:function(){this.showCardId=!0},closeShowModal:function(){this.showCardId=!1,this.selectId=this.cardID,this.selectName=this.cardName},getIsCardOverIimit:function(){t.showLoading({title:"加载中"}),(0,a.getIsCardOverIimit)(t.getStorageSync("accountID")).then((function(e){200===e.data.code&&(t.hideLoading(),!1===e.data.data?t.navigateTo({url:"/pagesB/pages/center/addCard/addCard"}):t.showModal({content:"已超过绑定就诊卡限制",showCancel:!1,success:function(t){t.cancel&&console.log("用户点击取消")}}))})).catch((function(){t.hideLoading(),(0,i.error)("网络")}))},getUserCardInfo:function(){var e=this;this.cardList=[],(0,a.getUserCardInfo)(t.getStorageSync("accountID")).then((function(t){if(200===t.data.code){var n=t.data.data,a=e;n.length>0&&(e.cardList=n,e.cardList.forEach((function(t,e){t.id===a.cardID&&(a.selectName=t.name,a.cardName=t.name)})))}})).catch((function(){(0,i.error)("网络")}))},selectCardID:function(t,e){this.selectId=t,this.selectName=e},insureCardId:function(){this.cardID=this.selectId,this.cardName=this.selectName,this.showCardId=!1},getClinic:function(){var e=this;t.showLoading({title:"加载中"}),(0,c.getClinicById)(this.visitInfo.clinicId).then((function(n){200===n.data.code&&(t.hideLoading(),e.clinicName=n.data.data.address)})).catch((function(){t.hideLoading(),(0,i.error)("获取诊室信息失败")}))},insureAppoint:function(){var e=this;t.showModal({title:"挂号",content:"确认支付10块挂号吗",success:function(n){n.confirm&&(t.showLoading({title:"挂号中"}),(0,o.valifyBlacklist)(e.cardID).then((function(n){n.data.data?(t.hideLoading(),t.showToast({title:"该卡号进入爽约黑名单，暂时不能挂号",icon:"none"})):(0,o.addAppoint)({accountId:t.getStorageSync("accountID"),cardId:e.cardID,planId:e.visitInfo.planId,timePeriod:e.visitInfo.timePeriod}).then((function(e){t.hideLoading(),t.showToast({title:"挂号成功",icon:"success"}),setTimeout((function(){t.switchTab({url:"/pages/center/center"})}),2e3)})).catch((function(){t.hideLoading(),t.showToast({title:"挂号失败",icon:"none"})}))})))}})}},onShow:function(){this.visitInfo=JSON.parse(t.getStorageSync("visitInfo")),console.log(JSON.parse(t.getStorageSync("hospital"))),this.hospital=JSON.parse(t.getStorageSync("hospital")).name,this.getUserCardInfo(),this.getClinic()}};e.default=r}).call(this,n("543d")["default"])},7779:function(t,e,n){"use strict";(function(t){n("e090");a(n("66fd"));var e=a(n("d0b2"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},d0b2:function(t,e,n){"use strict";n.r(e);var a=n("18da"),i=n("d1c8");for(var c in i)"default"!==c&&function(t){n.d(e,t,(function(){return i[t]}))}(c);n("f1e8");var o,d=n("f0c5"),r=Object(d["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],o);e["default"]=r.exports},d1c8:function(t,e,n){"use strict";n.r(e);var a=n("60cf"),i=n.n(a);for(var c in a)"default"!==c&&function(t){n.d(e,t,(function(){return a[t]}))}(c);e["default"]=i.a},d49c:function(t,e,n){},f1e8:function(t,e,n){"use strict";var a=n("d49c"),i=n.n(a);i.a}},[["7779","common/runtime","common/vendor"]]]);