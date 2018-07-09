<template>
  <el-card class="wrap">
    <h3>群发消息</h3>
    <div class="list">
      <ul>
        <li class="active">新建群发</li>
        <li> <el-button type="text" @click="get_media_data">素材库选择</el-button></li>
      </ul>
      <el-dialog
  title="素材选择"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <div>
    <el-row class="medialist">
  <el-col :span="10" v-for="(list, index) in table_data" :key="index" :offset=1 >
    <el-card :body-style="{ padding: '0px' }" >
      <!-- <div class="headimage" style="background-image:('list.headImage')" ></div> -->
      <div @mouseover="list.fade=true" @mouseout="list.fade=false" @click="selecteindex=index">
      <div class="headimage"> <div :style="{backgroundImage: 'url(' + list.headImage + ')'}"  class="image"></div></div>
     
      <div style="padding: 14px;">
        <span>{{list.introduction}}</span>
        <div class="bottom clearfix">
          <time class="time">{{ list.updateTime | formatDate }}</time>
        
        </div>
      </div>
      <div class="edit_mask appmsg_mask" v-show="list.fade||index==selecteindex">
        <i class="fa fa-check"></i>
    </div>
      </div>
    </el-card>
  </el-col>
 
</el-row>
 <div slot="page" class="mt20 ">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="length"
            layout="total, prev, pager, next"
            :page-count="total">
          </el-pagination>
        </div>

  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="selectdMedia">确 定</el-button>
  </span>
</el-dialog>
    </div>
    
    <p class="conn">为保障用户体验，应用号严禁恶意营销以及诱导分享朋友圈，严禁发布色情低，暴力血腥、政治谣言等各类违反法律法规及相关政策规定的信息。一旦发现，将严厉打击和处理。</p>
    <div class="box">
      <!-- 富文本编辑器 -->
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <!-- <el-form-item label="作者:" prop="name">
              <el-input v-model="form.author" placeholder="作者:" style="width: 250px;"></el-input>
            </el-form-item> -->
            <el-form-item style="margin-left:-60px;" prop="title" class="resetitem">
               <el-checkbox v-model="checked1" @change="clearError('title')">标题:</el-checkbox>  
                 <el-input
                placeholder="请输入标题"
                :controls="false"
                v-model="form.title"
                style="width: 60%;"
                 :disabled="!checked1"
                >
              </el-input>
            </el-form-item>
           <el-form-item class="resetitem" style="margin-left:-60px; position:relative;" prop="headImage"  >
            
    <el-checkbox v-model="checked2" style="float:left;margin-right:8px;">封面:</el-checkbox>
<el-upload
  class="avatar-uploader"
 :action="uploadurl"
  :show-file-list="false"
  :data="type" 
  :disabled="!checked2"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  
 <div v-if="form.headImage"  @mouseenter="showUpload=true" @mouseleave="showUpload=false">
    <img :src="form.headImage" class="avatar">
     <el-button type="primary" style="position:absolute; top:80px;" v-show="showUpload">重新上传</el-button>
 </div>
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
   
  <!-- <a  >重新上传</a> -->
</el-upload>
            </el-form-item>
             <el-form-item label="详情内容">
               <el-radio v-model="radio2" label="1" @change="clearError()">富文本</el-radio>
  <el-radio v-model="radio2" label="2" @change="clearError()">跳转链接</el-radio>
            </el-form-item>
             <el-form-item  v-if="radio2==1" prop="content">
<quill-editor
style="height:200px;width:60%; margin-bottom:60px;"
class="quill-editor" 
v-model="form.content"
:options="editorOption"
>

    </quill-editor>

             </el-form-item>
             <el-form-item v-else prop="linkUrl">
