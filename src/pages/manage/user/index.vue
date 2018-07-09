<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
      <el-button @click.stop="on_refresh" size="small">
        <i class="fa fa-refresh"></i>
      </el-button>
      <!-- <router-link :to="{name: 'tableAdd'}" tag="span">
        <el-button type="primary" icon="plus" size="small">添加数据</el-button>
      </router-link> -->
    </panel-title>
    <div class="msg"> 
      <!-- <ul>
      <li v-for="(item, index) in naTxt" :index="item" :key="index" :class="{active:ind==index }" @click=" getChange(index)">{{item}}</li>
    </ul> -->
    <el-card>
     
        <component :is="tabView"></component> 
      
    </el-card></div>
    
  </div>
</template>

<script>
import select0 from "./component/Attendtion";
import select1 from "./component/BlackList";
  import {panelTitle, bottomToolBar} from 'components'
export default {
  name: "UserTag",
  data() {
    return {
      naTxt: ["已关注", "黑名单"],
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

