<template>
  <el-dialog ref="dialog"
             :title="title"
             :visible.sync="visible"
             width="30%"
             :before-close="beforeClose">
    <el-table :data="tableData"
              style="width: 100%">
      <el-table-column v-for="(item,index) in tableColumn"
                       :key="index"
                       :prop="item.prop"
                       :label="item.label"
                       :width="item.width">
      </el-table-column>
    </el-table>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="closeDialog">关闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data () {
    return {
      visible: false,
      vmId: 0,
      title: "标题",
      tableData: [],
      tableColumn: []
    };
  },
  methods: {
    beforeClose (done) {
      this.visible = false
      // 从DOM里将这个组件移除  
      // visible只是控制了显示与隐藏  但是dom结构中还是存在组件  为了避免消耗内存必须销毁组件
      // setTimeout(() => {
      //   console.log("this.$el.parentNode", this.$el.parentNode)
      //   console.log("this.$el", this.$el)
      //   this.$el.parentNode.removeChild(this.$el)
      // }, 500)
      setTimeout(() => {
        if (typeof this.onClose === "function") {
          this.onClose(this.vmId)
          done()
        }
      }, 500);
    },
    closeDialog () {
      this.$refs.dialog.handleClose()
    }
  }
};
</script>
<style lang="less" scoped>
</style>