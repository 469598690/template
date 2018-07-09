<template>
  <div>
    <!-- 审核管理 -->
    <el-card class="card">
      <h3>审核管理</h3>
      <div class="set">
        <span>姓名：</span><el-input type="text" v-model="search" class="inp" placeholder="请输入姓名"></el-input>
        <span>Tmail：</span><el-input type="text" v-model="tmail" class="inp" placeholder="请输入Tmail"></el-input>
        <span>状态：</span> 
          <el-dropdown @command="on_status" v-model="status" trigger="click" class="dropdown">
            <span class="el-dropdown-link">
              {{status}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="0">公司</el-dropdown-item>
              <el-dropdown-item command="1">个人</el-dropdown-item>
              <el-dropdown-item command="2">应用</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        <span>操作：</span> 
          <el-dropdown @command="on_doing" v-model="doing" trigger="click" class="dropdown">
            <span class="el-dropdown-link">
              {{doing}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="0">查看详情</el-dropdown-item>
              <el-dropdown-item command="1">审核通过</el-dropdown-item>
              <el-dropdown-item command="2">停用</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
      </div>
      <el-table
        :data="tableData"
        class="tables"
        style="width: 100%;">
        <el-table-column
          label="应用号ID"
          type="index"
          width="95"
         >
         <template slot-scope="scope">
            <div>{{ scope.row.appId }}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="姓名"
          style="text-align:center;background:red;"
          >
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="tmail"
          width="270"
         >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.tmail }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="电话"
         >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.mobile }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="地址"
         >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.address }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="备注"
         >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.remark }}</span>
          </template>
        </el-table-column>
        <el-table-column 
          label="操作"
          width="300"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="handleQing(scope.$index, scope.row)">查看详情</el-button>
            <el-button
              v-if="scope.row.status==0"
              size="mini"
              @click="handleEdit(scope.$index, scope.row,1)">审核通过</el-button>
            <el-button
            v-else-if="scope.row.status==1"
              size="mini"
              type="danger"
              @click="handleEdit(scope.$index, scope.row,2)">停用</el-button>
               <el-button
              v-else-if="scope.row.status==2"
              size="mini"
              type="danger"
              @click="handleEdit(scope.$index, scope.row,1)">启用</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="this.pageNum"
          :page-sizes="[this.pageSize]"
          :page-size="this.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="this.totalRecords">
        </el-pagination>
      </div>
      <!-- 查看详情 -->
      <el-dialog title="查看详情" :visible.sync="dialogFormVisible">
        <el-form :model="menu">
          <!-- 公司 -->
          <div v-if="type==1">
            <el-form-item label="应用号ID：" :label-width="formLabelWidth">
              <div class="item">{{menu.appId}}</div>
            </el-form-item>
            <el-form-item label="经营范围：" :label-width="formLabelWidth">
              <div class="item">{{menu.businessScope}}</div>
            </el-form-item>
            <el-form-item label="公司名称：" :label-width="formLabelWidth">
              <div class="item">{{menu.companyName}}</div>
            </el-form-item>
            <el-form-item label="企业类型：" :label-width="formLabelWidth">
              <div class="item">{{menu.companyType}}</div>
            </el-form-item>
            <el-form-item label="企业成立时间：" :label-width="formLabelWidth">
              <div class="item">{{menu.foundingTime}}</div>
            </el-form-item>
            <el-form-item label="注册号：" :label-width="formLabelWidth">
              <div class="item">{{menu.registNo}}</div>
            </el-form-item>
            <el-form-item label="备注：" :label-width="formLabelWidth">
              <div class="item">{{menu.remark}}</div>
            </el-form-item>
            <el-form-item label="更新时间：" :label-width="formLabelWidth">
              <div class="item">
                    {{  menu.updateTime | formatDate}}
                </div>
            </el-form-item>
            <el-form-item label="认证时间：" :label-width="formLabelWidth">
              <div class="item">
                   {{  menu.verifyTime | formatDate}}
                </div>
            </el-form-item>
          </div>
          <!-- 个人 -->
          <div v-if="type==2">
            <el-form-item label="应用号ID：" :label-width="formLabelWidth">
              <div class="item">{{menu.appId}}</div>
            </el-form-item>
            <el-form-item label="地区：" :label-width="formLabelWidth">
              <div class="item">{{menu.area}}</div>
            </el-form-item>
            <el-form-item label="邮箱地址：" :label-width="formLabelWidth">
              <div class="item">{{menu.email}}</div>
            </el-form-item>
            <el-form-item label="姓名：" :label-width="formLabelWidth">
              <div class="item">{{menu.personName}}</div>
            </el-form-item>
            <el-form-item label="性别：" :label-width="formLabelWidth">
              <div class="item">{{menu.sex}}</div>
            </el-form-item>
            <el-form-item label="联系方式：" :label-width="formLabelWidth">
              <div class="item">{{menu.telelphone}}</div>
            </el-form-item>
            <el-form-item label="更新时间：" :label-width="formLabelWidth">
              <div class="item">
                <!-- {{menu.updateTime}} -->
                 {{  menu.updateTime | formatDate}}
                </div>
            </el-form-item>
          </div>
          <!-- 应用 -->
          <div v-if="type==3">
            <el-form-item label="应用号ID：" :label-width="formLabelWidth">
              <div class="item">{{menu.appId}}</div>
            </el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
      
    </el-card>
  </div>
