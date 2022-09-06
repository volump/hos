<template>
  <div>
    <!-- 面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>排班管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!--排班详情-->
    <!--选择数据框-->
    <span class="title">医院：</span>
    <el-select
      v-model="selectID"
      placeholder="请选择"
      @change="selectHospital(selectID)"
    >
      <el-option
        v-for="item in hospitalList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      >
      </el-option>
    </el-select>
    <span class="title">专科：</span>
    <el-select
      v-model="selectdeID"
      placeholder="请选择"
      @change="selectdepart(selectdeID)"
    >
      <el-option
        v-for="item in departmentList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      >
      </el-option>
    </el-select>
    <span class="title">门诊：</span>
    <el-select
      v-model="selectoutID"
      placeholder="请选择"
      @change="selectoutpart(selectoutID)"
    >
      <el-option
        v-for="item in outpaList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      >
      </el-option>
    </el-select>
    <!--日期选择-->
    <span class="title">日期：</span>
    <el-date-picker v-model="dateOutCall" type="date" placeholder="选择日期" />
    <el-button type="primary" @click="SearchAllplan()">查询</el-button>
    <el-button type="primary" @click="addPlan()">添加</el-button>
    <!--查询后表格数据显示-->
    <div>
      <el-form>
        <el-table :data="vistpalList" style="width: 100%">
          <el-table-column prop="id" label="编号" width="200" />
          <el-table-column prop="doctorId" label="医生id" width="200" />
          <el-table-column prop="doctorName" label="医生姓名" width="200" />
          <el-table-column prop="clinicName" label="诊室" width="200" />
          <el-table-column
            prop="time"
            label="时间段"
            width="200"
            :formatter="Formatter"
          />
          <!-- <template #default="scope">
              <span v-if="scope.row.time === 1">08：30~12：00</span>
              <span v-if="scope.row.time === 2">14：00~18：00</span>
            </template> </el-table-column
          > -->
          <el-table-column label="操作" width="200">
            <template #default="scope">
              <el-button type="success" @click="toEditRow(scope.row)"
                >编辑</el-button
              >
              <el-button type="danger" @click="delRow(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </div>
    <!--分页-->
    <el-pagination
      v-model:currentPage="searchParams.pageNum"
      v-model:page-size="searchParams.pageSize"
      :page-sizes="[5, 15, 30, 50]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="searchParams.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!--添加出诊信息弹出框-->
    <el-dialog v-model="dialogFormVisible" :title="titleName">
      <el-form>
        <el-form-item label="医生ID：" label-width="120px">
          <span class="gray-text">{{ selectdocID }}</span>
        </el-form-item>
        <el-form-item label="医生姓名" label-width="120px">
          <el-select
            v-model="selectdocID"
            placeholder="请选择"
            @change="selectdocname(selectdocID)"
          >
            <el-option
              v-for="item in docList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="诊室" label-width="120px">
          <el-select
            v-model="selectrommID"
            placeholder="请选择"
            @change="selecttreatroom(selectrommID)"
          >
            <el-option
              v-for="item in treatroomList"
              :key="item.id"
              :label="item.address"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间段" label-width="120px">
          <el-select
            v-model="selectTimeID"
            @change="selectTime(selectTimeID)"
            placeholder="请选择"
          >
            <el-option
              v-for="item in sentTableData.time"
              :key="item.ID"
              :label="item.name"
              :value="item.ID"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="quxiao">取消</el-button>
          <el-button type="primary" @click="addOutCall_tab()">提交</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, toRefs } from '@vue/reactivity'
import { getHospitalInfo } from '../../api/hospital.js'
import { getDoctorDepartmentList } from '../../api/departmentSetUp.js'
import { getOutpatientByHospital } from '../../api/outpatient.js'
import { getDoctorList } from '../../api/doctor.js'
import { getTreatRoom } from '@/api/treatRoom'
import { ElMessage } from 'element-plus'
import {
  getAllOutCallList,
  addOutCall,
  updateOutCall,
  deleteOutCallById
} from '@/api/outCall'
import { dateFormYMD } from '@/common/js/dateFormYMD'

