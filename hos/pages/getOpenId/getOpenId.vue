<template>
	<view>
		<button @click="getUserInfo()">获取用户信息</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			getUserInfo:function() {
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
												console.info(result.data.data.openid)
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
			},
		}
	}
</script>

<style>

</style>
