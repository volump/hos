<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/hospital-detail' }"
        >医院详情</el-breadcrumb-item
      >
      <el-breadcrumb-item>医院信息</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="out-box">
      <div class="title-button">
        <span class="title">医院详情：</span>
        <el-button
          type="primary"
          size="small"
          icon="el-icon-edit"
          class="button"
          @click="toEditHospital()"
          >编辑</el-button
        >
      </div>
      <div class="info-picture-box">
        <div class="info-out-box">
          <div class="info-in-box">
            <span class="title">编号：</span>
            <span class="gray-text">{{ tempData.id }}</span>
          </div>
          <div class="info-in-box">
            <span class="title">名称：</span>
            <span class="gray-text">{{ tempData.name }}</span>
          </div>
          <div class="info-in-box">
            <span class="title">地点：</span>
            <span class="gray-text">{{ tempData.address }}</span>
          </div>
          <div class="info-in-box">
            <span class="title">电话：</span>
            <span class="gray-text">{{ tempData.phone }}</span>
          </div>
        </div>
        <img :src="tempData.picture" class="picture-box" />
      </div>
      <div class="brief-box">
        <span class="title">简介：</span>
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="tempData.description"
          class="brief"
          maxlength="1000"
          show-word-limit
          :autosize="{ minRows: 2, maxRows: 8 }"
        >
        </el-input>
      </div>
      <el-dialog v-model="dialogFormVisible" title="编辑医院">
        <el-form :model="formData" :rules="rules" ref="hospitalForm">
          <el-form-item label="医院电话" prop="phone">
            <el-input v-model="formData.phone" placeholder="请输入医院电话" />
          </el-form-item>
          <el-form-item label="医院地址" prop="address">
            <el-input
              v-model="formData.address"
              placeholder="请输入医院地址"
              type=""
            />
          </el-form-item>
          <el-form-item label="医院简介" prop="description">
            <el-input
              v-model="formData.description"
              placeholder="请输入医院简介"
            />
          </el-form-item>
          <el-form-item label="医院照片"> </el-form-item>
        </el-form>
        <div style="display: inline-block" class="picture-box">
          <div style="float: left; height: 150px; width: 150px">
            <el-image
              :src="formData.picture"
              style="height:100% width:100%"
            ></el-image>
          </div>
          <!-- <div style="float;margin-left:170px">
          <img src="../../assets/change.png">
       </div> -->
          <div style="float: left; margin-left: 100px">
            <el-upload
              action="#"
              list-type="picture-card"
              :auto-upload="false"
              :file-list="fileList"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-change="handlePhoto"
              :class="{ hide: hideUpload }"
              v-loading.fullscreen.lock="fullscreenLoading"
            >
              <i class="el-icon-plus"></i>
              <el-icon><Plus /></el-icon>
            </el-upload>
          </div>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button>取消</el-button>
            <el-button type="primary" @click="submitForm(hospitalForm)"
              >确认</el-button
            >
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>
<script setup>
import { Plus } from '@element-plus/icons'
import { reactive, toRefs } from 'vue'
import { tips } from '../../utils/notify.js'
import { updateHospital } from '../../api/hospital.js'
import axios from 'axios'
import { getToken } from '../../utils/auth'

const data = reactive({
  formData: {
    address: '',
    description: '',
    phone: '',
    picture: ''
  },
  raw: '',
  imgUrl: '',
  imgFile: {},
  dialogVisible: false,
  statusName: '',
  hideUpload: false,
  fileList: [],
  fullscreenLoading: false, // 进行整个屏幕的加载的
  isValidate: true, // 用作表单的验证
  dialogFormVisible: false,
  rules: {
    name: [{ required: true, message: '此项为必填', trigger: 'blur' }]
  }
})

const handlePhoto = (file, fileList) => {
  console.log(file.raw)
  data.raw = file.raw
  data.imgFile = file
  data.hideUpload = fileList.length >= 1
}
// 删除上传的照片
const handleRemove = (file, fileList) => {
  if (fileList.length === 0) {
    data.fileList = []
  } else {
    let dl = data.fileList.indexOf(file)
    data.fileList.splice(dl, 1)
  }
  data.hideUpload = fileList.length >= 1
}
const handlePictureCardPreview = (file) => {
  data.imgUrl = file.url
  data.dialogVisible = true
}

const tempData = JSON.parse(window.sessionStorage.getItem('hospitalInfo'))
//data.hospitalData=tempData
const toEditHospital = () => {
  ;(data.dialogFormVisible = true), (data.formData = tempData)
}

const submitForm = (formEl) => {
  formEl
    .validate((res) => {
      if (!res) {
        return
      }
      //提交修改
      uploadPhoto()
    })
    .catch(() => {
      tips('error', '医院修改失败')
    })
}

const uploadPhoto = () => {
  const url = 'http://localhost:8080/hospital/picture/upload'
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: getToken()
    }
  }
  var param = new FormData()
  // 将图片加入formdata
  param.append('file', data.raw)
  console.log(param.get('file'))
  axios.post(url, param, config).then((res) => {
    if (res.data.code === 200) {
      data.imgUrl = res.data.data
      //tips('success', '图片添加成功')
      data.formData.picture = data.imgUrl
      //修改医院
      updateHospital(tempData.id, data.formData).then((res) => {
        if (res.code === 200) {
          console.log(res)
          data.dialogFormVisible = false
          data.formData = {
            address: '',
            description: '',
            name: '',
            phone: '',
            picture: ''
          }
        }
        tips('success', '医院修改成功')
      })
    }
  })
}
//方法初始化
const { hospitalForm, formData, fileList, dialogFormVisible } = toRefs(data)
</script>

<style scoped lang="scss">
@import '../.././common/scss/common.scss';
.out-box {
  @include width-margin(90%, 100%);
  @include flex-direction(column);
  margin-top: 20px;
  // 上面的标题和按钮
  .top-title {
    @include font-style(18px, $major-blue-color);
    margin-right: 40px;
    display: flex;
    align-items: center;
  }
  // 中间的信息
  .info-picture-box {
    @include width-margin(100%, 100%);
    @include flex-direction(row);
    margin-top: 20px;
    .info-out-box {
      width: 50%;
      height: 100%;
    }
    .picture-box {
      width: 50%;
      height: 100%;
      @include flex-direction(row);
      justify-content: center;
      align-items: center;
      // .picture {
      //   width: 30%;
      //   //height: 40px;
      //   //margin-right: 30px;
      // }
      .change-icon {
        @include icon-style(70px, 70px);
        margin-right: 30px;
      }
    }
    .picture {
      width: 40px;
      //height: 40px;
      //margin-right: 30px;
    }
  }

  // 底部的简介
  .brief-box {
    @include width-margin(100%, 100%);
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

.hide .el-upload--picture-card {
  display: none;
}
</style>
