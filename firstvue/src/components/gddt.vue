 
<template>
  <div>
    <el-aside width="500px">
      <div id="main" style="width: 500px; height: 500px"></div>
      <!-- Table -->
      <el-button type="text" @click="dialogTableVisible = true"
        >打开表格</el-button
      >
      <!-- 
      原因：
      el-table给每一个el-table-column设置宽度之后就会有这个问题
      解决方法：
      删除其中一个el-table-column的宽度就好了 -->
      <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
        <el-table :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" border fit style="width: 100%">
          <el-table-column fixed prop="date" label="日期" width="150">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="province" label="省份" width="120">
          </el-table-column>
          <el-table-column prop="city" label="市区" width="120">
          </el-table-column>
          <el-table-column prop="address" label="地址" width="300">
          </el-table-column>
          <el-table-column prop="zip" label="邮编" > 
          </el-table-column>
        </el-table>

        <div class="block">
          <!-- <span class="demonstration">完整功能</span> -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[4, 8, 12, 16]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.length"
          >
          </el-pagination>
        </div>
      </el-dialog>
    </el-aside>
    <el-main>
      <el-card>
        <div class="amap-page-container">
          <!-- 搜索框 -->
          <el-amap-search-box
            class="search-box"
            :search-option="searchOption"
            :on-search-result="onSearchResult"
          ></el-amap-search-box>
          <!-- 地图 -->
          <el-amap
            ref="map"
            vid="amapDemo"
            :amap-manager="amapManager"
            :center="center"
            :zoom="zoom"
            :plugin="plugin"
            :events="events"
            class="amap-demo"
          >
            <!-- 标记 -->
            <el-amap-marker
              v-for="(marker, index) in markers"
              :key="'marker' + index"
              :position="marker.position"
            />
            <!-- 位置名称显示 -->
            <el-amap-text
              v-for="(marker, index) in markers"
              :key="'text' + index"
              :text="marker.text"
              :offset="marker.offset"
              :position="marker.position"
            />
          </el-amap>
        </div>
      </el-card>
    </el-main>
  </div>
</template>

<script>
import { AMapManager } from "vue-amap";
import * as echarts from "echarts";
let amapManager = new AMapManager();
export default {
  data() {
    const self = this;
    return {
      // currentPage1: 1,
      currentPage: 1, //初始页
      pageSize: 4, //    每页的数据
      tableData: [
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-05",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-09",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-10",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-11",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-12",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-13",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-14",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-15",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
      ],
      dialogTableVisible: false,
      
      address: null,
      searchKey: "上海",
      amapManager,
      markers: [],
      marker: "",
      searchOption: {
        // city: "北京", //搜索范围
        // citylimit: true, //限制搜索范围
        city: "",
        citylimit: false, // 不限制搜索范围搜索，比如想全国搜索
      },
      zoom: 20,
      lng: "121.445869",
      lat: "31.195526",
      center: [121.445869, 31.195526],
      // locate:false,
      loaded: false,
      events: {
        init: (o) => {
          o.getCity((result) => {
            console.log(result);
            let par = document.getElementsByClassName("search-box-wrapper")[0];
            console.log(par.firstChild);
            par.firstChild.setAttribute(
              "placeholder",
              "您可以在这里输入要搜索的地址"
            );
            console.log(result);
            //todo 定位到搜索位置
            this.searchOption.city = result.city;
          });
        },
        moveend: () => {},
        zoomchange: () => {},
        click: (e) => {
          let { lng, lat } = e.lnglat;
          self.lng = lng;
          self.lat = lat;

          // 这里通过高德 SDK 完成。
          var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "all",
          });
          geocoder.getAddress([lng, lat], function (status, result) {
            if (status === "complete" && result.info === "OK") {
              if (result && result.regeocode) {
                console.log(result);
                self.address = result.regeocode.formattedAddress;
                self.markers = [];
                const obj = {
                  position: [lng, lat],
                  text: result.regeocode.formattedAddress,
                  offset: [0, 30],
                };
                self.markers.push(obj);
                // self.sure();
                self.$nextTick();
              }
            }
          });
        },
      },
      // 一些工具插件
      plugin: [
        {
          // 定位
          pName: "Geolocation",
          events: {
            init(o) {
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                // console.log(JSON.stringify(result));
                if (result && result.position) {
                  self.lng = result.position.lng;
                  self.lat = result.position.lat;
                  self.address = result.formattedAddress;
                  self.center = [self.lng, self.lat];
                  //   console.log(self.center, 99666);
                  let o = amapManager.getMap();
                  if (!self.marker) {
                    self.marker = new AMap.Marker({
                      position: self.center,
                    });
                    self.marker.setMap(o);
                  }
                  self.marker.setPosition(self.center);
                } else {
                  self.$message.error("位置信息，获取失败！");
                }
              });
            },
          },
        },
        {
          // 工具栏
          pName: "ToolBar",
          // locate:true, // 定位
          // direction:true, // 方向键盘是否可见
          liteStyle: true, // 精简模式

          // position:"RB", // 位置，默认为LT 代表 左上方
        },
        "Scale", // 比例尺
        {
          // 地图类型
          pName: "MapType",
          defaultType: 0,
          events: {
            init(o) {
              console.log(o);
            },
          },
        },
      ],
    };
  },
  mounted() {
    this.aa();
  },
  created() {
    // this.searchByHand()
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize=val;
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage=val;
      console.log(`当前页: ${val}`);
    },

    aa() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("main"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "ECharts 入门示例",
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      });
    },
    onSearchResult(pois) {
      if (pois.length > 0) {
        console.log(pois);
        let { lng, lat, name, location, address } = pois[0];
        //?显示
        this.markers = [];
        const obj = {
          position: [lng, lat],
          text: address + name,
          offset: [0, 30],
        };
        this.markers.push(obj);
        this.address = address + name;

        let center = [lng, lat];
        this.lng = lng;
        this.lat = lat;
        this.center = [lng, lat];
        let o = amapManager.getMap();
        if (!this.marker) {
          this.marker = new AMap.Marker({
            position: center,
          });
          this.marker.setMap(o);
        }
        this.marker.setPosition(center);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.amap-demo {
  height: calc(100vh - 165px);
}

.search-box {
  position: absolute;
  top: 25px;
  right: 120px;
}
.amap-page-container {
  position: relative;
}
.el-aside {
  display: block;
  position: absolute;
  right: 0;
  top: 40px;
  bottom: 0;
}
.el-main {
  position: absolute;
  left: 0;
  right: 500px;
  top: 40px;
  bottom: 0;
  // overflow-y: scroll;
}
</style>
