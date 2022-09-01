<template>
	<view>
	
		<view class="input-inbox">
			<input class="input" placeholder-class="placeholder-class" 
			placeholder="请输入手机号码" v-model="name"/>
		</view>
		<view class="password-row-box" >
			<input class="input" :password="!isVisible" v-model="password"
			placeholder-class="placeholder-class" placeholder="请输入登录密码" />
			<image class="eye-icon" :src="isVisible? '/static/login/eye.png':'/static/login/eye-off.png'" @click="changeVisible()"></image>
		</view>
	    <view>
			<button class="button" @click="toPageCenter()">登录</button>
		</view>
		
		<view class="enroll-changepassword-box" v-if="1">
			<text class="left" @click="toRegister()" :class="visited == 1? 'visited-color' : ''">立即注册</text>
			<!-- <text class="right" :class="visited == 2? 'visited-color' : ''" @click="toForgotPassword()">忘记密码</text> -->
		</view>
		<!-- <button   class="button" @click="getUserInfo()"> 使用微信登录</button> -->
	</view>
</template>

<script>
	import { userLogin } from '@/common/api/quickRegister.js';
	import  { inputCheck } from '@/common/js/inputCheck.js';
	import { setToken, getToken } from '@/common/utils/auth.js'
	import md5 from 'js-md5';
	import {error} from '@/common/js/errorTips.js'
	import {getUserCardInfo} from '@/common/api/userInfo.js'
	import { getOpenId } from '@/common/api/userInfo.js'
	export default {
		data() {
			return {
				name: '',
				password: '',
				isVisible: false,
				visited: 0, // 默认是0-全都没选  1-选中立即注册  2-选中忘记密码
				isRegisterVisited: false,
				isPasswordVisited: false,
				isAuthrization: uni.getStorageSync("isAuthrization")
			}
		},
		
		onLoad(){
			console.log("openid == " + uni.getStorageSync("openid"))
		},
		methods: {
			// 切换是否可见密码
			changeVisible: function() {
				this.isVisible = !this.isVisible
			},
			// 跳转到快速注册页面
			toRegister: function() {
				this.visited = 1
				var _this = this
				setTimeout(function() {
					_this.visited = 0
				}, 2000)
				uni.navigateTo({
					url: '/pagesB/pages/center/login/quickRegister/quickRegister'
				})
			},
			// 跳转到忘记密码页面
			toForgotPassword: function() {
				this.visited = 2
				var _this = this
				setTimeout(function() {
					_this.visited = 0
				}, 2000)
				uni.navigateTo({
					url: '/pagesB/pages/center/login/fotgotPassword/fotgotPassword'
				})
			},
			// 授权获取用户信息
			getUserInfo: function() {
				// var _this = this
				uni.getUserProfile({
					desc:"用于完善用户信息",  //必填，声明获取用户个人信息后的用途，不超过30个字符
					success: (res) => {
						console.log(res.userInfo.avatarUrl)
						uni.setStorageSync("avatarUrl", res.userInfo.avatarUrl)
						uni.setStorageSync("nickName", res.userInfo.nickName)
						if(uni.getStorageSync('phone')){
							uni.setStorageSync("isAlreadyLogin", true)
							uni.showToast({
									icon:"none",
									title:'登录成功'
							}),
							uni.switchTab({
								url:'../../../../pages/center/center'
							})
						}
						else{
							uni.showToast({
								icon:"none",
								title:'mei'
							})
						}
					},
					fail: (err) => {
						console.log(err)
						uni.showToast({
							icon:"none",
							title:'用户拒绝获取'
						})
					}  
				})
			
				// this.weChat()
			
			},
			// 跳转到center页面
			toPageCenter: function() {
				// var name = uni.getStorageSync("phone")
				// var password  = 'w123456789'
				
				var errorName = inputCheck('账号', 'string', this.name)
				var errorPassword = inputCheck('密码', 'password', this.password)
				if(errorName !== 'ok') {
					error(errorName)
				} else if(errorPassword !== 'ok') {
					error(errorPassword)
				} else {
					uni.showLoading({
						title: '加载中'
					})
					
					userLogin(this.name, md5(this.password)).then(res => {
						if(res.data.code === 200) {
							uni.setStorageSync('isAlreadyLogin', true);
							console.log("从登录页进入+++++++res.data.data==="+ res.data.data)
							setToken(res.data.data)
							// this.getMyselfCardInfo()
							uni.showToast({
								title: '登录成功',
								icon: 'success'
							})
							uni.switchTab({
								url:'/pages/center/center'
							})
							
						} else {
							uni.hideLoading()
							error('账号或密码错误')
						}
					}).catch(() => {
						uni.hideLoading()
						error('网络')
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	@import '@/common/scss/form.scss';
	@import '@/common/scss/common.scss';

	page {
		width: 100%;
		height: 100%;
		background-color: #F2F2F2;
	}

	@mixin mt($top) {
		margin-top: $top;
	}

	.input-inbox {
		@extend .input-box;
		@include mt(80rpx);
		display: flex;
		align-items: center;

		.input {
			@include width-margin(90%, 90%);
		}
	}

	.password-row-box {
		@extend .password-box;
		align-items: center;
		@include mt(40rpx);
		display: flex;
		align-items: center;

		.input {
			width: 83%;
			height: 90%;
			margin-left: 5%;
		}

		.eye-icon {
			width: 17%;
			@include icon-size(50rpx, 50rpx);
		}
	}

	// 登录按钮
	.button {
		@extend .button-box;
		@include mt(50rpx);
	}

	// 选择注册和修改密码
	.enroll-changepassword-box {
		@include width-margin(90%, 70rpx);
		margin-top: 40rpx;
		@include flex-direction(row);
		@include row-left-right(50%, 50%);
	}
</style>
