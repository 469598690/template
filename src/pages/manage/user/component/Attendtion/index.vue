<template>
  <div class="user_tag">
    <div class="user_global_pannel">
     
<el-popover
  placement="bottom"
  width="300"
  v-model="visible2"
  class="add_tag"
  >
  <div>
   <el-input v-model="newtagname" placeholder="请输入标签名称："></el-input>
  </div>
  <div style="text-align: left; margin: 20px 0px">
      <el-button type="primary" size="small" @click="createNewTag">确定</el-button>
    <el-button size="small" type="primary" @click="visible2 = false">取消</el-button>
  
  </div>
  <el-button slot="reference">+新建标签</el-button>
</el-popover>

    <!-- <el-input class="search_input"  placeholder="用户昵称" suffix-icon="el-icon-search"></el-input> -->
    </div>
   <div class="user_tag_container">
      <el-row :gutter="20" style="margin:0px;">
    <el-col :span="18" style=" padding:0px;"><div class="grid-content bg-purple user_inner">
     <div class="user_group_opr">全部用户</div>
     <div class="user_list">
        <div class="userlist_title">
            <div class="group_select">
              
             <el-checkbox  :indeterminate="isIndeterminate"  v-model="ischeckall"  @change="handleCheckAllChange(ischeckall)">全选</el-checkbox>
               <el-popover
  placement="bottom"
  width="400"
 v-model="visible1"
>
  <div class="usercheckbox">

     <el-checkbox-group v-model="checkdtags">
        <el-checkbox  v-for="usertag in usertags" :key="usertag.id" :id="usertag.id" :label="usertag.id"  >{{usertag.name}}</el-checkbox>
     </el-checkbox-group>


  </div>
  <div class="povper_btn">
     <el-button type="primary" size="small" @click="changetags('')">确定</el-button>
  <el-button size="small" type="primary" @click="visible1=false" >取消</el-button>
   
  </div>
  <el-button slot="reference">打标签</el-button>
</el-popover>  
           
              
                <!-- <el-button disabled>加黑名单</el-button> -->
            </div>
        </div>
     
        <div class="user_groups">
          <el-checkbox-group v-model="checkedcontroltags" @change="handleCheckedTagsChange">
            <div class="user_group" v-for="(list,index) in userDataLists" :key="index">
              <div class="user_opr"> 


              
<el-popover
  placement="bottom"
  width="400"
  @show="getchecktags(list.flagList)"
  v-model="list.visible"
>
  <div class="usercheckbox">

     <el-checkbox-group v-model="checkdtags2">
        <el-checkbox  v-for="usertag in usertags" :key="usertag.id" :id="usertag.id" :label="usertag.id"  >{{usertag.name}}</el-checkbox>
     </el-checkbox-group>


  </div>
  <div class="povper_btn">
     <el-button type="primary" size="small" @click="changetags(list.userId,list)">确定</el-button>
  <el-button size="small" type="primary" @click="list.visible=false" >取消</el-button>
   
  </div>
  <el-button slot="reference">修改标签</el-button>
</el-popover>

                </div>
         <div class="user_info">
           <a class="remark_name">
  {{list.userTmail}}
           </a>
           <div class="js_tags">
             
         <a v-for="(flagname,flagindex) in list.flagList" :key="flagindex" class="flag_name">
            {{flagname.name}}
         </a>
           </div>
            <el-popover disabled trigger="hover" placement="left" visible-arrow="false" offset="0">
          <p>
            备注: {{list.tag}}
            <img :v-bind="list.avatar" /> 
            </p>
       
          <div slot="reference" >
            <a class="avatar">  <img v-bind:src="list.avatar" /></a>
          </div>
        </el-popover>
         
            <el-checkbox  class="js_check" :label="list.userId" style="text-indent:-999"  >{{list.name}}</el-checkbox>
           
         </div>
         
         </div></el-checkbox-group>
        </div>
     </div>
      
      </div></el-col>
    <el-col :span="6" style=" padding:0px;"><div class="grid-content bg-purple user_group_list">
      <div class="title_bg pt5 pb5 pl10">全部用户(1)</div>
      <ul class="group_lists">
        <li v-for="(usertag,index) in usertags" :key="index">

             <i class="fa fa-times" aria-hidden="true" title="删除" @click="delTag(usertag.id)"></i>
        
        <el-popover
  placement="bottom"
  width="300"
  v-model="usertag.visible"
  class="add_tag"
  >
  <div>
   <el-input v-model="editTagName" :placeholder="usertag.name"></el-input>
  </div>
  <div style="text-align: left; margin: 20px 0px">
      <el-button type="primary" size="small" @click="editTag(usertag.id)">确定</el-button>
    <el-button size="small" type="primary" @click="usertag.visible = false">取消</el-button>
  
  </div> <i class="fa fa-pencil-square-o" aria-hidden="true" slot="reference" title="编辑"></i>
 
