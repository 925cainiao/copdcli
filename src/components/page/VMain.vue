<template>
  <el-container class="right_main_cont">
    <el-header class="right_main_header" style="height: 53px">
      <!-- <el-row>
        <el-col :span="24"
                align="right">
          <el-button type="primary"
                     @click="addBtn">新建</el-button>
          <el-button type="primary"
                     @click="saveBtn"
                     :disabled="isComponent!='basicInfo'">保存</el-button>
          <el-button type="primary"
                     @click="deleteBtn">删除</el-button>
        </el-col>
      </el-row> -->
      <el-row>
        <el-col :span="24">
          <ul class="main_tab_ul">
            <li v-for="(item, index) in tabColumn" :key="index" :class="index === tabIndex ? 'active' : ''" @click="clickTab(item, index)">
              {{ item.label }}
            </li>
          </ul>
        </el-col>
      </el-row>
    </el-header>
    <el-main class="right_main_main">
      <component :ref="isComponent" :is="isComponent" :info="info" :patientInfo="patientInfo"></component>
    </el-main>
  </el-container>
</template>
<script>
import bus from '@/assets/bus.js'
import BasicInfo from '@/views/BasicInfo/BasicInfo'
// import Screening from '@/views/Screening/Screening'
import Questionnaire from '@/views/Questionnaire/Questionnaire'
import DrugPlan from '@/views/DrugPlan/DrugPlan'
export default {
  components: {
    BasicInfo,
    // Screening,
    Questionnaire,
    DrugPlan
  },
  props: {
    // 左侧栏获取的患者信息
    patientInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 根据患者id获取的患者基本信息
    info: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      tabColumn: [
        { label: '基本信息', component: 'basicInfo' },
        // { label: '慢阻肺基层公卫数据智能筛查', component: 'screening' },
        { label: '诊断及检查', component: 'questionnaire' },
        { label: '用药建议', component: 'drugPlan' }],
      tabIndex: 0, // 显示的tab index
      isComponent: '', // 显示的组件

      // step: 1, // 是否新增  0 新建 1 更新
      doctorId: 1, // 医生id
      doctorInfo: JSON.parse(sessionStorage.getItem('doctorInfo'))
    }
  },
  watch: {
    info () {
      // this.step = 1
      if (this.info.isExamine) {
        this.jumpDrugplan()
      } else {
        // this.reset()
      }
    }
  },

  created () {
    bus.$on('saveQuestionnaireJump', params => {
      this.jumpDrugplan()
    })
  },
  mounted () {
    this.isComponent = this.tabColumn[this.tabIndex].component
  },
  methods: {
    // 重置
    reset () {
      // this.tabIndex = 0
      this.isComponent = this.tabColumn[this.tabIndex].component
    },
    // 跳转到方案
    jumpDrugplan () {
      this.tabIndex = 2
      this.isComponent = this.tabColumn[this.tabIndex].component
    },
    // 切换tab
    clickTab (item, index) {
      // this.$store.commit('questionnaireId', '')
      this.$store.commit('HISTORYQUESTIONNAIREID', '')
      this.tabIndex = index
      this.isComponent = this.tabColumn[this.tabIndex].component
    }
    // // 新增
    // addBtn () {
    //   this.reset()
    //   this.step = 0
    //   this.$nextTick(() => {
    //     this.$refs.basicInfo.resetForm() // 重置患者信息表格
    //     this.$refs.basicInfo.insuranceType = ''
    //     this.$refs.basicInfo.type = []
    //   })
    // },
    // // 保存
    // saveBtn () {
    //   let _this = this
    //   // 如果是新增
    //   if (_this.step === 0) {
    //     _this.$refs.basicInfo.savePatient()
    //   } else {
    //     _this.$refs.basicInfo.updatePatient()
    //   }
    // },
    // // 删除
    // deleteBtn () {
    //   let _this = this
    //   _this.$confirm(`此操作将删除患者"${_this.patientInfo.patientName}", 是否继续?`, '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     _this.deletePatient()
    //   }).catch(() => {
    //     _this.$message({
    //       type: 'info',
    //       message: '已取消删除'
    //     })
    //   })
    // },
    // // 删除接口
    // deletePatient () {
    //   let _this = this
    //   let id = _this.patientInfo.id
    //   deletePatient(`/${id}`, {}).then(res => {
    //     if (res.status === '0') {
    //       _this.$message.success('操作成功!')
    //       bus.$emit('queryPatientTable', { isTrue: true })
    //     } else {
    //       _this.$message.error(res.msg)
    //     }
    //   })
    // }
  }

}
</script>
<style lang="scss" scoped>
</style>
