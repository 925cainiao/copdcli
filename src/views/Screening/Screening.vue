<template>
  <el-container>
    <el-main>
      <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" :model="basicInfo" class="form_box">
        <el-form-item label="性别" :label-width="labelWidth">
          <el-select v-model="basicInfo.gender" placeholder="">
            <el-option :label="item.label" :value="item.value" v-for="(item, index) in $dict.genderList" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" :label-width="labelWidth">
          <el-date-picker v-model="basicInfo.birthdate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" style="width: 190px">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="民族" :label-width="labelWidth">
          <el-select v-model="basicInfo.race" placeholder="">
            <el-option label="城市" value="1"></el-option>
            <el-option label="农村" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职业" :label-width="labelWidth">
          <el-select v-model="basicInfo.career" placeholder="">
            <el-option label="城市" value="1"></el-option>
            <el-option label="农村" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="医疗费用支付方式" class="form_checkbox">
          <el-checkbox-group v-model="costType">
            <el-checkbox :label="item.label" name="type" v-for="(item, index) in $dict.insuranceCheckbox" :key="index"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="暴露史" :label-width="labelWidth">
          <el-select v-model="basicInfo.career" placeholder="">
            <el-option label="城市" value="1"></el-option>
            <el-option label="农村" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="家族史（父亲）" class="form_checkbox">
          <el-checkbox-group v-model="costType">
            <el-checkbox :label="item.label" name="type" v-for="(item, index) in $dict.insuranceCheckbox" :key="index"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="家族史（母亲）" class="form_checkbox">
          <el-checkbox-group v-model="costType">
            <el-checkbox :label="item.label" name="type" v-for="(item, index) in $dict.insuranceCheckbox" :key="index"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="家族史（兄弟姐妹）" class="form_checkbox">
          <el-checkbox-group v-model="costType">
            <el-checkbox :label="item.label" name="type" v-for="(item, index) in $dict.insuranceCheckbox" :key="index"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="家族史（孩子）" class="form_checkbox">
          <el-checkbox-group v-model="costType">
            <el-checkbox :label="item.label" name="type" v-for="(item, index) in $dict.insuranceCheckbox" :key="index"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="生活环境-厨房排风设施">
          <el-select v-model="basicInfo.gender" placeholder="">
            <el-option :label="item.label" :value="item.value" v-for="(item, index) in $dict.genderList" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生活环境-燃料类型" :label-width="labelWidth">
          <el-select v-model="basicInfo.gender" placeholder="">
            <el-option :label="item.label" :value="item.value" v-for="(item, index) in $dict.genderList" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="吸烟史-是否吸烟">
          <el-select v-model="basicInfo.gender" placeholder="">
            <el-option :label="item.label" :value="item.value" v-for="(item, index) in $dict.genderList" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="体育锻炼-是否锻炼" label-width="166px">
          <el-select v-model="basicInfo.gender" placeholder="">
            <el-option :label="item.label" :value="item.value" v-for="(item, index) in $dict.genderList" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="睡眠-时间" label-width="166px">
          <el-select v-model="basicInfo.gender" placeholder="">
            <el-option :label="item.label" :value="item.value" v-for="(item, index) in $dict.genderList" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="睡眠-情况" class="form_checkbox">
          <el-checkbox-group v-model="costType">
            <el-checkbox :label="item.label" name="type" v-for="(item, index) in $dict.insuranceCheckbox" :key="index"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="身高">
          <el-input v-model="basicInfo.height" placeholder="">
            <template>
              <slot slot="suffix" class="input-slot">cm</slot>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="体重">
          <el-input v-model="basicInfo.weight" placeholder="">
            <template>
              <slot slot="suffix" class="input-slot">kg</slot>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="腰围">
          <el-input v-model="basicInfo.height" placeholder="">
            <template>
              <slot slot="suffix" class="input-slot">cm</slot>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="臀围">
          <el-input v-model="basicInfo.weight" placeholder="">
            <template>
              <slot slot="suffix" class="input-slot">cm</slot>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="没感冒时您是否常有咳嗽" style="min-width: 40%">
          <el-radio-group v-model="basicInfo.contact">
            <el-radio :label="item.label" v-for="(item, index) in $dict.isTrueList" :key="index">{{ item.value }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="平时是否有气促">
          <el-radio-group v-model="basicInfo.contact">
            <el-radio :label="item.label" v-for="(item, index) in $dict.isTrueList" :key="index">{{ item.value }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item align="center" class="from_btn">
          <el-button type="primary">智能筛查</el-button>
        </el-form-item>
      </el-form>
      <el-row v-show="false">
        <el-col :span="12">
          <p>诊断结果：慢阻肺高危人群；</p>
          <p>治疗建议：需做肺功能检查，明确是否患慢阻肺</p>
        </el-col>
        <el-col :span="12">
          <div id="pieData" style="width: 100px; height: 100px"></div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入饼图组件
require('echarts/lib/chart/pie')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
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
      labelPosition: 'right',
      labelWidth: '166px',
      basicInfo: {},
      rules: [],
      costType: []
    }
  },
  created () { },
  mounted () {
    this.drawPieEchart()
  },
  methods: {
    drawPieEchart () {
      // 初始化echarts实例
      let myChart = echarts.init(document.getElementById('pieData'))
      // 绘制图表
      myChart.setOption({
        series: [{
          name: '',
          type: 'pie',
          data: [
            { value: 235, name: '视频广告' },
            { value: 274, name: '联盟广告' },
            { value: 310, name: '邮件营销' },
            { value: 335, name: '直接访问' },
            { value: 400, name: '搜索引擎' }
          ]
        }]
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
