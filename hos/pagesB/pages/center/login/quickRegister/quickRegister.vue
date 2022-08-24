<template>
	<view>
		<view class="weui-cells weui-cells_after-title" style="margin-top: 30rpx;">
		    <view class="weui-cell weui-cell_input">
		        <view class="weui-cell__hd">
		            <view class="weui-label">姓名：</view>
		        </view>
		        <view class="weui-cell__bd">
		            <input class="weui-input" placeholder="请输入姓名" v-model="form.name"
					@blur="inputCheck('姓名','string', 'name')"/>
		        </view>
		    </view>
		    <view class="weui-cell weui-cell_input weui-cell_vcode">
		        <view class="weui-cell__hd">
		            <view class="weui-label">手机号</view>
		        </view>
		        <view class="weui-cell__bd">
		            <input class="weui-input" placeholder="请输入手机号" v-model="form.phone"
					@blur="inputCheck('手机号码', 'phone', 'phone')"/>
		        </view>
		        <view class="weui-cell__ft" @tap="getPhoneCode()" 
				v-if="getCodeNum === 0">
		            <view class="weui-vcode-btn" >获取验证码</view>
		        </view>
				<view class="weui-cell__ft" v-else>
				    <view class="weui-vcode-btn" style="color: #A6A6A6;">获取验..({{getCodeNum}}s)</view>
				</view>
		    </view>
			<view class="weui-cell weui-cell_input weui-cell_vcode">
			    <view class="weui-cell__hd">
			        <view class="weui-label">验证码</view>
			    </view>
			    <view class="weui-cell__bd">
			        <input class="weui-input" placeholder="请输入验证码" v-model="form.identifyCode"
					@blur="inputCheck('验证码', 'identifyCode', 'identifyCode')"/>
			    </view>
			</view>
			<view class="weui-cell weui-cell_input">
			    <view class="weui-cell__hd">
			        <view class="weui-label">密码：</view>
			    </view>
			    <view class="weui-cell__bd">
			        <input class="weui-input" placeholder="请输入您的登录密码" v-model="form.password"
					password="false" @blur="inputCheck('密码', 'password', 'password')"/>
			    </view>
			</view>
			<view class="weui-cell weui-cell_input">
			    <view class="weui-cell__hd">
			        <view class="weui-label">确认密码：</view>
			    </view>
			    <view class="weui-cell__bd">
			        <input class="weui-input" placeholder="请再次输入密码" v-model="form.checkPassword"
					password="false" @blur="checkPassword()"/>
			    </view>
			</view>
		</view>
		<button class="button" @click="getUserInfo()">获取头像等信息</button>
		<button class="button" @click="validataCode()">立即注册</button>
	</view>
</template>

<script>
	import { setToken, getToken } from '@/common/utils/auth.js'
	import md5 from 'js-md5';
	import  { inputCheck, checkPassword } from '@/common/js/inputCheck.js';
	import {error} from '@/common/js/errorTips.js'
	import { getPhoneCode, validataCode, userRegister } from '@/common/api/quickRegister.js';
	
	export default {
		data() {
			return {
				// 表单的数据
				form: {
					name: '',
					phone: '',
					identifyCode: '',
					password: '',
					checkPassword: ''
				},
				isValidate: true, // 用作验证这些表单是否都通过验证
				getCodeNum: 0
			}
		},
		
		onLoad() {
			
		},
		methods: {
			// 获取手机验证码
			getPhoneCode: function() {
				if(this.isValidate && this.form.phone !== '') {
					this.getCodeNum = 60;
					let _this = this
					let time = setInterval(function(){
						if(_this.getCodeNum == 0) {
							clearInterval(time);
							return;
						}
							_this.getCodeNum--;
						},1000)
					
					getPhoneCode(this.form.phone).then(res => {
					}).catch(() => {
						uni.showToast({
							title: '发送失败，请检查网络',
							icon: 'none'
						})
					})
				}
			},
			// 校验验证码
			validataCode: function() {
				// 校验表单验证是否都过关
				for(let item in this.form) {
					if(this.form[item] === '' || this.form[item] === null
					 || this.form[item] === undefined) {
						this.isValidate = false;
						 break;
					 }
				}
				if(this.isValidate) {
					// 表达验证没问题之后首先验证验证码是否正确
					uni.showLoading({
						title: '加载中'
					})
					validataCode(this.form.phone, this.form.identifyCode).then(res => {
						console.log(res)
						if(res.data.code === 200) {
							this.toAddCard()
						} else {
							uni.hideLoading()
							error('验证码错误')
							
						}
					}).catch(() => {
						error('网络')
					})
				} else {
					error('请将信息填写完整')
				}
			},
			getUserInfo: function(){
				uni.getUserProfile({
					desc:"用于完善用户信息",  //必填，声明获取用户个人信息后的用途，不超过30个字符
					success: (res) => {
						console.log("头像是+++++++++"+res.userInfo.avatarUrl)
						uni.setStorageSync("avatarUrl", res.userInfo.avatarUrl)
						uni.setStorageSync("nickName", res.userInfo.nickName)
					},
					fail: (err) => {
						console.log(err)
						uni.showToast({
							icon:"none",
							title:'用户拒绝获取'
						})
					}  
				})
			},
			quicklogin: function() {
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
			// 将数据存进数据库后跳转到个人中心页面
			toAddCard:function(){
				
				userRegister({
					// #ifdef MP
					avatarUrl: uni.getStorageSync('avatarUrl'),
					// #endif
					// #ifdef H5
					// H5注册时使用默认头像
					avatarUrl: 'http://image.yujian95.cn/FmxdyLFebwrEhId3tyb7AXo5Xryc',
					// #endif
					name: this.form.name,
					openid: uni.getStorageSync('openid'),
					password: md5(this.form.password),
					phone: this.form.phone
				}).then(res => {
					if(res.data.code === 200) {
						console.log("123455---------")
						console.log("phone === " + this.form.phone + "md5password === " + this.form.password)
						uni.showToast({
							title: '注册成功',
							icon: 'success'
						})
						uni.navigateTo({
							url:'/pagesB/pages/center/login/login'
						})
					} else {
						uni.hideLoading()
						error('该手机号已存在，请登录',)
					}
				}).catch(() => {
					uni.hideLoading()
					error('网络')
				})
				
			},
			// 用于表单的判断
			inputCheck:function(name, rule, value){
				let _this = this
				var error = inputCheck(name, rule, this.form[value])
				if(error !== 'ok'){
					this.isValidate = false;
					this.form[value] = ''
					error(error)
				} else {
					return
				}
			},
			// 判断两次输入发密码
			checkPassword:function(){
				var error = checkPassword(this.form.password, this.form.checkPassword)
				if(error !== 'ok'){
					this.isValidate = false
					error(error)
					return 
				} else {
					this.isValidate = true
					return
				}
			}
		}
	}
</script>

<style lang="scss">
	@import '@/common/scss/form.scss';
page{
	// background: #F2F2F2;
}
// 注册按钮
.button{
	@extend .button-box;
	margin-top: 50rpx;
}
</style>
