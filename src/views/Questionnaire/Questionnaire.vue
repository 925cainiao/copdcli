<template>
  <div>
    <el-table :data="questionnaireList" border class="questionnaire_table">
      <el-table-column label="日期">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.updateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleView(scope.row.id)">查看对应用药建议</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="basicinfo_box">
      <h2 class="basic_title">评估</h2>
      <h3 class="basic_title">
        CAT评估得分
        <span class="basic_title_mark" style="color: red">注：共8个问题，数字0—5表示严重程度，请标记最能反映患者当前情况的选项选分，每个问题只能标记1个选项</span>
      </h3>
      <div class="basic_cont">
        <el-form :label-position="labelPosition" :model="basicInfo" :rules="rules" class="form_box" :label-width="labelWidth">
          <el-form-item label="从不咳嗽">
            <el-radio-group v-model="basicInfo.catCough">
              <el-radio :label="item.label" v-for="(item, index) in $dict.examineList" :key="index">{{ item.label }}</el-radio>
            </el-radio-group>
            <span class="examine_radio_suffix">总在咳嗽</span>
          </el-form-item>
          <el-form-item label="一点儿痰也没有">
            <el-radio-group v-model="basicInfo.catPhlegm">
              <el-radio :label="item.label" v-for="(item, index) in $dict.examineList" :key="index">{{ item.label }}</el-radio>
            </el-radio-group>
            <span class="examine_radio_suffix">有很多痰</span>
          </el-form-item>
          <el-form-item label="没有任何胸闷的感觉">
            <el-radio-group v-model="basicInfo.catChestTight">
              <el-radio :label="item.label" v-for="(item, index) in $dict.examineList" :key="index">{{ item.label }}</el-radio>
            </el-radio-group>
            <span class="examine_radio_suffix">有很严重的胸闷感觉</span>
          </el-form-item>
          <el-form-item label="爬坡或上一层楼时，没有气喘的感觉">
            <el-radio-group v-model="basicInfo.catAsthma">
              <el-radio :label="item.label" v-for="(item, index) in $dict.examineList" :key="index">{{ item.label }}</el-radio>
            </el-radio-group>
            <span class="examine_radio_suffix">
              爬坡或上一层楼时，感觉严重喘不过气</span>
          </el-form-item>
          <el-form-item label="在家里做任何事情">
            <el-radio-group v-model="basicInfo.catInfluence">
              <el-radio :label="item.label" v-for="(item, index) in $dict.examineList" :key="index">{{ item.label }}</el-radio>
            </el-radio-group>
            <span class="examine_radio_suffix">
              在家里做任何事情都很受影响</span>
          </el-form-item>
          <el-form-item label="尽管有肺部疾病，但对外出很有信心">
            <el-radio-group v-model="basicInfo.catConfidence">
              <el-radio :label="item.label" v-for="(item, index) in $dict.examineList" :key="index">{{ item.label }}</el-radio>
            </el-radio-group>
            <span class="examine_radio_suffix">
              由于有肺部疾病，对离开家一点信心都没有</span>
          </el-form-item>
          <el-form-item label="睡眠非常好">
            <el-radio-group v-model="basicInfo.catSleep">
              <el-radio :label="item.label" v-for="(item, index) in $dict.examineList" :key="index">{{ item.label }}</el-radio>
            </el-radio-group>
            <span class="examine_radio_suffix">
              由于有肺部疾病，睡眠相当差</span>
          </el-form-item>
          <el-form-item label="精力旺盛">
            <el-radio-group v-model="basicInfo.catEnergy">
              <el-radio :label="item.label" v-for="(item, index) in $dict.examineList" :key="index">{{ item.label }}</el-radio>
            </el-radio-group>
            <span class="examine_radio_suffix"> 一点精力都没有</span>
          </el-form-item>
          <el-form-item label="总得分" label-width="60px;">
            <el-radio-group v-model="totalScore">
              <el-radio :label="item.label" v-for="(item, index) in $dict.totalScore" :key="index">{{ item.value }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <h3 class="basic_title">mMRC呼吸困难问卷评价等级</h3>
      <div class="basic_cont basic_level">
        <el-form :label-position="labelPosition" :model="basicInfo" :rules="rules" class="form_box" label-width="auto">
          <el-form-item label="">
            <el-radio-group v-model="basicInfo.mmrc">
              <el-radio :label="item.label" v-for="(item, index) in $dict.mMRCLevel" :key="index">{{ item.label }}级

                <span class="examine_radio_suffix">&nbsp;&nbsp;&nbsp;{{ item.value }}</span>
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <h3 class="basic_title">mMRC评分</h3>
      <div class="basic_cont basic_level">
        <div class="basic_headings">
          mMRC评分，询问过去一年中急性加重次数？<br />
          0级-只有在剧烈活动时感到呼吸困难;<br />1级-在平地快步行走或步行爬小坡时出现气短;<br />
          2级-由于气短，平地行走时比同龄人慢或者需要停下来休息;<br />
          3级-在平地行走约100米或数分钟后需要停下来喘气;<br />
          4级-因为严重呼吸困难而不能离开家，或在穿脱衣服时出现呼吸困难
        </div>
        <el-form :label-position="labelPosition" :model="basicInfo" :rules="rules" class="form_box" label-width="auto">
          <el-form-item label="">
            <el-radio-group v-model="basicInfo.isCountGtTwo">
              <el-radio :label="item.label" v-for="(item, index) in $dict.mMRscore" :key="index">{{ item.value }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="" align="center" class="from_btn">
            <el-button type="primary" @click="updateQuestionnaire">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import bus from '@/assets/bus.js'
import { getQuestionnaireList, updateQuestionnaire } from '@/service/api'
export default {
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
      labelPosition: 'left',
      labelWidth: '206px',
      rules: {},
      basicInfo: {
        catAsthma: '',
        catChestTight: '',
        catConfidence: '',
        catCough: '',
        catEnergy: '',
        catInfluence: '',
        catPhlegm: '',
        catSleep: '',
        isCountGtTwo: '',
        mmrc: '',
      },
      questionnaireList: []  //问卷列表
    }
  },
  computed: {
    totalScore () {
      let score = Number(~~this.basicInfo.catCough) + Number(~~this.basicInfo.catPhlegm) + Number(~~this.basicInfo.catChestTight) +
        Number(~~this.basicInfo.catAsthma) + Number(~~this.basicInfo.catInfluence) + Number(~~this.basicInfo.catConfidence) + Number(~~this.basicInfo.catSleep) + Number(~~this.basicInfo.catEnergy)
      if (score >= 10) {
        return 0
      } else if (score < 10) {
        return 1
      } else {
        return ''
      }
    }
  },
  created () {
    this.getQuestionnaireList()
  },
  methods: {
    // 获取所有诊断及检查列表
    getQuestionnaireList () {
      let _this = this
      getQuestionnaireList(`/${_this.info.id}/questionnaires`).then(res => {
        if (res.status === '0') {
          _this.questionnaireList = res.data
        }
      })
    },

    // 保存或更新患者的问卷
    updateQuestionnaire () {
      let _this = this
      let obj = {
        catAsthma: _this.basicInfo.catAsthma,
        catChestTight: _this.basicInfo.catChestTight,
        catConfidence: _this.basicInfo.catConfidence,
        catCough: _this.basicInfo.catCough,
        catEnergy: _this.basicInfo.catEnergy,
        catInfluence: _this.basicInfo.catInfluence,
        catPhlegm: _this.basicInfo.catPhlegm,
        catSleep: _this.basicInfo.catSleep,
        isCountGtTwo: _this.basicInfo.isCountGtTwo,
        mmrc: _this.basicInfo.mmrc,
        patientId: _this.info.id
        // id: _this.basicInfo.questionnaireId
      }
      updateQuestionnaire(``,
        obj
      ).then(
        res => {
          if (res.status === '0') {
            _this.$message.success('添加成功!')
            _this.$store.commit('QUESTIONNAIREID', res.data.id)
            bus.$emit('queryPatientInfo', {
              isTrue: true,
              isExamine: true
            })
          } else {
            _this.$message.error(res.msg)
          }
        }
      )
    },

    // 查看对应方案
    handleView (id) {
      this.$store.commit('HISTORYQUESTIONNAIREID', id);
      bus.$emit('saveQuestionnaireJump', true)
    }
  },
  watch: {
    info () {
      // this.basicInfo = JSON.parse(JSON.stringify(this.info))
      this.getQuestionnaireList()
    }
  }
}
</script>
<style lang="scss" scoped>
.questionnaire_table {
  margin-bottom: 10px;
  width: 100%;
}
.basic_title_mark {
  counter-reset: red;
}
</style>>
