(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/photoLogin/photoLogin"],{"09b0":function(o,e,n){"use strict";(function(o){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{}},methods:{Countdown:function(){setTimeout((function(){o.switchTab({url:"/pages/home/appointmentHome/appointmentHome"})}),3e3)}},onLoad:function(){var e=o.getStorageSync("openid");console.log("------页面加载中，获取openid-------"),e||o.login({provider:"weixin",success:function(e){try{var n=e.code;console.log("res======"+e.code),o.getUserInfo({provider:"weixin",success:function(e){console.log("infoRes==="+e.userInfo.nickName);var t="http://localhost:8080/hospital/user/wx?code="+n;o.request({url:t,success:function(e){console.log("result ======="+e.data.data),console.log("result ======="+e.data.data.account.openid),o.setStorageSync("openid",e.data.data.account.openid),o.setStorageSync("phone",e.data.data.account.name),o.setStorageSync("userAccountId",e.data.data.account.id),console.log("openid =====:"+e.data.data.account.openid),console.log("phone ======="+o.getStorageSync("phone")),console.log("accountId ======="+o.getStorageSync("userAccountId"))},fail:function(o){console.log(o.message)}})}})}catch(t){console.log(t.message)}}}),o.getStorageSync("userAccountId")?(this.Countdown(),console.log("----------------------已经登录了")):(o.showToast({icon:"none",title:"请先注册账号"}),o.navigateTo({url:"../../pagesB/pages/center/login/quickRegister/quickRegister"}))}};e.default=n}).call(this,n("543d")["default"])},"27c3":function(o,e,n){},3046:function(o,e,n){"use strict";var t,c=function(){var o=this,e=o.$createElement;o._self._c},a=[];n.d(e,"b",(function(){return c})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return t}))},"3cd2":function(o,e,n){"use strict";(function(o){n("e090");t(n("66fd"));var e=t(n("eea6"));function t(o){return o&&o.__esModule?o:{default:o}}o(e.default)}).call(this,n("543d")["createPage"])},"8c94":function(o,e,n){"use strict";var t=n("27c3"),c=n.n(t);c.a},9705:function(o,e,n){"use strict";n.r(e);var t=n("09b0"),c=n.n(t);for(var a in t)"default"!==a&&function(o){n.d(e,o,(function(){return t[o]}))}(a);e["default"]=c.a},eea6:function(o,e,n){"use strict";n.r(e);var t=n("3046"),c=n("9705");for(var a in c)"default"!==a&&function(o){n.d(e,o,(function(){return c[o]}))}(a);n("8c94");var u,i=n("f0c5"),s=Object(i["a"])(c["default"],t["b"],t["c"],!1,null,"fbbf7082",null,!1,t["a"],u);e["default"]=s.exports}},[["3cd2","common/runtime","common/vendor"]]]);