(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pagesB-pages-center-login-fotgotPassword-fotgotPassword"],{2347:function(t,e,o){"use strict";var i,a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-uni-view",[o("v-uni-view",{staticClass:"password-out-box"},[o("v-uni-view",{staticClass:"password"},[o("v-uni-text",{staticClass:"title"},[t._v("密码：")]),o("v-uni-input",{staticClass:"input",attrs:{placeholder:"请输入密码",password:"true","placeholder-class":"placeholder-class"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1),o("v-uni-view",{staticClass:"password"},[o("v-uni-text",{staticClass:"title"},[t._v("确认密码：")]),o("v-uni-input",{staticClass:"input",attrs:{placeholder:"请重新输入密码",password:"true","placeholder-class":"placeholder-class"},model:{value:t.confirmPassword,callback:function(e){t.confirmPassword=e},expression:"confirmPassword"}})],1)],1),o("v-uni-button",{staticClass:"button-box",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.updatePassword()}}},[t._v("提交")])],1)},n=[];o.d(e,"b",function(){return a}),o.d(e,"c",function(){return n}),o.d(e,"a",function(){return i})},2986:function(t,e,o){"use strict";var i=o("288e");Object.defineProperty(e,"__esModule",{value:!0}),e.default=c;var a=i(o("795b")),n=o("4405"),r=o("ac96"),d=o("e66c");function s(t){return console.log((0,r.getToken)()),new a.default(function(e,o){0==uni.getStorageSync("isAlreadyLogin")||""==uni.getStorageSync("isAlreadyLogin")||null==uni.getStorageSync("isAlreadyLogin")?uni.showToast({title:"您暂未登录",icon:"none",mask:!0,duration:1e3}):uni.request({url:n.requestURL+t.url,method:t.method,data:t.data,header:{"content-type":"application/json",Authorization:(0,r.getToken)()||""},success:function(t){200===t.statusCode?(console.log("成功200"),e(t)):401===t.statusCode?(uni.showToast({title:"token凭证已过期，请重新登录",icon:"none",mask:!0,duration:1e3}),(0,d.tokenRefresh)().then(function(t){console.log(t),(0,r.setToken)(t.data)}),console.log((0,r.getToken)())):(console.log("失败1"),o(t))},fail:function(t){console.log(t),console.log("失败2"),o(t)}})})}function c(t,e,o){return s(t,e,o)}},"2dcb":function(t,e,o){"use strict";o.r(e);var i=o("a336"),a=o.n(i);for(var n in i)"default"!==n&&function(t){o.d(e,t,function(){return i[t]})}(n);e["default"]=a.a},"3a14":function(t,e,o){"use strict";o.r(e);var i=o("d45d"),a=o("a82d");for(var n in a)"default"!==n&&function(t){o.d(e,t,function(){return a[t]})}(n);o("f5c4");var r,d=o("f0c5"),s=Object(d["a"])(a["default"],i["b"],i["c"],!1,null,"3fa5e3ea",null,!1,i["a"],r);e["default"]=s.exports},"3cd4":function(t,e,o){"use strict";o.r(e);var i=o("2347"),a=o("bd2b");for(var n in a)"default"!==n&&function(t){o.d(e,t,function(){return a[t]})}(n);o("cb74");var r,d=o("f0c5"),s=Object(d["a"])(a["default"],i["b"],i["c"],!1,null,"1a6f1853",null,!1,i["a"],r);e["default"]=s.exports},"4c9e":function(t,e,o){"use strict";var i=o("288e");Object.defineProperty(e,"__esModule",{value:!0}),e.getPasswordCode=n,e.updatePassword=r;i(o("2986"));var a=i(o("d187"));function n(t){return console.log("test"),(0,a.default)({url:"/user/basic/password/message?phone="+t,method:"get"})}function r(t){return(0,a.default)({url:"/user/basic/password",method:"put",data:t})}},5773:function(t,e,o){e=t.exports=o("2350")(!1),e.push([t.i,'@charset "UTF-8";\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */\n/**\r\n * 根据一些普片的css样式\r\n **/.page-backgroud[data-v-6a1b2d0e]{width:100%;height:100%;background:#f2f2f2}.visited-color[data-v-6a1b2d0e]{color:#7ec0ee!important}.cut-long-text[data-v-6a1b2d0e]{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tips-box[data-v-6a1b2d0e]{width:100%;height:%?100?%;border:1px solid #f0f0f0;background:#fffef5}.tips-box .tips-inbox[data-v-6a1b2d0e]{width:80%;height:100%;margin:0 auto;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.tips-box .tips-inbox .icon[data-v-6a1b2d0e]{width:%?60?%;height:%?60?%;margin-right:%?30?%}.tips-box .tips-inbox .tips-text[data-v-6a1b2d0e]{font-size:17px;font-weight:500;color:#a6a6a6}.gray-border-box[data-v-6a1b2d0e]{width:90%;height:100%;margin:0 auto;border:1px solid #bbb;border-radius:8px;padding:%?10?%;background:#fff}.blue-column-border-box[data-v-6a1b2d0e]{width:90%;height:%?90?%;margin:0 auto;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center;margin-top:%?10?%}.blue-column-border-box .blue-border[data-v-6a1b2d0e]{width:5%;height:%?50?%;border-left:6px solid #7ec0ee}.blue-column-border-box .blue-text[data-v-6a1b2d0e]{width:80%;font-size:18px;font-weight:700;color:#7ec0ee}\n/**\r\n * 关于表单的scss\r\n **/.input-box[data-v-6a1b2d0e],.password-box[data-v-6a1b2d0e]{width:90%;height:%?80?%;margin:0 auto;background:#fff;border-radius:4px;border:1px solid #bbb}.password-box[data-v-6a1b2d0e]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row}.placeholder-class[data-v-6a1b2d0e]{color:#a6a6a6;font-size:16px}.button-box[data-v-6a1b2d0e]{width:90%;height:%?80?%;margin:0 auto;background:#7ec0ee;line-height:%?80?%;color:#fff;font-weight:700}.forbiddenInput[data-v-6a1b2d0e]{color:#a6a6a6}\n/**\r\n * 根据一些普片的css样式\r\n **/.page-backgroud[data-v-6a1b2d0e]{width:100%;height:100%;background:#f2f2f2}.visited-color[data-v-6a1b2d0e]{color:#7ec0ee!important}.cut-long-text[data-v-6a1b2d0e]{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tips-box[data-v-6a1b2d0e]{width:100%;height:%?100?%;border:1px solid #f0f0f0;background:#fffef5}.tips-box .tips-inbox[data-v-6a1b2d0e]{width:80%;height:100%;margin:0 auto;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.tips-box .tips-inbox .icon[data-v-6a1b2d0e]{width:%?60?%;height:%?60?%;margin-right:%?30?%}.tips-box .tips-inbox .tips-text[data-v-6a1b2d0e]{font-size:17px;font-weight:500;color:#a6a6a6}.gray-border-box[data-v-6a1b2d0e]{width:90%;height:100%;margin:0 auto;border:1px solid #bbb;border-radius:8px;padding:%?10?%;background:#fff}.blue-column-border-box[data-v-6a1b2d0e]{width:90%;height:%?90?%;margin:0 auto;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center;margin-top:%?10?%}.blue-column-border-box .blue-border[data-v-6a1b2d0e]{width:5%;height:%?50?%;border-left:6px solid #7ec0ee}.blue-column-border-box .blue-text[data-v-6a1b2d0e]{width:80%;font-size:18px;font-weight:700;color:#7ec0ee}.top-title[data-v-6a1b2d0e]{width:100%;margin:%?20?% auto;text-align:center;font-size:18px;font-weight:700;color:#000}.top-title .bg-gray[data-v-6a1b2d0e]{background-color:#a6a6a6;color:#fff}.code-box[data-v-6a1b2d0e]{border-top:1px solid #a6a6a6;border-bottom:1px solid #a6a6a6;margin:%?50?% auto}',""])},"75fd":function(t,e,o){"use strict";var i=o("288e");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i(o("a2f1")),n=o("4c9e"),r=o("a1ec"),d=(o("c429"),{data:function(){return{password:"",confirmPassword:"",isValidate:!1}},methods:{checkPassword:function(){var t=(0,r.checkPassword)(this.password,this.confirmPassword);return"ok"!==t?(this.isValidate=!1,void t(t)):void(this.isValidate=!0)},updatePassword:function(){uni.showLoading({title:"修改中"}),""!==this.password&&""!==this.confirmPassword?(this.checkPassword(),this.isValidate&&(0,n.updatePassword)({code:uni.getStorageSync("phoneCode"),name:uni.getStorageSync("phone"),password:(0,a.default)(this.password)}).then(function(t){200===t.data.code&&(uni.hideLoading(),uni.showToast({title:"修改成功",icon:"success"}),uni.redirectTo({url:"/pagesB/pages/center/login/login"}))}).catch(function(){uni.hideLoading(),uni.showToast({title:"修改失败",icon:"none"})})):(uni.hideLoading(),uni.showToast({title:"密码不能为空",icon:"none"}))}}});e.default=d},"7d78":function(t,e,o){"use strict";var i=o("288e");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i(o("dd20")),n=i(o("3cd4")),r={components:{sendVerificationCode:a.default,setPassword:n.default},data:function(){return{numList:[{name:"获取验证码"},{name:"修改密码"}],num:0,phone:""}},methods:{getStep:function(t){this.num=t}},mounted:function(){this.phone=JSON.parse(uni.getStorageSync("userInfo")).phone}};e.default=r},"80ef":function(t,e,o){e=t.exports=o("2350")(!1),e.push([t.i,'@charset "UTF-8";\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.body-background[data-v-3fa5e3ea],uni-page-body[data-v-3fa5e3ea]{width:100%;height:100%;background-color:#fff}body.?%PAGE?%[data-v-3fa5e3ea]{background-color:#fff}',""])},"8b5d":function(t,e,o){"use strict";var i,a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("viem",[o("v-uni-view",{staticClass:"top-title"},[t._v("发送验证码至"+t._s(t._f("getPhone")(t.phone)))]),o("v-uni-view",{staticClass:"cu-form-group code-box"},[o("v-uni-view",{staticClass:"title"},[t._v("验证码")]),o("v-uni-input",{attrs:{placeholder:"请输入验证码",name:"input"},model:{value:t.phoneNum,callback:function(e){t.phoneNum=e},expression:"phoneNum"}}),0===t.codeNum?o("v-uni-button",{directives:[{name:"show",rawName:"v-show",value:!t.isGetCode,expression:"!isGetCode"}],staticClass:"cu-btn bg-green shadow",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.getPhoneCode()}}},[t._v("获取验证码")]):o("v-uni-button",{staticClass:"cu-btn bg-gray shadow"},[t._v("再次获取"+t._s(t.codeNum)+"s")])],1),o("v-uni-button",{staticClass:"button-box",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.validataCode()}}},[t._v("确定")])],1)},n=[];o.d(e,"b",function(){return a}),o.d(e,"c",function(){return n}),o.d(e,"a",function(){return i})},"9c08":function(t,e,o){var i=o("fd98");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=o("4f06").default;a("4033fa0e",i,!0,{sourceMap:!1,shadowMode:!1})},a1ec:function(t,e,o){"use strict";function i(t,e,o){if(0==o.length||null==o||""==o)return t+"不能为空";switch(e){case"phone":var i=/^[1][3,4,5,7,8][0-9]{9}$/;if(!i.test(o))return"该手机号不是有效的号码";break;case"password":i=/^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,14}$/;if(!i.test(o))return"请输入6到14位含数字、字母、符号至少两种或以上元素的密码";break;case"identify":i=/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;if(!i.test(o))return"输入的身份证号码有误";break;case"string":return"ok";case"identifyCode":i=/^[0-9]{6}$/;if(!i.test(o))return"请输入6位有效的验证码";break}return"ok"}function a(t,e){return 0==e.length||null==e||""==e?"输入不能为空":t!==e?"两次密码不一致":"ok"}function n(t){var e="";return 8==t.length?(e=t.slice(0,4)+"-"+t.slice(4,6)+"-"+t.slice(6,8),e):"error"}function r(t){var e=t.slice(16,17);return e%2===0?2:1}Object.defineProperty(e,"__esModule",{value:!0}),e.inputCheck=i,e.checkPassword=a,e.changeDateByIdentify=n,e.checkGender=r},a336:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=o("4c9e"),a=o("e66c"),n={data:function(){return{codeNum:0,phone:JSON.parse(uni.getStorageSync("userInfo")).phone,phoneNum:""}},methods:{getPhoneCode:function(){this.codeNum=60;var t=this,e=setInterval(function(){0!=t.codeNum?t.codeNum--:clearInterval(e)},1e3);(0,i.getPasswordCode)(this.phone).then(function(t){t.data.code}).catch(function(){uni.showToast({title:"发送失败，请检查网络",icon:"none"})})},validataCode:function(){var t=this;(0,a.validataCode)(this.phone,this.phoneNum).then(function(e){!0===e.data.data?(uni.setStorageSync("phoneCode",t.phoneNum),uni.setStorageSync("phone",t.phone),t.$parent.getStep(1)):uni.showToast({title:"验证码错误",icon:"none"})})}}};e.default=n},a82d:function(t,e,o){"use strict";o.r(e);var i=o("7d78"),a=o.n(i);for(var n in i)"default"!==n&&function(t){o.d(e,t,function(){return i[t]})}(n);e["default"]=a.a},b144:function(t,e,o){"use strict";var i=o("c349"),a=o.n(i);a.a},bd2b:function(t,e,o){"use strict";o.r(e);var i=o("75fd"),a=o.n(i);for(var n in i)"default"!==n&&function(t){o.d(e,t,function(){return i[t]})}(n);e["default"]=a.a},c349:function(t,e,o){var i=o("5773");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=o("4f06").default;a("5b9bbd7e",i,!0,{sourceMap:!1,shadowMode:!1})},cb74:function(t,e,o){"use strict";var i=o("9c08"),a=o.n(i);a.a},d45d:function(t,e,o){"use strict";var i,a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-uni-view",{staticClass:"body-background"},[o("v-uni-view",{staticClass:"bg-white padding"},[o("v-uni-view",{staticClass:"cu-steps"},t._l(t.numList,function(e,i){return o("v-uni-view",{key:i,staticClass:"cu-item",class:i>t.num?"":"text-blue"},[o("v-uni-text",{staticClass:"num",class:2==i?"err":"",attrs:{"data-index":i+1}}),t._v(t._s(e.name))],1)}),1)],1),0==t.num?o("send-verification-code",{on:{getStep:function(e){arguments[0]=e=t.$handleEvent(e),t.getStep.apply(void 0,arguments)}}}):t._e(),1==t.num?o("set-password"):t._e()],1)},n=[];o.d(e,"b",function(){return a}),o.d(e,"c",function(){return n}),o.d(e,"a",function(){return i})},dcd2:function(t,e,o){var i=o("80ef");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=o("4f06").default;a("e411110e",i,!0,{sourceMap:!1,shadowMode:!1})},dd20:function(t,e,o){"use strict";o.r(e);var i=o("8b5d"),a=o("2dcb");for(var n in a)"default"!==n&&function(t){o.d(e,t,function(){return a[t]})}(n);o("b144");var r,d=o("f0c5"),s=Object(d["a"])(a["default"],i["b"],i["c"],!1,null,"6a1b2d0e",null,!1,i["a"],r);e["default"]=s.exports},f5c4:function(t,e,o){"use strict";var i=o("dcd2"),a=o.n(i);a.a},fd98:function(t,e,o){e=t.exports=o("2350")(!1),e.push([t.i,'@charset "UTF-8";\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */\n/**\r\n * 根据一些普片的css样式\r\n **/.page-backgroud[data-v-1a6f1853]{width:100%;height:100%;background:#f2f2f2}.visited-color[data-v-1a6f1853]{color:#7ec0ee!important}.cut-long-text[data-v-1a6f1853]{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tips-box[data-v-1a6f1853]{width:100%;height:%?100?%;border:1px solid #f0f0f0;background:#fffef5}.tips-box .tips-inbox[data-v-1a6f1853]{width:80%;height:100%;margin:0 auto;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.tips-box .tips-inbox .icon[data-v-1a6f1853]{width:%?60?%;height:%?60?%;margin-right:%?30?%}.tips-box .tips-inbox .tips-text[data-v-1a6f1853]{font-size:17px;font-weight:500;color:#a6a6a6}.gray-border-box[data-v-1a6f1853]{width:90%;height:100%;margin:0 auto;border:1px solid #bbb;border-radius:8px;padding:%?10?%;background:#fff}.blue-column-border-box[data-v-1a6f1853]{width:90%;height:%?90?%;margin:0 auto;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center;margin-top:%?10?%}.blue-column-border-box .blue-border[data-v-1a6f1853]{width:5%;height:%?50?%;border-left:6px solid #7ec0ee}.blue-column-border-box .blue-text[data-v-1a6f1853]{width:80%;font-size:18px;font-weight:700;color:#7ec0ee}\n/**\r\n * 根据一些普片的css样式\r\n **/.page-backgroud[data-v-1a6f1853]{width:100%;height:100%;background:#f2f2f2}.visited-color[data-v-1a6f1853]{color:#7ec0ee!important}.cut-long-text[data-v-1a6f1853]{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tips-box[data-v-1a6f1853]{width:100%;height:%?100?%;border:1px solid #f0f0f0;background:#fffef5}.tips-box .tips-inbox[data-v-1a6f1853]{width:80%;height:100%;margin:0 auto;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.tips-box .tips-inbox .icon[data-v-1a6f1853]{width:%?60?%;height:%?60?%;margin-right:%?30?%}.tips-box .tips-inbox .tips-text[data-v-1a6f1853]{font-size:17px;font-weight:500;color:#a6a6a6}.gray-border-box[data-v-1a6f1853]{width:90%;height:100%;margin:0 auto;border:1px solid #bbb;border-radius:8px;padding:%?10?%;background:#fff}.blue-column-border-box[data-v-1a6f1853]{width:90%;height:%?90?%;margin:0 auto;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center;margin-top:%?10?%}.blue-column-border-box .blue-border[data-v-1a6f1853]{width:5%;height:%?50?%;border-left:6px solid #7ec0ee}.blue-column-border-box .blue-text[data-v-1a6f1853]{width:80%;font-size:18px;font-weight:700;color:#7ec0ee}\n/**\r\n * 关于表单的scss\r\n **/.input-box[data-v-1a6f1853],.password-box[data-v-1a6f1853]{width:90%;height:%?80?%;margin:0 auto;background:#fff;border-radius:4px;border:1px solid #bbb}.password-box[data-v-1a6f1853]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row}.placeholder-class[data-v-1a6f1853]{color:#a6a6a6;font-size:16px}.button-box[data-v-1a6f1853]{width:90%;height:%?80?%;margin:0 auto;background:#7ec0ee;line-height:%?80?%;color:#fff;font-weight:700}.forbiddenInput[data-v-1a6f1853]{color:#a6a6a6}.password-out-box[data-v-1a6f1853]{width:90%;height:auto;margin:0 auto;margin-top:%?50?%;margin-bottom:%?50?%}.password-out-box .password[data-v-1a6f1853]{width:100%;height:%?110?%;line-height:%?110?%;border-top:1px solid #a6a6a6;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row}.password-out-box .password .title[data-v-1a6f1853]{font-size:17px;font-weight:500;color:#a6a6a6;margin-right:%?30?%}.password-out-box .password .placeholder-class[data-v-1a6f1853]{height:%?110?%;line-height:%?110?%;font-size:17px;font-weight:500;color:#a6a6a6}.password-out-box .password .input[data-v-1a6f1853]{height:%?100?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.password-out-box .password[data-v-1a6f1853]:last-child{border-bottom:1px solid #a6a6a6}',""])}}]);