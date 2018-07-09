<template>
  
    <!-- 文章审核 -->
    <el-card>
      <h3>文章审核</h3>
      <el-table
        :data="tableData"
        class="tables"
        style="width: 100%;">
        <el-table-column
          label="文章ID"
          type="index"
          width="95"
         >
         <template slot-scope="scope">
            <div>{{ scope.row.id }}</div>
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
          label="摘要"
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
            <!-- <el-button size='mini' @click="articleQing(scope.$index, scope.row)">通过审核</el-button> -->
            <!-- <el-button
              size="mini"
              @click="articleEdit(scope.$index, scope.row)">退稿</el-button> -->
            <el-button
              size="mini"
              type="danger"
              @click="articleDelete(scope.$index, scope.row)">删除</el-button>
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
      </el-card>
</template>

<script>
export default {
  name: 'article',
  data() {
    return {
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
      // articleData: null // 文章审核
    }
  },
  methods: {

    // 文章  通过审核
    articleQing(index, row){
      console.log('文章 通过审核')
    },
    // 文章  退稿
    articleEdit(index, row) {
      console.log('文章 退稿')
    },
    // 文章  删除
    articleDelete(index, row) {
      console.log('文章 删除')
    },
    handleSizeChange(val) {
      // console.log(val)
    },
    handleCurrentChange(val) {
      // console.log(val)
    },
  },
  mounted(){
    this.$fetch.api_setting.query(this.tableData).then(res=>{
        this.tableData = res.data.rows
        this.pageNum = res.data.pageNum
        this.pageSize = res.data.pageSize
        this.totalPages = res.data.totalPages
        this.totalRecords = res.data.totalRecords
      }).catch(err=>{
        console.log(err+'err')
      })
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
