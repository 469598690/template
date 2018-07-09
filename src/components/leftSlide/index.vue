<template>
  <div class="left-side">
    <div class="left-side-inner">
      <router-link to="/" class="logo block">
        <img src="./images/logo.png" alt="AdminX" style="width:80%">
      </router-link>
      <el-menu
      v-if="type!=0"
        class="menu-box"
        theme="dark"
        router
        :default-active="$route.path">
        <div
          v-for="(item, index) in nav_menu_data"
          :key="index">
          <el-menu-item
            class="menu-list"
            v-if="typeof item.child === 'undefined'"
            :index="item.path">
            <i class="icon fa" :class="item.icon"></i>
            <span v-text="item.title" class="text"></span>
          </el-menu-item>
          <el-submenu
            :index="item.path"
            v-else>
            <template slot="title">
              <i class="icon fa" :class="item.icon"></i>
              <span v-text="item.title" class="text"></span>
            </template>
            <el-menu-item
              class="menu-list"
              v-for="(sub_item, sub_index) in item.child"
              :index="sub_item.path"
              :key="sub_index">
              <!--<i class="icon fa" :class="sub_item.icon"></i>-->
              <span v-text="sub_item.title" class="text"></span>
            </el-menu-item>
          </el-submenu>
        </div>
      </el-menu>

      <el-menu
      v-else 
        class="menu-box"
        theme="dark"
        router
        :default-active="$route.path">
        <div
          v-for="(item, index) in sup_menu_data"
          :key="index">
          <el-menu-item
            class="menu-list"
            v-if="typeof item.child === 'undefined'"
            :index="item.path">
            <i class="icon fa" :class="item.icon"></i>
            <span v-text="item.title" class="text"></span>
          </el-menu-item>
          <el-submenu
            :index="item.path"
            v-else>
            <template slot="title">
              <i class="icon fa" :class="item.icon"></i>
              <span v-text="item.title" class="text"></span>
            </template>
            <el-menu-item
              class="menu-list"
              v-for="(sub_item, sub_index) in item.child"
              :index="sub_item.path"
              :key="sub_index">
              <!--<i class="icon fa" :class="sub_item.icon"></i>-->
              <span v-text="sub_item.title" class="text"></span>
            </el-menu-item>
          </el-submenu>
        </div>
      </el-menu>
    </div>
  </div>
</template>
<script type="text/javascript">
 import {mapGetters, mapActions} from 'vuex'
  import {GET_USER_INFO} from 'store/getters/type'
  export default{
    name: 'slide',
     computed: {
      ...mapGetters({
        get_user_info: GET_USER_INFO
      })
    },
    mounted(){
      this.type = this.get_user_info.user.type;
    },
    data(){
      return {
         type:null,
         sup_menu_data:[
           {
          title: "主页",
          path: "/home",
          icon: "fa-home"
        },
            {
            title: '应用号审核',
            path: '/setting/strators'
          },
          {
            title: "文章审核",
            path: "/setting/article"
          },
          {
            title: "系统群发",
            path: "/supersend"
          
        }
         ],
        nav_menu_data: [
          {
          title: "主页",
          path: "/home",
          icon: "fa-home"
        }, 
        {
          title: "功能",
          path: "/advanced",
          icon: "fa-bars",
          child: [
             {
            title: "群发消息",
            path: "/advanced/grouphair"
          },
          {
            title: "自动回复",
            path: "/advanced/autoreplay"
          }, {
            title: "自定义菜单",
            path: "/advanced/menu-setting"
          }
         ]
        },
        {
          title: "管理",
          path: "/manage",
          icon: "fa-magnet",
          child: [{
            title: "消息管理",
            path: "/manage/message"
          }, {
            title: "用户管理",
            path: "/manage/user"
          },
          {
            title: "素材管理",
            path: "/manage/media"
          }
          ]
        },
        {
          title: "统计",
          path: "/analysis",
          icon: "fa-line-chart",
          child: [{
            title: "用户分析",
            path: "/analysis/user"
          }
          ]
        },
        {
          title: "帮助",
          path: "/help",
          icon: "fa-question-circle",
          child: [{
            title: "热门问题",
            path: "/help/hot"
          },
          {
            title: "注册相关",
            path: "/help/register"
          }
          ]
        }
        ,
        {
          title: "设置",
          path: "/setting",
          icon: "fa-address-card-o",
          child: [
             {
            title: "个人信息",
            path: "/setting/info"
          },
          {
            title: "违规记录",
            path: "/setting/record"
          },
          {
            title: "安全中心",
            path: "/setting/security"
          },
          {
            title: "数据更新",
            path: "/setting/update"
          }
          // ,
         
          // {
          //   title: "群发审核",
          //   path: "/setting/groupaudit"
          // },
          // {
          //   title: '文章审核管理',
          //   path: '/setting/article'
          // }
          ]
        },
        {
          title: "开发",
          path: "/develop",
          icon: "fa fa-cogs",
          child: [{
            title: "注册app",
            path: "/develop/code"
          }]
        }
        ]
      }
    }
  }
</script>
