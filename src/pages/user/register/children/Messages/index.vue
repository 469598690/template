<template>
  <div class="wrap">
    <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" label-width="100px" class="demo-ruleForm">
      <el-form-item></el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input type="text" v-model="registerForm.mobile" placeholder="请输入手机号码" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="短信验证码" prop="message">
        <el-input type="text" v-model="registerForm.message" placeholder="请输入短信验证码" auto-complete="off" class="codeInp"></el-input>
        <el-button @click="cationCode" class="codeBtn" type="primary">{{registerForm.verificationCode}}</el-button>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="registerForm.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <!-- <el-form-item label="确认密码" prop="newPwd">
        <el-input type="password" v-model="registerForm.newPwd" placeholder="请输入确认密码" auto-complete="off"></el-input>
      </el-form-item> -->
      <el-form-item>
        <el-button type="button" class="btn" @click="registerDo">点击注册</el-button>
        <span class="main" @click="addRegister">我已有账号,点击登录！</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import Qs from 'qs'
import { mapActions } from "vuex";
import { port_user, port_code } from "common/port_uri";
import { SET_USER_REG,SET_USER_INFO } from "store/actions/type";
export default {
  name: "Messages",
  data() {
    return {
      registerForm: {
        mobile: "",
        password: "",
        newPwd: "",
        code: "",
        verificationCode: '点击获取验证码'
      },
      rules: {
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 3, max: 12, message: "长度在 3 到 12 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        // newPwd: [{ required: true, message: "确认密码", trigger: "blur" }],
        code: [{ required: true, message: "短信验证", trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapActions({
      set_user_reg: SET_USER_REG
    }),
    // 倒计时
    setTime: function() {
      let time = 59;
      this.registerForm.verificationCode = time + '  (s)   ';
      const that = this;
      const cationCode = setInterval(function() {
        time--;
        that.registerForm.verificationCode = time + '  (s)  ';
        if(time <= 0) {
          that.registerForm.verificationCode = "获取验证码";
          clearInterval(cationCode);
        }
      }, 1000)
    },
    // 点击获取手机验证码
    cationCode() {
      this.$fetch.api_user.addCode(Qs.stringify({
        email:this.registerForm.email,
        mobile:this.registerForm.mobile
      }))
      .then(res=>{
        const that = this;
        if(res.code == 0) {
          console.log('获取验证码成功') 
          that.setTime()
          that.$message.success(res.message);
        } else {
          console.log("找不到");
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    // 点击注册
    registerDo() {
      this.$refs.registerForm.validate(valid=>{
        if(!valid) return false;
        this.load_data = true;
        const formData = Qs.stringify({
          tmail: this.registerForm.tmail,
          mobile:this.registerForm.mobile,
          code: this.registerForm.code,
          password: this.registerForm.password
        })
        this.$fetch.api_user.register(formData).then(({data,message})=>{
          this.set_user_reg({
            user:data
          });
          this.$message.success(message)
          this.addNext()
        }).catch(err=>{
          console.log(err)
        })
      })
    },
    // 已有账号，返回登录
    addRegister() {
      this.$refs['registerForm'].validate(item=>{
        if(item) {
          this.$router.replace('/login')
        } else {
          console.log('error')
          return false
        }
      })
    }
  }
};
</script>

<style scoped>
.wrap{
  height:618px;
  padding:0 100px 100px;
  background:#fff;
}
h2 {
  text-align: center;
  line-height: 50px;
  height: 60px;
  font-weight: 800;
  font-size: 24px;
  border-bottom: 1px solid #ccc;
}
.codeInp{
  width:66%;
  float:left;
  display: inline-block;
}
.codeBtn{
  width:28%;
  float:right;
  display:inline-block;
}
.el-card {
  border-radius: 10px;
}
.el-card.btn {
  text-align: center;
}
.btn {
  background: #2993f9;
  color: #fff;
  /* margin-left:60px; */
}
.el-form-item__label {
  margin-left: -69px;
}
.el-form-item .el-form-item--feedback .is-required {
  margin-left: 20px;
}
.login-card {
  width: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.el-card__body {
  position: absolute;
}
.main {
  position: absolute;
  right: 0px;
  bottom: -8px;
  color: skyblue;
  cursor: pointer;
}
.el-input {
  margin-left: 2px;
  margin-right: 20px;
}
.el-form-item {
  margin-right: 40px;
}

</style>
