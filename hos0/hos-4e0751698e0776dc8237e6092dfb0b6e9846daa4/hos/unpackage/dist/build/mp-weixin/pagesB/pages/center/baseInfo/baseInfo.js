(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesB/pages/center/baseInfo/baseInfo"],{"26af":function(e,n,a){},a0e3:function(e,n,a){"use strict";var o=a("26af"),t=a.n(o);t.a},a442:function(e,n,a){"use strict";a.r(n);var o=a("b378"),t=a("cfa3");for(var r in t)"default"!==r&&function(e){a.d(n,e,(function(){return t[e]}))}(r);a("a0e3");var s,d=a("f0c5"),i=Object(d["a"])(t["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],s);n["default"]=i.exports},b378:function(e,n,a){"use strict";var o,t=function(){var e=this,n=e.$createElement,a=(e._self._c,e._f("getIdentityNum")(e.userCardInfo.identificationNumber)),o=e._f("getGender")(e.userCardInfo.gender),t=e._f("getDate")(e.userCardInfo.birthDate);e.$mp.data=Object.assign({},{$root:{f0:a,f1:o,f2:t}})},r=[];a.d(n,"b",(function(){return t})),a.d(n,"c",(function(){return r})),a.d(n,"a",(function(){return o}))},cfa3:function(e,n,a){"use strict";a.r(n);var o=a("dae3"),t=a.n(o);for(var r in o)"default"!==r&&function(e){a.d(n,e,(function(){return o[e]}))}(r);n["default"]=t.a},dae3:function(e,n,a){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=a("0c3d"),t=a("941f"),r=a("b571"),s={data:function(){return{showBaseInfo:!1,showCardInfo:!1,isGetCard:!1,userBaseInfo:{},userCardInfo:{},modalBaseName:"",modalCardInfo:{}}},methods:{openBeseShow:function(){this.modalBaseName=this.userBaseInfo.name,this.showBaseInfo=!0},closeBaseShow:function(){this.userBaseInfo.name=this.modalBaseName,this.showBaseInfo=!1},openCardShow:function(){this.modalCardInfo=JSON.parse(JSON.stringify(this.userCardInfo)),this.showCardInfo=!0},closeCardShow:function(){this.showCardInfo=!1,this.userCardInfo=this.modalCardInfo},updateBaseInfo:function(){var n=this,a=(0,r.inputCheck)("姓名","string",this.userBaseInfo.name);"ok"===a?(e.showLoading({title:"修改中"}),(0,o.updateBaseInfo)(e.getStorageSync("userID"),{avatarUrl:this.userBaseInfo.avatarUrl,name:this.userBaseInfo.name}).then((function(a){200===a.data.code?(e.hideLoading(),e.showToast({title:"修改成功",icon:"success"}),n.showBaseInfo=!1):(e.hideLoading(),n.userBaseInfo.name=n.modalBaseName,n.showBaseInfo=!1,(0,t.error)("更新失败"))})).catch((function(){e.hideLoading(),n.userBaseInfo.name=n.modalBaseName,n.showBaseInfo=!1,(0,t.error)("更新失败，请检查网络")}))):(0,t.error)(a)},updateCardInfo:function(){var n=this,a=(0,r.inputCheck)("姓名","string",this.userCardInfo.name),s=(0,r.inputCheck)("手机号","phone",this.userCardInfo.phone);"ok"!==a?(0,t.error)(a):"ok"!==s?(0,t.error)(s):(e.showLoading({title:"修改中"}),(0,o.updateCardInfo)(this.userCardInfo.relationId,{gender:this.userCardInfo.gender,name:this.userCardInfo.name,phone:this.userCardInfo.phone,type:this.userCardInfo.type}).then((function(a){200===a.data.code?(e.hideLoading(),n.showCardInfo=!1,e.showToast({title:"修改成功",icon:"success"})):(e.hideLoading(),n.userCardInfo=n.modalCardInfo,n.showCardInfo=!1,(0,t.error)("修改失败"))})).catch((function(){e.hideLoading(),n.userCardInfo=n.modalCardInfo,n.showCardInfo=!1,(0,t.error)("修改失败，请检查网络")})))},toAddCard:function(){e.navigateTo({url:"/pagesB/pages/center/addCard/addCard?isMyself="+!0})},getMyselfCardInfo:function(){var n=this;e.showLoading({title:"加载中"}),(0,o.getUserCardInfo)(e.getStorageSync("accountID")).then((function(a){var o=n;if(console.log(a),200===a.data.code){e.hideLoading();var t=a.data.data;0!==t.length?(t.forEach((function(n){if(0===n.type)return o.isGetCard=!0,console.log(n),o.userCardInfo=n,void e.setStorageSync("cardID",n.id)})),e.removeStorageSync("userInfo")):n.isGetCard=!1}})).catch((function(){e.hideLoading(),(0,t.error)("网络")}))}},onShow:function(){this.userBaseInfo=JSON.parse(e.getStorageSync("userInfo")),this.getMyselfCardInfo(),console.log("test")}};n.default=s}).call(this,a("543d")["default"])},e85c:function(e,n,a){"use strict";(function(e){a("e090");o(a("66fd"));var n=o(a("a442"));function o(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,a("543d")["createPage"])}},[["e85c","common/runtime","common/vendor"]]]);