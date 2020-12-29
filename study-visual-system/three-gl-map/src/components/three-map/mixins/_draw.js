import * as THREE from "three";

export default {
  data() {
    return {}
  },
  methods: {
    async $$draw() {
      //加载模型
      await this.$$drawModels();

      this.addActiveCityLabel()

      //灯光
      this.lights();

      //背景板
      this.bgPlate(10000);

      //场景点缀
      this.$$addGrids();

      this.$store.commit("map/SET_LOADING", false)

      //添加点位，之后删除
      //this.addMarkerCityLabel()
      /*let markers = [
        {
          lon: '106.713478',
          lat: '26.578343',
          type: 'icon',
          icon: "emergency",
          contType: "title",
          data: {
            title: '我是标题',
          }
        }
      ]

      /!*let markers = [
        {
          lon: '106.713478',
          lat: '26.578343',
          type: 'label',
          data: {
            title: '贵阳市',
          }
        }
      ]*!/
      this.addMarkers(markers)*/
    },
    $$drawModels() {
      return new Promise((resolve, reject) => {
        (async () => {
          let loader = new THREE.GLTFLoader();
          let mapGroup = new THREE.Group();
          mapGroup.name = '省级模型合集'

          let first = await this.$$loadGz(loader)
          this.centreMap = first
          this.centreMap.position.z = -150
          this.gui.hotmapGuiSwitch && this.hotmapGui()
          mapGroup.add(first)


          let second = await this.$$loadBj(loader)
          mapGroup.add(second)

          /*let around = await this.$$loadAround(loader)
          //around.layers.set(1);
          mapGroup.add(around)*/

          this.baseGroup.add(mapGroup);
          loader = null
          resolve()
        })()
      });
    },
    $$loadGz(loader) {
      return new Promise((resolve, reject) => {
        //贵州
        if (this.mapCache.province.inside === null) {
          loader.load("models/gz.glb", (gltf) => {
            this.mapCache.province.inside = gltf.scene
            let mesh = this.$$objGz(gltf.scene)
            resolve(mesh)
          }, undefined, (error) => {
            console.error(error);
          });
        } else {
          let mesh = this.$$objGz(this.mapCache.province.inside)
          resolve(mesh)
        }
      })
    },
    $$loadAround(loader) {
      return new Promise((resolve, reject) => {
        //贵州
        if (this.mapCache.province.around === null) {
          loader.load("models/around.glb", (gltf) => {
            this.mapCache.province.around = gltf.scene
            let mesh = this.$$objAround(gltf.scene)
            resolve(mesh)
          }, undefined, (error) => {
            console.error(error);
          });
        } else {
          let mesh = this.$$objAround(this.mapCache.province.around)
          resolve(mesh)
        }
      })
    },
    $$objGz(data) {
      let mesh = data.clone()
      mesh.position.set(700, -200, 0)
      mesh.scale.set(1.5, 1.5, 1.5)
      mesh.rotation.set(Math.PI * 90 / 180, Math.PI * 0 / 180, Math.PI * 0 / 180);

      let uniform = {
        u_color: {value: new THREE.Color("#93c3ff")},
        u_tcolor: {value: new THREE.Color("#93c3ff")},
        u_r: {value: 0.25},
        u_length: {value: 80},//扫过区域
        u_max: {value: 3000}//扫过最大值
      };
      let Shader = {
        vertexShader: `
                                varying vec3 vp;
                                void main(){
                                vp = position;
                                gl_Position	= projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                                }
                          `,
        fragmentShader: `
                            varying vec3 vp;
                            uniform vec3 u_color;
                            uniform vec3 u_tcolor;
                            uniform float u_r;
                            uniform float u_length;
                            uniform float u_max;
                            float getLeng(float x, float y){
                                return  sqrt((x-0.0)*(x-0.0)+(y-0.0)*(y-0.0));
                            }
                            void main(){
                                float uOpacity = 0.5;
                                vec3 vColor = u_color;
                                float uLength = getLeng(vp.x,vp.z);
                                if ( uLength <= u_r && uLength > u_r - u_length ) {
                                    float op = sin( (u_r - uLength) / u_length ) * -0.4 + 0.99 ;
                                    uOpacity = op;
                                    if( vp.y<0.0){
                                        vColor  = u_tcolor * 0.99;
                                    }else{
                                        vColor = u_tcolor;
                                    };
                                }
                                gl_FragColor = vec4(vColor,uOpacity);
                            }
                            `
      }

      this.innerFlowLight = new THREE.ShaderMaterial({
        vertexShader: Shader.vertexShader,
        fragmentShader: Shader.fragmentShader,
        side: THREE.DoubleSide,
        uniforms: uniform,
        transparent: true,
        depthWrite: false,
      });

      let uniformOuter = {
        u_color: {value: new THREE.Color("#93c3ff")},
      };
      let ShaderOuter = {
        vertexShader: `
                      void main(){
                        gl_Position	= projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                      }
                          `,
        fragmentShader: `
                            uniform vec3 u_color;
                            void main(){
                                gl_FragColor = vec4(u_color, 0.2);
                            }
                     `
      }

      let outerFlowLight = new THREE.ShaderMaterial({
        uniforms: uniformOuter,
        vertexShader: ShaderOuter.vertexShader,
        fragmentShader: ShaderOuter.fragmentShader,
        side: THREE.FrontSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
      });

      mesh.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true
          if (child.name === '贵州内边框') {
            child.material = this.innerFlowLight
          } else if (child.name === '贵州盖子') {
            child.material = outerFlowLight
            child.layers.enable(1);
          } else {
            //添加接受点击事件对象的仓库
            this.clickObjects.push(child);
          }
          //child.receiveShadow = true
        }
      })
      return mesh
    },
    $$objAround(data) {
      let mesh = data.clone()

      let uniformAround = {
        u_color: {value: new THREE.Color("#93c3ff")},
      };
      let ShaderAround = {
        vertexShader: `
                      void main(){
                        gl_Position	= projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                      }
                          `,
        fragmentShader: `
                            uniform vec3 u_color;
                            void main(){
                                gl_FragColor = vec4(u_color, 0.75);
                            }
                     `
      }

      let aroundFlowLight = new THREE.ShaderMaterial({
        uniforms: uniformAround,
        vertexShader: ShaderAround.vertexShader,
        fragmentShader: ShaderAround.fragmentShader,
        side: THREE.FrontSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
      });

      let around = null
      mesh.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true
          if (child.name === '贵州盖子') {
            child.material = aroundFlowLight
            child.layers.enable(1);
            /*around = child.clone();
            //around.layers.set(1);
            around.material = aroundFlowLight*/
          }
          //child.receiveShadow = true
        }
      })

      /*around.position.set(700, -200, 10)
      around.scale.set(1.5, 1.5, 1.5)
      around.rotation.set(Math.PI * 90 / 180, Math.PI * 0 / 180, Math.PI * 0 / 180);
      around.layers.enable(1);*/

      mesh.position.set(700, -200, 10)
      mesh.scale.set(1.5, 1.5, 1.5)
      mesh.rotation.set(Math.PI * 90 / 180, Math.PI * 0 / 180, Math.PI * 0 / 180);
      return mesh
    },
    $$loadBj(loader) {
      return new Promise((resolve, reject) => {
        //周边
        if (this.mapCache.province.outside === null) {
          loader.load("models/bj.glb", (gltf) => {
            this.mapCache.province.outside = gltf.scene
            let mesh = this.$$objBj(gltf.scene)
            resolve(mesh)
          }, undefined, (error) => {
            console.error(error);
          });
        } else {
          let mesh = this.$$objBj(this.mapCache.province.outside)
          resolve(mesh)
        }
      })
    },
    $$objBj(data) {
      let mesh = data.clone()
      mesh.position.set(700, -200, 0)
      mesh.scale.set(1.5, 1.5, 1.5)
      mesh.rotation.set(Math.PI * 90 / 180, Math.PI * 0 / 180, Math.PI * 0 / 180);
      //mapGroup.add(mesh)

      let uniform = {
        u_color: {value: new THREE.Color("#5588aa")},
        u_tcolor: {value: new THREE.Color("#8CC4DD")},
        u_r: {value: 0.25},
        u_length: {value: 500},//扫过区域
        u_max: {value: 3000}//扫过最大值
      };
      let Shader = {
        vertexShader: `
                                varying vec3 vp;
                                void main(){
                                vp = position;
                                gl_Position	= projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                                }
                          `,
        fragmentShader: `
                            varying vec3 vp;
                            uniform vec3 u_color;
                            uniform vec3 u_tcolor;
                            uniform float u_r;
                            uniform float u_length;
                            uniform float u_max;
                            float getLeng(float x, float y){
                                return  sqrt((x-0.0)*(x-0.0)+(y-0.0)*(y-0.0));
                            }
                            void main(){
                                float uOpacity = 0.0001;
                                vec3 vColor = u_color;
                                float uLength = getLeng(vp.x,vp.z);
                                if ( uLength <= u_r && uLength > u_r - u_length ) {
                                    float op = sin( (u_r - uLength) / u_length ) * 0.5 + 0.001 ;
                                    uOpacity = op;
                                    if( vp.y<0.0){
                                        vColor  = u_tcolor * 0.1;
                                    }else{
                                        vColor = u_tcolor;
                                    };
                                }
                                gl_FragColor = vec4(vColor,uOpacity);
                            }
                            `
      }

      this.flowLight = new THREE.ShaderMaterial({
        vertexShader: Shader.vertexShader,
        fragmentShader: Shader.fragmentShader,
        side: THREE.DoubleSide,
        uniforms: uniform,
        transparent: true,
        depthWrite: false,
      });

      mesh.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.receiveShadow = true
          if (child.name.substr(2) !== '1_1') {
            child.material = this.flowLight
          }
        }
      })

      return mesh
    },
    $$gotoCity(name, areaCode) {
      if(this.mapLevel.name !== name) this.$$drawCity(name, areaCode)
    },
    async $$drawCity(name, areaCode) {
      this.$store.commit("map/SET_LOADING", true)
      //清除
      this.$$clearDraw()

      //市级
      let value = name === '毕节市1' || name === '毕节市2' ? '毕节市' : name
      await this.$$loadCity(value).then(() => {
        this.mapLevel.type = 'city'
        this.mapLevel.name = value
        this.mapLevel.code = areaCode ? areaCode : this.cityCodes[value]
        this.$emit('global:mapChange', this.mapLevel);
        this.$store.commit("regionSelect/SET_AREA_CODE", this.mapLevel.code)
      })
      //灯光
      this.lights();

      //场景点缀
      this.$$addGrids();

      //背景板
      //this.bgPlate(10000);
      this.backgroundPlate();


      const geometry = new THREE.PlaneBufferGeometry( 1000, 1000 );
      geometry.rotateX( - Math.PI / 2 );

      let plane = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: '#ff0000', visible: false } ) );
      plane.position.z = 200
      this.baseGroup.add( plane );

      setTimeout(() => {
        this.$store.commit("map/SET_LOADING", false)
      })
    },
    $$clearDraw() {
      /*this.baseGroup.traverse((child) => { //清楚缓存，暂时保留
        if (child instanceof THREE.Mesh) {
          if(child.material.map) child.material.map.dispose();
          if(child.material.normalMap) child.material.normalMap.dispose();
          child.material.dispose();
          child.material = null
          child.geometry.dispose();
          child.geometry = null
        }

        /!*if(child.material){
          if(child.material.map) child.material.map.dispose();
          if(child.material.normalMap) child.material.normalMap.dispose();
          child.material.dispose();
          child.material = null
        }
        if(child.geometry){
          child.geometry.dispose();
          child.geometry = null
        }*!/
      })*/

      //remove
      let baseGroup = [];
      this.baseGroup.children.map((item) => {
        baseGroup.push(item)
      })
      baseGroup.map((item) => {
        item.children.map((object) => {
          if (object.layer === 'textLayer') {
            object.parent.remove(object)
          }
        })
        this.baseGroup.remove(item)
      })

      let scene = [];
      this.scene.children.map((item) => {
        scene.push(item)
      })
      scene.map((item) => {
        this.scene.remove(item)
      })

      THREE.Cache.clear()

      //reset
      baseGroup = null
      scene = null
      this.baseGroup = null
      this.light.spotLight = null
      this.centreMap = null
      this.clickObjects = []

      //基础物体组
      this.baseGroup = new THREE.Group();
      //this.baseGroup.layers.set(0);

      this.scene.add(this.baseGroup);
      this.baseGroup.rotation.set(
        (Math.PI * this.configSet.baseGroup.rotation.x) / 180,
        (Math.PI * this.configSet.baseGroup.rotation.y) / 180,
        (Math.PI * this.configSet.baseGroup.rotation.z) / 180
      );
      this.baseGroup.position.set(
        this.configSet.baseGroup.position.x,
        this.configSet.baseGroup.position.y,
        this.configSet.baseGroup.position.z
      );
    },
    $$loadCity(name) {
      return new Promise((resolve, reject) => {
        let {url, mesh, params} = this.$$objCitySwitch(name)
        this.coorParams = params.coorParams

        let loader = new THREE.GLTFLoader();
        //地市
        if (mesh) {
          let item = this.$$objCity(mesh, params)
          resolve(item)
        } else {
          if (url) {
            loader.load(url, (gltf) => {
              gltf.scene.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                  child.castShadow = true
                  //child.receiveShadow = true
                }
              })
              this.$$objCitySwitch(name, gltf.scene)
              let item = this.$$objCity(gltf.scene, params)
              resolve(item)
            }, undefined, (error) => {
              console.error(error);
            });
          }
        }
      })
    },
    $$objCitySwitch(name, data) {
      let mesh = null
      let url = null
      let positon = {x: 0, y: 0, z: 0}
      let scale = {x: 1, y: 1, z: 1}
      let coorParams = {
        xn: 466.44624052724885,
        xp: 1342.1635395495941,
        yn: 472.13900312891917,
        yp: 3611.9296628200545,
      }
      switch (name) {
        case '贵阳市':
          url = 'models/guiyang.glb'
          mesh = this.mapCache.city.guiyang
          if (data) this.mapCache.city.guiyang = data
          positon = {x: 0, y: -260, z: -37.5}
          scale = {x: 1.25, y: 1.2, z: 1.25}
          coorParams = {
            xn:121.39057053215289,
            xp:5316.191946583266,
            yn:122.84328518466867,
            yp:14748.91601470568
          }
          break;
        case '安顺市':
          url = 'models/anshun.glb'
          mesh = this.mapCache.city.anshun
          if (data) this.mapCache.city.anshun = data
          positon = {x: 0, y: -300, z: -37.5}
          scale = {x: 1.2, y: 1.2, z: 1.2}
          coorParams = {
            xn:128.09856614157013,
            xp:5674.6782549461295,
            yn:128.84906209272964,
            yp:14826.411722849123
          }
          break;
        case '六盘水市':
          url = 'models/liupanshui.glb'
          mesh = this.mapCache.city.liupanshui
          if (data) this.mapCache.city.liupanshui = data
          positon = {x: 0, y: -300, z: -37.5}
          scale = {x: 1.30, y: 1.30, z: 1.30}
          coorParams = {
            xn:168.4348905037945,
            xp:5004.034095558836,
            yn:166.14437398097414,
            yp:11332.273078634453
          }
          break;
        case '遵义市':
          url = 'models/zunyi.glb'
          mesh = this.mapCache.city.zunyi
          if (data) this.mapCache.city.zunyi = data
          positon = {x: -100, y: -380, z: -37.5}
          scale = {x: 1.2, y: 1.2, z: 1.2}
          coorParams = {
            xn:240.14105768148386,
            xp:2480.1517117461217,
            yn:241.61713387486557,
            yp:6655.3685928501845
          }
          break;
        case '毕节市':
          url = 'models/bijie.glb'
          mesh = this.mapCache.city.bijie
          if (data) this.mapCache.city.bijie = data
          positon = {x: -50, y: -300, z: -37.5}
          scale = {x: 1.2, y: 1.2, z: 1.2}
          coorParams = {
            xn:243.59919908773495,
            xp:3330.7610353373457,
            yn:243.46170434441942,
            yp:7138.816265121494
          }
          break;
        case '黔西南':
          url = 'models/qianxinan.glb'
          mesh = this.mapCache.city.qianxinan
          if (data) this.mapCache.city.qianxinan = data
          positon = {x: -30, y: -300, z: -37.5}
          scale = {x: 1.2, y: 1.2, z: 1.2}
          coorParams = {
            xn:196.4178956367121,
            xp:3936.876391107052,
            yn:197.14232603219443,
            yp:9983.254741060486
          }
          break;
        case '黔南州':
          url = 'models/qiannan.glb'
          mesh = this.mapCache.city.qiannan
          if (data) this.mapCache.city.qiannan = data
          positon = {x: -30, y: -250, z: -37.5}
          scale = {x: 1.2, y: 1.2, z: 1.2}
          coorParams = {
            xn:269.682754724457,
            xp:2115.3925091165397,
            yn:262.7004873278915,
            yp:7003.438815516124
          }
          break;
        case '黔东南':
          url = 'models/qiandongnan.glb'
          mesh = this.mapCache.city.qiandongnan
          if (data) this.mapCache.city.qiandongnan = data
          positon = {x: -60, y: -250, z: -37.5}
          scale = {x: 1.2, y: 1.2, z: 1.2}
          coorParams = {
            xn:219.55809032951825,
            xp:1987.0649635107272,
            yn:225.24619412947445,
            yp:8124.186697730898
          }
          break;
        case '铜仁市':
          url = 'models/tongren.glb'
          mesh = this.mapCache.city.tongren
          if (data) this.mapCache.city.tongren = data
          positon = {x: -60, y: -250, z: -37.5}
          scale = {x: 1.2, y: 1.2, z: 1.2}
          coorParams = {
            xn:206.56550313765817,
            xp:2028.15934690442,
            yn:205.07137444573402,
            yp:7952.713407515112
          }
          break;
      }
      return {url: url, mesh: mesh, params: {positon: positon, scale: scale, coorParams: coorParams}}
    },
    $$objCity(data, params) {
      let mesh = data.clone()
      mesh.position.set(params.positon.x, params.positon.y, params.positon.z)
      mesh.scale.set(params.scale.x, params.scale.y, params.scale.z)
      mesh.rotation.set(Math.PI * 90 / 180, Math.PI * 0 / 180, Math.PI * 0 / 180);

      mesh.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          this.clickObjs.push(child)
          for (let i = 1; i < 10; i++) {
            if (child.name === '内边框' + i) {
              child.material = this.innerFlowLight
            }
            if (child.name === '盖子' + i) {
              child.layers.enable(1);
            }
          }
        }
      })

      this.cityMap = mesh
      this.baseGroup.add(mesh)
      return mesh
    }
  }
}