//得到医院信息
const data = reactive({
  keyword: '',
  searchParams: {
    query: '',
    pageNum: 1,
    pageSize: 50,
    total: 0
  },
  IDD: '',
  titleName: '',
  dateOutCall: new Date(),
  dialogFormVisible: false,
  dialogVisible_del: false,
  addoutform: [],
  //医院ID
  selectID: '',
  //科室ID
  selectdeID: '',
  //门诊ID
  selectoutID: '',
  //医生ID
  selectdocID: '',
  //诊室ID
  selectrommID: '',
  selectTimeID: 1,
  hospitalList: [],
  departmentList: [],
  outpaList: [],
  docList: [],
  treatroomList: [],
  //出诊计划表
  vistpalList: [],
  formData: {}
})
const handleSizeChange = (pageSize) => {
  data.searchParams.pageNum = 1
  data.searchParams.pageSize = pageSize
  SearchAllplan()
}
const handleCurrentChange = (pageNum) => {
  data.searchParams.pageNum = pageNum
  SearchAllplan()
}
const Formatter = (row) => {
  if (row.time === 1) {
    return sentTableData.time[0].name
  } else if (row.time === 2) {
    return sentTableData.time[1].name
  }
}
//控制弹出框
const addPlan = () => {
  data.dialogFormVisible = true
  data.titleName = '增加出诊信息'
}
// 时间段的下拉框
const sentTableData = reactive({
  address: [],
  time: [
    {
      ID: 1,
      name: '08：30~12：00'
    },
    {
      ID: 2,
      name: '14：00~18：00'
    }
  ]
})
//搜索医院信息
const searchHospitalInfo = () => {
  getHospitalInfo(
    data.searchParams.pageNum,
    data.searchParams.pageSize,
    data.keyword
  ).then((res) => {
    if (res.data) {
      //console.log('用户数据', data.hospitalList)
      data.hospitalList = res.data.list
      //searchdaparList()
    }
  })
}
//搜索指定医院科室信息通过selectID绑定
const searchdaparList = () => {
  getDoctorDepartmentList(
    data.selectID,
    data.searchParams.pageNum,
    data.searchParams.pageSize,
    data.keyword
  ).then((res) => {
    if (res.data) {
      //console.log('用户数据', res)
      data.departmentList = res.data.list
      //searchoutList()
    }
  })
}
//搜索指定医院指定科室的门诊信息通过selectdeID绑定
const searchoutList = () => {
  getOutpatientByHospital(
    data.selectID,
    data.selectdeID,
    data.searchParams.pageNum,
    data.searchParams.pageSize,
    data.keyword
  ).then((res) => {
    if (res.data) {
      //console.log('用户数据', res)
      data.outpaList = res.data.list
    }
  })
}
//搜索医生信息供弹出框使用
const searchdoc_Info = () => {
  //console.log('获取医生成功')
  getDoctorList(
    data.selectdeID,
    data.selectoutID,
    data.searchParams.pageNum,
    data.searchParams.pageSize,
    ''
  ).then((res) => {
    //console.log('用户数据', res)
    data.docList = res.data.list
    //console.log(data.selectdeID)
  })
}
//查询诊室信息
const selecttreatroom_Info = () => {
  //console.log('获取成功')
  getTreatRoom(
    data.selectoutID,
    data.searchParams.pageNum,
    data.searchParams.pageSize
  ).then((res) => {
    //console.log('用户数据', res)
    data.treatroomList = res.data.list
    //console.log(data.selectdeID)
  })
}
//清空各个表单为了下次查询重新获取信息（不会保留在select的option上影响选择）
const ClearOption = () => {
  data.selectID = ''
  data.selectdeID = ''
  data.selectoutID = ''
  data.selectdocID = ''
  data.selectrommID = ''
  data.departmentList = []
  data.outpaList = []
  data.docList = []
  data.treatroomList = []
}
//点击取消将表中内容清空
const quxiao = () => {
  data.dialogFormVisible = false
  ClearOption()
}
//查询所有就诊排班
const SearchAllplan = () => {
  getAllOutCallList(
    dateFormYMD(data.dateOutCall),
    data.searchParams.pageNum,
    data.searchParams.pageSize,
    data.selectID,
    data.selectdeID,
    data.selectoutID
  )
    .then((res) => {
      console.log(dateFormYMD(data.dateOutCall))
      if (res.code === 200) {
        const tempdata = res.data.list
        if (tempdata.length > 0) {
          // console.log(res.data.list)
          //console.log(res.data.list)
          if (data.searchParams.total < res.data.total) {
            data.searchParams.total = res.data.total
          }
          data.vistpalList = res.data.list
          // 每次赋为空值后保证下次重新拉取信息，不保留原来的数据
          ClearOption()
        } else {
          //如果查询信息的total为0那么就重新刷新这三个查询值需要重新绑定
          ClearOption()
          data.searchParams.total = 0
          ElMessage({
            message: '暂时没安排医生值班.',
            type: 'warning'
          })
          data.vistpalList = []
        }
        //this.getDoctorList()
      }
    })
    .catch(() => {
      alert('error')
    })
}
//排班编辑
const toEditRow = (row) => {
  data.dialogFormVisible = true
  data.titleName = '编辑出诊信息'
  //重新绑定医院信息
  data.selectID = row.hospitalId
  //重新绑定科室
  data.selectdeID = row.specialId
  //重新绑定门诊
  data.selectoutID = row.outpatientId
  //重新绑定医生
  data.selectdocID = row.doctorId
  //重新绑定诊室
  data.selectrommID = row.clinicId
  data.IDD = row.id
  //需要重新根据上面所有信息再查询与之相关的诊室和医生然后选择替换
  searchdoc_Info()
  selecttreatroom_Info()
}

