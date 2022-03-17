<template>
  <div class="main_container">
    <el-container style="height: 100%">
      <el-header class="main_header">
        <v-head></v-head>
      </el-header>
      <el-container style="height: calc(-60px)">
        <el-aside width="400px" height="100%" class="main_aside" v-show="asideState">
          <v-slider @closeAside="closeAside" @returnPatientInfo="returnPatientInfo" height="100%"></v-slider>
        </el-aside>
        <el-main style="position: relative">
          <div :class="!asideState ? 'active' : ''" class="showIcon" @click="asideState = !asideState">
            <i class="el-icon-caret-right" v-show="asideState"></i>
            <i class="el-icon-caret-left" v-show="!asideState"></i>
          </div>
          <v-main :patientInfo="patientInfo" :info="info"></v-main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import bus from '@/assets/bus.js'
import vHead from '@/components/page/VHeader.vue'
import vSlider from '@/components/page/VSlider.vue'
import vMain from '@/components/page/VMain.vue'
import { queryPatientInfo } from '@/service/api'
export default {
  components: {
    vHead, vSlider, vMain
  },
  data () {
    return {
      asideState: true, // 左侧栏显示
      patientInfo: {},
      info: {},
      doctorInfo: JSON.parse(sessionStorage.getItem('doctorInfo'))
    }
  },
  created () {
    bus.$on('queryPatientInfo', params => {
      if (params.isTrue) {
        this.queryPatientInfo(params.isExamine)
      }
    })
  },
  methods: {
    closeAside (val) {
      this.asideState = false
    },
    returnPatientInfo (val) {
      this.patientInfo = val.info
      this.queryPatientInfo()
    },
    // 获取基本信息
    queryPatientInfo (val) {
      let _this = this
      let id = _this.patientInfo.id
      queryPatientInfo(`/${id}`, {}).then(res => {
        if (res.status === '0') {
          if (res.data) {
            let data = res.data
            if (data.basic) {
              data.basic.registHospital = _this.doctorInfo.registHospital
              if (data.questionnaire) {
                data.questionnaire.questionnaireId = data.questionnaire.id
                Object.assign(data.questionnaire, data.basic)
                _this.info = data.questionnaire
              } else {
                _this.info = data.basic
              }
              // 判断是否是诊断及检查保存后调用基本信息，若是则给Key判断右侧默认跳转到那个用药方案component
              if (val) {
                _this.info.isExamine = true
              }
            } else {
              _this.info = {}
            }
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.showIcon {
  position: absolute;
  left: -9px;
  color: #c0b0b0;
  font-size: 28px;
  top: 50%;
  cursor: pointer;
  &.active {
    left: 1px;
  }
}
</style>
