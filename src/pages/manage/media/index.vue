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
    <div> <div class="manage_panel p10">
      <div class="manage_info">图文消息 （共{{totalnum}}条）</div>
      <div class="manage_search">
          <el-input class="search_input" v-model="searchWord"  placeholder="标题" suffix-icon="el-icon-search"></el-input>
          <el-button type="success" @click=searchMedia>搜索</el-button>
           <el-button  class="add_tag" @click="createMedia">+新建图文素材</el-button>
      </div>
    </div>
    <div class="card">
      <template>
  <el-table
    :data="table_data"
    style="width: 100%">
    <el-table-column
      label="内容"
      >
      <template slot-scope="scope">
        
        <img :src="scope.row.headImage"  class="media_cover" />
        <!-- <img v-bind:src="scope.row.headImage"  class="media_cover" /> -->
        <span style="margin-left: 10px">{{ scope.row.introduction }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="更新时间"
      width="180">
      <template slot-scope="scope">
        
         <div >
       
           {{ scope.row.updateTime | formatDate}}
          </div>
      </template>
    </el-table-column>
    <el-table-column label="操作"  width="180">
      <template slot-scope="scope">
          <router-link :to="{name: 'savaMedia', params: {id:scope.row.id}}" tag="span">
              <el-button  size="small" icon="edit">编辑</el-button>
            </router-link>
        <!-- <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
        <el-button
          size="mini"
          type="danger"
          @click="removeMedia(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div slot="page" class="mt20 ">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="length"
            layout="total, prev, pager, next"
            :page-count="total">
          </el-pagination>
        </div>
</template> 

    </div></div>
    
  </div>
</template>
<script type="text/javascript">
import { panelTitle, bottomToolBar } from "components";
import { tools_date } from "common/tools";
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
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return tools_date.formatDate(date, "yyyy-MM-dd");
    }
  },
  data() {
    return {
      searchWord:'',
      table_data: null,
      //当前页码
      currentPage: 1,
      //数据总条目
      total: 0,
      //每页显示多少条数据
      length: 10,
      //请求时的loading效果
      load_data: true,
      //消息总条数
      totalnum: 0,
      appNoId:''
    };
  },
  components: {
    panelTitle,
    bottomToolBar
  },
  created() {
     this.appNoId=this.get_user_info.user.appId
    this.get_media_data();
    this.getTotalNum();

    // console.log(this.get_user_info.user); //用戶信息
  },
  methods: {
    searchMedia(){
       this.$fetch.api_media
        .searchmedia(
          Qs.stringify({
            appNoId: this.appNoId,
            searchWord:this.searchWord
          })
        )
        .then(({ message, code, data }) => {
            that.table_data = data.dataList;

          this.currentPage = data.currentPage;
          this.total = data.total;
          this.load_data = false;
        })
        .catch(() => {
         
        });
    },
    removeMedia(row) {
      this.load_data = true;
      const that = this;
      this.$confirm("确认删除标签吗").then(_ => {
        this.$fetch.api_media
          .removemedia(
            Qs.stringify({
              articleId: row.id
            })
          )
          .then(({ message, code, data }) => {
            if (code == 0) {
              this.$message.success(message);
              this.get_media_data();
              this.getTotalNum();
            }
          })
          .catch(() => {
            this.load_data = false;
          });
      });
    },
    getTotalNum() {
      this.load_data = true;
      const that = this;

      this.$fetch.api_media
        .getnum(
          Qs.stringify({
            appNoId: this.appNoId
          })
        )
        .then(({ message, code, data }) => {
          this.totalnum = data;
          this.load_data = false;
        })
        .catch(() => {
          this.load_data = false;
        });
    },
    createMedia() {
      // this.$router.push({name: 'savaMedia', params: {id: props.row.id}})
      this.$router.push("/media/add");
    },
    //刷新
    on_refresh() {
      this.get_media_data();
    },
    //获取数据
    get_media_data() {
      this.load_data = true;
      const that = this;

      this.$fetch.api_media
        .getlist( Qs.stringify({
          appNoId:this.appNoId,
          offset: this.currentPage,
          limit: this.length
        }))
        .then(({ message, code, data }) => {
          that.table_data = data.dataList;

          this.currentPage = data.currentPage;
          this.total = data.total;
          this.load_data = false;
        })
        .catch(() => {
          this.load_data = false;
        });
    },
    //单个删除
    delete_data(item) {
      this.$confirm("此操作将删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.load_data = true;
          this.$fetch.api_table
            .del(item)
            .then(({ msg }) => {
              this.get_media_data();
              this.$message.success(msg);
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    //页码选择
    handleCurrentChange(val) {
      this.currentPage = val;
      this.get_media_data();
    }
  }
};
</script>


<style scoped lang="less">
h3 {
  font-size: 20px;
  line-height: 50px;
}
.mt20 {
  margin-top: 20px;
}
.p10 {
  padding: 10px 20px;
}
.media_cover {
  vertical-align: middle;
  width: 60px;
  height: 60px;
  margin: 10px 0px;
}
.card {
  padding: 10px 20px 20px;
}
.manage_panel {
  .manage_info {
    float: left;
    line-height: 40px;
  }
  .manage_search {
    text-align: right;
    .search_input {
      width: 240px;
    }
  }
}
</style>

