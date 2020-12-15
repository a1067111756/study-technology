<template>
  <el-card class="analysis-container">
    <template #header>
      <div style="text-align: right;">
        <el-button-group>
          <el-button size="small" @click="drawSomeThing">绘图</el-button>
          <el-button size="small" @click="building">3d建筑</el-button>
          <el-button size="small" @click="flyLineTrack">飞线轨迹画</el-button>
          <el-button size="small" @click="flyLine">飞线动画</el-button>
          <el-button size="small" @click="scatter">散点图</el-button>
          <el-button size="small" @click="trackMap">轨迹动画</el-button>
          <el-button size="small" @click="makeAnimation">地图动画</el-button>
          <el-button size="small" @click="checkTheme">自定义主题</el-button> 
          <el-button size="small" @click="checkGlobal">3d地球</el-button>
          <el-button size="small" @click="reset">重置</el-button>
        </el-button-group>
      </div>
    </template>
    
    <template #default>
      <BMap ref="bmap"></BMap>
    </template>
  </el-card>
</template>

<script>
import BMap from '@/components/BMap'
import { keyFrames, trackPath } from './mock'

export default {
  components: {
    BMap
  },
  methods: {
    reset () {
      this.$refs.bmap._initBaiduMap()
    },
    checkTheme () {
      this.$BMapGLInstance.setMapStyleV2({
        styleId: '0164ccc225d5956a3dbcaa531347d252'
      })      
    },
    checkGlobal () {
      this.$BMapGLInstance.setMapType(window.BMAP_EARTH_MAP)
    },
    openInfoWindow (point, title, content) {
      let opts = {
        width: 250,     
        height: 100, 
        title: title 
      }
      let infoWindow = new BMapGL.InfoWindow(content, opts)
      this.$BMapGLInstance.openInfoWindow(infoWindow, point)
    },
    drawSomeThing () {
      const centerPoint = this.$BMapGLInstance.getCenter()

      // 1. 添加标注
      const exampleIcon = new BMapGL.Icon("https://www.youbaobao.xyz/datav-res/datav/location.png", 
        new BMapGL.Size(60, 60), {
          anchor: new BMapGL.Size(30, 30),
          imageOffset: new BMapGL.Size(0, 0)
        }
      )   
      const marker = new BMapGL.Marker(centerPoint, { icon: exampleIcon })
      marker.addEventListener("click", () => {   
        this.openInfoWindow(centerPoint, '标注弹窗', '标注测试点击事件')
      })
      this.$BMapGLInstance.addOverlay(marker)

      // 2. 绘制线段
      const polyline = new BMapGL.Polyline([
        new BMapGL.Point(116.399, 39.910),
        new BMapGL.Point(116.405, 39.920),
        new BMapGL.Point(116.425, 39.900)
      ], {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5})
      polyline.addEventListener("click", () => {   
        this.openInfoWindow(centerPoint, '线段弹窗', '线段测试点击事件')
      })
      this.$BMapGLInstance.addOverlay(polyline)

      // 3. 绘制文本
      const content = "测试文本";
      const label = new BMapGL.Label(content, {       // 创建文本标注
        position: centerPoint,                        // 设置标注的地理位置
        offset: new BMapGL.Size(100, 10)              // 设置标注的偏移量
      })
      label.setStyle({                     
        width: '100px',
        height: '20px',
        padding: '20px',
        color: '#fff',
        fontSize: '20px',
        border: '2px solid #1E90FF',
        background: 'red',
        whiteSpace: 'wrap',
        overflow: 'hidden',
        lineHeight: '20px'
      })
      label.addEventListener("click", () => {   
        this.openInfoWindow(centerPoint, '文本弹窗', '文本测试点击事件')
      })      
      this.$BMapGLInstance.addOverlay(label)
      
      // 4. 绘制多边形
      const polygon = new BMapGL.Polygon([
        new BMapGL.Point(116.387112,39.920977),
        new BMapGL.Point(116.385243,39.913063),
        new BMapGL.Point(116.394226,39.917988),
        new BMapGL.Point(116.401772,39.921364),
        new BMapGL.Point(116.41248,39.927893)
      ], {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5})
      polygon.addEventListener("click", () => {   
        this.openInfoWindow(centerPoint, '多边形弹窗', '多边形测试点击事件')
      })        
      this.$BMapGLInstance.addOverlay(polygon)
    },
    makeAnimation () {
      const opts = {
        duration: 10000,         // 设置每次迭代动画持续时间
        delay: 3000,             // 设置动画延迟开始时间
        interation: 2            // 设置动画迭代次数
      }

      const animation = new BMapGL.ViewAnimation(keyFrames(), opts)
      this.$BMapGLInstance.startViewAnimation(animation)
    },
    trackMap () {
      const point = trackPath.map(item => new BMapGL.Point(item.lng, item.lat)) // 点位
      const pl = new BMapGL.Polyline(point) // 画线
      const trackAni = new BMapGLLib.TrackAnimation(this.$BMapGLInstance, pl, {
        overallView: true, // 动画完成后自动调整视野到总览
        tilt: 30,          // 轨迹播放的角度，默认为55
        duration: 20000,   // 动画持续时长，默认为10000，单位ms
        delay: 1000        // 动画开始的延迟，默认0，单位ms
      })
      trackAni.start()   
    },
    scatter () {
      this.$BMapGLInstance.setMapStyleV2({
        styleId: 'dde4bd91f724f0f8cfd8c5fec781d145'
      })    
      this.$BMapGLInstance.setZoom(5)

      // 准备数据源
			const citys = [
				'北京', '天津', '上海', '重庆', '石家庄', '太原', '呼和浩特', '哈尔滨', '长春',
				'沈阳', '济南', '南京', '合肥', '杭州', '南昌', '福州', '郑州', '武汉', '长沙', '广州',
				'南宁', '西安', '银川', '兰州', '西宁', '乌鲁木齐', '成都', '贵阳', '昆明', '拉萨', '海口'
			]
      const data = citys.map(item => {
        const cityCenter = mapv.utilCityCenter.getCenterByCityName(item)
        return {
					geometry: {
						type: 'Point',
						coordinates: [cityCenter.lng - 2 + Math.random() * 4, cityCenter.lat - 2 + Math.random() * 4]
					},
					properties: {
						count: Math.random() * 100
					}
        }
      })

      // 绘制数据源
      // 1. 生成mapvgl视图View
      const view = new mapvgl.View({ map: this.$BMapGLInstance })
      // 2. 初始化mapvgl得Point对象
      const intensity = new mapvgl.Intensity({
        max: 100,
        min: 0,
        gradient: {
          0: 'rgb(25, 66, 102, 0.8)',
          0.3: 'rgb(145, 102, 129, 0.8)',
          0.7: 'rgb(210, 131, 137, 0.8)',
          1: 'rgb(248, 177, 149, 0.8)'
        },
        maxSize: 30,
        minSize: 5
      })
      const pointLayer = new mapvgl.PointLayer({
        blend: 'lighter',
        size: function (data) {
					return intensity.getSize(data.properties.count)
        },
        color: function (data) {
					return intensity.getColor(data.properties.count)
        }        
      })
      // 3. 将Point对象加入View中
      view.addLayer(pointLayer)
      // 4. 将data与Point进行绑定
      pointLayer.setData(data)
    },

    flyLine () {
      this.$BMapGLInstance.setZoom(5.5)
      this.$BMapGLInstance.setMapStyleV2({
        styleId: 'dde4bd91f724f0f8cfd8c5fec781d145'
      })   

      // 1. 准备数据
      const data = []
      const citys = [
				'北京', '天津', '上海', '重庆', '石家庄', '太原', '呼和浩特', '哈尔滨', '长春',
				'沈阳', '济南', '南京', '合肥', '杭州', '南昌', '福州', '郑州', '武汉', '长沙', '广州',
				'南宁', '西安', '银川', '兰州', '西宁', '乌鲁木齐', '成都', '贵阳', '昆明', '拉萨', '海口'
      ]
      
      let randomCount = 100
      const curve = new mapvgl.BezierCurve()
      while (randomCount--) {
        let start  = mapv.utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length)])
        let end  = mapv.utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length)])
        curve.setOptions({
          start: [start.lng, start.lat],
          end: [end.lng, end.lat]
        })      

        const curveData = curve.getPoints()
        data.push({
          geometry: {
            type: 'LineString',
            coordinates: curveData
          }
        })
      }
      // 2. 绘制数据
      // a. 初始化图层
      const view = new mapvgl.View({ map: this.$BMapGLInstance })
      // b. 初始化飞线对象
      const flyLine = new mapvgl.FlyLineLayer({
        style: 'chaos',
        step: 0.3,
        color: 'rgba(33, 242, 214, 0.3)',
        textureColor: '#ff0000',
        textureWidth: 20,
        textureLength: 10
      })
      // c. 将飞线对象添加到图层中
      view.addLayer(flyLine)
      // d. 绑定数据
      flyLine.setData(data)
    },

    flyLineTrack () {
      this.$BMapGLInstance.setZoom(6)
      this.$BMapGLInstance.setMapStyleV2({
        styleId: '0164ccc225d5956a3dbcaa531347d252'
      })   

      // 1. 准备数据
      const data = []
      const citys = [
				'北京', '天津', '上海', '重庆', '石家庄', '太原', '呼和浩特', '哈尔滨', '长春',
				'沈阳', '济南', '南京', '合肥', '杭州', '南昌', '福州', '郑州', '武汉', '长沙', '广州',
				'南宁', '西安', '银川', '兰州', '西宁', '乌鲁木齐', '成都', '贵阳', '昆明', '拉萨', '海口'
      ]
      
      let randomCount = 100
      const curve = new mapvgl.BezierCurve()
      while (randomCount--) {
        let start  = mapv.utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length)])
        let  end = mapv.utilCityCenter.getCenterByCityName('北京')

        curve.setOptions({
          start: [start.lng, start.lat],
          end: [end.lng, end.lat]
        })      

        const curveData = curve.getPoints()
        data.push({
          geometry: {
            type: 'LineString',
            coordinates: curveData
          }
        })
      }
      // 2. 绘制数据
      // a. 初始化图层
      const view = new mapvgl.View({ map: this.$BMapGLInstance })
      // b. 初始化线对象 点对象
      const lineLayer = new mapvgl.LineLayer({
        color: 'rgba(55, 50, 250, 0.3)',
      })
      const linePointLayer = new mapvgl.LinePointLayer({
        size: 8,
        speed: 5,
        color: 'rgba(255, 255, 0, 0.6)',
        animationType: mapvgl.LinePointLayer.ANIMATION_TYPE_SMOOTH,
        shapeType: mapvgl.LinePointLayer.SHAPE_TYPE_CIRCLE,
        blend: 'lighter' // 交会时处理方式
      })

      // c. 将飞线对象添加到图层中
      view.addLayer(lineLayer)
      view.addLayer(linePointLayer)
      // d. 绑定数据
      lineLayer.setData(data)
      linePointLayer.setData(data)
    },

    building () {
      this.$BMapGLInstance.setZoom(17)
      this.$BMapGLInstance.setTilt(80)
      this.$BMapGLInstance.setCenter(new BMapGL.Point(106.540547,29.564858))
      this.$BMapGLInstance.setHeading(-45.3)
      this.$BMapGLInstance.setMapStyleV2({
        styleId: '0164ccc225d5956a3dbcaa531347d252'
      })   

      // 1. 准备数据
			fetch('https://www.youbaobao.xyz/datav-res/examples/chongqing.json')
				.then(res => res.json())
				.then(res => {
					var data = res;
					var polygons = [];
          var len = data.length;
          for (var i = 0; i < len; i++) {
            var line = data[i];
            var polygon = [];
            var pt = [line[1] * 512, line[2] * 512];
            for (var j = 3; j < line.length; j += 2) {
							pt[0] += line[j] / 100 / 2;
							pt[1] += line[j + 1] / 100 / 2;
							polygon.push([pt[0], pt[1]]);
            }
            polygons.push({
							geometry: {
								type: 'Polygon',
								coordinates: [polygon]
							},
							properties: {
								height: line[0] / 2
							}
            });
          }
          
          // 2. 绘制数据
          // a. 初始化图层
          const view = new mapvgl.View({ map: this.$BMapGLInstance })
          // b. 初始对象 点对象
          const shapeLayer = new mapvgl.ShapeLayer({
            color: 'rgba(230, 230, 230, 1)',
            style: 'window',
            opacity: 1.0
          })

          // c. 将飞线对象添加到图层中
          view.addLayer(shapeLayer)
          // d. 绑定数据
          shapeLayer.setData(polygons)  
				})
    }    
  }
}
</script>

<style lang="scss" scoped>
  .analysis-container {
    margin-top: 40px;
  }
</style>