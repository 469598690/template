<template>
  <div class="wrap">
    
    <el-form ref="registerForm" :model="registerForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <!-- 步骤条 -->
     
      <!-- 信息 -->
      <div class="clearfix">
        <div class="go_login">
        
       <div class="u_headimg">
       
  <headImageUpload :headImage="registerForm.headImage" @setimage='getimage' />

<!-- 
     新头像不允许涉及政治敏感与色情;<br>
  图片格式只支持：BMP、JPEG、JPG、GIF、PNG，大小不超过2M

<el-upload
  class="avatar-uploader"
 :action="uploadurl"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
   :data="type" 
  :before-upload="beforeAvatarUpload">

    <el-button  class="avatar-uploader-icon">修改头像</el-button>
</el-upload>

  <img v-show="registerForm.headImage" :src="registerForm.headImage" class="avatar-big">
  <img v-show="registerForm.headImage" :src="registerForm.headImage" class="avatar-small"> -->

         </div>  
          
          <!-- <div  style="margin-top:60px;">
           <router-link to="/" >我已有账号,点击登录！</router-link>
          </div> -->
           </div>
        <!-- <person/> -->
        <div class="register_form">
        <!-- 0 公司 -->
        <!-- v-if="registerFrom.type==1" -->
          <el-form-item label="绑定Tmail" prop="bindTmail">
          <el-input type="text" v-model="registerForm.bindTmail" disabled placeholder="请输入绑定Tmail"></el-input>
         <div>
        
           <!-- <span style="color:#909399; font-size:12px;" v-show="check_mshow">
           
               <i class="fa fa-check-circle" aria-hidden="true" style="color:#67C23A" v-if="check_suc">{{check_mmsg}}</i>
               <i class="fa fa-exclamation-circle" aria-hidden="true" style="color:#F56C6C" v-else>   {{
                 check_mmsg}}</i>
          
             </span> -->
         </div>
        </el-form-item>
        <el-form-item label="邮箱" prop="tmail">
          <el-input type="text" v-model="registerForm.tmail" disabled placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input type="text" v-model="registerForm.mobile" disabled placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="registerForm.password" disabled placeholder="请输入密码"></el-input>
        </el-form-item>
         <el-form-item label="名称：" prop="name">
          <el-input type="text" v-model="registerForm.name"  placeholder="请输入名称"></el-input>
        </el-form-item>
         <el-form-item label="地址"  prop="address" >
          <el-input type="text" v-model="registerForm.address" disabled placeholder="请输入地址"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-radio-group v-model="registerForm.type" class="radios" disabled>
            <el-radio  label="1" >公司</el-radio>
            <el-radio  label="2" >个人</el-radio>
            <el-radio  label="3" >应用</el-radio>
          </el-radio-group>
        </el-form-item>
        <div v-if="registerForm.type==1">
        <el-form-item label="公司名称" >
          <el-input type="text" v-model="registerForm.companyName" disabled placeholder="请输入公司名称"></el-input>
        </el-form-item>
        <el-form-item label="注册号" >
          <el-input type="text" v-model="registerForm.registNo" disabled placeholder="请输入注册号"></el-input>
        </el-form-item>
        <el-form-item label="经营范围" >
          <el-input type="text" v-model="registerForm.businessScope" disabled placeholder="请输入经营范围"></el-input>
        </el-form-item>
        <el-form-item label="企业类型" >
          <el-input type="text" v-model="registerForm.companyType" disabled placeholder="请输入企业类型"></el-input>
        </el-form-item>
        <el-form-item label="企业成立时间" >
           <el-date-picker
      v-model="registerForm.foundingTime"
      disabled
      type="date"
      placeholder="选择日期"
       style="width:100%"
      >
    </el-date-picker>
          <!-- <el-input type="text" v-model="registerForm.foundingTime" placeholder="请输入企业成立时间"></el-input> -->
          <!-- <span @click="revise">修改</span> -->
        </el-form-item>
        <el-form-item label="认证时间" >
           <el-date-picker
      v-model="registerForm.verifyTime"
      type="date"
      disabled
      placeholder="选择日期"
      style="width:100%"
      >
    </el-date-picker>
          <!-- <el-input type="text" v-model="registerForm.verifyTime" placeholder="请输入认证时间"></el-input> -->
        </el-form-item>
        <el-form-item label="备注" >
          <el-input type="text" v-model="registerForm.remark" disabled placeholder="请输入备注"></el-input>
        </el-form-item>
        </div>
        <!-- 1 个人 -->
        <div v-else-if="registerForm.type==2">
        <el-form-item label="姓名" >
          <el-input type="text" v-model="registerForm.personName" disabled placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别" >
           <el-radio v-model="registerForm.sex" label="男" disabled>男</el-radio>
  <el-radio v-model="registerForm.sex" label="女" disabled>女</el-radio>
          <!-- <el-input type="text" v-model="registerForm.sex" placeholder="请输入性别"></el-input> -->
        </el-form-item>
        <el-form-item label="地区" >
          <el-input type="text" v-model="registerForm.area" disabled placeholder="请输入地区"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" >
          <el-input type="text" v-model="registerForm.telephone" disabled placeholder="请输入联系方式"></el-input>
        </el-form-item>
      
        </div>
        <div v-else>
        <!-- 2 应用 -->
        <el-form-item label="应用名字" >
          <el-input type="text" v-model="registerForm.appName" disabled placeholder="请输入应用名字"></el-input> 
          <!-- <span @click="revise">修改</span> -->
        </el-form-item>
        <el-form-item label="应用描述" >
          <el-input type="text" v-model="registerForm.appDesc" disabled placeholder="请输入应用描述"></el-input>
        </el-form-item>
       <!-- <el-form-item label="应用号Id" >
          <el-input type="text" v-model="registerForm.id" placeholder="请输入应用号Id"></el-input>
        </el-form-item> -->
        <el-form-item label="安卓下载地址" >
          <el-input type="text" v-model="registerForm.andoridAddress" disabled placeholder="请输入安卓下载地址"></el-input>
        </el-form-item>
        <el-form-item label="苹果下载地址" >
          <el-input type="text" v-model="registerForm.iosAddress" disabled placeholder="请输入苹果下载地址"></el-input>
        </el-form-item>
        <el-form-item label="官网地址" >
          <el-input type="text" v-model="registerForm.developer" disabled placeholder="请输入官网地址"></el-input>
        </el-form-item>
       
        </div>
      
        <el-form-item label="投诉电话" prop="complaintCall">
          <el-input type="text" v-model="registerForm.complaintCall" disabled placeholder="请输入投诉电话"></el-input>
        </el-form-item>
        <el-form-item label="功能描述" prop="funcDesc">
          <el-input type="text" v-model="registerForm.funcDesc" disabled placeholder="请输入功能描述"></el-input>
        </el-form-item>
       
       
      </div>
      <div style="clear:both;"></div>
        <el-button type="primary" class="btn" style="margin-top: 12px; margin-left:30%;" @click="personSave">修改</el-button>
        <!-- <el-button type="button" class="btn" style="margin-top: 12px; margin-left:30%;" @click="addPre">上一步</el-button> -->
        <!-- 点击校验 -->
      </div>
    </el-form>

  </div>
