/* api接口统一管理 */
import { getAxios, postAxios, putAxios, deleteAxios } from './port.js'
// config.js设置跨域接口
let baseScheme = 'http://demo.dfusion.cn:4004/scheme'
let drugUrl = 'http://demo.dfusion.cn:4004/drug'
let patientsUrl = 'http://demo.dfusion.cn:4007/patients'
let doctorUrl = 'http://demo.dfusion.cn:4007/doctor'

/* 子类接口 */
let frequency = drugUrl + '/frequency'
let usage = drugUrl + '/usage'
let info = drugUrl + '/info'
let group = baseScheme + '/group'
let page = patientsUrl + '/page'
let patientsDetail = patientsUrl + '/detail'
let patientsQestionnaire = patientsUrl + '/questionnaire'
let schemePlans = baseScheme + '/plans'

/* 医生登录 */
export const login = (url, param) => postAxios(doctorUrl + url, param)

/* 获得当前的登录医生的信息 */
export const doctorInfo = (url, param) => getAxios(doctorUrl + '/info', param)

/* 获得基础用药方案 */
export const querySchemeTag = (url, param) => getAxios(baseScheme + url, param)

/* 保存基础用药方案 */
export const saveScheme = (url, param) => postAxios(baseScheme + url, param)

/* 获得所有用药频次数据 */
export const queryDrugFrequency = (url, param) => getAxios(frequency + url, param)

/* 获得所有给药途径数据 */
export const queryDrugUsage = (url, param) => getAxios(usage + url, param)

/* 获取所有药品信息数据 */
export const queryDrugInfo = (url, param) => getAxios(info + url, param)

/* 判断并获得患者GOLD分组 */
export const querySchemeGroup = (url, param) => getAxios(group + url, param)

/* 分页查询患者信息 */
export const queryPatientTable = (url, param) => getAxios(page + url, param)

/* 保存患者基本信息 */
export const savePatient = (url, param) => postAxios(patientsUrl + url, param)

/* 根据id获取患者基本信息 */
export const queryPatientInfo = (url, param) => getAxios(patientsDetail + url, param)

/* 更新患者基本信息 */
export const updatePatient = (url, param) => putAxios(patientsUrl + url, param)

/* 根据id删除患者基本信息 */
export const deletePatient = (url, param) => deleteAxios(patientsUrl + url, param)

/* 保存或更新患者的问卷 */
export const updateQuestionnaire = (url, param) => putAxios(patientsQestionnaire + url, param)

/* 根据患者id获取该患者的所有用药方案，方案按时间组合详情 */
export const schemePlanId = (url, param) => getAxios(schemePlans + url, param)

/* 根据用药方案id删除该用药方案 */
export const schemePlanDelete = (url, param) => deleteAxios(schemePlans + url, param)

/* 获取所有诊断及检查列表 */
export const getQuestionnaireList = (url, param) => getAxios(patientsUrl + url, param)
