<template>
  <div class="wrap">
    <!-- 从素材库选择-->
    <div v-if="setMedia"  style=" position:relative;border:1px solid #ccc;margin-top:-23px;padding:5px 10px;">
     <p style="border-bottom:1px solid #ccc;"><time class="time">{{ setMedia.updateTime | formatDate }}</time></p>
     <p><img :src="setMedia.headImage" class="imgs"/></p>
     <p>{{setMedia.introduction}}</p>
<div class="del_media">
     <i class="fa fa-pencil-square-o" aria-hidden="true"  @click="get_media_data" title="编辑"></i>
      <i class="fa fa-times" aria-hidden="true" title="删除" @click="removeMedia"></i>
</div>

    </div>
    <dl v-else @click="get_media_data">
      <dt><img src="./images/word.png" class="img"/></dt>
      <dd >从素材库选择</dd>
    </dl>
    <el-dialog
      title="素材选择"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <div>
      <el-row class="medialist">
        <el-col :span="10" v-for="(list, index) in table_data" :key="index" :offset=1 >
          <el-card :body-style="{ padding: '0px' }" >
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
</template>

<script>
import { tools_date } from "common/tools";
import Qs from "qs";
import axios from "axios";

import {mapActions,mapGetters } from "vuex";
import { GET_USER_INFO } from "store/getters/type";
import store from "store";

export default {
  name: "picWord",
   props:["picmedid"],
  mounted(){
    this.defalutMedia()
  },
  watch: {  
    picmedid(newValue, oldValue) {  
       this.defalutMedia()
    }  
}  ,
  data() {
    return {
      appNoId:'',
      load_data: true,
      dialogVisible: false,
      //素材data
      table_data: null,
      //当前页码
      currentPage: 1,
      //数据总条目
      total: 0,
      //每页显示多少条数据
      length: 10,
      selecteindex: null,
      setMedia:null,
      form: {
        appNoId:'1',
        author: '',
        isclick: 1,
        title: '',
        content: '',
        headImage: '',
        introduction: '',
        id:'',
        updateTime:'',
      },
      updateTime:'',
      rules: {
        author: [{required: true, message: '姓名不能为空', trigger: 'blur'}
        ]
      }, 
    };
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return tools_date.formatDate(date, "yyyy-MM-dd");
    }
  },
    computed: {
    ...mapGetters({
      get_user_info: GET_USER_INFO
    })
  },
  created() {
     this.appNoId=this.get_user_info.user.appId
  },
  methods: {
  removeMedia(){
    this.setMedia=null
 this.$emit('getmeid',0);
    },
    selectdMedia() {
      this.dialogVisible = false; 
      if (this.selecteindex >= 0) {
        var selectdata = this.table_data[this.selecteindex];
         this.setMedia = this.table_data[this.selecteindex];
        this.form.author = selectdata.author;
        this.form.isclick = selectdata.isclick;
        this.form.title = selectdata.title;
        this.form.content = selectdata.content;
        this.form.headImage = selectdata.headImage;
        this.form.introduction = selectdata.introduction;
        this.form.id= selectdata.id;
        this.$emit('getmeid',this.form.id);
      }
    },
    //页码选择
    handleCurrentChange(val) {
      this.currentPage = val;
      this.get_media_data();
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // 从素材库选择
    get_media_data() {
      this.dialogVisible = true;
      this.load_data = true;
      const that = this;

      this.$fetch.api_media
        .getlist(
         Qs.stringify( {
           appNoId:this.appNoId,
          offset: this.currentPage,
          limit: this.length
        }))
        .then(({ message, code, data }) => {
          that.table_data = data.dataList;
          that.table_data.map(function(item) {
            //切换显示popover
            // that.$set(item, "fade", false);
          });
          this.currentPage = data.currentPage;
          this.total = data.total;
          this.load_data = false;
        })
        .catch((err) => {
          console.log(err);
          this.$message.warning(err);
          this.load_data = false;
        });
    },
   
   
    defalutMedia(){
       const that = this;
this.$fetch.api_media
        .getlist({
          offset: this.currentPage,
          limit: this.length
        })
        .then(({ message, code, data }) => {
          that.table_data = data.dataList;
            let s_data = that.table_data.find(i=>i.id===this.picmedid)
          that.setMedia=s_data
            //  console.log(that.setMedia);
        that.form.updateTime = s_data.updateTime
        that.form.author = s_data.author;
        that.form.isclick = s_data.isclick;
        that.form.title = s_data.title;
        that.form.content = s_data.content;
        that.form.headImage = s_data.headImage;
        that.form.introduction = s_data.introduction;
        that.form.id=s_data.id
        
        })
        .catch(() => {
          this.load_data = false;
        });
    
    }
  }
};
</script>

<style lang="less" scoped>
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
.img {
  width: 40px;
  height: 40px;
  background-size: cover;
}
.imgs{
  width:100px;
  height: 100px;
  background-size:cover;
}
.wrap {
  display: flex;
  justify-content: center;
  vertical-align: middle;
}
.wrap dl {
  width: 50%;
  text-align: center;
  line-height: 30px;
  margin-top: 30px;
  cursor: pointer;
}
.del_media {
      position: absolute;
      left: 200px;
      bottom: 10px;
      width: 100px;
      .fa {
        cursor: pointer;
        width: 30px;
        height: 30px;
        font-size: 20px;
        color: #666;
      }
    }
</style>
