<template>
	<view>
		<button @click="logins">测试登录</button>
		<image :src="myAvaturUrl"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				myAvaturUrl: "",
			}
		},
		methods: {
			logins() {
				uni.getUserProfile({
					desc:"用于完善用户信息",  //必填，声明获取用户个人信息后的用途，不超过30个字符
					success: (res) => {
						console.log(res.userInfo.avatarUrl)
						this.myAvaturUrl = res.userInfo.avatarUrl
						uni.showToast({
							icon:"none",
							title:'获取成功'
						})
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
	
		}
	}
</script>

<style>

</style>
