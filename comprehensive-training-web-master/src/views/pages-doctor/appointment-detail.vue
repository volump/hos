<template>
  <div>
    <!-- 面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>预约详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!--排班详情-->
    <!--选择数据框-->
    <div class="out-box">
      <div class="top-row-box">
        <div class="info-in-box margin-right">
          <span class="title">选择日期：</span>
          <el-date-picker
            type="date"
            v-model="selectDate"
            placeholder="请选择查询日期"
          >
          </el-date-picker>
        </div>
        <div class="info-in-box margin-right">
          <span class="title">选择时间：</span>
          <el-select
            v-model="selectTimeID"
            placeholder="请选择查询时间"
            @change="selectDepartment(selectTimeID)"
          >
            <el-option
              v-for="item in timeSelectData"
              :key="item.timeID"
              :label="item.time"
              :value="item.timeID"
            >
            </el-option>
          </el-select>
        </div>
        <el-button
          type="primary"
          style="width: 70px; height: 90%"
          @click="displayAppointment"
          >查询</el-button
        >
      </div>
      <div class="button-table-box">
        <span class="treat-room-text"></span>
        <el-table :data="appointmentdata" style="width: 100%">
          <el-table-column prop="appointmentId" label="编号" width="100" />
          <el-table-column prop="queueNum" label="就诊排队号" width="100" />
          <el-table-column prop="cardId" label="就诊卡号" width="120" />
          <el-table-column prop="name" label="姓名" width="120" />
          <el-table-column prop="gender" label="性别" width="100" />
          <el-table-column prop="timePeriod" label="预约时间" width="150" />
          <el-table-column label="操作" width="400">
            <template #default="scope">
              <el-button
                type="primary"
                @click="getPatientDetailByID(scope.row)"
                :disabled="isdisabledSee"
                >查看</el-button
              >
              <el-button
                type="primary"
                @click="getTherapy(scope.row)"
                :disabled="isdisabledTherapy"
                >就诊</el-button
              >
              <el-button
                type="primary"
                @click="callAgain(scope.row)"
                :disabled="isdisabledCall"
                >重新叫号</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-model:current-page="pageList.pageNum"
          v-model:page-size="pageList.pageSize"
          :page-sizes="[5, 15, 30, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageList.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, toRefs } from '@vue/reactivity'
import { dateFormYMD } from '@/common/js/dateFormYMD'
import { getCurrentTime } from '../../utils/CurrentTime.js'
import { getGender } from '../../utils/GetInfo.js'
import { getPatientList } from '../../api/doctor.js'
import {
  updateTreatStatusFinish,
  updateStatusAgain
} from '../../api/patient.js'
import { getCookie } from '../../utils/cookies'
import { tips } from '../../utils/notify.js'
import { useRouter } from 'vue-router'
let router = useRouter()
const data = reactive({
  isdisabledTherapy: '', //就诊按钮是否可选(true不可选，false可选)
  isdisabledCall: '', //重新叫号按钮是否可选(true不可选，false可选)
  isdisabledSee: '', //查看按钮是否可选(true不可选，false可选)
  timeSelectData: [
    {
      timeID: 1,
      time: '08:30~12:00'
    },
    {
      timeID: 2,
      time: '14:00~18:00'
    }
  ],
  pageList: {
    pageNum: 1,
    pageSize: 5,
    total: 0
  },
  statusData: [],
  selectTimeID: '',
  selectDate: new Date(),
  isTimeTreat: false,
  isClickTreat: false,
  //出诊计划表
  // 表格数据显示
  appointmentdata: []
})

// 获取患者挂号列表
const displayAppointment = () => {
  let date = dateFormYMD(data.selectDate)
  getPatientList(
    getCookie('username'),
    date,
    data.selectTimeID,
    data.pageList.pageNum,
    data.pageList.pageSize
  )
    .then((res) => {
      if (res.code === 200) {
        console.log(res)
        if (res.data.list == null) {
          clear()
          tips('error', '暂时没有预约')
        } else {
          if (res.data.list.length !== 0) {
            clear()
            data.appointmentdata = res.data.list
            data.appointmentdata.forEach(function (item) {
              item.gender = getGender(item.gender)
              console.log(item.status)
              if (item.status === 3) {
                console.log(item.status)
                data.isdisabledTherapy = true
                data.isdisabledCall = true
                data.isdisabledSee = false
              } else {
                data.isdisabledSee = true
              }
            })
            data.pageList.total = res.data.list.length
            tips('success', '成功查询数据')
          } else {
            clear()
            tips('error', '没有查询到相关信息')
          }
        }
      }
    })
    .catch(() => {
      if (data.selectTimeID === '') {
        tips('error', '请选择时间段')
      } else if (data.selectDate === '') {
        tips('error', '请选择日期')
      } else {
        tips('error', '服务出错了')
      }
    })
}

//下拉框修改函数
const selectDepartment = (id) => {
  data.selectTimeID = id
}
//分页
const handleSizeChange = (pageSize) => {
  data.pageList.pageNum = 1
  data.pageList.pageSize = pageSize
  displayAppointment()
}
const handleCurrentChange = (pageNum) => {
  data.pageList.pageNum = pageNum
  displayAppointment()
}

//到达医生出诊时间动态的添加就诊按钮和重新叫号按钮
const addTableButton = () => {
  //到时间,可以就诊
  if (data.isTimeTreat) {
    data.isdisabledTherapy = false
    data.isdisabledCall = true
  } else {
    //过了时间，重新叫号
    data.isdisabledTherapy = true
    data.isdisabledCall = false
  }
}

// 用户点击了查看按钮
const getPatientDetailByID = (row) => {
  const appointdata = JSON.stringify(row)
  window.sessionStorage.setItem('appointdata', appointdata)
  router.push({
    path: '/patientMedicalRecord'
  })
}

// 用户点击了就诊按钮
const getTherapy = (row) => {
  updateTreatStatusFinish(row.appointmentId)
    .then((res) => {
      if (res.code === 200) {
        tips('success', '已就诊')
        data.isdisabledTherapy = true
        data.isdisabledSee = false
      } else {
        tips('info', '出错了')
      }
    })
    .catch((res) => {
      console.log(res)
      tips('error', '网络错误')
    })
}

// 用户点击了重新叫号按钮
const callAgain = (row) => {
  // 修改患者状态
  updateStatusAgain(row.appointmentId)
    .then((res) => {
      if (res.code === 200) {
        tips('success', '已重新叫号')
        data.isdisabledCall = true
        data.isdisabledTherapy = false
      }
    })
    .catch(() => {
      tips('error', '重新叫号失败')
    })
}

//清空各个表单为了下次查询重新获取信息（不会保留在select的option上影响选择）
const clear = () => {
  data.appointDate = ''
  data.appointmentdata = []
  data.selectTimeID = ''
  data.selectDate = ''
}
//初始化
getCurrentTime(data)
addTableButton()
displayAppointment()

//使用toRefs解构，否则组件中的数据无法正常显示
const {
  appointmentdata,
  isdisabledTherapy,
  isdisabledCall,
  selectTimeID,
  timeSelectData,
  selectDate,
  pageList,
  isdisabledSee
} = toRefs(data)
//显示日期与具体时间段
</script>
<style lang="scss">
@import '../../common/scss/common.scss';
.out-box {
  @include width-margin(90%, 100%);
  .top-row-box {
    width: 100%;
    height: 100%;
    @include flex-direction(row);
    align-items: center;
    .margin-right {
      margin-right: 30px;
    }
  }
}
.button-table-box {
  @include width-margin(100%, 100%);
  margin-top: 3%;
}
</style>
