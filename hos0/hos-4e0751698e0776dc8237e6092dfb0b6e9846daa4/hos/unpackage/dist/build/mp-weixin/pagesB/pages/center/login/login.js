(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesB/pages/center/login/login"],{1398:function(e,t,n){"use strict";n.r(t);var i=n("3d8a"),o=n.n(i);for(var s in i)"default"!==s&&function(e){n.d(t,e,(function(){return i[e]}))}(s);t["default"]=o.a},"1f5d":function(e,t,n){"use strict";n.r(t);var i=n("893f"),o=n("1398");for(var s in o)"default"!==s&&function(e){n.d(t,e,(function(){return o[e]}))}(s);n("f188");var a,r=n("f0c5"),c=Object(r["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],a);t["default"]=c.exports},"3d8a":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=n("5f0b"),o=n("b571"),s=n("6722"),a=c(n("7eeb")),r=n("941f");n("0c3d");function c(e){return e&&e.__esModule?e:{default:e}}var u={data:function(){return{name:"",password:"",isVisible:!1,visited:0,isRegisterVisited:!1,isPasswordVisited:!1,isAuthrization:e.getStorageSync("isAuthrization")}},onLoad:function(){console.log("openid == "+e.getStorageSync("openid"))},methods:{changeVisible:function(){this.isVisible=!this.isVisible},toRegister:function(){this.visited=1;var t=this;setTimeout((function(){t.visited=0}),2e3),e.navigateTo({url:"/pagesB/pages/center/login/quickRegister/quickRegister"})},toForgotPassword:function(){this.visited=2;var t=this;setTimeout((function(){t.visited=0}),2e3),e.navigateTo({url:"/pagesB/pages/center/login/fotgotPassword/fotgotPassword"})},getUserInfo:function(){e.getUserProfile({desc:"用于完善用户信息",success:function(t){console.log(t.userInfo.avatarUrl),e.setStorageSync("avatarUrl",t.userInfo.avatarUrl),e.setStorageSync("nickName",t.userInfo.nickName),e.getStorageSync("phone")?(e.setStorageSync("isAlreadyLogin",!0),e.showToast({icon:"none",title:"登录成功"}),e.switchTab({url:"../../../../pages/center/center"})):e.showToast({icon:"none",title:"mei"})},fail:function(t){console.log(t),e.showToast({icon:"none",title:"用户拒绝获取"})}})},toPageCenter:function(){var t=(0,o.inputCheck)("账号","string",this.name),n=(0,o.inputCheck)("密码","password",this.password);"ok"!==t?(0,r.error)(t):"ok"!==n?(0,r.error)(n):(e.showLoading({title:"加载中"}),(0,i.userLogin)(this.name,(0,a.default)(this.password)).then((function(t){200===t.data.code?(e.setStorageSync("isAlreadyLogin",!0),(0,s.setToken)(t.data.data),e.showToast({title:"登录成功",icon:"success"}),e.switchTab({url:"/pages/center/center"})):(e.hideLoading(),(0,r.error)("账号或密码错误"))})).catch((function(){e.hideLoading(),(0,r.error)("网络")})))}}};t.default=u}).call(this,n("543d")["default"])},"473b":function(e,t,n){"use strict";(function(e){n("e090");i(n("66fd"));var t=i(n("1f5d"));function i(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"6bb2":function(e,t,n){},"893f":function(e,t,n){"use strict";var i,o=function(){var e=this,t=e.$createElement;e._self._c},s=[];n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return s})),n.d(t,"a",(function(){return i}))},f188:function(e,t,n){"use strict";var i=n("6bb2"),o=n.n(i);o.a}},[["473b","common/runtime","common/vendor"]]]);