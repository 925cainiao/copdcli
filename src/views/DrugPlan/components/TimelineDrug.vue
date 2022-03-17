<template>
  <div v-show="isShowDrug">
    <el-container>
      <el-main>
        <el-row style="text-align: right">
          <el-col :span="24">
            <el-button type="primary" @click="clickShowDrug">新建用药建议</el-button>
          </el-col>
        </el-row>
        <el-timeline v-show="drugPlan.length>0">
          <el-timeline-item v-for="(it, index) in drugPlan" :timestamp="it.time" placement="top" :key="index">
            <el-card>
              <el-table border :data="it.drugs">
                <el-table-column v-for="item in columns" v-bind:label="item.label" v-bind:key="item.id" :prop="item.prop" :align="item.align"></el-table-column>
              </el-table>
              <el-row>
                <el-col :span="24" align="right">
                  <el-link icon="el-icon-delete" type="primary" :underline="true" class="link_btn" @click="deleteData(it.planId, index)">删除</el-link>
                </el-col>
              </el-row>
            </el-card>
          </el-timeline-item>
        </el-timeline>
        <no-data v-show="drugPlan.length == 0">
        </no-data>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { schemePlanId, schemePlanDelete } from '@/service/api'
import { mapState } from 'vuex'
import NoData from '@/components/page/NoData'
export default {
  components: { NoData },
  props: {
    isShowDrug: {
      type: Boolean,
      default: false
    },
    // drugPlan: {
    //     type: Array,
    //     default: () => {
    //         return []
    //     }
    // },
    info: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      drugPlan: [], // 方案列表
      columns: [
        // { id: 'createTime', label: '用药日期', prop: 'createTime', align: 'left' },
        { id: 'drugName', label: '药品名称', prop: 'drugName', align: 'left' },
        { id: 'dosage', label: '剂量', prop: 'dosage', align: 'center' },
        { id: 'frequency', label: '频次', prop: 'frequency', align: 'cente' },
        { id: 'rightUsage', label: '给药途径', prop: 'rightUsage', align: 'center' },
        { id: 'total', label: '总量', prop: 'total', align: 'center' }
      ]
    }
  },
  computed: {
    ...mapState({
      questionnaireId: state => state.questionnaireId,
      historyQuestionnaireId: state => state.historyQuestionnaireId
    })
  },
  created () {
    this.schemePlanId()
  },
  methods: {
    // 切换显示
    clickShowDrug () {
      this.$emit('update:isShowDrug', false)
    },
    // 删除
    deleteData (planId, index) {
      let _this = this
      _this.$confirm(`此操作将删除方案, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.schemePlanDelete(planId, index)
      }).catch(() => {
        _this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    // 根据患者id获取该患者的所有用药方案，方案按时间组合详情
    schemePlanId () {
      let _this = this
      schemePlanId(`/${_this.info.id}`, {}).then((res) => {
        if (res.status === '0') {
          if (res.data && res.data.length > 0) {
            let data = []
            // 若为诊断及检查查看历史用药方案跳转过来，则过滤出该用药方案
            if (_this.historyQuestionnaireId !== '') {
              data = res.data.filter(item => {
                return item.questionnaireId == _this.historyQuestionnaireId
              })
              _this.drugPlan = data
            } else {
              _this.drugPlan = res.data
            }
            _this.$emit('update:isShowDrug', true)
          } else {
            _this.$emit('update:isShowDrug', false)
          }
        }
      })
    },

    // 根据用药方案id删除该用药方案
    schemePlanDelete (planId, index) {
      let _this = this
      schemePlanDelete(`/${_this.info.id}/${planId}`, {})
        .then((res) => {
          if (res.status === '0') {
            _this.drugPlan.splice(index, 1)
            // _this.$emit('update:drugPlan')
            _this.$message.success('删除成功')
            if (_this.drugPlan.length === 0) {
              _this.clickShowDrug()
            }
          }
        }).catch((err) => {
          _this.$message.error(err)
        })
    }
  },
  watch: {
    info () {
      this.schemePlanId()
    }
  }
}
</script>
<style lang="scss" scoped>
.cont_flex {
  display: flex;
}
.cont_flex_item {
  flex: 1;
}
.cont_flex_wid {
  width: 50px;
}
.link_btn {
  padding: 10px 0;
}
</style>
