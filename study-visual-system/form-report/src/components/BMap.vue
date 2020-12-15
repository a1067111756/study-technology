<template>
  <div class="baidu-map-container">
    <div id="baidu-map"></div>  
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  mounted () {
    this.initMap()
  },
  data () {
    return {
      ak: 'GXkOl2164Aau9rDDXLSdDkXG1vWyxz6o'  
    }
  },
  methods: {
    // 加载地图script
    initMap () {
      // 未加载过地图script
      if (!window.BMapGL) {
        // webGl
        const $script_webgl = document.createElement('script')
        $script_webgl.type = 'text/javascript'
        $script_webgl.async = true      
        $script_webgl.src = `http://api.map.baidu.com/api?v=1.0&type=webgl&ak=${this.ak}&callback=_initBaiduMap`    
        window.document.body.appendChild($script_webgl)
        window._initBaiduMap = this._initBaiduMap

        // webGlLib
        const $script_webGlLib = document.createElement('script')
        $script_webGlLib.type = 'text/javascript'
        $script_webGlLib.async = true      
        $script_webGlLib.src = `http://api.map.baidu.com/library/TrackAnimation/src/TrackAnimation_min.js`    
        window.document.body.appendChild($script_webGlLib)

        // mapvGl
        const $script_mapvGl = document.createElement('script')
        $script_mapvGl.type = 'text/javascript'
        $script_mapvGl.async = true      
        $script_mapvGl.src = `http://code.bdstatic.com/npm/mapvgl@1.0.0-beta.54/dist/mapvgl.min.js`    
        window.document.body.appendChild($script_mapvGl)

        // mapv
        const $script_mapv = document.createElement('script')
        $script_mapv.type = 'text/javascript'
        $script_mapv.async = true      
        $script_mapv.src = `http://mapv.baidu.com/build/mapv.js`    
        window.document.body.appendChild($script_mapv)

        // mapvgl.threelayers
        const $script_threelayers = document.createElement('script')
        $script_threelayers.type = 'text/javascript'
        $script_threelayers.async = true      
        $script_threelayers.src = `http://code.bdstatic.com/npm/mapvgl@1.0.0-beta.93/dist/mapvgl.threelayers.min.js`    
        window.document.body.appendChild($script_threelayers)

      // 已经加载过地图script 或 在其它敌法自定义加载地图script 
      } else {
        this._initBaiduMap()
      }
    },
    // 钩子 - 地图脚本加载完成
    _initBaiduMap () {
      const map = new BMapGL.Map('baidu-map')
      const point = new BMapGL.Point(116.404, 39.915)
      map.centerAndZoom(point, 15)
      map.enableScrollWheelZoom(true)

      // BMap实例挂在到全局
      Vue.prototype.$BMapGLInstance = map
    }
  }
}
</script>

<style lang="scss" scoped>
  .baidu-map-container {
    width: 100%;
    height: 800px;
    position: relative;
  }

  #baidu-map {
    width: 100%;
    height: 100%;
  }
</style>