</template>

<script>
import axios from 'axios'
import Qs from 'qs'

import { port_user, port_code } from "common/port_uri";
import { SET_USER_REG,SET_USER_INFO } from "store/actions/type";
import {server_base_url} from 'common/fetch'

import { mapGetters} from "vuex";
import { GET_USER_INFO } from "store/getters/type";
import store from "store";
import {headImageUpload} from 'components'


export default {
  name: "Emails",
  components:{
    headImageUpload
  },
  data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入绑定Tmail'));
        } else {
           let config={
        tmail:this.registerForm.bindTmail,
        tmailtype:2
      }
         this.$fetch.api_user.bindtmail(Qs.stringify(config)).then(res=>{
      let data=JSON.parse(res.data);
      if( data.code==0){
         callback();
      }else{
          callback(new Error(data.message))
      }
    
         
      })
         
        }
      };
    return {
      appNoId:'',
       uploadurl:server_base_url+'/appNoWebProxy/uploadFile',
      //  route_id: this.$route.params.code, 
        check_mshow:false,   
         check_suc:false,
         check_mmsg:'',
        //检测绑定邮箱是否合法  
      registerForm: {
      

        // 绑定信息
        id:'',
        name: null,
        address: null,
        mobile:null,
        complaintCall: null,
        funcDesc: null,
        type: '1',
        bindTmail: '',
        tmail:null,
        companyName: null,
        registNo: null,
        businessScope: null,
        companyType: null,
        foundingTime: null,
        verifyTime: null,
        remark: null,
        personName: null,
        sex: '男',
        area: null,
        telephone: null,
        email: null,
        appName: null,
        appDesc: null,
        andoridAddress: null,
        iosAddress: null,
        webSite: null,
        developer: null,
  headImage:''
        
      },
      
      rules: {
        complaintCall:[
            { required: true, message: '请输入投诉电话', trigger: 'change' }
       ],
        funcDesc:[
            { required: true, message: '请输入功能描述', trigger: 'change' }
       ],
        type:[
            { required: true, message: '请选择类型', trigger: 'change' }
       ],
       mobile:[
             { required: true, message: '请输入电话', trigger: 'blur' }
        ],
        bindTmail:[
          { validator: validatePass, trigger: 'blur' },
             { required: true, message: '请输入绑定Tmail', trigger: 'blur' }
        ],
         address: [
          { required: true, message: "请输入地址", trigger: "blur" }
        ],
        name: [
            { required: true, message: '请输入名称', trigger: 'blur' }
         
          ],
        tmail: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" }
        ],
        password: [{ required: true, message: "确认密码", trigger: "blur" }],
        code: [{required:true,message: '请确认验证码', trigger: 'blur'}]
      },
      active: 2,
      radio:'1',
      verificationCode: "点击获取验证码",
      activeBtn:false
      // radio:'2',
    };
  },
   created(){
      this.appNoId=this.get_user_info.user.appId
      this.getPerson();
  },
   computed: {
    ...mapGetters({
      get_user_info: GET_USER_INFO
    })
  },
  methods: {
    getimage(src){
this.registerForm.headImage=src
    },
  
    getPerson(){
      this.$fetch.api_user.getInfo({
        appNoId:this.appNoId
      }).then(res=>{
        const { code, data } = res.data;
      this.registerForm=res.data
         this.registerForm.type=res.data.type.toString()
      })
      .catch((err) => {
      this.$message.warning(err.message)
       })


    },
    // 绑定应用号信息
    personSave(){
       // baseInfo
      let config={
        appNoId:this.appNoId,
        tmail:this.registerForm.bindTmail,
        headImage:this.registerForm.headImage,
        name:this.registerForm.name
      }
        this.$fetch.api_user.updateBaseInfo(Qs.stringify(config)).then(res=>{
          // alert(2);
          if(res.code==0){
 this.$message.success('修改成功') 
          }
         
          this.getPerson();
       
         
      })
      .catch((err) => {
      
      this.$message.warning(err.message)
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
.u_headimg{ text-align: left; color: #909399; padding: 0px 20px; line-height: 2;}
.avatar-uploader{ margin-top: 20px;}
.avatar-big{ width: 150px; margin-top: 20px; height: 150px; margin-right: 10px;}
.avatar-small{ width: 100px; border-radius: 100px; height: 100px;}
.wrap{ padding-top: 20px;}
</style>



