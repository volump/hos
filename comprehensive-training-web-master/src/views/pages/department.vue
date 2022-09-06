<template>
  <div>
    <!-- 面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: 'department-detail' }"
        >科室详情</el-breadcrumb-item
      >
      <el-breadcrumb-item>科室门诊详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="page_content">
      <div class="flex">
        <span class="title">专科：</span>
        <el-select
          v-model="selectID"
          placeholder="请选择"
          @change="selectDepartment(selectID)"
        >
          <el-option
            v-for="item in departmentData"
            :key="item.departmentID"
            :label="item.name"
            :value="item.departmentID"
          >
          </el-option>
        </el-select>
        <el-button type="primary" @click="addDepartConsultation"
          >添加</el-button
        >
      </div>
      <!-- 表格
          el-table 的   data:要展示的数据数组
          el-table-column: 列 prop每长数据的对应属性
      -->
      <el-table :data="consultationRoomList" style="width: 100%">
        <el-table-column prop="id" label="门诊ID" width="180" />
        <el-table-column prop="name" label="门诊名称" width="180" />
        <el-table-column prop="gmtCreate" label="创建时间" width="180" />
        <el-table-column label="操作" width="300">
          <template #default="scope">
            <el-button type="primary" @click="seeRoom(scope.row)"
              >查看诊室</el-button
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
        <el-form-item label="门诊名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入门诊名称" />
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
import { getDepartmentList } from '../../api/department.js'
import {
  getOutpatientListById,
  addOutpatient,
  updateOutpatient,
  deleteOutpatient
} from '../../api/outpatient.js'
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
  selectID: '', //下拉框数据
  departmentData: [], //下拉框数据
  consultationRoomList: [],
  dialogFormVisible: false,
  formData: {
    name: '',
    id: '',
    specialId: ''
  },
  rules: {
    //规则
    name: [{ required: true, message: '此项为必填', trigger: 'blur' }]
  },
  types: ''
})

//展示数据
const displayOutpatient = () => {
  //从上一页面传过来的数据
  const tempData = JSON.parse(window.sessionStorage.getItem('departmentInfo'))
  data.selectID = tempData.id
  getDepartmentList(1, 50, '').then((res) => {
    if (res.code === 200 && res.data.list.length > 0) {
      const temdata = res.data.list
      console.log(temdata)
      temdata.forEach(function (item) {
        data.departmentData.push({
          departmentID: item.id,
          name: item.name
        })
      })
    }
  })
  //console.log(data.departmentData)
}

//搜索
const searchList = () => {
  getOutpatientListById(
    data.searchParams.pageNum,
    data.searchParams.pageSize,
    data.selectID
  ).then((res) => {
    if (res.data) {
      console.log('用户数据', res)
      data.consultationRoomList = res.data.list
      if (data.searchParams.total === 0)
        data.searchParams.total = res.data.list.length
    }
  })
}
//下拉框修改函数
const selectDepartment = (id) => {
  console.log(id)
  data.selectID = id
  searchList()
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
//添加
const addDepartConsultation = () => {
  data.dialogFormVisible = true
  data.types = 0
  data.formData.specialId = data.selectID
  data.titleName = '新建门诊'
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
        addOutpatient(data.formData).then((res) => {
          if (res.code === 200) {
            data.dialogFormVisible = false //隐藏弹出框
            data.formData = {
              name: ''
            }
            searchList()
          }
          tips('success', '科室门诊添加成功')
        })
      } else if (data.types === 1) {
        updateOutpatient(data.formData.id, data.formData).then((res) => {
          if (res.code === 200) {
            data.dialogFormVisible = false //隐藏弹出框
            data.formData = {
              name: ''
            }
            searchList()
          }
          tips('success', '科室门诊修改成功')
        })
      }
      //alert('通过')
    })
    .catch(() => {
      tips('error', '失败')
    })
}
//查看详情
const seeRoom = (row) => {
  const roomData = JSON.stringify(row)

  window.sessionStorage.setItem('roomInfo', roomData)
  //window.sessionStorage.setItem('hospitalId',row.id)
  router.push({
    path: '/room'
  })
}

//编辑
const toEditRow = (row) => {
  data.formData.name = row.name
  data.formData.id = row.id
  data.dialogFormVisible = true
  data.types = 1
  data.formData.specialId = data.selectID //需要传入科室ID
  data.titleName = '更新门诊'
}

//删除
const deleteRow = (row) => {
  deleteOutpatient(row.id)
    .then((res) => {
      if (res.code === 200) {
        searchList()
      }
      tips('success', '科室门诊删除成功')
    })
    .catch(() => {
      tips('error', '删除失败')
    })
}

//方法初始化
const {
  departmentForm,
  searchParams,
  departmentData,
  consultationRoomList,
  dialogFormVisible,
  formData,
  selectID
} = toRefs(data)
displayOutpatient()
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
