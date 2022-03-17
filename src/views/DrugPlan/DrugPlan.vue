<template>
  <div>
    <div v-show="!isShowDrug">
      <el-container v-show="tagPlan">
        <el-header style="height: auto;">
          <h2 class="drug_plan_header"><i class="el-icon-first-aid-kit el_icons"></i>&nbsp;&nbsp;当前病人GOLD分组为{{tagPlan}}组</h2>
        </el-header>
        <el-container>
          <el-aside width="200px">
            <el-table :data="tableData" border :show-header="showHeaderStatus" @row-click="handleRowClick" highlight-current-row ref="tb" v-loading="isLoading">
              <el-table-column prop="category" label="">
                <template slot-scope="scope">
                  <div class="table_align_left">方案{{scope.$index+1}}:{{ scope.row.category | filerCategory }}</div>
                </template>
              </el-table-column>
            </el-table>
          </el-aside>
          <el-main class="drug_plan_main">
            <div>
              <base-plan :basicPlan="basicPlan" :frequencyOptions="frequencyOptions" :drugUsageOptions="drugUsageOptions" :showStep="showStep" ref="basePlan"></base-plan>
              <edit-plan :basicPlan="showInfo" :queryDrugInfoOption="queryDrugInfoOption" :frequencyOptions="frequencyOptions" :drugUsageOptions="drugUsageOptions" :showStep="showStep" ref="editPlan"></edit-plan>
              <plan-list :showInfo="showInfo.scheme" :showStep="showStep" ref="planList"></plan-list>
              <el-row class="button_align">
                <el-col :span="24">
                  <el-button class="el-icon-back" @click="goBack" :disabled="drugPlan.length === 0 && showStep === 0">上一步</el-button>
                  <el-button class="el-icon-right" @click="goTo" :disabled="showStep!=0">增加自定义药物</el-button>
                  <el-button type="primary" class="el-icon-check" @click="planConfirm" v-show="showStep!=2">确认</el-button>
                  <el-button type="primary" class="el-icon-check" @click="planSave" v-show="showStep==2">保存</el-button>
                </el-col>
              </el-row>
            </div>
          </el-main>
        </el-container>
      </el-container>
      <el-card v-show="!tagPlan" class="prompt_style">
        <span><i class="el-icon-warning"></i>温馨提示:</span>
        <p>未能获取病人分组结果，<br />
          请返回【诊断及检查】项中补充填写“评估”相关信息
          （CAT评估得分、mMRC呼吸困难评价等级、急性加重史）</p>
      </el-card>
    </div>
    <timeline-drug ref="timelineDrug" :isShowDrug.sync="isShowDrug" :info="info"></timeline-drug>

  </div>
