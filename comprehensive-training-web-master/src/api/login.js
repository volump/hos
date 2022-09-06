import request from '@/utils/request'
/**
 * 用于登录注册时写的api接口的页面
 * 1、登录获取token
 * 2、获取用户的信息
 * 3、修改账号密码
 * **/
// 1、登录获取token
export function login(userName, password) {
  return request({
    url: '/power/account/login?name=' + userName + '&password=' + password,
    method: 'get'
  })
}
// 2、获取用户的信息
export function getUserInfo() {
  return request({
    url: '/power/account/info',
    method: 'get'
  })
}
// 3、修改账号密码
export function updatePassword(data) {
  return request({
    url: '/power/account/password',
    method: 'put',
    data
  })
}
// 4、微信登陆获取二维码
export function getWxqrcode() {
  return request({
    url: '/qrCodeFirstLogin/getQrCode',
    method: 'get'
  })
}
// //5、获取openid
export function getOpenid(eventKey) {
  return request({
    url: '/qrCodeFirstLogin/getOpenId',
    method: 'get',
    params: { eventKey }
  })
}
// 6、根据openid获得账号和密码
export function get_openid_info(openid) {
  return request({
    url: '/power/account/openid',
    method: 'post',
    params: { openid }
  })
}
// //7、根据accessToken获取用户信息
// export function get_openid_user(access_token,openid,lang) {
//   return request({
//     url: 'https://api.weixin.qq.com/cgi-bin/user/info',
//     method: 'GET',
//     params: { access_token,openid,lang }
//   })
// }
// //8、获取accesstoken
// export function get_accesstoken_user(grant_type,appid,secret) {
//   return request({
//     url: 'https://api.weixin.qq.com/cgi-bin/token',
//     method: 'GET',
//     params: { grant_type,appid,secret }
//   })
// }
