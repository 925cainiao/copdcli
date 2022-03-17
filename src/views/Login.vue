<template>
  <div class="login_container">
    <div class="login_box">
      <h1 class="login_title">慢性气道疾病管理与AI辅助诊断决策</h1>
      <el-form :model="form" label-width="0" ref="form" :rules="rules" v-loading="loading" class="login_form">
        <el-form-item label="" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input show-password v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm" style="width: 100%">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { login, doctorInfo } from '@/service/api.js'
export default {
  data () {
    return {
      form: {
        phone: '',
        password: ''
      },
      rules: {
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          {
            pattern: this.$reg.mobile,
            message: '手机号码格式不正确',
            trigger: 'blur'
          }
        ],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      },
      loading: false
    }
  },
  methods: {
    // 表格提交
    async submitForm () {
      let self = this
      this.$refs.form.validate(async valid => {
        if (valid) {
          self.loading = true
          self.login()
        }
      })
    },

    // 调用医生登录接口
    login () {
      let self = this
      login(`/login`, {
        phone: this.form.phone,
        password: this.form.password
      }).then(res => {
        self.loading = false
        if (res.status === '0') {
          // 存储token
          sessionStorage.setItem('token', res.data)
          self.doctorInfo()
        } else {
          self.$message.error(res.msg)
        }
      })
    },

    // 获得当前的登录医生的信息
    doctorInfo () {
      let self = this
      doctorInfo(``).then(res => {
        if (res.status === '0') {
          let data = res.data
          sessionStorage.setItem('doctorInfo', JSON.stringify(data))
          sessionStorage.setItem('doctorId', JSON.stringify(data.id))
          self.$router.push({ path: '/index' })
        } else {
          self.$message.error(res.msg)
        }
      }).catch(error => {
        self.$message.error(error)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.login_container {
  width: 100%;
  height: 100vh;
  text-align: center;
  position: absolute;
  background: url(../assets/images/login-bg.a3a8467.jpg) no-repeat;
  background-size: cover;
}
.login_box {
  padding: 20px;
  width: 470px;
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  box-shadow: 0px -1px 0px 0px #eee, -1px 0px 0px 0px #eee, 1px 0px 0px 0px #eee,
    0px 1px 0px 0px #eee;
  border-radius: 5px;
  .login_title {
    margin: 50px auto;
    text-align: center;
    font-weight: normal;
    // color: #333;
    font-size: 26px;
  }
  .login_form {
    padding: 0 24px;
    .el-input__inner {
      height: 44px !important;
    }
  }
}
</style>
