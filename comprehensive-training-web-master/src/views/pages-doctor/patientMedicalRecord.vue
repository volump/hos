<!--医生点击的某个患者的查看时跳进来查看患者以往的病历-->
<template>
  <!--    顶部的个人信息框框-->
  <section class="out-border">
    <div class="top-text">
      <div class="text-box">
        <span>姓名：</span>
        <span class="gray-text">{{ data.patientData.name }}</span>
      </div>
      <div class="text-box">
        <span>就诊卡号：</span>
        <span class="gray-text">{{ data.cardId }}</span>
      </div>
      <div class="text-box">
        <span>就诊医院：</span>
        <span class="gray-text">{{ data.patientData.hospitalName }}</span>
      </div>
    </div>
    <div class="top-text">
      <div class="text-box">
        <span>就诊日期：</span>
        <span class="gray-text"
          >{{ dateFormYMD(data.patientData.day) }} |
          {{ getTreatTimeNoon(data.patientData.time) }}</span
        >
      </div>
      <div class="text-box">
        <span>就诊专科/门诊：</span>
        <span class="gray-text"
          >{{ data.patientData.specialName }} /
          {{ data.patientData.outpatientName }}</span
        >
      </div>
    </div>
  </section>
  <section class="date-button-box">
    <div class="title-text">
      <span class="title">病历：</span>
      <span class="gray-text">
        {{ dateTime(data.patientCase.gmtCreate, 'time') }} 就诊</span
      >
    </div>
    <el-button
      type="primary"
      @click="dialogFormVisible = true"
      v-if="!isTodayCase"
      >添加新病历</el-button
    >
    <el-button
      type="primary"
      @click="dialogUpdateVisible = true"
      v-if="isTodayCase"
      >修改病历</el-button
    >
  </section>
  <section class="out-border">
    <div class="medical-record-out-box">
      <div class="record-text">{{ data.patientCase.content }}</div>
      <div class="doctor-box">
        <span>医生：</span>
        <span class="doctor-name">{{ data.patientData.doctorName }}</span>
      </div>
    </div>
  </section>
  <label
    v-if="data.dataLength === 0"
    style="font-size: 20px; margin-top: 100px; text-align: center"
    >暂无病历</label
  >
  <section class="icon-box">
    <img
      class="img-icon"
      src="../../assets/left-icon.png"
      @click="goLastPage"
    />
    <img
      src="../../assets/right-icon.png"
      class="img-icon"
      @click="goNextPage"
    />
  </section>
  <!--    点击添加新病历弹出的框-->
  <el-dialog title="添加新病历" v-model="dialogFormVisible" width="35%">
    <el-form>
      <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="medicalRecord"
        class="brief"
        maxlength="1000"
        :autosize="{ minRows: 2, maxRows: 6 }"
        show-word-limit
      >
      </el-input>
    </el-form>
    <div class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="addPatientCaseFunction()"
        >确 定</el-button
      >
    </div>
  </el-dialog>

  <!--    修改病历-->
  <el-dialog title="修改病历" v-model="dialogUpdateVisible" width="35%">
    <el-form>
      <!--        <el-form-item label="专科名称：" label-width="120px">-->
      <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="updateCase"
        class="brief"
        maxlength="1000"
        :autosize="{ minRows: 2, maxRows: 6 }"
        show-word-limit
      >
      </el-input>
      <!--        </el-form-item>-->
    </el-form>
    <div class="dialog-footer">
      <el-button @click="dialogUpdateVisible = false">取 消</el-button>
      <el-button type="primary" @click="updatePatientCasefunction()"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script setup>
import {
  getPatientTreatRecord,
  getTreatRecordCase,
  addPatientCase,
  updatePatientCase
} from '../../api/patient.js'
import { reactive, toRefs } from '@vue/reactivity'
import { getCookie } from '../../utils/cookies.js'
import { getTreatTimeNoon, dateTime } from '../../utils/GetInfo.js'
import { tips } from '../../utils/notify.js'
import { dateFormYMD } from '../../common/js/dateFormYMD.js'

const data = reactive({
  dialogFormVisible: false,
  medicalRecord: '',
  cardId: 0,
  patientData: {},
  patientCase: '',
  appointId: 0,
  isTodayCase: false, // 是否已经写了今天的就诊病历
  updateCase: '', // 修改病历
  dialogUpdateVisible: false,
  page: 1,
  dataLength: 0
})
//从上一页面传过来的数据
const tempData = JSON.parse(window.sessionStorage.getItem('appointdata'))

