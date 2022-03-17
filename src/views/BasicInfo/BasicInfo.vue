<template>
    <div class="basicinfo_box">
        <el-row class="basic_header">
            <el-col :span="12">
                <h2>患者基本信息</h2>
            </el-col>
            <el-col :span="12" class="basic_header_btn">
                <div class="display_inline_block" v-show="isReadOnly">
                    <el-button type="primary" @click="isReadOnly = !isReadOnly" v-show="isReadOnly || step === 0">编辑</el-button>
                </div>
                <div class="display_inline_block" v-show="!isReadOnly">
                    <el-button type="primary" @click="confirmBtn">确定</el-button>
                    <el-button type="primary" @click="cancelBtn">取消</el-button>
                </div>
                <div class="display_inline_block">
                    <el-button type="primary" @click="addBtn" v-show="isReadOnly || step === 1">新建</el-button>
                </div>
            </el-col>
        </el-row>
        <div class="basic_cont">
            <el-form :label-position="labelPosition" :inline="true" :model="basicInfo" :rules="rules" class="form_box form_basicinfo" :label-width="labelWidth" :disabled="isReadOnly" ref="basicInfo">
                <el-form-item label="医院">
                    <el-input v-model="doctorInfo.hospitalName" placeholder="" readonly disabled></el-input>
                </el-form-item>
                <el-form-item label="首诊医生">
                    <el-input v-model="basicInfo.doctor" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="患者姓名" prop="patientName">
                    <el-input v-model="basicInfo.patientName" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="gender">
                    <el-select v-model="basicInfo.gender" placeholder="">
                        <el-option :label="item.value" :value="item.label" v-for="(item, index) in $dict.genderList" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input v-model="basicInfo.age" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="身份证号码" prop="idCard">
                    <el-input v-model="basicInfo.idCard" placeholder="" maxlength="18"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="phone">
                    <el-input v-model="basicInfo.phone" maxlength="11" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="居住地址" prop="address">
                    <el-input v-model="basicInfo.address" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="居住地所属" prop="addressType" class="width_all">
                    <el-select v-model="basicInfo.addressType" placeholder="">
                        <el-option :label="item.label" :value="item.value" v-for="(item, index) in addressTypeList" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="家属" prop="contact">
                    <el-radio-group v-model="basicInfo.contact">
                        <el-radio :label="item.label" v-for="(item, index) in contactList" :key="index">{{ item.value }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="联系电话" prop="contactPhone">
                    <el-input v-model="basicInfo.contactPhone" placeholder="" maxlength="11"></el-input>
                </el-form-item>
                <el-form-item label="学历" prop="degree">
                    <el-select v-model="basicInfo.degree" placeholder="">
                        <el-option :label="item.label" :value="item.value" v-for="(item, index) in $dict.degreeList" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="职业" prop="career">
                    <el-select v-model="basicInfo.career" placeholder="">
                        <el-option label="在职或者参加劳动" value="在职或者参加劳动"></el-option>
                        <el-option label="离退休" value="离退休"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="家庭月均收入" prop="monthlyFamilyIncomeEach" class="width_all">
                    <el-radio-group v-model="basicInfo.monthlyFamilyIncomeEach">
                        <el-radio :label="item.label" v-for="(
                                item, index
                            ) in $dict.monthlyFamilyIncomeEach" :key="index">{{ item.value }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="家庭总人口" class="width_all" prop="familyPopulation">
                    <el-input v-model="basicInfo.familyPopulation" placeholder="" style="width: 98px"></el-input>
                    <span class="examine_radio_suffix">(常住一起的家庭成员数量)</span>
                </el-form-item>
                <el-form-item label="民族" prop="race">
                    <el-select v-model="basicInfo.race" placeholder="">
                        <el-option label="城市" value="1"></el-option>
                        <el-option label="农村" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="医保类型" prop="insuranceType" class="form_checkbox basic_checkbox width_all">
                    <el-radio-group v-model="basicInfo.insuranceType">
                        <el-radio :label="item.label" v-for="(item, index) in $dict.insuranceCheckbox" :key="index" @change="insuranceTypeRadioChange"></el-radio>
                    </el-radio-group>
                    <el-input v-model="insuranceType" class="indurance_style" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="初次就诊日期" prop="createTime">
                    <el-date-picker v-model="basicInfo.firstTime" type="date" value-format="yyyy-MM-dd" :picker-options="pickerOptions" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
            </el-form>
        </div>
        <h2 class="basic_title">
            未进行简易肺功能仪筛查的原因(若已进行筛查则不必填写)：
        </h2>
        <div class="basic_cont">
            <el-form label-position="left" :model="basicInfo" class="form_box" label-width="140px" :disabled="isReadOnly">
                <el-form-item label="是否愿意进行筛查？">
                    <el-radio-group v-model="basicInfo.isScreening">
                        <el-radio :label="item.label" v-for="(item, index) in $dict.isScreening" :key="index" @change="screeningChange">{{ item.value }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="不愿意来筛查：" class="reason_checkbox" v-show="basicInfo.isScreening === 0">
                    <el-checkbox-group v-model="type">
                        <el-checkbox :label="item.label" name="type" v-for="(item, index) in $dict.unwillingReason" :key="index"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="愿意进行筛查，但未进行：" class="reason_checkbox" v-show="basicInfo.isScreening === 1">
                    <el-checkbox-group v-model="type">
                        <el-checkbox :label="item.label" name="type" v-for="(item, index) in $dict.willingReason" :key="index"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import bus from '@/assets/bus.js'
import { savePatient, updatePatient } from '@/service/api'
export default {
    props: {
        // 患者基本信息
        info: {
            type: Object,
            default: () => {
                return {}
            }
        },
        // 左侧栏获取的患者信息
        patientInfo: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    data () {
        return {
            doctorInfo: JSON.parse(sessionStorage.getItem('doctorInfo')), // 医生信息
            labelPosition: 'right',
            labelWidth: '110px',
            isReadOnly: true, // form只读
            basicInfo: JSON.parse(JSON.stringify(this.info)),
            resetInfo: {
                registHospital: '', // 医院
                doctor: '', // 首诊医生
                patientName: '', // 病人名
                gender: '', // 性别
                age: '', // 年龄
                idCard: '', // 身份证
                phone: '', // 手机号
                address: '', // 居住地
                addressType: '', // 居住地所属
                contact: '', // 家属
                contactPhone: '', // 联系电话
                degree: '', // 学历
                career: '', // 职业
                monthlyFamilyIncomeEach: '', // 家庭月收入
                familyPopulation: '', // 家庭总人口
                race: '', // 民族
                insuranceType: '', // 医保类型
                firstTime: '', // 首次就诊日期
                isScreening: ''
            },
            rules: {
                // registHospital: [
                //   { required: true, message: '医院不能为空', trigger: 'blur' }
                // ],
                patientName: [
                    { required: true, message: '患者姓名不能为空', trigger: 'blur' }
                ],
                age: [
                    // { required: true, message: '身份证号不能为空', trigger: 'blur' },
                    { pattern: this.$reg.age, message: '年龄区间为1-200', trigger: 'blur' }
                ],
                idCard: [
                    // { required: true, message: '身份证号不能为空', trigger: 'blur' },
                    { pattern: this.$reg.idCard, message: '身份证号码格式不正确', trigger: 'blur' }
                ],
                phone: [
                    { pattern: this.$reg.mobile, message: '手机号格式不正确', trigger: 'blur' }
                ]
            },
            // 时间选择限制
            pickerOptions: {
                disabledDate (time) {
                    return time.getTime() > Date.now()
                }
            },
            type: [], // 意愿
            insuranceType: '', // 自定义保险类型
            insuranceCheckbox: this.$dict.insuranceCheckbox, // 医保选型列表
            addressTypeList: this.$dict.addressTypeList, // 地址选项
            contactList: this.$dict.contactList, // 家属选项
            step: 1 // 是否新增  0 新建 1 更新
        }
    },
    methods: {
        // 重置数据
        resetForm () {
            this.basicInfo = JSON.parse(JSON.stringify(this.resetInfo))
            this.$refs.basicInfo.resetFields()
            // this.basicInfo.registHospital = this.doctorInfo.hospitalId
        },
        // 还原数据
        intForm () {
            this.$refs.basicInfo.clearValidate()
            this.basicInfo = JSON.parse(JSON.stringify(this.info))
        },
        // 是否愿意单选触发
        screeningChange () {
            this.type = []
        },
        // 医保类型切换
        insuranceTypeRadioChange (value) {
            if (value !== '其他付费方式') {
                this.insuranceType = ''
            }
        },
        // 取消编辑
        cancelBtn () {
            this.isReadOnly = true
            this.step = 1
            this.intForm()
        },
        // 新建患者
        addBtn () {
            let _this = this
            _this.$nextTick(() => {
                _this.isReadOnly = false
                _this.step = 0
                _this.resetForm() // 重置患者信息表格
                _this.insuranceType = '' // 重置医保类型
                _this.type = [] // 重置意愿原因
            })
        },
        // 确认按钮
        confirmBtn () {
            let _this = this
            // 如果是新增
            if (_this.step === 0) {
                _this.savePatient()
            } else if (_this.step === 1) {
                _this.updatePatient()
            }
        },
        // 新增接口
        savePatient () {
            let data = JSON.parse(JSON.stringify(this.basicInfo))
            let type = JSON.stringify(this.type)
            let insuranceType = this.insuranceType
            this.$refs.basicInfo.validate(async valid => {
                if (valid) {
                    let obj = {
                        doctorId: sessionStorage.getItem('doctorId') ? sessionStorage.getItem('doctorId') : '',
                        registHospital: data.registHospital,
                        patientName: data.patientName,
                        gender: data.gender,
                        age: data.age,
                        idCard: data.idCard,
                        phone: data.phone,
                        address: data.address,
                        addressType: data.addressType,
                        contact: data.contact,
                        contactPhone: data.contactPhone,
                        degree: data.degree,
                        career: data.career,
                        monthlyFamilyIncomeEach: data.monthlyFamilyIncomeEach,
                        familyPopulation: data.familyPopulation,
                        race: data.race,
                        insuranceType: data.insuranceType === '其他付费方式' ? insuranceType : data.insuranceType,
                        firstTime: data.firstTime,
                        isScreening: data.isScreening,
                        screeningReason: type
                        // ...{ registHospital: this.doctorInfo.registHospital }
                    }
                    savePatient(``, obj).then(res => {
                        if (res.status === '0') {
                            this.$message.success('保存成功')
                            this.step = 1
                            bus.$emit('queryPatientTable', { isTrue: true })
                        } else {
                            this.$message.error(res.msg)
                        }
                    })
                }
            })
        },
        // 修改接口
        updatePatient () {
            let data = JSON.parse(JSON.stringify(this.basicInfo))
            let type = JSON.stringify(this.type)
            let insuranceType = this.insuranceType
            this.$refs.basicInfo.validate(async valid => {
                if (valid) {
                    let obj = {
                        doctorId: sessionStorage.getItem('doctorId') ? sessionStorage.getItem('doctorId') : '',
                        id: data.id,
                        patientId: data.patientId,
                        registHospital: data.registHospital,
                        patientName: data.patientName,
                        gender: data.gender,
                        age: data.age,
                        idCard: data.idCard,
                        phone: data.phone,
                        address: data.address,
                        addressType: data.addressType,
                        contact: data.contact,
                        contactPhone: data.contactPhone,
                        degree: data.degree,
                        career: data.career,
                        monthlyFamilyIncomeEach: data.monthlyFamilyIncomeEach,
                        familyPopulation: data.familyPopulation,
                        race: data.race,
                        insuranceType: data.insuranceType === '其他付费方式' ? insuranceType : data.insuranceType,
                        firstTime: data.firstTime,
                        isScreening: data.isScreening,
                        screeningReason: type
                        // ...{ registHospital: this.doctorInfo.registHospital }
                    }
                    updatePatient(``, obj).then(res => {
                        if (res.status === '0') {
                            this.$message.success('保存成功')
                            this.step = 1
                            bus.$emit('queryPatientTable', {
                                isTrue: true
                            })
                        } else {
                            this.$message.error(res.msg)
                        }
                    })
                }
            })
        }
    },
    watch: {
        info (n, o) {
            this.isReadOnly = true
            // 若isEdit为true，则为编辑
            if (this.patientInfo.isEdit) {
                this.isReadOnly = false
            }
            this.step = 1
            this.$refs.basicInfo.clearValidate()
            this.basicInfo = JSON.parse(JSON.stringify(this.info))
            this.basicInfo.registHospital = this.doctorInfo.hospitalId
        },
        basicInfo (n, o) {
            // 如果返回true,则为定义医保字段，若不为true,则为自定义字段
            if (this.basicInfo.insuranceType !== '' && this.basicInfo.insuranceType) {
                let isTrue = this.$dict.insuranceCheckbox.some(it => {
                    return it.label === this.basicInfo.insuranceType
                })
                if (!isTrue) {
                    this.insuranceType = this.basicInfo.insuranceType
                    this.basicInfo.insuranceType = '其他付费方式'
                } else {
                    this.insuranceType = ''
                }
            } else {
                this.insuranceType = ''
            }
            if (this.basicInfo.screeningReason) {
                if (this.basicInfo.screeningReason.constructor === String) {
                    this.type = JSON.parse(this.basicInfo.screeningReason)
                } else {
                    this.type = []
                }
            }
            this.basicInfo.registHospital = this.doctorInfo.hospitalId
        }
    }
}
</script>
<style scoped lang="scss">
.basic_header {
    padding: 10px 20px;
    font-weight: normal;
    font-size: 12px;
    background: linear-gradient(rgb(255, 255, 255), rgb(242, 242, 242)) 0px 100%
        repeat-x rgb(250, 250, 250);
    border-top: 1px dashed #eee;
    h2 {
        font-size: 13px;
        font-weight: normal;
    }
}
.basic_header_btn {
    text-align: right;
    .el-button--primary {
        padding: 3px 15px;
    }
}
.helle_a {
    color: #000;
}
</style>
