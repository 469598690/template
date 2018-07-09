<template>
  <div>
    <div class="box">
      <!-- 富文本编辑器 -->
      <div class="reply_compart">
            <ul class="reply_ptop">
              <li @click="showindex=0" :class="{selectd : showindex==0}">文字</li>
              <li @click="get_media_data" :class="{selectd : showindex==1}">素材库选择</li>
            </ul>
            <div class="reply_setcontent">
                <div class="reply_switch" v-if="showindex==0">
                  <textarea placeholder="请输入文字" v-model="contentword"></textarea>
                </div>
                <div class="reply_switch" v-else>
                
    <el-card :body-style="{ padding: '0px' }" v-if="setMedia" class="media_card" >
      <div>
      <div class="headimage"> <div :style="{backgroundImage: 'url(' + setMedia.headImage + ')'}"  class="image"></div></div>
     
      <div style="padding: 14px;">
        <span>{{setMedia.introduction}}</span>
        <div class="bottom clearfix">
          <time class="time">{{ setMedia.updateTime | formatDate }}</time>
        
        </div>
      </div>
    
      </div>
     
      <a class="del_media">
        
 <i class="fa fa-pencil-square-o" aria-hidden="true"  @click="get_media_data" title="编辑"></i>
      <i class="fa fa-times" aria-hidden="true" title="删除" @click="setMedia=null"></i>
      </a>
    </el-card>
   


                </div>

            </div>

          </div>
     
    </div>
    <div>
      <el-button type="success" @click="saveKey">保存</el-button>
      <el-button @click="del">取消</el-button>
    </div>
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
</template>

<script>
import { tools_date } from "common/tools";
import Qs from "qs";
export default {
  name: 'Guan',
  props:["parentmsg","appid"],
   filters: {
    formatDate(time) {
      var date = new Date(time);
      return tools_date.formatDate(date, "yyyy-MM-dd");
    }
  },
  data() {
    return {
    
      //是否开启回复
      setMedia: null,
      //选中的素材
      selecteindex: null,
      //素材库所选中索引
      showindex: 0,
      dialogVisible: false,
            contentword: "",
      //文字内容回复内容
      table_data: null,
      //当前页码
      currentPage: 1,
      //数据总条目
      total: 0,
      //每页显示多少条数据
      length: 10,
      //请求时的loading效果
      load_data: true,
      tableData: [
        {
          key: "2016-05-02",
          name: "王小虎",
          cont: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      radio: "1",
      add: true,
      form: {
       appNoId: "",
        author: "",
        title: "",
        introduction: "",
        isClick: "",
        clickUrl: "",
        type: "",
        content: "",
        headImage: "",
        keyWord: ""
      }
    };
  },
  methods: {
    selectdMedia() {
      this.dialogVisible = false;
      this.setMedia = this.table_data[this.selecteindex];
   
      // this.form.author = this.setMedia.author;
      // this.form.title = this.setMedia.title;
      // this.form.content =this. setMedia.content;
      // this.form.headImage =this.setMedia.headImage;
      // this.form.introduction = this.setMedia.introduction;
    },
    get_media_data() {
    
      this.showindex = 1;
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
    //页码选择
    handleCurrentChange(val) {
      this.currentPage = val;
      this.get_media_data();
    },
    handleEdit(index, row) {
      this.$confirm("编辑", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "编辑成功"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "编辑失败"
          });
        });
    },
    handleDelete(index, row) {
      console.log(row);
    },
    indexMethod(index) {
      return index * 2;
    },
    // 添加回复
    addSave() {
      this.add = false;
    },
    // 保存
    saveKey() {
     // alert(this.appid)
      this.form.appNoId = this.appid;
      this.form.type = this.parentmsg;
   
       if (this.showindex == 0) {
        this.form.content = this.contentword;
        this.form.author = "";
        this.form.title = "";
      
        this.form.headImage = "";
        this.form.introduction = "";
      } else {
        this.form.author = this.setMedia.author;
        this.form.title = this.setMedia.title;
        this.form.content = this.setMedia.content;
        this.form.headImage = this.setMedia.headImage;
        this.form.introduction = this.setMedia.introduction;
      }

      this.$fetch.api_reply
        .save(Qs.stringify(this.form))
        .then(({ message }) => {
         
           this.$message.success(message);
           // this.tableData.push(this.form);
          // this.add = true;
        })
        .catch(() => {});
    },
    // 取消
    del() {
      this.add = true;
    }
  }
}
</script>


<style scoped lang="less">
.box{
  margin-bottom:60px;
}
.reply_compart {
  border: 1px solid #e4e8eb;
  min-height: 100px;
  .reply_ptop {
    line-height: 38px;
    border-bottom: 1px solid #e4e8eb;
    .selectd{ color: #44B549}
    li {
      display: inline-block;
      padding: 0px 20px;
      font-size: 14px;
      border-right: 1px solid #e4e8eb;
      cursor: pointer;
    }
  }
  .reply_switch {
    padding: 10px;
    position: relative;
    textarea {
      border: none;

      min-height: 100px;
      width: 100%;
      resize: none;
    }
    .media_card {
      width: 300px;
    }
    .del_media {
      position: absolute;
      left: 360px;
      bottom: 10px;
      .fa {
        cursor: pointer;
        width: 30px;
        height: 30px;
        font-size: 20px;
        color: #666;
      }
    }
  }
}
.item {
  text-align: center;
}
.wrap {
  width: 100%;
  height: 40px;
  position: relative;
}
.inp {
  width: 20%;
  float: left;
}
.btn {
  position: absolute;
  right: 0px;
  top: 0;
}
.table {
  margin: 20px 0;
}
.select {
  float: left;
}
.sel-inp {
  float: left;
  width: 82%;
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

