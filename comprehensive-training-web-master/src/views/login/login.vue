<template>
  <div class="login-box">
    <div class="login-container">
      <div class="head">
        <img class="logo" src="../../assets/logo.jpg" />
        <div class="name">
          <div class="title">挂号通</div>
          <div class="tips">后台管理系统</div>
        </div>
      </div>
      <el-form
        label-position="top"
        :rules="rules"
        :model="ruleForm"
        status-icon
        ref="ruleFormRef"
        class="loginForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input
            v-model="ruleForm.username"
            type="username"
            placeholder="请输入姓名"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            placeholder="请输入密码"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div style="color: #333">登录表示您已同意<a>《服务条款》</a></div>
          <el-button style="width: 100%" type="primary" @click="submitForm"
            >立即登录</el-button
          >
          <el-checkbox v-model="checked" @change="!checked"
            >下次自动登录</el-checkbox
          >
        </el-form-item>
      </el-form>
      <!----------------------------微信扫描二维码登陆------------------------------------------->
      <div style="text-align: center">
        <el-button text @click="wxlogin()">微信扫码登陆</el-button>
      </div>
      <el-dialog
        v-model="ruleForm.dialogVisible"
        title="扫描二维码"
        :before-close="handleClose"
        width="400px"
      >
        <div>
          <img
            v-show="ruleForm.img_display"
            style="text-align: center"
            class="qrcode"
            :src="ruleForm.qrcode"
            id="qrCodeImgId"
          />
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import {
  LoadingOpen,
  LoadingClose_later,
  LoadingClose_immed
} from '../../utils/ComFun'
import Schema from 'async-validator'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { setCookie } from '../../utils/cookies'
import { getWxqrcode, getOpenid, get_openid_info } from '../../api/login'
import { ElMessage } from 'element-plus'
import { setToken } from '@/utils/auth'
const handleClose = () => {
  ruleForm.dialogVisible = false
  clearInterval(ruleForm.t1)
}
let ruleForm = reactive({
  username: 'admin',
  password: 'admin',
  dialogVisible: false,
  sceneStr_qr: '',
  t: '',
  t1: '',
  imgUrl: '',
  qrcode: '',
  openid_accountid: '',
  openid_userName: '',
  access_Token: '',
  img_display: false
})
const wxlogin = () => {
  ruleForm.dialogVisible = true
  getQrcode()
}

//获取二维码
const getQrcode = () => {
  getWxqrcode().then((res) => {
    //如果获取二维码成功
    if (res.code === 200) {
      ruleForm.img_display = true
      ruleForm.sceneStr_qr = res.data.sceneStr
      document.getElementById('qrCodeImgId').src =
        'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=' + res.data.ticket
      //console.log(document.getElementById('qrCodeImgId').src)
      ruleForm.imgUrl = document.getElementById('qrCodeImgId').src
      //console.log(res.data)
      //二维码显示成功
      ruleForm.qrcode = ruleForm.imgUrl
      //每3秒访问后台是否能路
      ruleForm.t1 = setInterval(WxLogin, 3000)
    }
  })
}
//WX扫码轮巡检测
const WxLogin = () => {
  getOpenid(ruleForm.sceneStr_qr).then((res) => {
    if (res.code === 200) {
      //ruleForm.t保存了openid
      ruleForm.t = res.data.openId
      //扫码成功进入对应页面
      autologinwx()
    }
  })
}
//Wx登录到不同用户对应页面
const autologinwx = () => {
  //二维码的dialog关闭
  ruleForm.dialogVisible = false
  get_openid_info(ruleForm.t).then((res) => {
    //console.log(res.data)
    if (res.data.userName !== null) {
      ruleForm.openid_userName = res.data.userName
      if (ruleForm.openid_userName === 'admin') {
        router.push({ path: '/layout' })
        setCookie('username', ruleForm.openid_userName, 15)
      } else {
        router.push({ path: '/layout-doctor' })
        setCookie('username', ruleForm.openid_userName, 15)
      }
      const token = ruleForm.t
      window.sessionStorage.setItem('token1', ruleForm.t)
      setToken(token)
      //关闭查询
      ElMessage({
        showClose: true,
        message: '登陆成功',
        type: 'success'
      })
      clearInterval(ruleForm.t1)
    } else {
      ruleForm.dialogVisible = false
      clearInterval(ruleForm.t1)
      alert('请联系管理员绑定微信')
    }
  })
}
const rules = reactive({
  username: {
    required: true,
    message: '用户名不能为空'
  },
  password: [
    {
      required: true,
      message: '密码不能为空'
    }
  ]
})
const validator = reactive(new Schema(rules))
let store = useStore()
let router = useRouter()
let checked = true
const submitForm = () => {
  if (
    validator.validate(ruleForm, {
      firstFields: true
    })
  ) {
    LoadingOpen()
    store
      .dispatch('Login', ruleForm)
      .then(() => {
        // 校验通过
        // 在这里进行登录后的其它操作
        // alert('验证通过，发送请求')
        // console.log(' 校验通过,可以发起请求')
        //路由守卫
        setCookie('username', ruleForm.username, 15)
        setCookie('password', ruleForm.password, 15)
        //权限分配路由实现
        if (ruleForm.username === 'admin') {
          store.dispatch('GetInfo')
          router.push({ path: '/layout' })
        } else {
          store.dispatch('GetInfo')
          router.push({ path: '/layout-doctor' })
        }
        //tips('success', '登录成功')
        LoadingClose_immed()
        ElMessage({
          message: '登陆成功',
          type: 'success'
        })
      })
      .catch((err) => {
        //tips('error', '账号或密码错误')
        LoadingClose_later()
        console.log(err) //在控制台输出错误
        ElMessage({
          message: '登陆失败',
          type: 'error'
        })
      })
  }
}
</script>

<style lang="scss" scoped>
.login-body {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: url('../.././assets/bgg.png');
  background-color: #fff;
  /* background-image: linear-gradient(25deg, #077f7c, #3aa693, #5ecfaa, #7ffac2); */
}
.login-container {
  width: 420px;
  height: 500px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 21px 41px 0px rgba(0, 0, 0, 0.2);
}
.head {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0 20px 0;
}
.head img {
  width: 100px;
  height: 100px;
  margin-right: 20px;
}
.head .title {
  font-size: 28px;
  color: #1baeae;
  font-weight: bold;
}
.head .tips {
  font-size: 12px;
  color: #999;
}
.loginForm {
  width: 70%;
  margin: 0 auto;
}
.login-box {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  background: url('../.././assets/bgg.png');
}
.qrcode {
  width: 200px;
  height: 200px;
  border: 1px solid #e2e2e2;
}
</style>
