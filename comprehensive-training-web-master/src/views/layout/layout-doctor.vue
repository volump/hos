<template>
  <div class="layout">
    <el-container class="container">
      <el-aside class="aside">
        <div class="head">
          <div>
            <img src="../../assets/logo.jpg" alt="logo" />
            <span>挂号通医生端</span>
          </div>
        </div>
        <div class="line" />
        <el-menu background-color="#222832" text-color="#fff" :router="true">
          <el-menu-item index="/firstpage">
            <el-icon><House /></el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><User /></el-icon>
              <span>患者管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/appointment-detail">预约详情</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><Briefcase /></el-icon>
              <span>出诊管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/attendance-detail">出诊详情</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-container class="content">
        <Header />
        <div class="main">
          <router-view />
        </div>
        <Footer />
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { getCookie } from '../../utils/cookies'
import { House, User, Briefcase } from '@element-plus/icons'
import Header from '@/views/component/Header.vue'
import Footer from '@/views/component/Footer.vue'

const store = useStore()
const router = useRouter()
const loginOut = () => {
  window.sessionStorage.setItem('token1', '')
  localStorage.removeItem('loginData')
  store.commit('setUserInfo', {})
  router.push({
    path: '/'
  })
}
if (getCookie('username') == null) {
  loginOut()
}
</script>
<style lang="scss">
// 主体区域高度
.el-container {
  height: 100vh;
  overflow: hidden;
}
//面包屑
.common-header-flex-float {
  background-color: #4b4c4d;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  div {
    display: flex;
    align-items: center;
    img {
      height: 45px;
      width: 45px;
      margin-left: 20px;
    }
    span {
      font-size: 15px;
      margin-left: 15px;
    }
  }
}
//左侧菜单栏
.layout {
  min-height: 100vh;
  background-color: #ffffff;
}
.container {
  height: 100vh;
}
.aside {
  width: 200px !important;
  background-color: #222832;
  overflow: hidden;
  overflow-y: auto;
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
}
.aside::-webkit-scrollbar {
  display: none;
}
.head {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
}
.head > div {
  display: flex;
  align-items: center;
}

.head img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
.head span {
  font-size: 20px;
  color: #ffffff;
}
.line {
  border-top: 1px solid hsla(0, 0%, 100%, 0.05);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.content {
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  overflow: hidden;
}
.main {
  height: calc(100vh - 100px);
  overflow: auto;
  padding: 10px;
}
</style>
