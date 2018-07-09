<template>
     <div class="u_headimg">
          新头像不允许涉及政治敏感与色情;<br>


图片格式只支持：BMP、JPEG、JPG、GIF、PNG，大小不超过2M

<el-upload
  class="avatar-uploader"
 :action="uploadurl"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
   :data="type" 
  :before-upload="beforeAvatarUpload">

    <el-button  class="avatar-uploader-icon">{{uptext}}</el-button>
  <!-- <i  class="el-icon-plus "></i> -->
</el-upload>

  <img v-show="imageSrc" :src="imageSrc" class="avatar-big">
  <img v-show="imageSrc" :src="imageSrc" class="avatar-small">

         </div>  
</template>
<script>
import {server_base_url} from 'common/fetch'
export default {
   props:["headImage"],    
    data(){
        return {
              uploadurl:server_base_url+'/appNoWebProxy/uploadFile',
             type: {
        suffix: ".png"
        //上传封面传值类型
      },
      imageSrc:this.headImage,
      uptext:'上传头像'

        }
    },
    watch:{
 headImage(newValue, oldValue) {  
     this.imageSrc=newValue
     this.uptext='修改头像'
      console.log(this.imageSrc+'+++++++++++++++');
    //    this.defalutMedia()
    }  
    },
    methods:{
 handleAvatarSuccess(res, file) {
        console.log( res.data)
      this.imageSrc = res.data;
     this.$emit('setimage',this.imageSrc)
      },
      beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
    }

    }
}
</script>
<style scoped>
.u_headimg{ text-align: left; color: #909399; padding: 0px 20px; line-height: 2;}
.avatar-uploader{ margin-top: 20px;}
.avatar-big{ width: 150px; margin-top: 20px; height: 150px; margin-right: 10px;}
.avatar-small{ width: 100px; border-radius: 100px; height: 100px;}
.wrap{ padding-top: 20px;}
</style>

