<template>
  <div>
    <!-- 面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>科室详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="page_content">
      <div class="flex">
        <div class="input_box">
          <el-input
            v-model="keyword"
            placeholder="请输入科室名称"
            class="input-with-select"
          >
            <template #append>
              <el-button @click="searchList" /><el-icon><Search /></el-icon>
            </template>
          </el-input>
        </div>
        <el-button type="primary" @click="addDepartments">添加</el-button>
      </div>
      <!-- 表格
          el-table 的   data:要展示的数据数组
          el-table-column: 列 prop每长数据的对应属性
      -->
      <el-table :data="departmentList" style="width: 100%">
        <el-table-column prop="id" label="编号" width="180" />
        <el-table-column prop="name" label="名称" width="180" />
        <el-table-column prop="description" label="描述" width="300" />
        <el-table-column label="操作" width="300">
          <template #default="scope">
            <el-button type="primary" @click="seeDepartment(scope.row)"
              >查看</el-button
            >
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
      <sapn :title="titleName" class="titleStyle">{{ titleName }}</sapn>
      <el-form :model="formData" :rules="rules" ref="departmentForm">
        <el-form-item label="科室名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入科室名称" />
        </el-form-item>
        <el-form-item label="科室描述" prop="description">
          <el-input
            v-model="formData.description"
            placeholder="请输入科室简介"
          />
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
import { reactive, toRefs, ref } from '@vue/reactivity'
import {
  getDepartmentList,
  addDepartment,
  deleteDepartmentByID,
  updateDepartment
} from '../../api/department.js'
import { Search } from '@element-plus/icons'
import { useRouter } from 'vue-router'
import { tips } from '../../utils/notify.js'

let router = useRouter()
const data = reactive({
  keyword: '',
  searchParams: {
    query: '',
    pageNum: 1,
    pageSize: 50,
    total: 0
  },
  titleName: '',
  departmentList: [],
  dialogFormVisible: false,
  formData: {
    description: '',
    name: '',
    id: ''
  },
  rules: {
    //规则
    name: [{ required: true, message: '此项为必填', trigger: 'blur' }]
  },
  types: ''
})
//搜索
const searchList = () => {
  getDepartmentList(
    data.searchParams.pageNum,
    data.searchParams.pageSize,
    data.keyword
  ).then((res) => {
    if (res.data) {
      //console.log('用户数据', res)
      data.departmentList = res.data.list
      if (data.searchParams.total === 0)
        data.searchParams.total = res.data.list.length
    }
  })
}
//添加
const addDepartments = () => {
  data.dialogFormVisible = true
  data.types = 0
  data.titleName = '添加科室'
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
        addDepartment(data.formData).then((res) => {
          if (res.code === 200) {
            data.dialogFormVisible = false //隐藏弹出框
            data.formData = {
              description: '',
              name: ''
            }
            searchList()
          }
          tips('success', '科室添加成功')
        })
      } else if (data.types === 1) {
        updateDepartment(data.formData.id, data.formData).then((res) => {
          if (res.code === 200) {
            data.dialogFormVisible = false //隐藏弹出框
            searchList()
          }
          tips('success', '科室修改成功')
        })
      }
      //alert('通过')
    })
    .catch(() => {
      tips('error', '失败')
    })
}
//查看详情
const seeDepartment = (row) => {
  const departmentData = JSON.stringify(row)

  window.sessionStorage.setItem('departmentInfo', departmentData)
  //window.sessionStorage.setItem('hospitalId',row.id)
  router.push({
    path: '/department'
  })
}

//编辑
const toEditRow = (row) => {
  data.formData.name = row.name
  data.formData.description = row.description
  data.formData.id = row.id
  data.dialogFormVisible = true
  data.types = 1
  data.titleName = '更新科室'
}

//删除
const deleteRow = (row) => {
  deleteDepartmentByID(row.id).then((res) => {
    if (res.code === 200) {
      searchList()
    }
    tips('success', '科室删除成功')
  })
}

searchList()
const { departmentList, formData, searchParams, dialogFormVisible, keyword } =
  toRefs(data)
const departmentForm = ref()
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