// 上一页
const goLastPage = () => {
  data.page = data.page - 1
  getPatientTreatRecordFunction()
}
// 下一页
const goNextPage = () => {
  data.page = data.page + 1
  getPatientTreatRecordFunction()
}

// 获取患者就诊记录
const getPatientTreatRecordFunction = () => {
  getPatientTreatRecord(data.cardId, data.page, 5)
    .then((res) => {
      console.log(res)
      if (res.code === 200) {
        if (res.data.list !== null) {
          console.log('11111')
          data.dataLength = res.data.list.length
          data.patientData = res.data.list[0]
          getTreatRecordCaseFunction(data.patientData.appointmentId)
        } else {
          console.log('22222')
          tips('error', '暂时没有数据')
        }
      }
    })
    .catch(() => {
      tips('error', '服务出错了')
    })
}
// 获取某次就诊的病历
const getTreatRecordCaseFunction = (appointmentId) => {
  data.appointId = appointmentId
  getTreatRecordCase(data.cardId, appointmentId).then((res) => {
    if (res.code === 200) {
      if (res.data === null) {
        data.patientCase = '无'
      } else {
        data.patientCase = res.data
        if (
          dateFormYMD(res.data.gmtCreate) == dateFormYMD(new Date())
          // &&
          // res.data.doctorId === sessionStorage.getItem('accountID')
        ) {
          data.isTodayCase = true
          data.updateCase = res.data.content
        }
      }
    }
  })
}
// 添加新病历
const addPatientCaseFunction = () => {
  addPatientCase({
    appointmentId: data.appointId,
    cardId: data.cardId,
    content: data.medicalRecord,
    doctorId: getCookie('username')
  })
    .then((res) => {
      if (res.code === 200) {
        tips('success', '添加病历成功')
        data.dialogFormVisible = false
        getPatientTreatRecordFunction()
        getTreatRecordCaseFunction(data.appointId)
      }
    })
    .catch(() => {
      tips('error', '添加病历失败')
    })
}
// 修改病历
const updatePatientCasefunction = () => {
  updatePatientCase(
    data.patientCase.id,
    {
      content: data.updateCase
    },
    data.cardId
  ).then((res) => {
    if (res.code === 200) {
      data.updateCase = ''
      tips('success', '修改病历成功')
      data.dialogUpdateVisible = false
      getTreatRecordCaseFunction(data.appointId)
    }
  })
}
//初始化
data.cardId = tempData.cardId
data.appointId = tempData.appointmentId
getPatientTreatRecordFunction()
const {
  dialogFormVisible,
  medicalRecord,
  isTodayCase,
  dialogUpdateVisible,
  updateCase
} = toRefs(data)
</script>

<style scoped lang="scss">
@import '../../common/scss/common.scss';
.out-border {
  @include width-margin(90%, auto);
  border: 1px solid #bbbbbe;
  border-radius: 6px;
  padding: 10px 0;
  /*顶部的个人信息处*/
  .top-text {
    @include width-margin(90%, 50px);
    line-height: 50px;
    @include flex-direction(row);
    .text-box {
      width: 33%;
      @include font-style(17px, #000000);
      text-align: left;
      .gray-text {
        @include font-style(17px, $gray-text-color);
        margin-left: 10px;
      }
    }
  }
  /*底部的病历*/
  .medical-record-out-box {
    @include width-margin(100%, 250px);
    @include flex-direction(column);
    text-align: left;
    .record-text {
      @include width-margin(95%, 230px);
      text-align: left;
    }
    /*医生签名*/
    .doctor-box {
      margin-left: 20px;
      @include font-style(16px, $major-blue-color);
      text-align: left;
      .doctor-name {
        margin-left: 10px;
        color: $gray-text-color;
      }
    }
  }
}
/*中间的简历日期和添加新按钮的病历*/
.date-button-box {
  @include width-margin(90%, 50px);
  line-height: 50px;
  @include flex-direction(row);
  justify-content: space-between;
  margin-top: 30px;
  .title-text {
    width: 40%;
    @include flex-direction(row);
    .title {
      color: $major-blue-color;
    }
    .grey-text {
      color: $gray-text-color;
      margin-left: 10px;
    }
  }
  .button {
    width: 100px;
    height: 40px;
  }
}
/*底部左右箭头*/
.icon-box {
  @include width-margin(100px, auto);
  display: flex;
  vertical-align: center;
  margin-top: 10px;
  .img-icon {
    @include icon-style(25px, 25px);
    margin-right: 30px;
  }
}
</style>
