<template>
  <div class="user_tag">
    
   <div class="user_tag_container">
      <el-row>
    <el-col :span="24" style=" padding:0px;"><div class="grid-content  user_inner">
     <div class="user_group_opr">黑名单(10)</div>
     <div class="user_list">
        <div class="userlist_title">
            <div class="group_select">
              <el-checkbox  disabled>全选</el-checkbox>
          
               <el-button disabled class="ml10">移出黑名单</el-button>
            </div>
        </div>
        <div class="user_groups">
            <div class="user_group" v-for="(list,index) in userDataLists" :key="index">
              <div class="user_opr"> <el-button size="small">修改</el-button></div>
         <div class="user_info">
           <a class="remark_name">
             {{list.remark_name}}
           </a>
          
           <a class="avatar">  <img v-bind:src="list.avatar" /></a>
           <el-checkbox  class="js_check"></el-checkbox>
           
         </div>
         
         </div>
        </div>
     </div>
      
      </div></el-col>
 
  </el-row>
   </div>
   
  </div>
</template>
<script>
export default {
   data() {
      return {
        userDataLists:[],
        tag:''
      }
   },
   methods:{
     getDateList(tag){
      var _this=this;
      this.$axios.post('/user_tag/index',{
        tag:tag,
      })
      .then(function(res){
        //console.log(res.data.articles);
        _this.userDataLists=res.data.articles
        
      })
      .catch(function(err){
        console.log(err);
      });
     }
   },
   mounted(){
     this.getDateList(this.tag);
   }
}
</script>

 <style lang="less" scoped>
 @border-color-gray: 1px solid #e7e7eb;
 @ft-size:14px;
 .ml10{ margin-left: 10px;}
 .pl10{ padding-left: 10px;}
 .pt5{ padding-top: 5px;}
 .pb5{ padding-bottom: 5px;}
 .title_bg{ background: #f4f5f9;}
 .user_tag{
   .user_global_pannel{
     min-height: 62px;
    .search_input{
        width: 350px;
        float: left;
        margin-left: 10px;
      
    }
    .add_tag{ float: right; margin-top: 10px; margin-right: 10px;}
 }
 }
 .user_tag_container{
   border:@border-color-gray;
   margin: 0px 10px;
   font-size: @ft-size;
    line-height: 1.5;
   .user_inner {
     min-height:480px;
   }
   .user_group_opr{ padding: 10px;}
   .user_list{
    
     .user_opr{
       float: right;
       margin-right: 10px;
     }
     .userlist_title{
       .title_bg;
       .pt5;
       .pb5;
       .pl10;
       }
     .user_group{
        min-height: 68px;
        border-bottom: @border-color-gray;
        margin-bottom: 10px;
        padding-top: 10px;
        .pl10;
     .user_info{
       position: relative;
       margin-left: 90px;
      word-wrap: break-word;
      word-break: break-all;
      
     .js_check{
       position: absolute;
       top: 0;
       left: -90px;
     }
      .avatar{
         position: absolute;
         top: 0px;
         left: -65px;
          width: 48px; height: 48px;
          overflow: hidden;
         img{ display: block; width: 48px; height: 48px;
         }
      
     }
      }
     }
   }
   .user_group_list{
     .group_lists{
       li{
         line-height: 34px;
          border-bottom: @border-color-gray;
          .pl10;
       }
     }

   }
 }
 
</style>
