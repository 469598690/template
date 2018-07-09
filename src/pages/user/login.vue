<template>
  <div class="login-body">
  
    <div class="loginWarp"
         v-loading="load_data"
         element-loading-text="正在登陆中..."
         @keyup.enter="submit_form">
     <div class="login-title">
         <img src="./images/login_logo.png"/> 
      </div>
      <div class="login-form login-card">
        <p class="toptitle">Tmail应用号管理系统</p>
        <el-form ref="form" :model="form" :rules="rules" label-width="120">
          <el-form-item class="login-form-title">邮箱 /手机号</el-form-item>
          <el-form-item prop="bindTmail" class="login-item" >
            <el-input v-model="form.bindTmail" placeholder="支持邮箱 / 手机号登录" class="form-input" :autofocus="true"></el-input>
          </el-form-item>
           <el-form-item class="login-form-title">密码</el-form-item>
          <el-form-item prop="password" class="login-item">
            <el-input type="password" v-model="form.password" placeholder="请输入账户密码：" class="form-input"></el-input>
          </el-form-item>
          <el-form-item class="login-item">
            <el-button size="large" class="form-submit" @click="submit_form">登录</el-button>
           
           <div class="btn_other">
              <a  @click="addLogin" class="fr">注册新账号</a>
              <a  class="fl" >忘记密码?</a> 
             
             </div>   
          </el-form-item>
        </el-form>
      </div>
    </div>
      <div class="login_l_img">
         <!-- <img src="./images/login_logo.png"/>  -->
      </div>
  </div>
</template>
<script type="text/javascript">
import { mapActions } from "vuex";
import { port_user, port_code } from "common/port_uri";
 import {tools_base64} from 'common/tools'
import { SET_USER_INFO } from "store/actions/type";
import Qs from "qs";
export default {
  data() {
    return {
      form: {
        bindTmail: null,
        password: null
      },
      rules: {
        bindTmail: [
          { required: true, message: "请输入账户名！", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入账户密码！", trigger: "blur" }
        ]
      },
      //请求时的loading效果
      load_data: false
    };
  },
  methods: {
    ...mapActions({
      set_user_info: SET_USER_INFO
    }),
    //提交
      //  bindTmail:this.bindTmail,
      //        password:tools_base64.encode(this.password)
      //     })
    submit_form() {
      this.$refs.form.validate(valid => {
        if (!valid) return false;
        this.load_data = true;
        const formdata = Qs.stringify({
                 bindTmail:this.form.bindTmail,
             password:tools_base64.encode(this.form.password)
        });
        //登录提交
        this.$fetch.api_user
          .login(formdata)
          .then(({ data, message }) => {

           
            this.set_user_info({
              user: data,
              login: true
            });
            this.$message.success(message);
            setTimeout(this.$router.push({ path: "/home" }), 500);
          })
          .catch(({ code,message }) => {
            this.load_data = false;
             this.$message.warning(message);
          });
      });
    },
    // 注册新账号
    addLogin() {
      //this.$router.push({path: '/'})
      this.$router.push("/user/register");
    }
  }
};
</script>


<style lang="scss" type="text/scss" rel="stylesheet/scss">
a{ cursor: pointer;}
.login-body{
  min-width: 1240px;
   .login-form-title{
     margin-bottom: 0px;
   }
}
.toptitle
{
      width: 100%;
    text-align: center;
    font-size: 18px;
    color: #444;
    padding: 10px 0 20px;
}
.btn_other{ margin-top: 10px;}
.login_l_img{
  float: right;
    width: 530px;
    height: 440px;
    margin-right: 100px;
     background: url(./images/login-img.png) no-repeat;
     margin-top: 110px;
}
.login-title{
    width: 120px;
    height: 120px;
    border: 5px solid #93defe;
    border-radius: 100px;
    background: #fff;
    margin: 0 auto;
   margin-top: -90px;
  
  
}
.login-title img{
  height: 60px;
  width: 60px;
  margin-top: 20px;
  
}
.login-body {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background:#93defe;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  .loginWarp {
    width: 400px;
    padding: 25px 30px 25px;
    margin: 100px auto;
    background-color: #fff;
    margin-right: 200px;
    border-radius: 5px;
    float: right;
    .login-title {
      margin-bottom: 25px;
      text-align: center;
    }
    .login-item {
      .el-input__inner {
        margin: 0 !important;
      }
    }
    .form-input {
      input {
        margin-bottom: 15px;
        font-size: 12px;
        height: 50px;
        border: 1px solid #eaeaec;
        background: #eaeaec;
        border-radius: 5px;
        color: #555;
      }
    }
    .form-submit {
      width: 100%;
      color: #fff;
      border-color: #27A9E3;
      background: #27A9E3;
      height: 50px;
      &:active,
      &:hover {
        border-color: #27A9E3;
        background: #27A9E3;
      }
    }
  }
}
// .el-form-item__content {
//   margin-left: 120px;
// }
.el-form-item__label {
  text-align: right;
  width: 120px;
}
// .login-body .loginWarp .form-submit {
//   width: 50%;
// }
.btn_reg {
  float: right;
  margin-right: 20px;
  color: #6bc5a4;
  line-height: 40px;
  cursor: pointer;
}
</style>
