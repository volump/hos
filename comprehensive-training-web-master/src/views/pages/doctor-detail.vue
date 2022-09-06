<template>
  <div>
    <!-- 面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>医生详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="page_content">
      <div class="flex">
        <span class="title">科室：</span>
        <el-select
          v-model="selectDepartmentID"
          placeholder="请选择"
          @change="selectSpecial(selectDepartmentID)"
        >
          <el-option
            v-for="item in departmentData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <span class="title">所在门诊：</span>
        <el-select
          v-model="selectRoomID"
          placeholder="请选择"
          @change="selectRoom(selectRoomID)"
        >
          <el-option
            v-for="item in roomData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <el-button type="primary" @click="addDepartToHos">添加</el-button>
      </div>
      <el-table :data="consultationRoomList" style="width: 100%">
        <el-table-column prop="id" label="医生ID" width="120" />
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="gender" label="性别" width="120" />
        <el-table-column prop="jobTitle" label="职称" width="120" />
        <el-table-column prop="specialty" label="简介" width="180" />
        <el-table-column label="操作" width="400">
          <template #default="scope">
            <el-button type="primary" @click="createDoctorRow(scope.row)"
              >创建账号</el-button
            >
            <el-button type="primary" @click="getQrcode(scope.row.id)"
              >绑定微信</el-button
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
      <el-form :model="formData" ref="departmentForm">
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="formData.name"
            placeholder="请输入医生"
            sytle="width: 60px;"
          />
        </el-form-item>
        <el-form-item label="性别" prop="genderID">
          <el-select placeholder="请选择" v-model="formData.genderID">
            <el-option
              v-for="item in genderSelectData"
              :key="item.genderID"
              :label="item.gender"
              :value="item.genderID"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职称" prop="jobTitle">
          <el-select placeholder="请选择" v-model="formData.jobTitle">
            <el-option
              v-for="item in jobTitleData"
              :key="item.jobTitle"
              :label="item.jobTitle"
              :value="item.jobTitle"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属科室：" prop="specialId" label-width="120px">
          <el-select
            v-model="formData.specialId"
            placeholder="请选择"
            @change="selectSpecial(formData.specialId)"
          >
            <el-option
              v-for="item in departmentData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="所属门诊："
          prop="outpatientId"
          label-width="120px"
        >
          <el-select v-model="formData.outpatientId" placeholder="请选择">
            <el-option
              v-for="item in roomData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="简介" prop="specialty">
          <el-input
            type="textarea"
            v-model="formData.specialty"
            placeholder="请输入内容"
            class="brief"
            maxlength="1000"
            :autosize="{ minRows: 2, maxRows: 6 }"
            show-word-limit
          >
          </el-input>
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

    <el-dialog
      v-model="dialogVisible"
      title="扫描二维码"
      :before-close="handleClose"
      width="400px"
    >
      <div>
        <img class="qrcode" :src="qrcode" id="qrCodeImgId" />
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, toRefs } from '@vue/reactivity'
import { getDepartmentList } from '../../api/department.js'
import { getOutpatientListById } from '../../api/outpatient.js'
import {
  getDoctorList,
  addDoctor,
  updateDoctor,
  deleteDoctor,
  createDoctorManager,
  post_doc_openid,
  getOpenidByName
} from '../../api/doctor.js'
import SHA256 from 'js-sha256'
import { tips } from '../../utils/notify.js'
import { getWxqrcode, getOpenid } from '../../api/login'
const data = reactive({
  dialogVisible: false,
  sceneStr_qr: '',
  t: '',
  t1: '',
  imgUrl: '',
  qrcode: '',
  doctorID: '',
  openid_accountid: '',
  openid_userName: '',
  keyword: '',
  searchParams: {
    query: '',
    pageNum: 1,
    pageSize: 50,
    total: 0
  },
  jobTitleData: [
    {
      id: 1,
      jobTitle: '医师'
    },
    {
      id: 2,
      jobTitle: '副主任医师'
    },
    {
      id: 3,
      jobTitle: '主任医师'
    },
    {
      id: 4,
      jobTitle: '教授'
    }
  ],
  genderSelectData: [
    {
      genderID: 1,
      gender: '男'
    },
    {
      genderID: 2,
      gender: '女'
    }
  ],
  account: false,
  selectDepartmentID: '', //选择的科室ID,
  firstRoomID: '',
  selectRoomID: '', //选择诊室ID
  roomData: [], //诊室列表
  departmentData: [], //科室列表
  consultationRoomList: [], //页面显示数据
  dialogFormVisible: false,
  formData: {
    name: '',
    genderID: '',
    jobTitle: '',
    specialId: '',
    outpatientId: '',
    specialty: '',
    id: ''
  },
  type: ''
})

