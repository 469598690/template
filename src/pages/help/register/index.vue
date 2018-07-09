<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
      <el-button @click.stop="on_refresh" size="small">
        <i class="fa fa-refresh"></i>
      </el-button>
     
    </panel-title>
    <div>  <el-card><div class="hotQuestion questionList">
        <dl>
            <dd v-for="(list,index) in lists"  :key="index">
                <el-button type="text" @click="list.show=!list.show">{{list.title}}</el-button>
                 <el-collapse-transition>
                <div v-if="list.show" class="ques_detail">{{list.detail}}</div>
                 </el-collapse-transition>
            </dd>
            
        </dl>

    </div>
     </el-card></div>
    
  </div>
</template>

<script>
  import {panelTitle, bottomToolBar} from 'components'
export default {
  name: "register",
  data() {
    return {
      userid:'',
      lists: []
    };
  },
   methods: {
     getData(userid){
      var _this=this;
      this.$axios.post('/help/index',{
        userid:userid,
      })
      .then(function(res){
        //console.log(res.data.articles);
        _this.lists=res.data.articles
        
      })
      .catch(function(err){
        console.log(err);
      });
     }
   },
   mounted(){
     this.getData(this.userid);
   },
  components: {
          panelTitle,
      bottomToolBar
  }
};
</script>

<style scoped lang="less">
.questionList{
   dd {margin: 10px 0px;}
   a{
       text-decoration:none;
       color: #303133;
   }
    .ques_detail{ line-height: 2; text-indent: 32px;}
}


</style>

