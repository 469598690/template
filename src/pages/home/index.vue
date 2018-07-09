<template>
<div>
<el-card>
  <div class="notice">
    <a class="fr">更多</a>
    <span class="fr">2018-5-30</span>
  <i class="fa fa-bell-o" aria-hidden="true"></i>
  <a>关于应用号信息配置通知应用的测试用例</a>

  </div>
</el-card>
 <el-card class="ind-main">
      <h3>基本情况</h3>
      <dl v-for="(item, index) in text" :index="index" :key="item">
        <dt>{{item}}</dt>
        <dd>0</dd>
      </dl>
    </el-card>
    <el-card>
           
           <div class="search_bar">
           <el-input class="search_input"  placeholder="" suffix-icon="el-icon-search" v-model="searchname"></el-input>
            <el-button type="primary" class="ml10" @click="searchuser">查找</el-button>
           </div>
           <div class="friend_list">
              <ul class="clearfix">
                <li v-for="(sdata,index) in serarchdata" :key="index">
                  <div class="friend_avatar">
                    <img src="http://scloud.toon.mobi/f/8BU+BtXhYJ7lGPjp3qDl0ILCo4lXq4G8feWhuxLsE2YfF.png" />
                  </div>
                  <div class="friend_name">{{sdata.name}}</div>
                  <div class="friend_dec">{{sdata.funcDesc}}</div>
                  <div class="add_friend">
                      <el-button plain  size="small">添加</el-button>
                  </div>
                </li>
              

              </ul>

           </div>
    </el-card>
    <el-card class="ind-main">
      <h3>已群发消息</h3>
      <div class="groupsended">
      <ul>
        <li>
  <span> 2018-5-30</span>
        <div>消息内容</div>

        </li>
      </ul>
       
     


      </div>

    </el-card>

    <!-- <el-card class="ind-btn">
      <button>点击进入</button>
      <p>留下你的足迹吧</p>
    </el-card> -->

    
   

</div>
  
</template>
<script type="text/javascript">
  import {panelTitle} from 'components'
import Qs from "qs";
  export default{
    data(){
      return {
        searchname:'',
        msg: 'home page',
        serarchdata:null,
          text: ["新消息", "新情况", "新成员"]
      }
    },
  methods: {

searchuser(){
  this.$fetch.api_user
            .queryUser(Qs.stringify({
              name:this.searchname
            }))
            .then(({ data }) => {
            //  console.log(JSON.stringify(data.rows));
            this.serarchdata=data.rows

            })
            .catch(() => {});
}
},
    components: {
      panelTitle
    }
  }
</script >
<style lang="less" scoped>
.groupsended{ color: #353535; line-height: 30px;}
.ml10{ margin-left: 10px;}
 .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
.el-card{
  margin-bottom: 20px;
}
.notice{
  .fr{
    float:right;
    margin-left: 10px;
  }
  font-size: 14px;
  i{
    margin-right: 10px;
    color: #353535;
  }
}
.ind-main {
  background: #fff;
  border: 1px solid #eeee;
  box-shadow: 1px 2px 2px #eeee;
  border-radius: 4px;
  padding: 15px;
  margin-top:20px;
  margin-bottom:20px;
  h3 {
    font-weight: 800;
    line-height: 50px;
  }
  dl {
    width: 30%;
    height: 100%;
    display: inline-block;
    text-align: center;
    margin-bottom: 20px;
    dt {
      line-height: 80px;
    }
  }
}
.card-head{
  text-align: center !important;
}
.ind-btn {
  background: #fff;
  border: 1px solid #eeee;
  box-shadow: 1px 2px 2px #eeee;
  border-radius: 4px;
  text-align: center;
  padding: 15px;
  margin-bottom:20px;
  margin-top: 20px;
  button {
    color: #fff;
    background: rgb(85, 197, 85);
    border-radius: 6px;
    border: 0;
    margin-top:20px;
    padding: 10px;
  }
  p {
    line-height: 60px;
    color: #ccc;
  }
}
.ind-bottom{
  background: #fff;
  border: 1px solid #eeee;
  box-shadow: 1px 2px 2px #eeee;
  border-radius: 4px;
  text-align: center;
  padding: 15px;
  margin-top: 20px;
}
 .search_input{ width:80%;}
.friend_list{
  li{
    margin-top: 10px;
     margin-left:90px;
     line-height: 1.5;
     font-size: 14px; 
     position: relative;
     float: left;
     margin-right: 10px;
     .friend_dec{
       margin: 5px 0px;
     }
    .friend_avatar{
      position: absolute;
      left: -90px;
      top: 0px;
      img{
        width: 80px;
        height: 80px;
        display: block;
        border-radius: 80px;
      }
    }
  }
}
</style>
 
