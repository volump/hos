/**
 * 此处是三个平台的授权的方法
 * **/
// 微信小程序的授权
export function weChat() {
	uni.showLoading({
		title: '加载中'
	})
	 wx.getSetting({
		 success(res) {
			if (res.authSetting['scope.userInfo']) {
				// 已经授权，可以直接调用 getUserInfo 获取头像昵称
				wx.getUserInfo({
					success: function(res) {
						console.log(res)
						uni.setStorageSync('avatarUrl', res.userInfo.avatarUrl)
					
						uni.setStorageSync("isAuthrization", true)
						// uni.switchTab({
						// 	url: '/pages/center/center'
						// })
						try {} catch (e) {}
						uni.hideLoading()
						return true
					},
					fail: () => {
						uni.hideLoading()
						return false
					}
				})
			}
		}
	})
}
export function getOpenId() {
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
									console.log("-----------1---------")
									console.log("result =======" + result.data.data)
									console.log("result =======" + result.data.data.account.openid)
									uni.setStorageSync("openid", result.data.data.account.openid)
									uni.setStorageSync("phone", result.data.data.account.name)
									uni.setStorageSync("accountID", result.data.data.account.id);
									uni.setStorageSync("avatarUrl", result.data.data.basicInfo.avatarUrl)
									console.log("openid =====:"+ result.data.data.account.openid)
									console.log("phone =======" + uni.getStorageSync("phone"))
									console.log("accountId =======" + uni.getStorageSync("accountId"))
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