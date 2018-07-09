<template>
<div class="collect_msg">
  <div class="collect_title">已收藏的消息({{msgsnum}}条)</div>
  <ul class="message_list mt20">
    <li v-for="(list,index) in table_data" :key="index">
       <div class="message_opr">
         <i v-if="list.isCollect==0" class="el-icon-star-on" title="收藏消息" @click="collect_msg(list.id,list.isCollect)"></i>
          <i v-else style="color:#ffa800" class="el-icon-star-on" title="收藏消息" @click="collect_msg(list.id,list.isCollect)"></i>
        <i class="el-icon-edit" title="回复消息" @click="toggleShow(index,list.isCollect)"></i>
      </div>
      <div class="message_info">
          <div class="message_status"> 
            <span v-show="list.isReply==1" style="color:#e64444">已回复</span>
           
             </div>
          <div class="message_time">
                {{list.updateTime | formatDate}}
          </div>
          <div class="user_info">
            <div class="remark_name">{{list.name}}</div>
            <div class="message_content">{{list.content}}</div>
             <a class="avatar">
              
            </a>
          </div>
      </div>
      <div class="js_reply_box" v-show="isShow==index">
          <textarea ref="content" v-model="evalContents"></textarea>
          <el-button type="success" @click="reply_msg(list,index)">回复消息</el-button>
          <el-button @click="toggleShow(-1)"> 收 起 </el-button>
      </div>
    </li>
   <div slot="page" class="mt20">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="length"
            layout="total, prev, pager, next"
            :page-count="total">
          </el-pagination>
        </div> 
  </ul>
  
</div>
</template>
<script>
  import Qs from 'qs'
  import {tools_date} from 'common/tools'
  export default {
      filters: {
        formatDate(time) {
            var date = new Date(time);
            return tools_date.formatDate(date, 'yyyy-MM-dd');
        }
    },
    data() {
      return {
        table_data: null,
        //当前页码
        currentPage: 1,
        //数据总条目
        total: 0,
        //每页显示多少条数据
        length: 10,
        //批量选择数组
        batch_select: [],
        command:0,
        isShow:-1,
         msgsnum:0,
           evalContents:[]

      }
    },
    methods: {
      on_refresh(){
        this.getcollected();
      },
       collect_msg(id,isCollect){
         this.load_data = true
         isCollect===0 ? isCollect=1:isCollect=0
         console.log(isCollect);
         const param={
           isCollect:isCollect,
           msgId: id
         }
        this.$fetch.api_message.collect( param)
          .then(({code,message}) => {
         if(code==0){
            this.$message.success(message)
            this.on_refresh()
         }
          })
          .catch(() => {
            this.load_data = false
          })
      },
      toggleShow(cur){
         this.isShow==cur ? this.isShow=-1 :this.isShow=cur;
         //console.log(this.isShow);
        
      },reply_msg(list,index){
        const that=this
           const param={
           appNoId:list.appNoId,
           content:this.evalContents,
           toUser: list.toUser,
           replyId:list.replyId,
           isCollect:list.isCollect,
           type:list.type
         }
           this.$fetch.api_message.reply( param)
          .then(({code,message}) => {
         if(code==0){
            this.$message.success(message)
            this.on_refresh();
            that.evalContents=''
         }
          })
          .catch(() => {
            this.load_data = false
          })
      },
      reply_msg(list,index){
        const that=this
           const param={
           appNoId:list.appNoId,
           content:this.evalContents,
           toUser: list.toUser,
           replyId:list.id,
           isCollect:list.isCollect,
           type:list.type
         }
           this.$fetch.api_message.reply( param)
          .then(({code,message}) => {
         if(code==0){
            this.$message.success(message)
            this.on_refresh();
            that.evalContents=''
         }
          })
          .catch(() => {
            this.load_data = false
          })
      },
       //页码选择
      handleCurrentChange(val) {
        this.currentPage = val
        this.getcollected();
      },
      getcollected(){
         const param={
           appNoId:1,
         }
         this.$fetch.api_message.getcollected( Qs.stringify(param))
          .then(({code,message,data}) => {
        ///    console.log(data);
         if(code==0){
            this.table_data=data;
            this.msgsnum=data.length
         }
          })
          .catch(() => {
            this.load_data = false
          })
      }
      
    },
    mounted(){
      this.getcollected();
    }
  }
</script>
<style lang="less" scoped>
.dropdown{ margin-top: 20px; margin-bottom: 20px;}
.mt20{ margin-top: 20px;}
@nice-gray: #e7e7eb;
.el-select__caret {
  .el-input__icon {
    background:blue;
    .el-icon-arrow-up{
      background:red;
      display:inline-block;
    }
  }
}
.message_list{
 
  .js_reply_box{ 
   border-top: 1px solid @nice-gray;
   padding: 0px 40px 0px;
   margin: 10px;
  textarea{ height: 100px;
  resize: none;
  margin: 20px auto;
  display:block;
    width: 100%;
    padding: 5px;
     border:1px solid @nice-gray;
  }

  }
  li:first-child{margin-top: 0px;}
  li{
    min-height: 46px;
    display: list-item;
    text-align:  -webkit-match-parent;
    line-height: 1.6;
    font-size: 14px;
    padding:15px 0px;
    border:1px solid @nice-gray;
    margin-top: 20px;
    .message_opr{
      float: right;
      margin-right: 20px;
      i{ margin-left: 14px;}
    }
    .message_info{
      margin-right: 160px;
      .message_status{
        float: right;
        width: 100px;
        min-height: 1em;
      }
      .message_time{
        float: right;
        width: 108px;
        color: #8d8d8d;
      }
      .user_info{
      margin-left: 80px;
      margin-right: 215px;
      position: relative;
      .remark_name{ color: #222;}
      .message_content{ color: #888;}
      .avatar{
         position:absolute;
         left:-60px;
         top: 0px;
         img{
           width: 48px;
           height: 48px;
           display:block;
         }
      }
     }
    }
   

  }
}
</style>