</el-popover>
          {{usertag.name}}(0)

      
        </li>
       
      </ul>
      </div></el-col>
  </el-row>
   </div>
   
  </div>
</template>
<script>
import Qs from "qs";

import {mapActions,mapGetters } from "vuex";
import { GET_USER_INFO } from "store/getters/type";
import store from "store";


export default {
   computed: {
    ...mapGetters({
      get_user_info: GET_USER_INFO
    })
  },
    created(){ 
     this.appid=this.get_user_info.user.appId
    //  console.log(this.appId);
  },
  data() {
    return {
      appid:'',
      userDataLists: [],
      tag: "",
      //当前页码
      currentPage: 1,
      //数据总条目
      total: 0,
      //每页显示多少条数据
      length: 10,
      load_data: false,
      usertags: [],
      //选中的标签
      checkdtags: [],
       //单独用户选中的标签
      checkdtags2:[],

      isIndeterminate: false,
      //all 标签id
      controltags:[],
      //批量选中的用户id
      checkedcontroltags:[],
      //全选值
      ischeckall:false,
      //批量打标签povper默认值
      visible1:false,
      newtagname:'',
      visible2:false,
      editTagName:''
    };
  },
  methods: {
    editTag(id){
       //编辑标签
  this.$fetch.api_usertag.edittag(Qs.stringify({
           userFlagId:id,
          name:this.editTagName
        }))
          .then(({message,code,data}) => {
            if (code == 0) {
             this.$message.success(message)
            this.gettags()
          }
          })
          .catch(() => {
            this.load_data = false
          })
    },
    delTag(id){
       this.$confirm('确认删除标签吗')
          .then(_ => {
               this.$fetch.api_usertag.deletetags(Qs.stringify({
                userFlagId: id
              }))
                .then(({message,code,data}) => {
                  if (code == 0) {
                  this.$message.success(message)
                  this.gettags()
                }
                })
                .catch(() => {
                  this.load_data = false
                })
                })
          .catch(_ => {});
     
   
    },
    createNewTag(){
      
      //新建标签 cratetags
this.$fetch.api_usertag.cratetags(Qs.stringify({
           appNoId: this.appid,
          name: this.newtagname
        }))
          .then(({message,code,data}) => {
            if (code == 0) {
            this.$message.success(message)
            this.gettags();
            this.visible2=false;
          }
          })
          .catch(() => {
            this.load_data = false
          })

     
    },
    handleCheckedTagsChange(value) {
      console.log('checksingle'+value);
      let checkedCount = value.length;
        this.ischeckall = checkedCount === this.controltags.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.controltags.length;
    },
    handleCheckAllChange(val) {
    
    
       this.checkedcontroltags = val ? this.controltags : [];
 
       this.isIndeterminate = false;
    },
    changetags(id,list) {
      var ids = [];
      var userConfig=[]
      id.length==0 ? ids=this.checkedcontroltags :  ids.push(id);
      id.length==0 ? this.visible1=false :  list.visible = false;
    
      id.length==0 ? userConfig=this.checkdtags : userConfig=this.checkdtags2
      if(ids.length==0){
        this.$message.error('请至少选择一个用户')
        return false;
      }
     

      
     this.$fetch.api_usertag.changetags({
          'appNoId': this.appid,
          "idList": ids,
          "userFlagIdList":userConfig
        })
          .then(({message,code,data}) => {
            if (code == 0) {
            this.$message.success(message)
             this.getDataList();
          }
          })
          .catch(() => {
            this.load_data = false
          })
    },
    getchecktags(userFlagIdList) {
      //更改标签获取所在分组
      // this.checkdtags = userFlagIdList;
      let flagIds=[]
     for(let i=0;i<userFlagIdList.length;i++){
      flagIds.push( userFlagIdList[i].flagId)
     }
   this.checkdtags2 = flagIds;
    },
    getDataList() {//获取用户列表
      const that = this;
      this.load_data = true;
      this.$fetch.api_usertag
        .getlist({
          pageNum: this.currentPage,
          pageSize: this.length,
          userFlagId: "0",
          appNoId: this.appid
        })
        .then(({ data }) => {
          that.userDataLists = data.rows;
           that.controltags=[];
            for (var value of that.userDataLists) {
            that.controltags.push(value.userId);
            }
          
          this.currentPage = data.pageNum;
          this.total = data.totalPages;
          this.load_data = false;
        })
        .catch(() => {
          this.load_data = false;
        });
    },
    gettags() {//获取所有标签
      const that = this;
      this.load_data = true;
      this.$fetch.api_usertag
        .gettags({
          appNoId: this.appid
        })
        .then(({ data }) => {
          that.usertags = data;
          var _this = this;
          
      
          that.usertags.map(function(item) {
            //切换显示popover
            _this.$set(item, "visible", false);
          });
          this.load_data = false;
        })
        .catch(() => {
          this.load_data = false;
        });
    }
  },
  mounted() {
    this.getDataList();
    this.gettags();
  }
};
</script>

 <style lang="less" scoped>
