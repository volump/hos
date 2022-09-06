<template>
  <div>
    <!-- 面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>科室排班</el-breadcrumb-item>
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
        <el-button type="primary" @click="addDepartToHos">添加</el-button>
      </div>
      <!-- 表格
          el-table 的   data:要展示的数据数组
          el-table-column: 列 prop每长数据的对应属性
      -->
      <el-table :data="consultationRoomList" style="width: 100%">
        <el-table-column prop="id" label="编号" width="180" />
        <el-table-column prop="name" label="科室名称" width="180" />
        <el-table-column label="操作" width="300">
          <template #default="scope">
            <el-button type="primary" @click="seeDepartment(scope.row)"
              >查看门诊</el-button
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
    <el-dialog v-model="dialogFormVisible" title="添加专科">
      <el-form>
        <el-form-item label="专科名称：" label-width="120px">
          <el-select v-model="selectDepartmentID" placeholder="请选择">
            <el-option
              v-for="item in departmentData"
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
import {
  getDoctorDepartmentList,
  deleteDepartmentFromHospital,
  addDepartmentToHospital
} from '../../api/departmentSetUp.js'
import { useRouter } from 'vue-router'
import { tips } from '../../utils/notify.js'

let router = useRouter()
const data = reactive({
  searchParams: {
    query: '',
    pageNum: 1,
    pageSize: 50,
    total: 0
  },
  selectDepartmentID: '', //被选择的科室ID
  selectID: '', //下拉框数据
  hospitalData: [], //医院下拉框数据
  departmentData: [], //科室数据
  consultationRoomList: [], //表单数据
  dialogFormVisible: false //弹出框是否显示
})

//展示数据
const displayOutpatient = () => {
  getHospitalInfo(1, 50, '').then((res) => {
    //获取医院列表
    if (res.code === 200 && res.data.list.length > 0) {
      const temdata = res.data.list
      temdata.forEach(function (item) {
        data.hospitalData.push({
          departmentID: item.id,
          name: item.name
        })
      })
    }
  })
  getDoctorDepartmentList(
    //获取科室列表
    data.selectID,
    data.searchParams.pageNum,
    data.searchParams.pageSize
  ).then((res) => {
    if (res.data) {
      res.data.list.forEach(function (item) {
        data.departmentData.push({
          id: item.id,
          name: item.name,
          disabled: false
        })
      })
    }
  })
}

//数据显示
const searchList = () => {
  getDoctorDepartmentList(
    data.selectID,
    data.searchParams.pageNum,
    data.searchParams.pageSize
  ).then((res) => {
    if (res.data) {
      //console.log('用户数据', res)
      data.consultationRoomList = res.data.list
      if (data.searchParams.total === 0)
        data.searchParams.total = res.data.list.length
    }
  })
}
//下拉框修改函数
const selectDepartment = (id) => {
  //console.log(id)
  data.selectID = id
  searchList() //刷新数据
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
const addDepartToHos = () => {
  data.dialogFormVisible = true //弹窗显示
  data.departmentData.forEach(function (item) {
    //医院已有科室不能被选中
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
    specialId: data.selectDepartmentID,
    hospitalId: data.selectID
  }
  addDepartmentToHospital(tempData)
    .then((res) => {
      if (res.code === 200) {
        data.dialogFormVisible = false //隐藏弹出框
        data.departmentData.forEach(function (item) {
          //把选中的置为不可选
          if (data.selectDepartmentID === item.id) {
            item.disabled = false
          }
        })
        data.selectDepartmentID = ''
        searchList()
      }
      tips('success', '添加成功')
    })
    .catch(() => {
      tips('error', '添加失败')
    })
}
//查看详情
const seeDepartment = (row) => {
  if (data.selectID != '') {
    const hDepartmentData = JSON.stringify(row)
    window.sessionStorage.setItem('hDepartmentInfo', hDepartmentData)
    window.sessionStorage.setItem('hospitalID', data.selectID)
    router.push({
      path: '/departmentAddRoom'
    })
  } else tips('error', '请先选择医院')
}

//删除
const deleteRow = (row) => {
  deleteDepartmentFromHospital(data.selectID, row.id)
    .then((res) => {
      if (res.code === 200) {
        searchList()
      }
      tips('success', '删除成功')
    })
    .catch(() => {
      tips('error', '删除失败')
    })
}

//方法初始化
displayOutpatient()
searchList()

const {
  hospitalData,
  consultationRoomList,
  departmentData,
  dialogFormVisible,
  selectID,
  searchParams,
  selectDepartmentID
} = toRefs(data)
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
