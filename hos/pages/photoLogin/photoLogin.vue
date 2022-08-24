<template>
	<view>
		<!-- #ifdef MP -->
		<image src="/static/login.jpg" class="mp-background" no-repeat></image>
		<!-- #endif -->
	</view>
</template>

<script>
	import md5 from 'js-md5';
	import { setToken, getToken } from '@/common/utils/auth.js'
	import { userLogin } from '@/common/api/quickRegister.js';
	import  { inputCheck } from '@/common/js/inputCheck.js';
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
				},
				autologin: function() {
					console.log("openid =====:"+ uni.getStorageSync('openid'))
					console.log("accountId =====:"+ uni.getStorageSync('accountID'))
					if(uni.getStorageSync("accountID")){
						let name = "15811111111"
						let password  = "w123456789"
						var errorName = inputCheck('账号', 'string', name)
						var errorPassword = inputCheck('密码', 'password', password)
						if(errorName !== 'ok') {
							error(errorName)
						} else if(errorPassword !== 'ok') {
							error(errorPassword)
						} else {
							uni.showLoading({
								title: '加载中'
							})
							userLogin(name, md5(password)).then(res => {
								if(res.data.code === 200) {
									uni.setStorageSync('isAlreadyLogin', true);
									console.log("从登录页进入+++++++res.data.data==="+ res.data.data)
									setToken(res.data.data)
									console.log("token ====="+getToken())
									
								} else {
									uni.hideLoading()
									error('账号或密码错误')
								}
							}).catch(() => {
								uni.hideLoading()
								error('网络')
							})
						}
					 	this.Countdown()
						console.log("----------------------已经登录了")
					}
					else{
						uni.showToast({
							icon:"none",
							title:'请先注册账号'
						})
						uni.navigateTo({
							url:'../../pagesB/pages/center/login/quickRegister/quickRegister'
						})
					}
				},
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
									// var  nickName = infoRes.userInfo.nickName
									// var  avatarUrl = infoRes.userInfo.avatarUrl
									let url = 'http://localhost:8080/hospital/user/wx?code='+code;
									uni.request({
										url: url, // 请求路径
										success: result => {
											console.log("result =======" + result.data.data)
											console.log("result =======" + result.data.data.account.openid)
											uni.setStorageSync("openid", result.data.data.account.openid)
											uni.setStorageSync("phone", result.data.data.account.name)
											uni.setStorageSync("accountID", result.data.data.account.id);
											uni.setStorageSync("avatarUrl", result.data.data.basicInfo.avatarUrl)
											console.log("openid =====:"+ result.data.data.account.openid)
											console.log("phone =======" + uni.getStorageSync("phone"))
											console.log("accountId =======" + uni.getStorageSync("userAccountId"))
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
			
			this.autologin()
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
