(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/getOpenId/getOpenId"],{"20de":function(e,n,t){"use strict";t.r(n);var o=t("b588"),a=t.n(o);for(var c in o)"default"!==c&&function(e){t.d(n,e,(function(){return o[e]}))}(c);n["default"]=a.a},a009:function(e,n,t){"use strict";var o,a=function(){var e=this,n=e.$createElement;e._self._c},c=[];t.d(n,"b",(function(){return a})),t.d(n,"c",(function(){return c})),t.d(n,"a",(function(){return o}))},a03b:function(e,n,t){"use strict";(function(e){t("e090");o(t("66fd"));var n=o(t("ab09"));function o(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("543d")["createPage"])},ab09:function(e,n,t){"use strict";t.r(n);var o=t("a009"),a=t("20de");for(var c in a)"default"!==c&&function(e){t.d(n,e,(function(){return a[e]}))}(c);var u,r=t("f0c5"),s=Object(r["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],u);n["default"]=s.exports},b588:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var t={data:function(){return{}},methods:{getUserInfo:function(){var n=e.getStorageSync("openid");console.log("-------------"),n&&e.login({provider:"weixin",success:function(n){try{var t=n.code;console.log("res======"+n.code),e.getUserInfo({provider:"weixin",success:function(n){console.log("infoRes==="+n.userInfo.nickName);n.userInfo.nickName,n.userInfo.avatarUrl;var o="http://localhost:8080/hospital/user/wx?code="+t;e.request({url:o,success:function(n){console.log("result ======="+n.data.data.account.openid),e.setStorageSync("openid",n.data.data.account.openid),e.setStorageSync("openid",n.data.data.account.openid),e.setStorageSync("phone",n.data.data.account.name),e.setStorageSync("userAccountId",n.data.data.account.id),console.log("openid =====:"+n.data.data.account.openid),console.log("phone ======="+e.getStorageSync("phone")),console.log("accountId ======="+e.getStorageSync("userAccountId"))},fail:function(e){console.log(e.message)}})}})}catch(o){console.log(o.message)}}})}}};n.default=t}).call(this,t("543d")["default"])}},[["a03b","common/runtime","common/vendor"]]]);