<template>
	<view>
		<!-- #ifdef MP -->
		<image src="/static/login.jpg" class="mp-background" no-repeat></image>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
				Countdown() {
					var timer = setTimeout(function() {				
						uni.switchTab({
							url: '/pages/home/appointmentHome/appointmentHome'
						})
					}, 3000);
				}
		},
		onLoad() {
			var that = this
			var openid = uni.getStorageSync("openid")
			console.log("------页面加载中，获取openid-------")
			if (!openid) {
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
											uni.setStorageSync("openid", result.data.data.openid)
											uni.setStorageSync("userInfo", result.data.data)
											uni.setStorageSync("phone", result.data.data.userName)
											console.log("openid =====:"+result.data.data.openid)
											console.log("phone =======" + uni.getStorageSync("phone"))
											console.log(uni.getStorageSync("userInfo"))
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
			this.Countdown()
			console.log("dkjgdj")
			
		}
	}
</script>

<style lang="scss" scoped>
	%background-img {
		width: 100%;
		height: 100%;
		background-size: 100% 100%;
		position: fixed;
	}
	.mp-background{
		@extend %background-img;
	}
	/* #ifdef H5 */
	page {
		width: 100%;
		height: 100%;
		background: url(../../static/login.jpg) no-repeat;
		background-size: 100% 100%;
		position: fixed;
	}
	/* #endif */
</style>
