<template>
  <div>
    <!-- 面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>出诊详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="page_content">
      <!-- 表格
          el-table 的   data:要展示的数据数组
          el-table-column: 列 prop每长数据的对应属性
      -->
      <el-table :data="ThisWeek" style="width: 100%" class="out-box">
        <el-table-column label="本周出诊详情" align="center">
          <el-table-column prop="ID" label="编号" width="180" />
          <el-table-column prop="date" label="日期" width="180" />
          <el-table-column prop="time" label="时间" width="250" />
          <el-table-column prop="hospital" label="医院" width="180" />
          <el-table-column prop="department" label="专科/门诊" width="200" />
          <el-table-column prop="treatRoom" label="诊室" width="270" />
        </el-table-column>
      </el-table>

      <el-table
        :data="NextWeek"
        class="next-box"
        style="width: 100%"
        title="safsdfs"
      >
        <el-table-column label="下周出诊详情" align="center">
          <el-table-column prop="ID" label="编号" width="180" />
          <el-table-column prop="date" label="日期" width="180" />
          <el-table-column prop="time" label="时间" width="250" />
          <el-table-column prop="hospital" label="医院" width="180" />
          <el-table-column prop="department" label="专科/门诊" width="200" />
          <el-table-column prop="treatRoom" label="诊室 " width="270" />
        </el-table-column>
      </el-table>
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
        <el-form-item label="医院图片" prop="picture">
          <el-input v-model="formData.picture" placeholder="请输入医院图片" />
        </el-form-item>
      </el-form>
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
import { reactive, toRefs } from '@vue/reactivity'
import { dateFormYMD } from '@/common/js/dateFormYMD'
import { getTreatRoomById } from '../../api/treatRoom.js'
import { outCallTime } from '../../common/js/timeFilters'
import { getVisitPlanList } from '../../api/doctor.js'
import { getCookie } from '../../utils/cookies'
import { tips } from '../../utils/notify.js'
import { getWeek, dateForm } from '@/common/js/visitPlanData'

const data = reactive({
  ThisWeek: [],
  NextWeek: []
})
//搜索下周
const searchNextAppointment = (id, item, item2, info) => {
  getTreatRoomById(id)
    .then((res) => {
      if (res.code === 200) {
        data.NextWeek.push({
          ID: item2.id,
          date: dateFormYMD(item2.day),
          time: outCallTime(item2.time),
          hospital: item.info.name,
          department: info.specialName + '/' + info.outpatientName,
          treatRoom: res.data.address
        })
      }
    })
    .catch(() => {
      tips('error', '获取诊室信息失败')
    })
}
//搜索本周
const searchThisAppointment = (id, item, item2, info) => {
  getTreatRoomById(id)
    .then((res) => {
      if (res.code === 200) {
        data.ThisWeek.push({
          ID: item2.id,
          date: dateFormYMD(item2.day),
          time: outCallTime(item2.time),
          hospital: item.info.name,
          department: info.specialName + '/' + info.outpatientName,
          treatRoom: res.data.address
        })
      }
    })
    .catch(() => {
      tips('error', '获取诊室信息失败')
    })
}
//数据下周展示
const searchVisitPlanNextWeek = (date) => {
  let week = getWeek(date)
  let sunday = dateForm(week.sunday)
  let saturday = dateForm(week.saturday)
  getVisitPlanList(getCookie('username'), sunday, saturday)
    .then((res) => {
      if (res.code === 200) {
        const data = res.data.planListDTOList
        data.forEach(function (item) {
          item.planResiduesDTOList.forEach(function (item2) {
            searchNextAppointment(
              item2.clinicId,
              item,
              item2,
              res.data.doctorDTO
            )
          })
        })
      }
    })
    .catch(() => {
      tips('error', '获取出诊计划失败')
    })
}
//数据本周展示
const searchVisitPlanThisWeek = (date) => {
  let week = getWeek(date)
  let sunday = dateForm(week.sunday)
  let saturday = dateForm(week.saturday)
  getVisitPlanList(getCookie('username'), sunday, saturday)
    .then((res) => {
      if (res.code === 200) {
        const data = res.data.planListDTOList
        data.forEach(function (item) {
          item.planResiduesDTOList.forEach(function (item2) {
            searchThisAppointment(
              item2.clinicId,
              item,
              item2,
              res.data.doctorDTO
            )
          })
        })
      }
    })
    .catch(() => {
      tips('error', '获取出诊计划失败')
    })
}
//方法初始化
let currentDate = new Date()
let nextWeek = new Date()
let date = currentDate.getDate()
nextWeek.setDate(date + 7) // 下周对应的日期
//分别展示
searchVisitPlanThisWeek(currentDate) // 获取本周的出诊计划
searchVisitPlanNextWeek(nextWeek)
//使用toRefs解构，否则组件中的数据无法正常显示
const { ThisWeek, NextWeek, dialogFormVisible } = toRefs(data)
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
.next-box {
  margin-top: 10%;
}
.out-box {
  @include width-margin(95%, auto);
  text-align: left;
}
</style>
