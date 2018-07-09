<template>
  <div class="wrap">
       <h2 style="border:none;">注册</h2>
    <el-form ref="registerForm" :model="registerForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <!-- 步骤条 -->
      <el-steps id="step" :active="active" finish-status="success" style="margin-bottom:20px">
        <el-step title="基本信息"></el-step>
        <el-step title="个人信息"></el-step>
      </el-steps>
       <div style="width:80%;margin:0 auto;">
        <el-form-item></el-form-item>
        <el-form-item label="注册方式">
         <el-radio v-model="radio" label="1">邮箱注册</el-radio>
          <el-radio v-model="radio" label="2">手机号注册</el-radio>
        
      </el-form-item>
        <el-form-item label="邮件" prop="email" v-if="radio==1">
          <el-input type="text" class="codeInp" v-model="registerForm.email" placeholder="支持邮箱登录"></el-input>
         <el-button @click="cationCode"  class="codeBtn" :disabled='activeBtn' type="primary">{{verificationCode}}</el-button>
        </el-form-item>
        
        <el-form-item label="手机号" prop="mobile" v-else>
          <el-input type="text" v-model="registerForm.mobile"  class="codeInp" placeholder="请输入手机号"></el-input>
           <el-button @click="cationCode"  class="codeBtn" :disabled='activeBtn' type="primary">{{verificationCode}}</el-button>
        </el-form-item>
        <el-form-item label="邮箱验证码" prop="code" v-if="radio==1">
          <el-input type="text" v-model="registerForm.code" class="codeInp" placeholder="请输入验证码" auto-complete="off"></el-input>
       
        </el-form-item>
                <el-form-item label="手机验证码" prop="code" v-else>
          <el-input type="text" v-model="registerForm.code" class="codeInp" placeholder="请输入验证码" auto-complete="off"></el-input>
       
        </el-form-item>
        <!-- <el-form-item label="确认密码" prop="password">
          <el-input type="password" v-model="registerForm.password" placeholder="请输入确认密码" auto-complete="off"></el-input>
        </el-form-item> -->
      <el-form-item>
        <!-- 点击注册成功 -->
        <el-button type="button" style="margin-left:20%;" class="btn" @click="registerDo">开始注册</el-button>
        <span class="main"><router-link to="/">我已有账号,点击登录！</router-link></span>
      </el-form-item>
      </div>
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
  name: "Emails",
  data() {
    return {
      registerForm: {
        email:null,
        mobile: null,
        password: null,
        code: null
      },
      rules: {
        
        mobile: [{ required: true, message: "请输入获取验证", trigger: "blur" }
        ],
         email: [
          { required: true, message: '请输入获取验证', trigger: 'blur' },
           { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        code: [{required:true,message: '请确认验证码', trigger: 'blur'}]
      },
      active: 1,
      radio:'1',
      verificationCode: "点击获取验证码",
      activeBtn:false
      // radio:'2',
    };
  },
  methods: {
    ...mapActions({
      set_user_reg: SET_USER_REG
    }),
  
    // 点击返回上一步
    addPre() {
      this.codeFlag = !this.codeFlag
      if (this.active-- < 2) this.active = 1;
    },
    
    // 倒计时
    setTime: function() {
      let time = 59;
      this.verificationCode = time + '  (s)   ';
      this.activeBtn = true;
      const that = this;
      const cationCode = setInterval(function() {
        time--;
        that.verificationCode = time + '  (s)  ';
        if(time <= 0) {
          that.verificationCode = "获取验证码";
          that.activeBtn = false
          clearInterval(cationCode);
        }
      }, 1000)
    },
    // 点击获取验证码
    cationCode() {
      this.radio==1?this.registerForm.mobile='':this.registerForm.email=''
      this.$fetch.api_user.addCode(Qs.stringify({
        email:this.registerForm.email,
        mobile:this.registerForm.mobile
      }))
      .then(res=>{
        const that = this;
        if(res.code == 0) {
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
          tmail: this.registerForm.email,
          mobile:this.registerForm.mobile,
          code: this.registerForm.code
          // password: this.registerForm.password
        })
        this.$fetch.api_user.register(formData).then(({data,message})=>{
          this.set_user_reg({
            user:data
          });
          this.$message.success(message)
        this.$router.push({ name: "bindMail", params: {code:this.registerForm.code} })
        }).catch(err=>{
           this.$message.warning(err.message)
          // console.log(err)
        })
      })
      
    },

    // 已有账号，返回登录
    addRegister() {
      this.$refs.registerForm.validate(item=>{
        if(item) {
          this.$router.push('/user/login')
        } else {
          return false
        }
      })
    }
  },
};
</script>

<style>
.register_form  .el-input__inner{
  width: 90%;
}

</style>

<style scoped lang="less">
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.register_form{
  float: left;
   width:50%;
   border-right:1px  solid #d5d5d5;
}
.go_login{
  float:right;
  width:50%;
  padding-top: 60px;
 text-align:center;

}
.wrap{
  padding:0 100px 100px;
  /* height: 618px; */
  background:#fff;
}
#setp{
  width:100%;
  background:pink;
  /* margin-left:300px; */
}
#step{
  text-align: center;
  margin-left:30%;
}
.el-steps{
  text-align: center;
}
.active{
  background:#eee;
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
  width:76%;
  float:left;
}
.codeBtn{
  width:18%;
  float:right;
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
}
.btnNext{
  background: #2993f9;
  color: #fff;
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



