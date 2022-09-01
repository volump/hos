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
	import { userLoginByopenid } from '@/common/api/quickRegister.js';
	import { inputCheck } from '@/common/js/inputCheck.js';
	import { getOpenId } from '@/common/js/authorization.js';
	import { requestURL } from '@/common/utils/config.js'
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
				
				async toPages(){
					await this.getUserByOpenid()
					console.log("openid =====:"+ uni.getStorageSync('openid'))
					console.log("------3进入判断没有用户进入注册，有着直接进入---------")
					console.log("accountId =====:"+ uni.getStorageSync('accountID'))
					if(uni.getStorageSync("accountID")){
						let name = uni.getStorageSync("phone")
						userLoginByopenid(name).then(res => {
							if(res.data.code === 200) {
								uni.setStorageSync('isAlreadyLogin', true);
								console.log("loginByopenid === ==== ")
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
				async getUserByOpenid(){
					await this.getOpenid();
					return new Promise((resolve,reject)=>{
						var that = this
						var openid = uni.getStorageSync("openid")
						console.log("------页面加载中，获取openid-------")
						console.log('openid === ' + openid);
						let url = requestURL+'/user/wx?openid='+openid;
						uni.request({
							url: url, // 请求路径
							success: result => {
								console.log("-----------2获取用户信息---------")
								console.log("result =======" + result.data.data)
								console.log("result =======" + result.data.data.account.openid)
								// uni.setStorageSync("openid", result.data.data.account.openid)
								uni.setStorageSync("phone", result.data.data.account.name)
								uni.setStorageSync("accountID", result.data.data.account.id);
								uni.setStorageSync("avatarUrl", result.data.data.basicInfo.avatarUrl)
								console.log("openid =====:"+ result.data.data.account.openid)
								console.log("phone =======" + uni.getStorageSync("phone"))
								console.log("accountId =======" + uni.getStorageSync("accountID"))
								resolve('success');
							},
							fail(ex) {
								console.log(ex.message)
								reject(ex.message);
							}
						})
					})
					
					
				},
				getOpenid(){
					return new Promise((resolve,reject)=>{
						uni.login({
							provider: 'weixin',
							success: function(res) {
								try {
									var code = res.code
									console.log("getopenid00000000000======" + res.code)
									uni.getUserInfo({
										provider: 'weixin',
										success: function(infoRes) {
											let url = requestURL+'/user/wx2?code='+code;
											uni.request({
												url: url, // 请求路径
												success: result => {
													console.log("-----------1获取openid---------")
													console.log("openid0000000000 =======" + result.data.data)
													uni.setStorageSync("openid", result.data.data)
													resolve('success');
												},
												fail(ex) {
													console.log(ex.message)
													reject(ex.message);
												}
											})
										}
									});
											 
								} catch (ex) {
									console.log(ex.message)
								}
							}
						});
					})
		},
		
		onLoad() {
			
			// this.getOpenId()
			// this.autologin()
			// this.getOpenId0()
			// this.getOpenId()
			// this.autologin()
			this.toPages()
		}
	},
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