<el-input placeholder="请输入内容" v-model="form.linkUrl" style="width:60%">
    <template slot="prepend">Http://</template>
  </el-input>

             </el-form-item>
               <el-form-item label="摘要:" prop="introduction">
              <el-input
                placeholder="请输入摘要"
                :controls="false"
                v-model="form.introduction"

                style="width: 60%;">
              </el-input>
            </el-form-item>
             <el-form-item label="群发对象:" class="select">
                   
      <el-dropdown @command="chooseUsertag" trigger="click" class="dropdown">
        <span class="el-dropdown-link">
          {{choosename}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="0">全部用户</el-dropdown-item>
          <el-dropdown-item v-for="(tag,index) in usertags" :key="index" :command="index+1">{{tag.name}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
             </el-form-item>
             <el-form-item >
              <el-button type="primary" @click="on_send" >群发消息</el-button>
             </el-form-item>
        
          </el-form>
    </div>
   
    
  </el-card>
</template>

<script>
import Qs from "qs";
import { tools_date } from "common/tools";
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import {server_base_url} from 'common/fetch'

import {mapActions,mapGetters } from "vuex";
import { GET_USER_INFO } from "store/getters/type";
import store from "store";

export default {
  name: "grouphair",
   computed: {
    ...mapGetters({
      get_user_info: GET_USER_INFO
    })
  },
    created(){ 
     
     this.form.appNoId=this.get_user_info.user.appId
     this.appNoId=this.get_user_info.user.appId
      // this.getUtags(); 
      //暂时取消 订阅标签用户的选择
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return tools_date.formatDate(date, "yyyy-MM-dd");
    }
  },
  data() {
    var validatetitle = (rule, value, callback) => {
        if (value.length>20&&this.checked1) {
          callback(new Error('长度不能大于20个字符'));
        }else if(value.length<=0&&this.checked1){
         callback(new Error('请填写标题'));
        }else{
          callback()
        }
      };
       var validateheadImage = (rule, value, callback) => {
         //封面验证
        if(value.length<=0&&this.checked1){
         callback(new Error('请选择封面'));
        }else{
          callback()
        }
      };
     
     
       var validateMediaCon = (rule, value, callback) => {
         
          //富文本验证
        if(value.length<=0&&this.radio2==1){
         callback(new Error('请填写富文本内容'));
        }else{
          callback()
        }
      };
        var validateLinkUrl = (rule, value, callback) => {
         
          //富文本验证
        if(value.length>200&&this.radio2!=1){
         callback(new Error('url长度不能大于200个字符'));
        }else{
          callback()
        }
      };
    return {
          uploadurl:server_base_url+'/appNoWebProxy/uploadFile',
      appNoId:'',
      radio2: "1", //切换正文内容
      checked1: true, //是否勾选标题
      checked2: true, //是否勾选封面
      selecteindex: null,
      //素材data
      table_data: null,
      //用户分组标签list
      usertags: null,
      //当前页码
      currentPage: 1,
      //数据总条目
      total: 0,
      //每页显示多少条数据
      length: 10,
      //请求时的loading效果
      load_data: true,
      choosename: "全部用户",
      editorOption: {},
      contant: "",
      sendto: "群发",
      currentDate: new Date(),
      dialogVisible: false,
      fileList: [],
      type: {
        suffix: ".png",
        pub:'1'
        //上传封面传值类型
      },
      content: "<h2>请添加图文消息</h2>",
      form: {
        appNoId: "1",
        author: "",
        title: "",
        content: "",
        headImage: "",
        introduction: "",
        flagId: "",
        linkUrl:''
      },

      route_id: this.$route.params.id,
      load_data: false,
      on_submit_loading: false,

      rules: {
        title:[
           { validator: validatetitle, trigger: 'blur' }
            // { min:0, max: 20, message: '长度不能大于20个字符', trigger: 'blur' }
       ],
        headImage:[
           { validator: validateheadImage, trigger: 'blur' }
            // { min:0, max: 20, message: '长度不能大于20个字符', trigger: 'blur' }
       ],
         content:[
           { validator: validateMediaCon, trigger: 'blur' }
            // { min:0, max: 20, message: '长度不能大于20个字符', trigger: 'blur' }
       ],
         linkUrl:[
           { validator: validateLinkUrl, trigger: 'blur' }
            // { min:0, max: 20, message: '长度不能大于20个字符', trigger: 'blur' }
       ],
       
        introduction: [
          { required: true, message: "摘要不能为空", trigger: "blur" },
            { min:0, max: 200, message: '长度不能大于200个字符', trigger: 'blur' }
          ]
      },
      editorOption: {
        // theme: 'bubble',
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // toggled buttons
            ["blockquote", "code-block"]
          ]
        }
      },
      showUpload:false
    };
  },
  methods: {
   
    selectdMedia() {
      this.dialogVisible = false;
      if (this.selecteindex >= 0) {
        var selectdata = this.table_data[this.selecteindex];
        this.form.author = selectdata.author;
        this.form.title = selectdata.title;
        this.form.content = selectdata.content;
        this.form.headImage = selectdata.headImage;
        this.form.introduction = selectdata.introduction;
      }
    },
    get_media_data() {
      this.dialogVisible = true;
      this.load_data = true;
      const that = this;

      this.$fetch.api_media
        .getlist({
          offset: this.currentPage,
          limit: this.length
        })
        .then(({ message, code, data }) => {
          that.table_data = data.dataList;
          that.table_data.map(function(item) {
            //切换显示popover
            that.$set(item, "fade", false);
          });
          this.currentPage = data.currentPage;
          this.total = data.total;
          this.load_data = false;
        })
        .catch(() => {
          this.load_data = false;
        });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // 群发对象
    chooseUsertag(command) {
      var command = command;
      if (command == 0) {
        this.choosename = "全部用户";
        this.flagId = 0;
      } else {
        var command = command - 1;
        this.choosename = this.usertags[command].name;
        this.form.flagId = this.usertags[command].id;
      }
    },
    // 群发消息
    on_send() {
    
      //  console.log(this.form);
      this.radio2 == 1 ? (this.form.linkUrl = "") : (this.form.content = "");
      //原文链接 or 富文本
      this.checked1 == true ? this.form.title : (this.form.title = "");
      this.checked2 == true ? this.form.headImage : (this.form.headImage = "");
      
       let that=this
       this.$refs.form.validate((valid) => {
        
          if (valid) {
              this.$fetch.api_media
            .sendedia(Qs.stringify(this.form))
            .then(({ data, code, message }) => {
              if (code == 0) {
                this.$message.success(message);
              }
              //  console.log(data);
            })
          .catch((err) => {
             this.$message.warning(err.message);
            this.load_data = false;
          });
          } 
        });
        setTimeout(function(){
that.clearError();
        },3000)
     
    },
    handleAvatarSuccess(res, file) {
      // console.log( res.data)
      this.form.headImage = res.data;
       that.$refs.form.clearValidate('headImage')
        //  this.$refs.form.clearValidate();
    },
    beforeAvatarUpload(file) {
      //  const isJPG = file.type === 'image/jpeg';
      var filetype = file.type;
      this.type.type = filetype.substring(6, filetype.length);
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    //页码选择
    handleCurrentChange(val) {
      this.currentPage = val;
      this.get_media_data();
    },
    getUtags() {
      //获取所有标签
      const that = this;
      this.load_data = true;
      this.$fetch.api_usertag
        .gettags({
          appNoId: this.appNoId
        })
        .then(({ data }) => {
          that.usertags = data;
        })
        .catch(() => {
          this.load_data = false;
        });
    },
    clearError(validtype){
    // alert(1);
    
       this.$refs.form.clearValidate(validtype);
    }
  },
  components: {
    quillEditor
  }
};
</script>
<style>
.resetitem .el-form-item__error{
  left: 58px;
}
</style>

<style  lang="less" scoped>
.ml20 {
  margin-left: 20px;
}
.pic {
  width: 100%;
  height: 60px;
  line-height: 60px;
  position: relative;
}
.btn {
  position: absolute;
  right: 20px;
  top: 0;
}
.wrap {
  padding-bottom: 40px;
}
.conn {
  color: #9a9a9a;
  font-size: 14px;
  line-height: 40px;
}
.editer {
  width: 100%;
  height: 300px;
  margin-bottom: 70px;
}
.dropdown {
  border: 1px solid #ccc;
  padding: 5px 10px;
  cursor: pointer;
  line-height: 24px;
}
.dropdown .el-icon-arrow-down .el-icon--right {
  padding-left: 10px;
}
.select > span:first-child {
  margin-left: 0;
}
.select > span {
  margin-left: 50px;
}
.all {
  margin-top: 50px;
}
.list {
  p {
    line-height: 40px;
    color: #666;
    font-size: 12px;
  }
  h3 {
    font-size: 20px;
    line-height: 50px;
  }
  ul {
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
    li {
      display: inline-block;
      line-height: 60px;
      margin-right: 20px;
      cursor: pointer;
      .el-button--text {
        color: #1f2d3d;
      }
    }
  }
}
.active {
  color: skyblue;
}
.mediachoose {
  width: 400px;
  min-height: 200px;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #d9d9d9;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
  border: 1px dashed #d9d9d9;
}
.el-col {
  margin-bottom: 20px;
}
.medialist .el-card {
  position: relative;
}
.headimage {
  height: 200px;
  overflow: hidden;
  margin: 10px;
  border-bottom: 1px solid #d9d9d9;
  padding-bottom: 10px;
}
.headimage .image {
  width: 100%;
  height: 200px;
  background-size: cover;
}
.edit_mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  z-index: 1;
  text-align: center;
  padding: 14px;
}
.edit_mask .fa {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  overflow: hidden;
  z-index: 1;
  font-size: 100px;
}
.medialist {
  max-height: 620px;
  overflow-y: auto;
}

</style>
