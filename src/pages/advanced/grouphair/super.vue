<template>
  <el-card class="wrap">
    <h3>群发消息</h3>
    <div class="list">
      
      <!-- <ul>
        <li class="active">新建群发</li>
        <li> <el-button type="text" @click="get_media_data">素材库选择</el-button></li>
      </ul> -->
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
    
    <!-- <p class="conn">为保障用户体验，应用号严禁恶意营销以及诱导分享朋友圈，严禁发布色情低，暴力血腥、政治谣言等各类违反法律法规及相关政策规定的信息。一旦发现，将严厉打击和处理。</p> -->
    <div class="box">
      <!-- 富文本编辑器 -->
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <!-- <el-form-item label="作者:" prop="name">
              <el-input v-model="form.author" placeholder="作者:" style="width: 250px;"></el-input>
            </el-form-item> -->
         <el-form-item style="margin-left:-60px;">
               <el-checkbox v-model="checked1">标题:</el-checkbox>  
                 <el-input
                placeholder="请输入标题"
                :controls="false"
                v-model="form.title"
                style="width: 60%;"
                 :disabled="!checked1"
                >
              </el-input>
            </el-form-item>
           <el-form-item style="margin-left:-60px;" >
            
    <el-checkbox v-model="checked2" style="float:left;margin-right:8px;">封面:</el-checkbox>
<el-upload
  class="avatar-uploader"
 action="http://172.31.68.93:9083/yun/upload"
  :show-file-list="false"
  :data="type" 
  :disabled="!checked2"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  
  <img v-if="form.headImage" :src="form.headImage" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
            </el-form-item>
            <el-form-item label="详情内容">
               <el-radio v-model="radio2" label="1">富文本</el-radio>
  <el-radio v-model="radio2" label="2">跳转链接</el-radio>
            </el-form-item>
             <el-form-item  v-if="radio2==1">
<quill-editor
style="height:200px;width:60%; margin-bottom:50px;"
class="quill-editor" 
v-model="form.content"
:options="editorOption"
>

    </quill-editor>

             </el-form-item>
             <el-form-item v-else>
<el-input placeholder="请输入内容" v-model="form.linkUrl" style="width:60%">
    <template slot="prepend">Http://</template>
  </el-input>

             </el-form-item>
               <el-form-item label="摘要:">
              <el-input
                placeholder="请输入摘要"
                :controls="false"
                v-model="form.introduction"

                style="width: 60%;">
              </el-input>
            </el-form-item>
            <el-form-item label="群发对象:" >
            <div class="check_send">
 <el-radio v-model="radio" label="1">选择文件上传</el-radio>
  <el-radio v-model="radio" label="2">输入Tmail地址</el-radio>
<div v-if="radio==1">
 <!-- <el-input v-model="form.file" placeholder="请输入内容" type="file"></el-input> -->
<input type="file"  @change="getFile($event)" />
<div class="tips">文件内tmail地址以逗号隔开，例：a1@tmail.systoon.com,w1@tmail.systoon.com</div>
</div>
<div v-else>
  
<el-input v-model="form.toTmailList" placeholder="请输入内容" style="width:40%"></el-input>
<div class="tips">输入tmail地址以逗号隔开，例：a1@tmail.systoon.com,w1@tmail.systoon.com</div>
</div>

      </div>
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
import axios from "axios";
import { tools_date } from "common/tools";
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  name: "grouphair",
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return tools_date.formatDate(date, "yyyy-MM-dd");
    }
  },
  data() {
    return {
      radio2:'1',//切换正文内容
      checked1:true,//是否勾选标题
       checked2:true,//是否勾选封面
      radio: "1",
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
        type: "png"
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
        file: "",
        toTmailList:'',
        linkUrl:''
      },

      route_id: this.$route.params.id,
      load_data: false,
      on_submit_loading: false,

      rules: {
        author: [{ required: true, message: "姓名不能为空", trigger: "blur" }]
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
      fileList3: []
    };
  },
  methods: {
    getFile: function(event) {
      console.log(this.form.file);
      this.form.file = event.target.files[0];
    },
    handleChange(file, fileList) {
      this.fileList3 = fileList.slice(-3);
    },
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
      let formData = new FormData();
      // formData.append("author", this.form.author);
  // radio2:'1',//切换正文内容
  //     checked1:true,//是否勾选标题
  //      checked2:true,//是否勾选封面
    this.radio2==1 ? this.form.linkUrl='':this.form.content=""
    this.checked1==true ? this.form.title:this.form.title =''
    this.checked2==true ? this.form.headImage:this.form.headImage=''
     
      formData.append("title", this.form.title);
        formData.append("headImage", this.form.headImage);
       formData.append("linkUrl", this.form.linkUrl);
      formData.append("content", this.form.content);
    
      formData.append("introduction", this.form.introduction);
      formData.append("flagId", this.form.flagId);
   
     
    if(this.radio==1){
         formData.append("file", this.form.file) 
this.$fetch.api_media.superSend(formData)
          .then(({message, data,code }) => {
            if(code==0){
 this.$message.success('发送成功');
            }
       
 
          })
          .catch(() => {
            this.load_data = false;
          });
    }else{
       formData.append("toTmailList", this.form.toTmailList)
this.$fetch.api_media.supersendInput(formData)
          .then(({message, data,code }) => {
            if(code==0){
 this.$message.success('发送成功');
            }
       
 
          })
          .catch(() => {
            this.load_data = false;
          });
    }
      
    },
    handleAvatarSuccess(res, file) {
      this.form.headImage = "http://172.31.68.93:9083/" + res.data;
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
          appNoId: 1
        })
        .then(({ data }) => {
          that.usertags = data;
        })
        .catch(() => {
          this.load_data = false;
        });
    }
  },
  components: {
    quillEditor
  },
  created() {
    this.getUtags();
  }
};
</script>

<style  lang="less" scoped>
.ml20 {
  margin-left: 20px;
}
.tips{ font-size: 14px; color:#999;}
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
.box {
  margin-top: 20px;
}
.medialist {
  max-height: 620px;
  overflow-y: auto;
}
</style>
