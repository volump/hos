<!--首页一进来用于显示用户的个人信息和更改密码-->
<template>
  <div>
    <el-card class="out-box" shadow="never">
      <!--      只有医生管理员才有的医生信息-->
      <div class="form-class">
        <el-form :model="infoForm" class="input-box">
          <el-form-item label="编号ID:" label-width="100px;">
            <span class="text">{{ infoForm.id }}</span>
          </el-form-item>
          <el-form-item label="用户姓名:" label-width="100px;">
            <span class="text">{{ infoForm.name }}</span>
          </el-form-item>
          <el-form-item label="用户性别:" label-width="100px;">
            <span class="text">{{ infoForm.genderText }}</span>
          </el-form-item>
          <el-form-item label="用户职称:">
            <span class="text">{{ infoForm.jobTitle }}</span>
          </el-form-item>
          <el-form-item label="用户所属专科:">
            <span class="text">{{ infoForm.specialName }}</span>
          </el-form-item>
          <el-form-item label="用户所属门诊:">
            <span class="text">{{ infoForm.outpatientName }}</span>
          </el-form-item>
        </el-form>
        <div class="brief-box">
          <span class="title">用户简介：</span>
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="infoForm.specialty"
            class="brief"
            maxlength="500"
            show-word-limit
            :autosize="{ minRows: 5, maxRows: 5 }"
          >
          </el-input>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script setup>
import { reactive, toRefs } from '@vue/reactivity'
import { getGender } from '../../utils/GetInfo.js'
import { getDoctorInfo } from '../../api/doctor.js'
import { getCookie } from '../../utils/cookies'

const data = reactive({
  // 顶部筛选信息
  // 只用于医生的infoForm
  infoForm: {},
  gender: '',
  accountIdentify: getCookie('username') // 用于判断是不是系统管理员
})

//获取医生信息
const searchDoctor = () => {
  getDoctorInfo(parseInt(data.accountIdentify))
    .then((res) => {
      if (res.code === 200) {
        data.infoForm = res.data
        data.infoForm.genderText = getGender(data.infoForm.gender)
        console.log(getGender(1))
      }
    })
    .catch(() => {
      alert('没有查找到对应的信息')
    })
}
searchDoctor()
//使用toRefs解构，否则组件中的数据无法正常显示
const { infoForm } = toRefs(data)
</script>
<style scoped lang="scss">
@import '../.././common/scss/common.scss';
.out-box {
  @include width-margin(90%, 100%);
  @include flex-direction(column);
  margin-top: 10px;
  // 上面的标题和按钮
  .title-button {
    width: 100%;
    @include flex-direction(row);
    .title {
      @include font-style(18px, $major-blue-color);
      margin-right: 40px;
      display: flex;
      align-items: center;
    }
  }
  // 中间的信息
  .info-picture-box {
    @include width-margin(95%, 100%);
    @include flex-direction(row);
    margin-top: 20px;
    .info-out-box {
      width: 70%;
      height: 100%;
    }
    .picture-box {
      width: 300px;
      height: 200px;
    }
  }
  // 底部的简介
  .brief-box {
    @include width-margin(95%, 100%);
    @include flex-direction(column);
    text-align: left;
    .title {
      width: 100%;
      height: 40px;
      line-height: 40px;
      @include font-style(16px, #000000);
    }
    .brief {
      @include width-margin(60%, 100%);
      margin-left: 5%;
    }
  }
}
</style>
