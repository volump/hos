<template>
	<view>
		<button v-if="isphone" class="phone" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取电话号码</button>
	</view>
</template>

<script>
	var WXBizDataCrypt = require('../../common/js/WXBizDataCrypt.js')
	export default {
		data() {
			return {
				isphone: true,
				app_id: 'wx9dd8ecbe010f1d14',
				session_Key: uni.getStorageSync("sessionkey")
			}
		},
		methods: {
			getPhoneNumber(e) {
				
				const _this = this
				if (e.detail.errMsg == "getPhoneNumber:fail user deny") { //用户决绝授权  
					//拒绝授权后弹出一些提示  
					// this.isphone = true
					
				} else {
					//允许授权，新增用户
					let app_id = _this.app_id
					var pc = new WXBizDataCrypt(app_id, _this.session_Key)
					var data = pc.decryptData(e.detail.encryptedData, e.detail.iv)
					//data就是手机授权解密好的数据
					console.log("phone ==== " + data)
				}
			},

		},
		onLoad(){
			var that = this
			var openid = uni.getStorageSync("openid")
			console.log("-------------")
			if (openid) {
				uni.login({
					provider: 'weixin',
					success: function(res) {
						try {
							var code = res.code
							console.log("res======" + res.code)
							uni.getUserInfo({
								provider: 'weixin',
								success: function(infoRes) {
									console.log("infoRes===" + infoRes.userInfo.nickName)
									var  nickName = infoRes.userInfo.nickName
									var  avatarUrl = infoRes.userInfo.avatarUrl
									let url = 'http://localhost:8080/hospital/user/wx?code='+code;
									uni.request({
										url: url, // 请求路径
										success: result => {
											console.log("result =======" + result.data.data)
											uni.setStorageSync("openid", result.data.data)
											uni.setStorageSync("nickName", nickName)
											uni.setStorageSync("avatarUrl", avatarUrl)
											uni.setStorageSync("sessionkey",result.data.data.sessionkey)
											console.info("openid ====== "+result.data.data.openid)
											console.info("sessionkey ====== "+result.data.data.sessionkey)
										},
										fail(ex) {
											console.log(ex.message)
										}
									})
								}
							});
			 
						} catch (ex) {
							console.log(ex.message)
						}
					}
				});
			}
		}
	}
</script>

<style>

</style>
