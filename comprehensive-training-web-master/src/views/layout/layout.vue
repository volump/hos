<template>
  <div class="layout">
    <el-container class="container">
      <el-aside class="aside">
        <div class="head">
          <div>
            <img src="../../assets/logo.jpg" alt="logo" />
            <span>挂号通管理端</span>
          </div>
        </div>
        <div class="line" />
        <el-menu background-color="#222832" text-color="#fff" :router="true">
          <el-sub-menu index="1">
            <template #title>
              <el-icon><OfficeBuilding /></el-icon>
              <span class="text">医院管理</span>
              <el-icon><location /></el-icon>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/hospital-detail">医院详情</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><HomeFilled /></el-icon>
              <span>科室管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/department-detail">科室详情</el-menu-item>
              <el-menu-item index="/department-schedule">科室排班</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><User /></el-icon>
              <span>医生管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/doctor-detail">医生详情</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="4">
            <template #title>
              <el-icon><Box /></el-icon>
              <span>排班管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/schedule-detail">排班详情</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-menu-item index="/echartview">
            <el-icon><View /></el-icon>
            <span>图像化管理</span>
          </el-menu-item>
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
import {
  OfficeBuilding,
  User,
  Box,
  HomeFilled,
  View
} from '@element-plus/icons'
import Header from '@/views/component/Header.vue'
import Footer from '@/views/component/Footer.vue'
const store = useStore()
const router = useRouter()
const loginOut = () => {
  // s实现路由守卫
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