</template>
<script>
import { mapState } from 'vuex'
import { querySchemeGroup, queryDrugInfo, querySchemeTag, queryDrugFrequency, queryDrugUsage, saveScheme } from '@/service/api'
import BasePlan from './components/BasePlan'
import EditPlan from './components/EditPlan'
import PlanList from './components/PlanList'
import TimelineDrug from './components/TimelineDrug'
export default {
  components: {
    BasePlan,
    EditPlan,
    PlanList,
    TimelineDrug
  },
  props: {
    info: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      doctorInfo: JSON.parse(sessionStorage.getItem('doctorInfo')),
      tagPlan: '', // 患者组别
      showHeaderStatus: false, // 不显示table th
      isLoading: false, // 请求loading
      tableData: [], // 基础方案列表
      queryDrugInfoOption: [], // 所有药品下拉
      frequencyOptions: [], // 频次下拉
      drugUsageOptions: [], // 途径下拉
      showStep: 0, // 显示模块 0:基础用药方案， 1：自定义用药方案 2：确认用药方案
      backupStep: 0, // 备份
      isComponent: 'basePlan',
      basicPlan: {}, // 基础用药方案
      showInfo: {}, // 确认方案列表数据
      tableRowIndex: -1, // 选中方案Index
      drugPlan: [], // 用药方案
      isShowDrug: false // 展示用药方案
    }
  },
  computed: {
    ...mapState({
      questionnaireId: state => state.questionnaireId,
      historyQuestionnaireId: state => state.historyQuestionnaireId
    })
  },
  created () {
    this.tableRowIndex = -1
    this.isQuerySchemeGroup()
    // this.queryDrugPlan()
    // this.schemePlanId()
    this.queryDrugInfo()
    this.queryDrugFrequency()
    this.queryDrugUsage()
  },
  methods: {
    // table
    handleRowClick (row) {
      if (row === this.basicPlan) {
        this.basicPlan = {}
        this.tableRowIndex = -1
      } else {
        this.basicPlan = row
        this.tableRowIndex = this.getArrayIndex(this.tableData, row)
        this.showStep = 0
      }

      this.$forceUpdate()
    },

    // 获取一个元素在数组中的下标
    getArrayIndex (arr, obj) {
      var i = arr.length
      while (i--) {
        if (arr[i] === obj) {
          return i
        }
      }
      return -1
    },

    // 判断是否获取患者组别 若新增问卷id为空，则不获取
    isQuerySchemeGroup () {
      if (this.questionnaireId !== '') {
        this.querySchemeGroup()
      } else {
        this.isLoading = false
      }
    },
    // 获取患者组别
    querySchemeGroup () {
      let _this = this
      let cat = _this.info.catAsthma + _this.info.catChestTight + _this.info.catConfidence + _this.info.catCough + _this.info.catEnergy + _this.info.catInfluence + +_this.info.catPhlegm + _this.info.catSleep
      _this.tagPlan = ''
      querySchemeGroup('', {
        mmrc: _this.info.mmrc,
        cat: cat,
        isCountGtTwo: _this.info.isCountGtTwo
      }).then(res => {
        if (res.status === '0') {
          _this.tagPlan = res.data
          _this.queryDrugPlan()
        }
      })
    },

    // 获取所有药品信息数据
    queryDrugInfo () {
      queryDrugInfo('', {}).then((msg) => {
        if (msg.status === '0') {
          this.queryDrugInfoOption = msg.data
        }
      })
    },

    // 获得所有用药频次数据
    queryDrugFrequency () {
      let _this = this
      _this.isLoading = true
      queryDrugFrequency('', {}).then(
        res => {
          if (res.status === '0') {
            _this.frequencyOptions = res.data
          } else {
            _this.isLoading = false
            _this.$message.error(res.msg)
          }
        }
      )
    },

    // 获得所有给药途径数据
    queryDrugUsage () {
      let _this = this
      queryDrugUsage('', {}).then(
        res => {
          if (res.status === '0') {
            _this.drugUsageOptions = res.data
          } else {
            _this.$message.error(res.msg)
          }
        }
      )
    },

    // 获取基础用药方案数据
    queryDrugPlan () {
      let _this = this
      let obj = {
        category: '',
        scheme: [],
        alternative: []
      }
      querySchemeTag(`/tag/${_this.tagPlan}`, {}).then((res) => {
        if (res.status === '0') {
          let data = res.data
          this.dealData(data)
          _this.isLoading = false
        } else {
          _this.tableData = obj
          _this.isLoading = false
          _this.$message.error(res.msg)
        }
      })
    },

    // 处理基础用药方案接口数据
    dealData (data) {
      let newData = []
      for (let j in data.category) {
        let obj = {
          category: data.category[j],
          scheme: [],
          alternative: []
        }
        newData.push(obj)
      }
      for (let i in data.scheme) {
        newData[i - 1].scheme = newData[i - 1].scheme.concat(JSON.parse(JSON.stringify(data.scheme[i])))
        newData[i - 1].alternative = newData[i - 1].alternative.concat(data.scheme[i])
      }
      for (var k in data.alternative) {
        data.alternative[k].forEach((item) => {
          newData[k - 1].alternative = newData[k - 1].alternative.concat(item)
        })
      }
      newData.forEach((item, index) => {
        item.scheme.forEach((item1, index1) => {
          if (item1) {
            item1.category = item.category[index1]
            item1.alternative = item.alternative
          }
        })
      })
      this.tableData = newData
    },



    // 判断是否已选择方案
    alertMessage () {
      if (!this.basicPlan.scheme) {
        this.$alert('请选择一种基础用药方案！', {
          title: '消息',
          confirmButtonText: '确定'
        })
        return false
      } else {
        return true
      }
    },

    /* 底部切换按钮 */
    // 返回上一步
    goBack () {
      if (!this.isShowDrug && this.showStep === 0) {
        this.isShowDrug = true
      } else {
        if (this.showStep === 1) {
          this.showStep = 0
        } else {
          this.showStep = this.backupStep
        }
      }
    },

    // 增加自定义药物
    goTo () {
      this.showInfo = this.$refs.basePlan.tableData
      if (this.alertMessage()) {
        this.showInfo.scheme.forEach((item) => {
          item.isBase = true
        })
        this.showStep = 1
      }
    },

    // 确认
    planConfirm () {
      let _this = this
      // 备份上一级step是什么
      this.backupStep = this.showStep
      if (this.alertMessage()) {
        if (this.showStep === 1) {
          let data = JSON.parse(JSON.stringify(this.$refs.editPlan.tableData))
          data.scheme = data.scheme.filter((item) => {
            return item.id !== ''
          })
          if (data.scheme.length === 0) {
            this.$alert('请选择一种基础用药方案！', {
              title: '消息',
              confirmButtonText: '确定'
            })
          } else {
            this.showInfo = data
            this.showStep = 2
          }
        } else {
          _this.showInfo = JSON.parse(JSON.stringify(_this.$refs.basePlan.tableData))
          this.showStep = 2
        }
      }
    },

    // 保存
    planSave () {
      let _this = this
      if (_this.showStep === 2) {
        let data = _this.$refs.planList.tableData
        data = data.map(item => {
          return {
            drugName: item.drugName,
            drugDose: item.drugDose,
            drugFrequency: item.drugFrequency,
            drugUsage: item.drugUsage,
            total: item.total ? item.total : '',
            drugCode: item.drugCode,
            drugId: item.drugId,
            // id: item.id
          }
        })
        let params = {
          doctorId: sessionStorage.getItem('doctorId'),
          patientId: _this.info.id,
          questionnaireId: _this.questionnaireId,
          items: data
        }
        saveScheme('', params).then((res) => {
          if (res.status === '0') {
            _this.$message.success('保存成功')
            _this.tagPlan = ''
            _this.$store.commit('QUESTIONNAIREID', '')
            _this.$refs.timelineDrug.schemePlanId()
          } else {
            _this.$message.error(res.msg)
          }
        })
      }
    }
  },

  watch: {
    info () {
      this.tableRowIndex = -1
      this.isQuerySchemeGroup()
      // this.queryDrugPlan()
      // this.schemePlanId()
      this.queryDrugInfo()
      this.queryDrugFrequency()
      this.queryDrugUsage()
    }
  },

  filters: {
    filerCategory (val) {
      if (Array.isArray(val)) {
        let name = ''
        val.map((item, index) => {
          name = name + item + ','
        })
        name =
          name.substring(name.length - 1) === ','
            ? name.substring(0, name.length - 1)
            : name
        return name
      } else {
        return val
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.drug_plan_header {
  font-size: 13px;
  font-weight: normal;
  line-height: 40px;
}
.drug_plan_main {
  margin-left: 10px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 5px;
}
</style>
