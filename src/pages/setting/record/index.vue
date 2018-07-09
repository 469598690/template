<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
      
    </panel-title>
    <div>
 <el-card class="card">
      <p>以下为账号的违规记录</p>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="记录ID"
          width="180">
          <template slot-scope="scope">
            <!-- <i class="el-icon-time"></i> -->
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="违规类型"
          width="180">
          <template slot-scope="scope">
            {{scope.row.name}}
            <!-- <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.name }}</p>
              <p>住址: {{ scope.row.address }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover> -->
          </template>
        </el-table-column>
        <el-table-column label="违规内容">
          <template slot-scope="scope">
            {{scope.row.address}}
           <!--  <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
          </template>
        </el-table-column>
        
        <el-table-column
          label="时间"
          width="180">
          <template slot-scope="scope">
            <!-- <i class="el-icon-time"></i> -->
            <span style="margin-left: 10px">{{ scope.row.time }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    </div>
  </div>
</template>
<script>
  import {panelTitle, bottomToolBar} from 'components'
export default {
  name: "Record",
  data() {
    return {
      tableData: [
        {
          date: "1",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          time: "2018/5/3"
        }
      ]
    };
  },
  components: {
    panelTitle,
    bottomToolBar
  },
  methods: {
    handleEdit(index, row) {},
    handleDelete(index, row) {}
  }
};
</script>
<style scoped lang="less">
.card {
  padding: 30px;
  p {
    color: #8d8da9;
    line-height: 30px;
  }
  .el-table{
    border:1px solid #ccc;
    .el-table__header-wrapper{
      .el-table__header{
        .has-gutter{
          text-align:center;
          background:#eee;
        }
      }
    }
    thead{
      background:#eee;
    }
  }
}
</style>