const handleClose = () => {
  data.dialogVisible = false
  clearInterval(data.t1)
}
//初始化数据
const searchList = () => {
  data.departmentData = []
  getDepartmentList(1, 50, '').then((res) => {
    //初始化科室数组
    if (res.code === 200) {
      const temdata = res.data.list
      temdata.forEach(function (item) {
        data.departmentData.push({
          id: item.id,
          name: item.name
        })
      })
    }
  })
  updataSelectRoom()
  displayData()
}
// const first=()=>{
//     data.departmentData
// }
//更新门诊数据
const updataSelectRoom = () => {
  data.roomData = []
  getOutpatientListById(1, 50, data.selectDepartmentID).then((res) => {
    if (res.code === 200 && res.data.list.length > 0) {
      const temdata = res.data.list
      temdata.forEach(function (item) {
        if (item === 0) {
          data.selectRoomID = item.id
        }
        data.roomData.push({
          id: item.id,
          name: item.name
        })
      })
    }
  })
}
//数据显示
const displayData = () => {
  getDoctorList(
    data.selectDepartmentID,
    data.selectRoomID,
    data.searchParams.pageNum,
    data.searchParams.pageSize
  ).then((res) => {
    if (res.data) {
      data.consultationRoomList = res.data.list
      if (data.searchParams.total === 0)
        data.searchParams.total = res.data.list.length
      data.consultationRoomList.forEach(function (item) {
        if (item.gender === 1) item.gender = '男'
        else item.gender = '女'
      })
    }
  })
}

//获取二维码
const getQrcode = (id) => {
  data.doctorID = id
  console.log(data.doctorID)
  getOpenidByName(data.doctorID)
    .then((res) => {
      if (res.code === 200) {
        if (res.data.openid === null) {
          getWxqrcode().then((res) => {
            //如果获取二维码成功
            if (res.code === 200) {
              data.dialogVisible = true
              data.sceneStr_qr = res.data.sceneStr
              //获取图片路径
              document.getElementById('qrCodeImgId').src =
                'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=' +
                res.data.ticket
              //获取路径绑定
              data.imgUrl = document.getElementById('qrCodeImgId').src
              //console.log(res.data)
              //二维码显示成功将二维码展示
              data.qrcode = data.imgUrl
              //每3秒访问后台是否能路
              data.t1 = setInterval(WxLogin, 5000)
            }
          })
        } else tips('error', '已经绑定过微信了')
      }
    })
    .catch(() => {
      //console.log('2')
      tips('error', '请先创建账号')
    })
}
//WX扫码轮巡检测
const WxLogin = () => {
  getOpenid(data.sceneStr_qr).then((res) => {
    if (res.code === 200) {
      //data.t保存了openid
      data.t = res.data.openId
      //扫码成功后将二维码页面关闭
      data.dialogVisible = false
      //将获得的openid存入数据库
      put_docopenid()
      //关闭轮询
      clearInterval(data.t1)
    }
  })
}
//扫描后把openid放入对应医生数据库
const put_docopenid = () => {
  post_doc_openid(data.doctorID, data.t).then((res) => {
    if (res.code === 200) {
      tips('success', '绑定微信成功')
    }
  })
}
//下拉框修改函数
const selectSpecial = (id) => {
  //医院
  data.selectDepartmentID = id
  updataSelectRoom()
  data.selectRoomID = ''
  displayData()
}
const selectRoom = (id) => {
  //科室
  data.selectRoomID = id
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
  data.type = 0
}
//取消
const quxiao = () => {
  data.dialogFormVisible = false
  data.formData = []
}
//提交表单
const submitForm = () => {
  const tempData = {
    gender: data.formData.genderID,
    jobTitle: data.formData.jobTitle,
    name: data.formData.name,
    outpatientId: data.formData.outpatientId,
    specialId: data.formData.specialId,
    specialty: data.formData.specialty
  }
  console.log(tempData)
  if (data.type === 0) {
    addDoctor(tempData)
      .then((res) => {
        if (res.code === 200) {
          data.dialogFormVisible = false //隐藏弹出框
          data.formData = []
          displayData()
        }
        tips('success', '添加成功')
      })
      .catch(() => {
        tips('error', '添加失败')
      })
  } else if (data.type === 1) {
    updateDoctor(data.formData.id, tempData)
      .then((res) => {
        if (res.code === 200) {
          data.dialogFormVisible = false //隐藏弹出框
          data.formData = []
          displayData()
        }
        tips('success', '修改成功')
      })
      .catch(() => {
        tips('error', '修改失败')
      })
  }
}
//创建账号
const createDoctorRow = (row) => {
  createDoctorManager({
    name: row.id,
    password: SHA256('123456')
  })
    .then((res) => {
      if (res.code === 200) {
        data.account = true
        tips('success', '账号创建成功')

        //console.log(getDoctorInfo(data.doctorID))
      }
    })
    .catch(() => {
      tips('error', '账号已存在，创建失败')
    })
}
//编辑
const toEditRow = (row) => {
  data.dialogFormVisible = true
  console.log(row)
  if (row.gender === '男') {
    data.formData.genderID = 1
  } else {
    data.formData.genderID = 2
  }
  //data.formData.genderID=row.genderID
  data.formData.jobTitle = row.jobTitle
  data.formData.name = row.name
  data.formData.outpatientId = row.outpatientId
  data.formData.specialId = row.specialId
  data.formData.specialty = row.specialty
  data.formData.id = row.id
  data.type = 1
  console.log(data.formData)
}
//删除
const deleteRow = (row) => {
  deleteDoctor(row.id)
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
  departmentForm,
  dialogVisible,
  searchParams,
  roomData,
  departmentData,
  consultationRoomList,
  dialogFormVisible,
  formData,
  selectRoomID,
  selectDepartmentID,
  jobTitleData,
  genderSelectData,
  qrcode
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
.qrcode {
  width: 200px;
  height: 200px;
  border: 1px solid #e2e2e2;
}
</style>
