<template>
    <div v-show="showStep === 2">
        <h2 class="drug_plan_header">用药方案</h2>
        <el-table border :data="tableData" :show-header="showHeaderStatus" :default-expand-all="defaultExpandAll">
            <el-table-column v-for="item in columns" v-bind:label="item.label" v-bind:key="item.id" :prop="item.prop"></el-table-column>
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
        showInfo: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    data () {
        return {
            /* 是否显示表头 */
            showHeaderStatus: true,
            /* 默认全展开 */
            defaultExpandAll: true,
            /* 选中的方案 */
            checkedGh: [],
            tableData: [],
            columns: [
                { id: 'drugName', label: '药品名称', prop: 'drugName', align: 'left' },
                { id: 'drugDose', label: '剂量', prop: 'drugDose', align: 'center' },
                { id: 'drugFrequency', label: '频次', prop: 'drugFrequency', align: 'cente' },
                { id: 'drugUsage', label: '给药途径', prop: 'drugUsage', align: 'center' },
                { id: 'total', label: '总量', prop: 'total', align: 'center' }
            ]
        }
    },
    created () { },
    mounted () { },
    methods: {

    },
    filters: {
    },
    watch: {
        showInfo (n, o) {
            let _this = this
            _this.tableData = JSON.parse(JSON.stringify(_this.showInfo))
            _this.tableData = _this.tableData.filter(item => {
                return item.id !== ''
            })
        }
    }
}
</script>

<style scoped>
</style>