@border-color-gray: 1px solid #e7e7eb;
@ft-size: 14px;
.ml10 {
  margin-left: 10px;
}
.pl10 {
  padding-left: 10px;
}
.pt5 {
  padding-top: 5px;
}
.pb5 {
  padding-bottom: 5px;
}
.title_bg {
  background: #f4f5f9;
}
.povper_btn {
  margin-top: 10px;
  padding-top: 20px;
  border-top: @border-color-gray;
}
.user_tag {
  .user_global_pannel {
    min-height: 62px;
    .search_input {
      width: 350px;
      float: left;
      margin-left: 10px;
    }
    .add_tag {
      float: right;
      margin-top: 10px;
      margin-right: 10px;
    }
  }
}
.user_tag_container {
  border: @border-color-gray;
  margin: 0px 10px;
  font-size: @ft-size;
  line-height: 1.5;
  .user_inner {
    border-right: @border-color-gray;
    min-height: 480px;
  }
  .user_group_opr {
    padding: 10px;
  }
  .user_list {
    .flag_name {
      border: 1px solid #9e9e9e;
      padding: 0px 5px;
      border-radius: 5px;
      margin: 0px 5px 0px 0px;
      display: inline-block;
      color: #8d8d8d;
      line-height: 20px;
      font-size: 12px;
    }
    .user_opr {
      position: absolute;
      right: 10px;
      z-index: 200;
    }
    .userlist_title {
      .title_bg;
      .pt5;
      .pb5;
      .pl10;
    }
    .user_group {
      position: relative;
      min-height: 68px;
      border-top: @border-color-gray;
      padding-top: 10px;
      padding-bottom: 10px;
      padding-right: 10px;
      .pl10;
      .user_info {
        position: relative;
        margin-left: 90px;
        word-wrap: break-word;
        word-break: break-all;
        .remark_name {
          line-height: 24px;
        }
        .js_check {
          position: absolute;
          top: 0;
          left: -90px;
        }
        .avatar {
          position: absolute;
          top: 0px;
          left: -65px;
          width: 48px;
          height: 48px;
          overflow: hidden;
          img {
            display: block;
            width: 48px;
            height: 48px;
          }
        }
      }
    }
  }
  .user_group_list {
    .group_lists {
      li {
        line-height: 34px;
        border-bottom: @border-color-gray;
        .pl10;
        padding-right: 20px;
        .fa{
          margin-top: 10px;
          margin-left: 10px;
        }
      }
    }
  }
}
.usercheckbox {
  margin: 10px 0px;
  label {
    margin-bottom: 10px;
    margin-right: 10px;
  }
}
.el-checkbox + .el-checkbox {
  margin: 0px 10px 10px 0px;
}
.js_check .el-checkbox__label{opacity: 0;}
.fa{ cursor: pointer; float: right;}

</style>
