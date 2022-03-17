<template>
  <el-container class="slider_container">
    <el-header class="slider_form" style="height: 176px">
      <el-form :model="form" label-width="100px" class="slider_elform">
        <el-form-item label=" 组织机构">
          <el-select v-model="form.organizationId" placeholder="请选择" class="slider_elform_og">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日  期">
          <!-- <el-select v-model="dateType"
                     placeholder="请选择"
                     style="width: 96px;"
                     class="slider_elform_dateType">
            <el-option v-for="item in dateOption"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select> -->
          <el-date-picker v-model="form.date" size="small" align="right" type="daterange" unlink-panels :picker-options="pickerOptions" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" class="slider_elform_date">
          </el-date-picker>
          <el-button type="primary" @click="getList">患者列表</el-button>
        </el-form-item>
        <el-form-item label=" 姓    名">
          <el-input v-model="form.name" placeholder="" style="width: 220px">
          </el-input>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main class="slider_table">
      <el-table ref="sliderTable" :data="table.data" @row-click="handleRowClick" highlight-current-row style="width: 100%" aligh="center" :height="tableHeight" v-loading="isLoading">
        <el-table-column prop="id" label="序号" align="center">
        </el-table-column>
        <el-table-column prop="patientName" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="gender" label="性别" align="center">
          <template slot-scope="scope">
            {{ scope.row.gender | dealGender }}
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄" align="center">
        </el-table-column>
        <el-table-column label="操作" width="80">
          <template slot-scope="scope">
            <i class="el-icon-edit-outline icon_style" @click="editBtn(scope.row)"></i>
            <i class="el-icon-delete icon_style" @click.stop="deleteBtn(scope.row)"></i>
          </template>
        </el-table-column>
      </el-table>
      <div class="slider_pagination">
        <el-pagination small @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="table.currentPage" :page-sizes="table.pageSizes" :page-size="table.numPerPage" layout="total, sizes, prev, pager, next, jumper" :total="table.totalRows">
        </el-pagination>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import bus from '@/assets/bus.js'
import { queryPatientTable, deletePatient } from '@/service/api'
export default {
  data () {
    return {
      // form
      form: {
        organizationId: 1,
        date: '',
        name: ''
      },
      options: [{
        value: 1,
        label: '海峡院'
      }],
      date: '',
      dateType: 0,
      dateOption: [{ label: '检查日期', value: 0 }, { label: '告知日期', value: 1 }],
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },

      /* table start */
      isLoading: false,
      table: {
        currentPage: 1,
        numPerPage: 10,
        lastIndex: 20,
        startIndex: 0,
        totalPages: 1,
        totalRows: 1,
        pageSizes: [10, 20, 50, 100],
        data: [] // 表格数据
      },
      tableClumn: [{ prop: 'id', label: '序号' }, { prop: 'patientName', label: '姓名' }],
      /* table end */

      patientInfo: {},
      tableRowIndex: 0, // 默认选中的行
      tableHeight: 400 // 表格高度
    }
  },
  watch: {
  },
  created () {
    bus.$on('queryPatientTable', params => {
      if (params.isTrue) {
        this.table.currentPage = 1
        this.queryPatientTable()
      }
    })
    this.queryPatientTable()
  },
  mounted () {
    this.getHeight()
    window.addEventListener('resize', this.getHeight)
  },
  methods: {
    // 设置表格高度
    getHeight () {
      this.$nextTick(() => {
        this.tableHeight = window.innerHeight - 285
      })
    },

    // 关闭左侧栏
    closeAside () {
      this.$emit('closeAside', {})
    },

    // 选择页数
    handleSizeChange (size) {
      this.table.numPerPage = size
      this.queryPatientTable()
    },

    // 翻页
    handleCurrentChange (currentPage) {
      this.table.currentPage = currentPage
      this.queryPatientTable()
    },

    // 默认点击
    handleRowClick (row) {
      this.patientInfo = JSON.parse(JSON.stringify(row))
      this.tableRowIndex = this.getArrayIndex(this.table.data, row)
      this.$emit('returnPatientInfo', { info: this.patientInfo })
      if (row.isEdit) { // 若是点击了编辑操作的，赋值完后将状态恢复到初始
        row.isEdit = false
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

    // 获取病人列表
    queryPatientTable () {
      let _this = this
      let obj = {
        pageNum: _this.table.currentPage,
        pageSize: _this.table.numPerPage,
        organizationId: _this.form.organizationId,
        name: _this.form.name,
        measureDateStart: '',
        measureDateEnd: '',
        informDateStart: '',
        informDateEnd: ''
      }
      if (this.form.date) {
        if (_this.dateType === 0) {
          obj.measureDateStart = _this.form.date[0]
          obj.measureDateEnd = _this.form.date[1]
          obj.informDateStart = ''
          obj.informDateEnd = ''
        } else if (_this.dateType === 1) {
          obj.measureDateStart = ''
          obj.measureDateEnd = ''
          obj.informDateStart = _this.form.date[0]
          obj.informDateEnd = _this.form.date[1]
        }
      }
      _this.isLoading = true
      queryPatientTable(``, obj).then(res => {
        _this.isLoading = false
        if (res.status === '0') {
          if (res.data) {
            let data = res.data
            _this.table.data = data.records
            _this.table.currentPage = data.current
            _this.table.numPerPage = data.size
            _this.table.totalRows = data.total
            if (_this.table.data.length > 0) {
              _this.patientInfo = _this.table.data[0]
            } else {
              _this.patientInfo = {}
            }
            _this.$nextTick(() => {
              _this.$refs.sliderTable.setCurrentRow(_this.patientInfo)
              _this.$emit('returnPatientInfo', { info: _this.patientInfo })
            })
            // }
          }
        }
      }).catch(error => {
        _this.isLoading = false
        console.log(error)
      })
    },

    // 获取患者列表
    getList () {
      if (this.dateType === 1) {
        this.$message.error('请将日期选择为检查日期')
      } else {
        this.table.currentPage = 1
        this.queryPatientTable()
      }
    },

    // 删除患者
    deleteBtn (row) {
      let _this = this
      _this.$confirm(`此操作将删除患者"${row.patientName}", 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.deletePatient(row.id)
      }).catch(() => {
        _this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    // 根据id删除患者基本信息
    deletePatient (id) {
      let _this = this
      deletePatient(`/${id}`, {}).then(res => {
        if (res.status === '0') {
          _this.$message.success('操作成功!')
          _this.queryPatientTable()
        } else {
          _this.$message.error(res.msg)
        }
      })
    },

    // 编辑
    editBtn (row) {
      row.isEdit = true
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/styles/base.scss";
.slider_pagination {
  text-align: center;
}
.icon_style {
  padding: 0 5px;
  font-size: 14px;
  color: $basic-color;
  cursor: pointer;
}
</style>
