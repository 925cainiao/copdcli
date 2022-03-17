<template>
    <div v-show="showStep === 1">
        <h2 class="drug_plan_header">自定义用药方案</h2>
        <el-table class="child_table" width="100%" aligh="center" border :data="tableData.scheme" :show-header="showHeaderStatus">
            >

            <el-table-column label="药品名称" width="250px">
                <template slot-scope="scope">
                    <div v-show="scope.row.isBase">
                        {{ scope.row.drugName }}
                    </div>
                    <div v-show="!scope.row.isBase">
                        <el-select v-model="scope.row.id" filterable @change="change(scope, $event)" placeholder="">
                            <el-option v-for="item in queryDrugInfoOption" :key="item.id" :label="item.drugName" :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="剂量">
                <template slot-scope="scope">
                    <div v-show="scope.row.isBase">
                        {{ scope.row.drugDose }}
                    </div>
                    <div v-show="!scope.row.isBase">
                        <el-input v-model="scope.row.drugDose"></el-input>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="频次" prop="drugFrequency">
                <template slot-scope="scope">
                    <div v-show="scope.row.isBase">
                        {{ scope.row.drugFrequency }}
                    </div>
                    <div v-show="!scope.row.isBase">
                        <el-select v-model="scope.row.drugFrequency" filterable placeholder="">
                            <el-option v-for="item in frequencyOptions" :key="item.id" :label="item.frequency" :value="item.frequency">
                            </el-option>
                        </el-select>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="给药途径" prop="drugUsage">
                <template slot-scope="scope">
                    <div v-show="scope.row.isBase">
                        {{ scope.row.drugUsage }}
                    </div>
                    <div v-show="!scope.row.isBase">
                        <el-select v-model="scope.row.drugUsage" filterable placeholder="">
                            <el-option v-for="item in drugUsageOptions" :key="item.id" :label="item.drugUsage" :value="item.drugUsage">
                            </el-option>
                        </el-select>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="总量">
                <template slot-scope="scope">
                    <div v-show="scope.row.isBase">
                        {{ scope.row.total }}
                    </div>
                    <div v-show="!scope.row.isBase">
                        <el-input v-model="scope.row.total"></el-input>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <div v-show="scope.row.isBase">
                        <el-button type="danger" class="el-icon-delete" @click="removeScheme(scope)">&nbsp;删除</el-button>
                    </div>
                    <div v-show="!scope.row.isBase">
                        <div v-if="scope.$index == tableData.scheme.length - 1">
                            <i class="el-icon-circle-plus" @click="addScheme"></i>
                        </div>
                        <div v-else>
                            <el-button type="danger" class="el-icon-delete" @click="removeScheme(scope)">&nbsp;删除</el-button>
                            <!-- <i class="el-icon-delete"
                 @click="removeScheme(scope)"></i> -->
                        </div>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
// import { queryDrugInfo } from '@/service/api'
export default {
    props: {
        showStep: {
            type: Number,
            default: 0
        },
        queryDrugInfoOption: {
            type: Array,
            default: () => {
                return []
            }
        },
        frequencyOptions: {
            type: Array,
            default: () => {
                return []
            }
        },
        drugUsageOptions: {
            type: Array,
            default: () => {
                return []
            }
        },
        basicPlan: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    data () {
        return {
            showHeaderStatus: true, // 是否显示表头
            defaultExpandAll: true, // 默认全展开
            checkedGh: [], // 选中的方案
            tableData: []
            // drugPlanDetailOption: []
        }
    },
    created () {

    },
    mounted () { },
    methods: {
        // table
        // 实现表格单选
        handleSelectionChange (selection) {
            this.checkedGh = selection[0]
            if (selection.length > 1) {
                this.$refs.tb.clearSelection()
                this.$refs.tb.toggleRowSelection(selection.pop())
            }
        },
        // select实现下拉切换table数据
        change (scope, event) {
            this.queryDrugInfoOption.some((item) => {
                if (item.id === event) {
                    this.tableData.scheme[scope.$index].drugDose =
                        item.drugDose
                    this.tableData.scheme[scope.$index].drugFrequency =
                        item.drugFrequency
                    this.tableData.scheme[scope.$index].drugName =
                        item.drugName
                    this.tableData.scheme[scope.$index].drugUsage =
                        item.drugUsage
                    this.tableData.scheme[scope.$index].total =
                        item.total
                }
                return item.id === event
            })
        },

        // 增加
        addScheme () {
            let obj = {
                drugName: '',
                id: '',
                drugDose: '',
                drugFrequency: '一日1次',
                drugUsage: '吸入',
                total: ''
            }
            this.tableData.scheme.push(obj)
        },

        // 删除
        removeScheme (scope) {
            if (scope.row.isBase) {
                this.$confirm('您确定要删除该行吗？', '消息', {
                    confirmButtonText: '确定',
                    distinguishCancelAndClose: false
                })
                    .then(() => {
                        this.tableData.scheme.splice(scope.$index, 1)
                        this.$forceUpdate()
                    })
                    .catch(() => {

                    })
            } else {
                this.tableData.scheme.splice(scope.$index, 1)
                this.$forceUpdate()
            }
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
    },
    watch: {
        showStep () {
            let _this = this
            if (_this.showStep === 1) {
                let obj = {
                    drugName: '',
                    id: '',
                    drugDose: '',
                    drugFrequency: '一日1次',
                    drugUsage: '吸入',
                    total: ''
                }
                let newData = JSON.parse(JSON.stringify(_this.basicPlan))
                newData.scheme.push(obj)
                _this.tableData = newData
            }
        }
    }
}
</script>

<style scoped>
</style>
