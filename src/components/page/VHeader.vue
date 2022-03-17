<template>
    <el-row class="header_cont">
        <el-col :span="12" align="left">
            <div class="grid-content bg-purple">
                <i class="iconfont icon-fei header_logo"></i><span class="header_name">&nbsp;慢性气道疾病管理与AI辅助诊断决策</span>
            </div>
        </el-col>
        <el-col :span="12" align="right">
            <div class="grid-content bg-purple-light">
                <div class="header_link">
                    <a href="javascript:void(0);"></a>
                    <a href="javascript:void(0);">{{
                        doctorInfo.hospitalName ? doctorInfo.hospitalName : ''
                    }}</a>
                    <a href="javascript:void(0);">{{
                        doctorInfo.doctorName ? doctorInfo.doctorName : ''
                    }}</a>
                    <a href="javascript:void(0);">修改密码</a>
                    <a href="javascript:void(0);" @click="exitSystem">退出系统</a>
                </div>
            </div>
        </el-col>
    </el-row>
</template>
<script>

export default {
    data () {
        return {
            doctorInfo: JSON.parse(sessionStorage.getItem('doctorInfo'))
        }
    },
    methods: {
        exitSystem () {
            sessionStorage.removeItem('doctorInfo')
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('doctorId')
            this.$router.push({ path: '/login' })
        }
    }
}
</script>

<style scoped lang="scss">
.header_logo {
    font-size: 50px;
    color: #d81e06;
    vertical-align: middle;
}
.header_cont {
    padding-top: 5px;
}
</style>
