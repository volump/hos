<template>
  <div>
    <!-- 面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>医院详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="page_content">
      <div class="flex">
        <div class="input_box">
          <el-input
            v-model="keyword"
            placeholder="请输入医院名称"
            class="input-with-select"
          >
            <template #append>
              <el-button @click="searchListHos" /><el-icon><Search /></el-icon>
            </template>
          </el-input>
        </div>
        <el-button type="primary" @click="addHospitals">添加</el-button>
      </div>
      <!-- 表格
          el-table 的   data:要展示的数据数组
          el-table-column: 列 prop每长数据的对应属性
      -->
      <el-table :data="hospitalList" style="width: 100%">
        <el-table-column prop="id" label="医院ID" width="180" />
        <el-table-column prop="name" label="名称" width="180" />
        <el-table-column prop="address" label="地址" width="300" />
        <el-table-column prop="phone" label="电话" width="180" />
        <el-table-column label="操作" width="180">
          <template #default="scope">
            <el-button type="primary" @click="seeHospital(scope.row)"
              >查看</el-button
            >
            <el-button type="danger" @click="deleteRow(scope.row)"
              >删除</el-button
            >
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:currentPage="searchParams.pageNum"
        v-model:page-size="searchParams.pageSize"
        :page-sizes="[5, 15, 30, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="searchParams.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <!--新增弹窗-->
    <el-dialog v-model="dialogFormVisible" title="新建医院">
      <el-form :model="formData" :rules="rules" ref="hospitalForm">
        <el-form-item label="医院名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入医院名称" />
        </el-form-item>
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
      </el-form>
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
      </el-upload>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="quxiao">取消</el-button>
          <el-button type="primary" @click="submitForm(hospitalForm)"
            >确认</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, toRefs, ref } from '@vue/reactivity'
import {
  getHospitalInfo,
  addHospital,
  deleteHospitalByID
} from '../../api/hospital.js'
import { useRouter } from 'vue-router'
import { Search } from '@element-plus/icons'
import { tips } from '../../utils/notify.js'
import axios from 'axios'
import { getToken } from '../../utils/auth'

let router = useRouter()
const data = reactive({
  keyword: '',
  searchParams: {
    query: '',
    pageNum: 1,
    pageSize: 50,
    total: 0
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
  hospitalList: [],
  dialogFormVisible: false,
  formData: {
    address: '',
    description: '',
    name: '',
    phone: '',
    picture: ''
  },
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

//搜索
const searchListHos = () => {
  getHospitalInfo(
    data.searchParams.pageNum,
    data.searchParams.pageSize,
    data.keyword
  ).then((res) => {
    if (res.data) {
      //console.log('用户数据', res.data)
      data.hospitalList = res.data.list
      console.log(res)
      if (data.searchParams.total === 0)
        data.searchParams.total = res.data.list.length
    }
  })
}

//上传图片
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
      //添加医院
      addHospital(data.formData).then((res) => {
        if (res.code === 200) {
          data.dialogFormVisible = false //隐藏弹出框
          data.formData = {
            address: '',
            description: '',
            name: '',
            phone: '',
            picture: ''
          }
          searchListHos()
        }
        tips('success', '医院添加成功')
      })
    }
  })
}
//添加
const addHospitals = () => {
  data.dialogFormVisible = true
}
//取消
const quxiao = () => {
  data.dialogFormVisible = false
}
const handleSizeChange = (pageSize) => {
  data.searchParams.pageNum = 1
  data.searchParams.pageSize = pageSize
  searchListHos()
}
const handleCurrentChange = (pageNum) => {
  data.searchParams.pageNum = pageNum
  searchListHos()
}
//提交表单
const submitForm = (formEl) => {
  formEl
    .validate((res) => {
      if (!res) {
        return
      }
      uploadPhoto()
      //表单通过
    })
    .catch(() => {
      tips('error', '医院添加失败')
    })
}
//查看医院详情
const seeHospital = (row) => {
  const hospitalData = JSON.stringify(row)
  console.log(row)
  console.log(hospitalData)
  window.sessionStorage.setItem('hospitalInfo', hospitalData)
  window.sessionStorage.setItem('hospitalInfo_2', hospitalData)
  //window.sessionStorage.setItem('hospitalId',row.id)
  router.push({
    path: '/hospital'
  })
}
//删除
const deleteRow = (row) => {
  deleteHospitalByID(row.id)
    .then((res) => {
      if (res.code === 200) {
        searchListHos()
      }
      tips('success', '医院删除成功')
    })
    .catch(() => {
      tips('error', '医院删除失败')
    })
}

//方法初始化
const {
  keyword,
  searchParams,
  dialogFormVisible,
  fileList,
  hospitalList,
  formData,
  rules,
  hideUpload,
  fullscreenLoading
} = toRefs(data)
searchListHos()
const hospitalForm = ref()
</script>
<style scoped>
.input_box {
  width: 300px;
  margin-right: 15px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
