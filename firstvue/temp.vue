<template>
  <div class="tab-container">
    <el-table
      :data="pvData.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        prop="userName"
        label="用户名"
        width="180"
      ></el-table-column>

      <el-table-column prop="realName" label="姓名"></el-table-column>
      <el-table-column prop="sex" label="性别"  :formatter="formatSex"></el-table-column>
      <el-table-column prop="organName" label="所属部门"></el-table-column>
      <el-table-column prop="authority" label="权限"></el-table-column>
      <el-table-column prop="roleName" label="角色"></el-table-column>
      
    </el-table>

    <el-pagination
      style="margin: 12px 0px"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pvData.length"
    >
    </el-pagination>
  

  </div>
</template>
<script>
//调用接口
import {getQuerycheckList} from "@/api/permission/user";

export default {
  data() {
    return {
      // 分页
      currentPage: 1, //初始页
      pagesize: 5, //    每页的数据
      total: 0,
      pvData: [],
      
    };
  },

  created() {
    this.getQuerycheckList();
  },
  methods: {
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function (size) {
      this.pagesize = size;
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
    },

    //查询题目列表信息接口
    getQuerycheckList() {
      const params = {
        organId: 1,
        userOrganId: 1,
        authority: 0,
        page: 1,
        rows: 5,
        isPagination: false,
      };
      getQuerycheckList(params).then((res) => {
        console.log("查询题目列表信息", res);
        this.pvData = res.data;
      });
    },
    //格式化性别
    formatSex(row, column) {
    return row.sex === 1? "男" : "女";
    }
  },
};
</script>
<style scoped>
.tab-container {
  margin: 30px;
}
</style>