//排班删除
const delRow = (row) => {
  data.dialogVisible_del = true
  deleteOutCallById(row.id)
    .then((res) => {
      if (res.code === 200) {
        data.dialogVisible_del = false
        data.searchParams.total--
        SearchAllplan()
      }
    })
    .catch(() => {
      alert('sha')
    })
}

//下拉框修改函数
//医院
const selectHospital = (id) => {
  data.selectID = id
  data.selectdeID = ''
  data.selectoutID = ''
  data.selectdocID = ''
  data.selectrommID = ''
  console.log('医院id:', id)
  //searchHospitalInfo()
  searchdaparList()
}
//科室
const selectdepart = (id) => {
  data.selectdeID = id
  data.selectoutID = ''
  data.selectdocID = ''
  data.selectrommID = ''
  console.log('科室id:', id)
  //searchdaparList()
  searchoutList()
}
//门诊
const selectoutpart = (id) => {
  data.selectoutID = id
  data.selectrommID = ''
  data.selectdocID = ''
  console.log('门诊id:', id)
  searchdoc_Info()
  selecttreatroom_Info()
  //searchoutList()
}
//医生
const selectdocname = (id) => {
  data.selectdocID = id
}
//诊室
const selecttreatroom = (id) => {
  data.selectrommID = id
}
//时间段选择
const selectTime = (id) => {
  sentTableData.time.ID = id
}
//提交添加信息
const addOutCall_tab = () => {
  if (data.titleName === '增加出诊信息') {
    addOutCall({
      clinicId: data.selectrommID,
      day: data.dateOutCall,
      doctorId: data.selectdocID,
      hospitalId: data.selectID,
      outpatientId: data.selectoutID,
      specialId: data.selectdeID,
      time: data.selectTimeID
    }).then((res) => {
      if (res.code === 200) {
        //console.log('success')
        data.dialogFormVisible = false
        if (data.searchParams.total > data.searchParams.pageSize) {
          data.searchParams.total++
        }
        SearchAllplan()
        //清空所有表单信息重新赋值
      }
    })
  } else {
    updateOutCall(data.IDD, {
      clinicId: data.selectrommID,
      day: data.dateOutCall,
      doctorId: data.selectdocID,
      hospitalId: data.selectID,
      outpatientId: data.selectoutID,
      specialId: data.selectdeID,
      time: data.selectTimeID
    })
      .then((res) => {
        if (res.code === 200) {
          SearchAllplan()
          data.dialogFormVisible = false
        }
      })
      .catch(() => {
        alert('更新失败')
      })
  }
}
const {
  searchParams,
  dialogFormVisible,
  hospitalList,
  departmentList,
  docList,
  treatroomList,
  vistpalList,
  selectID,
  selectdeID,
  selectoutID,
  dateOutCall,
  titleName,
  outpaList,
  selectdocID,
  selectrommID,
  selectTimeID
} = toRefs(data)
searchHospitalInfo()
</script>
<style lang="scss"></style>
