<script>
	export default {
		// onLaunch: function() {
		// 	console.log('App Launch')
		// },
		//app.vue生命周期中，onlaunch执行时，执行this.$isResolve()
		onLaunch: function() {
			//发送请求
		    uni.request({
		        success: loginRes => {        
		           uni.login({
		           	provider: 'weixin',
		           	success: function(res) {
		           		try {
		           			var code = res.code
		           			console.log("res======" + res.code)
		           			uni.getUserInfo({
		           				provider: 'weixin',
		           				success: function(infoRes) {
		           			
		           					let url = 'http://localhost:8080/hospital/user/wx2?code='+code;
		           					uni.request({
		           						url: url, // 请求路径
		           						success: result => {
		           							console.log("-----------1---------")
		           							console.log("openid =======" + result.data.data)
		           							uni.setStorageSync("openid", result.data.data)
		           				
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
		            this.$isResolve()            
		        }
		    })
		},
		
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		
	}
</script>

<style>
	/*每个页面公共css */
	@import './common/style/weui.wxss';
	@import "./common/style/colorui/main.css";
	@import "./common/style/colorui/icon.css";
	@import "./common/style/colorui/animation.css";
	/* 去掉H5页面的重复头部的信息 */
	/* #ifdef H5 */
	uni-page-head{
		display: none; 
	} 
	/* #endif */
</style>