</template>

<script>
import Vuex from 'vuex'
import store from 'store' 
import axios from 'axios'
import Qs from 'qs'
import { tools_date } from "common/tools";
export default {
  name: 'strators',
  data() {
    return{
      tableData: null,
      pageNum:null,//页码
      pageSize:null,//页码大小
      length:0,
      totalPages:null,
      totalRecords:null,
      currentPage:1 ,//当前页码
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      menu: {},
      type:null,
      status: '公司',
      doing: '查看详情',
      search:'',
      tmail: '',
      status: '',
      doing: '',
      articleData: null // 文章审核
    }
  },
  
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return tools_date.formatDate(date, "yyyy-MM-dd");
    }
  },
  methods: {
    // 查询应用号
    queryApp(){
      this.$fetch.api_setting.query(this.tableData).then(res=>{
        this.tableData = res.data.rows
        this.pageNum = res.data.pageNum
        this.pageSize = res.data.pageSize
        this.totalPages = res.data.totalPages
        this.totalRecords = res.data.totalRecords
      }).catch(err=>{
        console.log(err+'err')
      })
    },
    // 查看详情  
    handleQing(index, row){
      const that = this;
      console.log(row);
      this.$fetch.api_setting.details({
        appNoId:row.appId
      }).then(res=>{
        // console.log(res.data)
        //  console.log(row)
        this.dialogFormVisible = true
        this.menu = res.data
        this.type = row.type
      }).catch(err=>{
        console.log(err)
      })
    },
    // 审核通过
    handleEdit(index, row,type) {
      this.$fetch.api_setting.review(Qs.stringify({
          appId: row.appId,
          status: type
        })).then(res=>{
          this.$message.success(res.message)
           this.queryApp()
        }).catch(err=>{
          console.log(err+'err')
        })
    },
    // // 停用
    // handleDelete(index, row) {
    //   this.$fetch.api_setting.stop(Qs.stringify({
    //       id: row.id,
    //       status: 2
    //     })).then(res=>{
    //       this.$message.success(res.message)
    //     }).catch(err=>{
    //       console.log(err+'err')
    //     })
    // },
    handleSizeChange(val) {
      // console.log(val)
    },
    handleCurrentChange(val) {
      // console.log(val)
    },
    // 状态
    on_status(command){ 
      var command = command;
      if(command==0){
        this.status = '公司'
      } else if(command==1) {
        this.status = '个人'
      } else{
        this.status = '应用'
      }
    },
    // 操作
    on_doing(command){ 
      var command = command;
      if(command==0){
        this.doing = '查看详情'
      } else if(command==1) {
        this.doing = '审核通过'
      } else{
        this.doing = '停用'
      }
    },
  },
  mounted(){
    this.queryApp()
  },
  computed: { 
   filterlist: function () { 
    // var num=this.size; 
    return this.tableData.filter(function (number) { 
      console.log(menubar)
      return number.id 
    }) 
   } 
  }
}
</script>

<style scoped>
.set{
  margin:10px 0;
}
.tables{
  margin-top:10px;
}
.card{
  margin-top:20px;
  margin-bottom:10px;
}
.block{
  margin: 20px 0;
  float: right;
}
.item{
  height:40px;
  border-bottom:1px solid #ccc;
}
.inp{
  width:20%;
  margin-left:20px;
}
.dropdown{
  border:1px solid #ccc;
  width:15%;
  padding: 10px 20px;
  cursor: pointer;
  margin-left:10px;
  box-sizing: border-box;
}
span{
  margin:0 10px;
}
.dropdown .el-icon-arrow-down .el-icon--right{
  padding-left:10px;
}
.el-icon--right{
  text-align: center;
  margin-left:50px;
  display: inline-block;
}
.el-dropdown-menu{
  width:12%;
  text-align: center;
  padding: 10px 20px;
}
</style>
