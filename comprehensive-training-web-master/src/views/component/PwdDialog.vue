<template>
  <el-card class="account-container">
    <el-form
      :rules="rules"
      :model="passwordForm"
      label-width="90px"
      label-position="right"
    >
      <el-form-item label="原密码：" prop="password">
        <el-input
          v-model="passwordForm.password"
          style="width: 200px"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码：" prop="newPassword">
        <el-input
          v-model="passwordForm.newPassword"
          style="width: 200px"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码：" prop="newPassword">
        <el-input
          v-model="passwordForm.confirmPassword"
          style="width: 200px"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="Submit">确认修改</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
import { tips } from '../../utils/notify.js'
import { reactive, toRefs } from 'vue'
import { getCookie } from '../../utils/cookies'
import { updatePassword } from '../../api/login.js'
import SHA256 from 'js-sha256'

const data = reactive({
  passwordForm: {
    userid: getCookie('username'),
    password: '',
    newPassword: '',
    confirmPassword: ''
  },
  rules: {
    password: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
    newPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
    confirmPassword: [
      { required: true, message: '请再次确认密码', trigger: 'blur' }
    ]
  }
})

//修改密码
const Submit = () => {
  if (data.passwordForm.newPassword === data.passwordForm.confirmPassword) {
    updatePassword({
      accountId: window.sessionStorage.getItem('accountID'),
      newPassword: SHA256(data.passwordForm.newPassword),
      password: SHA256(data.passwordForm.password)
    })
      .then((res) => {
        if (res.code === 200) {
          tips('success', '修改成功')
        } else if (res.code === 404) {
          tips('error', '修改失败')
        }
      })
      .catch(() => {
        tips('error', '原密码错误')
      })
  } else {
    tips('error', '密码不一致')
  }
}

const { passwordForm } = toRefs(data)
</script>

<style>
.account-container {
  margin-bottom: 20px;
}
</style>
