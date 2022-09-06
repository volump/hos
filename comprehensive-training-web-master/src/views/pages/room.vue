<template>
  <div>
    <!-- 面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: 'department-detail' }"
        >科室详情</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/department' }"
        >科室门诊详情</el-breadcrumb-item
      >
      <el-breadcrumb-item>科室门诊地址</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="page_content">
      <div class="flex">
        <span class="title">门诊名称：</span>
        <span :data="roomName"></span>
        <!-- 表格
          el-table 的   data:要展示的数据数组
          el-table-column: 列 prop每长数据的对应属性
      -->
        <el-button type="primary" @click="addRooms">添加</el-button>
      </div>
      <el-table :data="roomList" style="width: 100%">
        <el-table-column prop="id" label="诊室ID" width="300" />
        <el-table-column prop="address" label="地址" width="300" />
        <el-table-column label="操作" width="400">
          <template #default="scope">
            <el-button type="success" @click="toEditRow(scope.row)"
              >编辑</el-button
            >
            <el-button type="danger" @click="deleteRow(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="searchParams.pageNum"
        v-model:page-size="searchParams.pageSize"
        :page-sizes="[5, 15, 30, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="searchParams.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!--新增弹窗-->
    <el-dialog v-model="dialogFormVisible">
      <span :title="titleName" class="titleStyle">{{ titleName }}</span>
      <el-form :model="formData" ref="departmentForm">
        <el-form-item label="地址" prop="address">
          <el-input v-model="formData.address" placeholder="请输入门诊地址" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="quxiao">取消</el-button>
          <el-button type="primary" @click="submitForm(departmentForm)"
            >确认</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, toRefs } from '@vue/reactivity'
import {
  addTreatRoom,
  getTreatRoom,
  updateTreatRoom,
  deleteTreatRoom
} from '../../api/treatRoom'
import { tips } from '../../utils/notify.js'

const data = reactive({
  searchParams: {
    pageNum: 1,
    pageSize: 50,
    total: 0
  },
  titleName: '',
  roomName: '',
  outpatientId: '',
  roomList: [],
  dialogFormVisible: false,
  formData: {
    outpatientId: '',
    address: '',
    id: ''
  },
  types: ''
})
//从上一页面传过来的数据
const tempData = JSON.parse(window.sessionStorage.getItem('roomInfo'))

//搜索
const searchList = () => {
  getTreatRoom(
    tempData.id,
    data.searchParams.pageNum,
    data.searchParams.pageSize
  ).then((res) => {
    if (res.data) {
      console.log('用户数据', res)
      data.roomList = res.data.list
      if (data.searchParams.total === 0)
        data.searchParams.total = res.data.list.length
    }
  })
  data.roomName = tempData.name
  data.formData.outpatientId = tempData.id
}
//下拉框修改函数

//添加
const addRooms = () => {
  data.dialogFormVisible = true
  data.types = 0
  data.titleName = '新建'
}
const handleSizeChange = (pageSize) => {
  data.searchParams.pageNum = 1
  data.searchParams.pageSize = pageSize
  searchList()
}
const handleCurrentChange = (pageNum) => {
  data.searchParams.pageNum = pageNum
  searchList()
}

//取消
const quxiao = () => {
  data.dialogFormVisible = false
}
//提交表单
const submitForm = (formEl) => {
  formEl
    .validate((res) => {
      if (!res) {
        return
      }
      //表单通过
      if (data.types === 0) {
        addTreatRoom(data.formData).then((res) => {
          if (res.code === 200) {
            data.dialogFormVisible = false //隐藏弹出框
            data.formData = {
              address: ''
            }
            searchList()
          }
          tips('success', '诊室添加成功')
        })
      } else if (data.types === 1) {
        console.log(data.formData.id)
        updateTreatRoom(data.formData.id, data.formData).then((res) => {
          if (res.code === 200) {
            data.dialogFormVisible = false //隐藏弹出框
            data.formData = {
              name: ''
            }
            searchList()
          }
          tips('success', '诊室修改成功')
        })
      }
      //alert('通过')
    })
    .catch(() => {
      tips('error', '失败')
    })
}
//编辑
const toEditRow = (row) => {
  data.formData.address = row.address
  data.formData.id = row.id
  console.log(data.formData.id)
  data.dialogFormVisible = true
  data.types = 1
  data.titleName = '更新'
}
//删除
const deleteRow = (row) => {
  deleteTreatRoom(row.id)
    .then((res) => {
      if (res.code === 200) {
        searchList()
      }
      tips('success', '诊室删除成功')
    })
    .catch(() => {
      tips('error', '诊室删除失败')
    })
}

//方法初始化
const { departmentForm, searchParams, roomList, dialogFormVisible, formData } =
  toRefs(data)
searchList()
</script>
<style scoped>
.input_box {
  width: 300px;
  margin-right: 15px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
.titleStyle {
  font-weight: bold;
  font-size: 20px;
  line-height: 5em;
}
</style>
