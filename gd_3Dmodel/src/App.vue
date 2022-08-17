<template>
  <div id="app">
    <div id="container"></div>
  </div>
</template>

<script>
import AMapLoader from "@amap/amap-jsapi-loader";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
export default {
  name: "App",
  data() {
    return {
      map: null,
      AMaper: null
    };
  },
  async mounted() {
    await this.initMap()
    this.loadModel()
  },
  methods: {
    async initMap() {
      try {
        this.AMaper = await AMapLoader.load({
        	// 这里写你的 web key
          key: "dbf078975dff939acfe939b514468e2b",
          plugins: [
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
        })
        this.map = new this.AMaper.Map("container", {
          viewMode:'3D',
          showBuildingBlock:false,
          center:[116.472605,39.992075],
          pitch:55,
          zoom:17
        });
        // 初始化光线
        this.map.AmbientLight = new this.AMaper.Lights.AmbientLight([1,1,1],1);
        this.map.DirectionLight = new this.AMaper.Lights.DirectionLight([1,0,-0.5],[1,1,1],1);
      } catch (e) {
        console.log(e)
      }
    },
    loadModel() {
      new MTLLoader().load('https://a.amap.com/jsapi_demos/static/demo-center/model/1519/1519.mtl', /**贴图回调 */ ( materials ) => {
        // 回调中加载 obj 模型
        new OBJLoader().setMaterials(materials).load('https://a.amap.com/jsapi_demos/static/demo-center/model/1519/1519.obj', /**加载模型的回调 */ ( event ) => {
          var object3Dlayer = new this.AMaper.Object3DLayer();
          var meshes = event.children;
          for(var i=0;i<meshes.length;i++){
            var vecticesF3 = meshes[i].geometry.attributes.position;
            var vecticesNormal3 = meshes[i].geometry.attributes.normal;
            var vecticesUV2 = meshes[i].geometry.attributes.uv;           
            var vectexCount =  vecticesF3.count;

            var mesh = new this.AMaper.Object3D.MeshAcceptLights();
            var geometry = mesh.geometry;
            var c,opacity;
            var material = meshes[i].material[0]||meshes[i].material;
            if(material.map)
              mesh.textures.push('https://a.amap.com/jsapi_demos/static/demo-center/model/1519/1519.bmp')          
            c = material.color;
            opacity = material.opacity
            for(var j=0;j<vectexCount;j+=1){
                var s = j*3;
                geometry.vertices.push(vecticesF3.array[s],vecticesF3.array[s+2],-vecticesF3.array[s+1]);           
                if(vecticesNormal3) {
                      geometry.vertexNormals.push(vecticesNormal3.array[s],vecticesNormal3.array[s+2],-vecticesNormal3.array[s+1]);
                }
                if(vecticesUV2) {
                  geometry.vertexUVs.push(vecticesUV2.array[j*2],1-vecticesUV2.array[j*2+1]);
              }
                geometry.vertexColors.push(c.r,c.g,c.b,opacity)
            }
            mesh.DEPTH_TEST = material.depthTest
            mesh.transparent = opacity<1;
            mesh.scale(6,6,6)
            mesh.rotateZ(-48)
            mesh.position(new this.AMaper.LngLat(116.472605,39.992075))
            object3Dlayer.add(mesh)
          }     	
          this.map.add(object3Dlayer)
        })
			})
    }
  }
};
</script>

<style>
#container {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 100vh;
}
</style>

