<template>
  <div>
    <!-- 面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/department-schedule' }"
        >科室排班</el-breadcrumb-item
      >
      <el-breadcrumb-item>门诊排班</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="page_content">
      <div class="flex">
        <span class="title">医院：</span>
        <el-select
          v-model="selectID"
          placeholder="请选择"
          @change="selectDepartment(selectID)"
        >
          <el-option
            v-for="item in hospitalData"
            :key="item.departmentID"
            :label="item.name"
            :value="item.departmentID"
          >
          </el-option>
        </el-select>
        <span class="title">科室：</span>
        <el-select
          v-model="selectDepartmentID"
          placeholder="请选择"
          @change="selectRoom(selectDepartmentID)"
        >
          <el-option
            v-for="item in departmentData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <el-button type="primary" @click="addDepartToHos">添加</el-button>
      </div>
      <el-table :data="consultationRoomList" style="width: 100%">
        <el-table-column prop="id" label="编号" width="180" />
        <el-table-column prop="name" label="科室名称" width="180" />
        <el-table-column label="操作" width="300">
          <template #default="scope">
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
    <el-dialog v-model="dialogFormVisible" title="添加门诊">
      <el-form>
        <el-form-item label="门诊名称：" label-width="120px">
          <el-select v-model="selectRoomID" placeholder="请选择">
            <el-option
              v-for="item in roomData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="quxiao">取消</el-button>
          <el-button type="primary" @click="submitForm()">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, toRefs } from '@vue/reactivity'
import { getHospitalInfo } from '../../api/hospital.js'
import { getDoctorDepartmentList } from '../../api/departmentSetUp.js'
import {
  getOutpatientByHospital,
  getOutpatientListById,
  addOutpatientToHospital,
  deleteOutpatientFromHospital
} from '../../api/outpatient.js'
import { tips } from '../../utils/notify.js'

const data = reactive({
  searchParams: {
    query: '',
    pageNum: 1,
    pageSize: 50,
    total: 0
  },
  selectDepartmentID: '', //选择的科室ID
  selectID: '', //选择的医院ID
  selectRoomID: '', //选择诊室ID
  roomData: [], //诊室列表
  hospitalData: [], //医院列表
  departmentData: [], //科室列表
  consultationRoomList: [], //页面显示数据
  dialogFormVisible: false
})
const updataSelectDepartment = (id) => {
  //更新科室数组
  data.departmentData = []
  getDoctorDepartmentList(id, 1, 50).then((res) => {
    if (res.code === 200 && res.data.list.length > 0) {
      const temdata = res.data.list
      temdata.forEach(function (item) {
        data.departmentData.push({
          id: item.id,
          name: item.name
        })
      })
    }
  })
}
//初始化数据
const searchList = () => {
  data.hospitalData = []
  const tempeData = JSON.parse(window.sessionStorage.getItem('hDepartmentInfo'))
  const tempHospitalId = JSON.parse(window.sessionStorage.getItem('hospitalID'))
  getHospitalInfo(1, 50, '').then((res) => {
    //初始化医院数组
    if (res.code === 200) {
      const temdata = res.data.list
      temdata.forEach(function (item) {
        data.hospitalData.push({
          departmentID: item.id,
          name: item.name
        })
      })
    }
  })
  data.selectID = tempHospitalId
  updataSelectDepartment(data.selectID)
  data.selectDepartmentID = tempeData.id
  //console.log(data.selectID, data.selectDepartmentID)
  displayData()
}
//数据显示
const displayData = () => {
  data.roomData = [] //每次清空
  getOutpatientListById(1, 50, data.selectDepartmentID).then((res) => {
    //初始化诊室数组
    if (res.code === 200) {
      const temdata = res.data.list
      temdata.forEach(function (item) {
        data.roomData.push({
          id: item.id,
          name: item.name,
          disabled: false
        })
      })
    }
  })
  getOutpatientByHospital(
    data.selectID,
    data.selectDepartmentID,
    data.searchParams.pageNum,
    data.searchParams.pageSize
  ).then((res) => {
    if (res.data) {
      data.consultationRoomList = res.data.list
      if (data.searchParams.total === 0)
        data.searchParams.total = res.data.list.length
    }
  })
}
//下拉框修改函数
const selectDepartment = (id) => {
  //医院
  data.selectID = id
  updataSelectDepartment(data.selectID)
  data.selectDepartmentID = ''
  displayData()
}
const selectRoom = (id) => {
  //科室
  data.selectDepartmentID = id
  displayData()
}
const handleSizeChange = (pageSize) => {
  data.searchParams.pageNum = 1
  data.searchParams.pageSize = pageSize
  displayData()
}
const handleCurrentChange = (pageNum) => {
  data.searchParams.pageNum = pageNum
  displayData()
}
//添加
const addDepartToHos = () => {
  data.dialogFormVisible = true
  data.roomData.forEach(function (item) {
    if (data.consultationRoomList.length > 0) {
      data.consultationRoomList.forEach(function (item2) {
        if (item2.id === item.id) {
          item.disabled = true
        }
      })
    }
  })
}
//取消
const quxiao = () => {
  data.dialogFormVisible = false
}

//提交表单
const submitForm = () => {
  const tempData = {
    outpatientId: data.selectRoomID,
    hospitalId: data.selectID
  }
  addOutpatientToHospital(tempData)
    .then((res) => {
      if (res.code === 200) {
        data.dialogFormVisible = false //隐藏弹出框
        data.roomData.forEach(function (item) {
          //把选中的置为不可选
          if (data.selectDepartmentID === item.id) {
            item.disabled = false
          }
        })
        data.selectRoomID = ''

        displayData()
      }
      tips('success', '添加成功')
    })
    .catch(() => {
      tips('error', '添加失败')
    })
}
//删除
const deleteRow = (row) => {
  deleteOutpatientFromHospital(data.selectID, row.id)
    .then((res) => {
      if (res.code === 200) {
        displayData()
      }
      tips('success', '删除成功')
    })
    .catch(() => {
      tips('error', '删除失败')
    })
}

//方法初始化
const {
  searchParams,
  consultationRoomList,
  dialogFormVisible,
  selectRoomID,
  roomData,
  hospitalData,
  departmentData,
  selectDepartmentID,
  selectID
} = toRefs(data)
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
