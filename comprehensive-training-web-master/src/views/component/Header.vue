<template>
  <div class="header">
    <div class="right">
      <el-popover
        placement="bottom"
        trigger="click"
        popper-class="popper-user-box"
      >
        <template #reference>
          <div>
            <el-icon>
              <UserFilled />
            </el-icon>
            {{ infoForm.name }}
            <el-icon>
              <CaretBottom />
            </el-icon>
          </div>
        </template>
        <div class="nickname">
          <p>登录账号: {{ infoForm.id }}</p>
          <el-tag
            size="default"
            type="danger"
            effect="dark"
            class="logout"
            @click="logout"
            ><el-icon><CircleClose /></el-icon>退出登录</el-tag
          >
          <el-tag
            size="default"
            effect="dark"
            class="ChangePwd"
            @click="ChangePwd"
            ><el-icon><Edit /></el-icon>修改密码</el-tag
          >
        </div>
      </el-popover>
    </div>
  </div>
  <!--新增弹窗-->
  <el-dialog v-model="dialogFormVisible" title="修改密码">
    <PwdDialog />
  </el-dialog>
</template>

<script setup>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { getCookie } from '../../utils/cookies'
import { getDoctorInfo } from '../../api/doctor.js'
import { Edit, CircleClose } from '@element-plus/icons'
import PwdDialog from '@/views/component/PwdDialog.vue'
import { UserFilled, CaretBottom } from '@element-plus/icons'

const data = reactive({
  infoForm: {},
  dialogFormVisible: false
})
const router = useRouter()

//获取医生信息
const searchDoctor = () => {
  getDoctorInfo(parseInt(getCookie('username')))
    .then((res) => {
      if (res.code === 200) {
        data.infoForm = res.data
      }
    })
    .catch(() => {
      alert('没有查找到对应的信息')
    })
}

const logout = () => {
  // s实现路由守卫
  window.sessionStorage.setItem('token1', '')
  localStorage.removeItem('loginData')
  router.push({
    path: '/'
  })
}

const ChangePwd = () => {
  data.dialogFormVisible = true
}

//判断用户是否是医生，是的话获取信息;如果是管理员就直接将账号和姓名置为admin
if (getCookie('username') !== 'admin') {
  searchDoctor()
} else {
  data.infoForm.id = 'admin'
  data.infoForm.name = 'admin'
}
const { dialogFormVisible, infoForm } = toRefs(data)
</script>

<style scoped>
.header {
  height: 7%;
  border-bottom: 1px solid #e9e9e9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}
.el-icon-back {
  border: 1px solid #e9e9e9;
  padding: 4px;
  border-radius: 50px;
  margin-right: 10px;
}
.right {
  font-size: 18px;
  position: fixed;
  right: 3%;
}
.author {
  margin-left: 10px;
  cursor: pointer;
}
</style>
<style>
.popper-user-box {
  background: url('https://s.yezgea02.com/lingling-h5/static/account-banner-bg.png')
    50% 50% no-repeat !important;
  background-size: cover !important;
  border-radius: 0 !important;
  width: 15% !important;
  height: 5em;
}
.popper-user-box .nickname {
  position: relative;
  color: #ffffff;
}
.popper-user-box .nickname .logout {
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
}
.popper-user-box .nickname .ChangePwd {
  position: absolute;
  right: 0;
  top: 3em;
  cursor: pointer;
}
</style>
