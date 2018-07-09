<template>
  <div class="panel msg">
    <panel-title :title="$route.meta.title">
      <el-button @click.stop="on_refresh" size="small">
        <i class="fa fa-refresh"></i>
      </el-button>
      <!-- <router-link :to="{name: 'tableAdd'}" tag="span">
        <el-button type="primary" icon="plus" size="small">添加数据</el-button>
      </router-link> -->
    </panel-title>
    <div > <ul>
      <li class="pl10" v-for="(item, index) in naTxt" :index="item" :key="index" :class="{active:ind==index }" @click="getChange(index)">{{item}}</li>
    </ul>
    <el-card>
     
        <component :is="tabView"></component> 
      
    </el-card></div>
    
  </div>
</template>
<script type="text/javascript">
  import {panelTitle, bottomToolBar} from 'components'

  import select0 from "./component/All";
import select1 from "./component/Check";
export default {
  name: "messagelist",
  data() {
    return {
      naTxt: ["全部消息", "已收藏消息"],
      ind: 0,
      tabView: "select0",
      activeName: "second"
    };
  },
  methods: {
    getChange(end) {
      this.tabView = 'select'+end;
      this.ind = end;
    }
  },
  components: {
    select0,
    select1,
    panelTitle,
     bottomToolBar
  }
};
</script>
<style scoped lang="less">
.pl10{ padding-left: 10px;}
.msg {
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
    }
  }
  el-card {
    background: #eee;
  }
  h5 {
    text-indent: 20px;
    line-height: 60px;
  }
  .info {
    height: 400px;
    p {
      color: #ccc;
      text-align: center;
      line-height: 400px;
    }
  }
}
.active {
  color: skyblue;
}
</style>

