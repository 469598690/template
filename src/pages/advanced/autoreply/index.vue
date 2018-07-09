<template>
  <div class="list">
    <h3>关键词回复</h3>
    <ul>
      <li v-for="(item, index) in lists" :index="item" :key="index" :class="{active : ind==index}" @click="addStyle(index)">{{item.name}}</li>
    </ul>
    <el-card>
      <h3>自动回复</h3>
        <el-switch
  v-model="iscloseReply"
  active-color="#13ce66"
  inactive-color="#ff4949"
  active-text="开启"
  inactive-text="关闭"
  class="fr"
  >
</el-switch>
      <p>
        通过编辑内容或关键词规则，快速进行自动回复设置.如具备开发能力，可更灵活地使用该功能。关闭自动回复之后，将立即对所有用户生效。
      </p>
      <div class="home_box">
        <keep-alive>
          <!-- <div v-for="(item, index) in lists" :index="item" :key="index">{{item.text}}</div> -->
          <component :is="tabView" :message="parentmsg" :appid="appid"></component> 
        </keep-alive>
      </div>
    </el-card>
  </div>
</template>

<script>
import select0 from "./component/Key/index";
import select1 from "./component/Guan/index";//收到消息回复
import select2 from "./component/Guan/index";//被关注回复

import { mapGetters } from "vuex";
import { GET_USER_INFO } from "store/getters/type";
import store from "store";

export default {
  name: "autoreplay",
    computed: {
    ...mapGetters({
      get_user_info: GET_USER_INFO
    })
  },
  created(){ 
     this.appid=this.get_user_info.user.id
  },
  data() {
    return {
        iscloseReply:true,
        parentmsg:0,
        appid:'',
      lists: [
        {
          name: "关键词回复",
          text: '11',
          ind:1
        },
        {
          name: "收到消息回复",
          text:'22',
          ind:2
        },
        {
          name: "被关注回复",
          text:'33',
          ind:3
        }
      ],
      ind: 0,
      tabView: "select0",
      activeName: 'second'
    };
  },
  methods: {
    addStyle(end) {
    
      this.parentmsg=end
      this.tabView = 'select'+end;
      this.ind = end;
    }
  },
  components: {
    select0,
    select1,
    select2
    
  }
};
</script>

<style scoped lang="less">
.fr{ float:right;}
.list {
  p {
    line-height: 40px;
    color: #666;
    font-size:12px;
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
    }
  }
}
.home_box {
  // border: 1px solid #ccc;
  padding: 10px 0px;
  margin-bottom: 10px;
  border-radius: 7px;
}

.active {
  color: skyblue;
}
</style>
