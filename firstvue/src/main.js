// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueAMap from 'vue-amap';
import ElementUI from 'element-ui'; 
import 'element-ui/lib/theme-chalk/index.css'; 
import * as echarts from "echarts";
// Vue.prototype.$echarts = echarts;
//如果报错可以使用
Vue.use(ElementUI);
// Vue.use(echarts);
Vue.use(VueAMap);
 // 初始化高德地图的 key 和插件
VueAMap.initAMapApiLoader({
  key: "dbf078975dff939acfe939b514468e2b", // "key"
  plugin: [
    'AMap.Autocomplete', // 输入提示插件
    'AMap.PlaceSearch', // POI搜索插件
    'AMap.Scale', // 右下角缩略图插件 比例尺
    'AMap.OverView', // 地图鹰眼插件
    'AMap.ToolBar', // 地图鹰眼插件
    'AMap.MapType', // 地图类型切换插件，可用于切换卫星地图
    'AMap.PolyEditor', // 多边形编辑器，绘制和编辑折现
    'AMap.CircleEditor', // 圆编辑插件
    'AMap.Geolocation', // 定位控件，用来获取和展示用户主机所在的经纬度位置
    'AMap.Geocoder' // 逆地理编码,通过经纬度获取地址所在位置详细信息
    // 按实际需求添加插件
  ],
  v: '1.4.4', // amap版本（默认1.4.4）
  // uiVersion: '1.0' // 地图ui版本（忽略，就是不配置）
});
 
//高德的安全密钥
window._AMapSecurityConfig = {
	securityJsCode:"50181e56ed575a8305f8732fa4ed648b" // "安全密钥",
}
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
