<template>
    <div v-show="showStep === 0">
        <h2 class="drug_plan_header">基础用药方案</h2>
        <el-table border :data="tableData.scheme">
            <el-table-column label="药品分类" prop="category" aligh="center">
            </el-table-column>
            <el-table-column label="药品名称" min-width="200px">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.id" filterable @change="change(scope, $event)">
                        <el-option v-for="item in scope.row.alternative" :key="item.id" :label="item.drugName" :value="item.id">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="剂量">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.drugDose"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="频次" prop="drugFrequency">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.drugFrequency" filterable placeholder="请选择">
                        <el-option v-for="item in frequencyOptions" :key="item.id" :label="item.frequency" :value="item.frequency">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="给药途径" prop="drugUsage">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.drugUsage" filterable placeholder="请选择">
                        <el-option v-for="item in drugUsageOptions" :key="item.id" :label="item.drugUsage" :value="item.drugUsage">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="总量">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.total"></el-input>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    props: {
        showStep: {
            type: Number,
            default: 0
        },
        basicPlan: {
            type: Object,
            default: () => {
                return {}
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
        }
    },
    data () {
        return {
            tableData: {}
        }
    },
    created () {

    },
    methods: {
        // select实现下拉切换table数据
        change (scope, event) {
            this.tableData.alternative.forEach((item) => {
                if (item.id === event) {
                    this.tableData.scheme[scope.$index].drugDose =
                        item.drugDose
                    this.tableData.scheme[scope.$index].drugFrequency =
                        item.drugFrequency
                    this.tableData.scheme[scope.$index].drugName =
                        item.drugName
                    this.tableData.scheme[scope.$index].drugUsage =
                        item.drugUsage
                }
            })
            this.$forceUpdate()
        }
    },
    watch: {
        basicPlan (n, o) {
            let _this = this
            if (n !== o) {
                let newData = JSON.parse(JSON.stringify(_this.basicPlan))
                _this.tableData = JSON.parse(JSON.stringify(newData))
            }
        }
    }
}
</script>
<style lang="scss" scoped>
</style>
