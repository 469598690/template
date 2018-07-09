<template>
  <div class="panel pb20">
    <panel-title :title="$route.meta.title">
      <el-button @click.stop="on_refresh" size="small">
        <i class="fa fa-refresh"></i>
      </el-button>
      <!-- <router-link :to="{name: 'tableAdd'}" tag="span">
        <el-button type="primary" icon="plus" size="small">添加数据</el-button>
      </router-link> -->
    </panel-title>  
 <el-card class="editor_wrap">
         <el-row>
        <el-col :span="8">
          <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="作者:" prop="name">
              <el-input v-model="form.author" placeholder="作者:" style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="标题:">
              <el-input
                placeholder="请输入标题"
                :controls="false"
                v-model="form.title"
                style="width: 250px;">
              </el-input>
            </el-form-item>
            <el-form-item label="封面:">
            

<el-upload
  class="avatar-uploader"
 action="http://172.31.68.93:9083/yun/upload"
  :show-file-list="false"
  :data="type" 
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="form.headImage" :src="form.headImage" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
            </el-form-item>
             <el-form-item label="正文内容:">
<quill-editor
style="height:500px;width:800px; margin-bottom:50px;"
class="quill-editor" 
v-model="form.content"
:options="editorOption"
>

    </quill-editor>

             </el-form-item>
               <el-form-item label="简介:">
              <el-input
                placeholder="请输入简介"
                :controls="false"
                v-model="form.introduction"
                style="width: 250px;">
              </el-input>
            </el-form-item>
            
            
            <el-form-item>
              <el-button type="primary" @click="on_submit_form" >立即提交</el-button>
              <el-button @click="$router.back()">取消</el-button>
            </el-form-item>
           
          </el-form>
        </el-col>
      </el-row>

   
      </el-card>
     

  </div>
  
</template>
<script>
  import {panelTitle, bottomToolBar} from 'components'
import { quillEditor } from 'vue-quill-editor' //调用编辑器
import Qs from "qs";


import {mapActions,mapGetters } from "vuex";
import { GET_USER_INFO } from "store/getters/type";
import store from "store";
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
export default {
  name: "savemedia", 
   computed: {
    ...mapGetters({
      get_user_info: GET_USER_INFO
    })
  },
    created(){ 
     this.form.appNoId=this.get_user_info.user.appId
       this.route_id && this.get_form_data()
    //  console.log(this.appId);
  },
  data() {
    return {
       fileList: [],
       type:{
         type:'png'
       },
      content: '<h2>请添加图文消息</h2>',
      form: {
          appNoId:'',
          author: '',
          articleId:'',
          isclick: 1,
          title: '',
          content: '',
          headImage: '',
          introduction: '',
          saveType:0
        },
        
        route_id: this.$route.params.id,
        load_data: false,
        on_submit_loading: false,
        
        rules: {
          author: [{required: true, message: '姓名不能为空', trigger: 'blur'}
          ]
          
        },   
      editorOption:{
                    // theme: 'bubble',
                    modules:{
                        toolbar:[
                          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                           ['blockquote', 'code-block']
                        ]
                        
                    }
              }
    }
  },
  components: {
    panelTitle, bottomToolBar
  }, 
  methods:{
    uploadSucess(response, file, fileList){
     
    
     if(response.code==0){
 this.fileList=fileList
     }
    },
//提交
      on_submit_form(){
        var that=this;
        this.$refs.form.validate((valid) => {
          if (!valid) return false
          this.on_submit_loading = true
     
          this.$fetch.api_media.savemedia(Qs.stringify(this.form))
            .then(res => {
              that.$message.success(res.message)
              setTimeout(that.$router.back(-1), 500)
            })
            .catch(() => {
              this.on_submit_loading = false
            })
        })
        
      },
       //获取数据
      get_form_data(){
        this.load_data = true
        this.$fetch.api_media.editmedia(Qs.stringify({
          articleId: this.route_id
        }))
          .then(({data}) => {
           // console.log(data);
          //   appNoId:'1',
          // author: '',
          // isclick: 1,
          // title: '',
          // content: '',
          // headImage: '',
          // introduction: '',
          // saveType:0
            this.form.appNoId = data.appNoId
            this.form.articleId=this.route_id
            this.form.author = data.author
            this.form.isclick = data.isclick
            this.form.title = data.title
            this.form.content = data.content
            this.form.headImage = data.headImage
            this.form.introduction = data.introduction
            this.form.saveType = 1
            
            // this.load_data = false
          })
          .catch(() => {
            this.load_data = false
          })
      },
      handleAvatarSuccess(res, file) {
       
     
        this.form.headImage ='http://172.31.68.93:9083/'+res.data;
      },
      beforeAvatarUpload(file) {
      //  const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

      
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return  isLt2M;
      }
  }
}
</script>
<style lang="less" scoped>
.mt20{
  margin-top: 20px;
}
.ml20{ margin-left: 20px;}
.pb20{
  padding-bottom: 20px;
}
.el-card{ box-shadow:none;}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
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

</style>

