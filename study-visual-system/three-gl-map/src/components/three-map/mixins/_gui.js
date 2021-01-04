import {GUI} from 'three/examples/jsm/libs/dat.gui.module.js';
import * as THREE from 'three';

export default {
  data() {
    return {}
  },
  methods: {
    $$openGui() {
      this.gui.baseGroupGuiSwitch && this.baseGroupGui(this.baseGroup); //基础物体组调试器
      this.gui.cameraGuiSwitch && this.cameraGui(this.camera); //相机调试器
    },
    //贴图调整器
    faceGui(material) {
      let _this = this;
      let gui = new GUI();
      gui.close();

      let params = {
        color: material.color.getHex(),
        offsetX: material.map.offset.x,
        offsetY: material.map.offset.y,
        repeat: material.map.repeat.x,
        anisotropy: material.map.anisotropy,
        unpackAlignment: material.map.unpackAlignment,
        magFilter: material.map.magFilter
      };

      gui.addColor(params, 'color').onChange(function (val) {
        material.color.setHex(val);
        _this.render();
      });

      gui.add(params, 'offsetX', 0, 2).onChange(function (val) {
        material.map.offset.x = val
        _this.render();
      });

      gui.add(params, 'offsetY', 0, 2).onChange(function (val) {
        material.map.offset.y = val
        _this.render();
      });

      gui.add(params, 'repeat', 0, 10).onChange(function (val) {
        material.map.repeat.x = val
        material.map.repeat.y = val
        _this.render();
      });

      gui.add(params, 'anisotropy', 0, 5).onChange(function (val) {
        material.map.anisotropy = val
        _this.render();
      });

      gui.add(params, 'unpackAlignment', 0, 5).onChange(function (val) {
        material.map.unpackAlignment = val
        _this.render();
      });

      gui.add(params, 'magFilter', 0, 2000).onChange(function (val) {
        material.map.magFilter = val
        _this.render();
      });

      gui.open();
    },
    //聚光灯调整器
    spotLightGui(spotLight) {
      let _this = this;
      let gui = new GUI();
      gui.close();

      let params = {
        'light color': spotLight.color.getHex(),
        x: spotLight.position.x,
        y: spotLight.position.y,
        z: spotLight.position.z,
        intensity: spotLight.intensity,
        distance: spotLight.distance,
        angle: spotLight.angle,
        penumbra: spotLight.penumbra,
        decay: spotLight.decay,
        width: spotLight.shadow.mapSize.width,
        height: spotLight.shadow.mapSize.height,
        near: spotLight.shadow.camera.near,
        far: spotLight.shadow.camera.far,
        fov: spotLight.shadow.camera.fov,
      };

      gui.addColor(params, 'light color').onChange(function (val) {
        spotLight.color.setHex(val);
        _this.render();
      });

      gui.add(params, 'x', -3000, 3000).onChange(function (val) {
        spotLight.position.x = val
        _this.render();
      });

      gui.add(params, 'y', -5000, 5000).onChange(function (val) {
        spotLight.position.y = val
        _this.render();
      });

      gui.add(params, 'z', -2000, 6000).onChange(function (val) {
        spotLight.position.z = val
        _this.render();
      });

      gui.add(params, 'intensity', 0, 50).onChange(function (val) {
        spotLight.intensity = val;
        _this.render();
      });


      gui.add(params, 'distance', 0, 10000).onChange(function (val) {
        spotLight.distance = val;
        _this.render();
      });

      gui.add(params, 'angle', 0, 3).onChange(function (val) {
        spotLight.angle = val;
        _this.render();
      });

      gui.add(params, 'penumbra', 0, 1.0).onChange(function (val) {
        spotLight.penumbra = val;
        _this.render();
      });

      gui.add(params, 'decay', 1, 2).onChange(function (val) {
        spotLight.decay = val;
        _this.render();
      });

      gui.add(params, 'width', 1, 20000).onChange(function (val) {
        spotLight.shadow.mapSize.width = val;
        _this.render();
      });

      gui.add(params, 'height', 1, 20000).onChange(function (val) {
        spotLight.shadow.mapSize.height = val;
        _this.render();
      });

      gui.add(params, 'near', 0, 1000).onChange(function (val) {
        spotLight.shadow.camera.near = val;
        _this.render();
      });

      gui.add(params, 'far', 0, 5000).onChange(function (val) {
        spotLight.shadow.camera.far = val;
        _this.render();
      });

      gui.add(params, 'fov', 0, 100).onChange(function (val) {
        spotLight.shadow.camera.fov = val;
        _this.render();
      });

      gui.open();
    },
    rectLightGui(rectLight, rectLightMesh) {
      let _this = this;
      let gui = new GUI();
      gui.close();

      let params = {
        'light color': rectLight.color.getHex(),
        width: rectLight.width,
        height: rectLight.height,
        x: rectLight.position.x,
        y: rectLight.position.y,
        z: rectLight.position.z
      };

      gui.addColor(params, 'light color').onChange(function (val) {
        rectLight.color.setHex(val);
        _this.render();
      });


      gui.add(params, 'width', 100, 200).step(0.1).onChange(function (val) {
        rectLight.width = val;
        rectLightMesh.scale.x = val;
      });

      gui.add(params, 'height', 100, 200).step(0.1).onChange(function (val) {
        rectLight.height = val;
        rectLightMesh.scale.y = val;
      });

      gui.add(params, 'x', -3000, 3000).onChange(function (val) {
        rectLight.position.x = val
        _this.render();
      });

      gui.add(params, 'y', -3000, 3000).onChange(function (val) {
        rectLight.position.y = val
        _this.render();
      });

      gui.add(params, 'z', 0, 6000).onChange(function (val) {
        rectLight.position.z = val
        _this.render();
      });

      gui.open();
    },
    pointLightGui(light) {
      let _this = this;
      let gui = new GUI();
      gui.close();

      let params = {
        'light color': light.color.getHex(),
        x: light.position.x,
        y: light.position.y,
        z: light.position.z,
        intensity: light.intensity,
        distance: light.distance,
        decay: light.decay,
      };

      gui.addColor(params, 'light color').onChange(function (val) {
        light.color.setHex(val);
        _this.render();
      });

      gui.add(params, 'x', 70000, 90000).onChange(function (val) {
        light.position.x = val
        _this.render();
      });

      gui.add(params, 'y', 20000, 30000).onChange(function (val) {
        light.position.y = val
        _this.render();
      });

      gui.add(params, 'z', 1000, 6000).onChange(function (val) {
        light.position.z = val
        _this.render();
      });

      gui.add(params, 'intensity', 0, 3).onChange(function (val) {
        light.intensity = val;
        _this.render();
      });


      gui.add(params, 'distance', 1, 10000).onChange(function (val) {
        light.distance = val;
        _this.render();
      });

      gui.add(params, 'decay', 1, 2).onChange(function (val) {
        light.decay = val;
        _this.render();
      });

      gui.open();
    },
    //整体位置调整器
    baseGroupGui(group) {
      let _this = this;
      let gui = new GUI();
      gui.close();

      let params = {
        x: group.rotation.x,
        y: group.rotation.y,
        z: group.rotation.z,
        px: group.position.x,
        py: group.position.y,
        pz: group.position.z,
      };

      gui.add(params, 'x', -180, 180).onChange(function (val) {
        group.rotation.x = Math.PI * val / 180
        _this.render();
      });

      gui.add(params, 'y', -180, 180).onChange(function (val) {
        group.rotation.y = Math.PI * val / 180
        _this.render();
      });

      gui.add(params, 'z', -180, 180).onChange(function (val) {
        group.rotation.z = Math.PI * val / 180
        _this.render();
      });

      gui.add(params, 'px', -10000, 10000).onChange(function (val) {
        group.position.x = val
        _this.render();
      });

      gui.add(params, 'py', -10000, 10000).onChange(function (val) {
        group.position.y = val
        _this.render();
      });

      gui.add(params, 'pz', -10000, 100000).onChange(function (val) {
        group.position.z = val
        _this.render();
      });

      gui.open();
    },
    modelsGui(model) {
      let _this = this;
      let gui = new GUI();
      gui.close();

      let params = {
        x: model.rotation.x,
        y: model.rotation.y,
        z: model.rotation.z,
        px: model.position.x,
        py: model.position.y,
        pz: model.position.z,
        scale: model.scale.z,
      };

      gui.add(params, 'x', -180, 180).onChange(function (val) {
        model.rotation.x = Math.PI * val / 180
        _this.render();
      });

      gui.add(params, 'y', -180, 180).onChange(function (val) {
        model.rotation.y = Math.PI * val / 180
        _this.render();
      });

      gui.add(params, 'z', -180, 180).onChange(function (val) {
        model.rotation.z = Math.PI * val / 180
        _this.render();
      });

      gui.add(params, 'px', -1500, 1500).onChange(function (val) {
        model.position.x = val
        _this.render();
      });

      gui.add(params, 'py', -1500, 1500).onChange(function (val) {
        model.position.y = val
        _this.render();
      });

      gui.add(params, 'pz', -1500, 1500).onChange(function (val) {
        model.position.z = val
        _this.render();
      });

      gui.add(params, 'scale', 0, 2).onChange(function (val) {
        model.scale.set(val, val, val)
        _this.render();
      });

      gui.open();
    },
    //相机调整器
    cameraGui(group) {
      let _this = this;
      let gui = new GUI();
      gui.close();

      let params = {
        px: group.position.x,
        py: group.position.y,
        pz: group.position.z,
      };

      gui.add(params, 'px', -10000, 10000).onChange(function (val) {
        group.position.x = val
        _this.render();
      });

      gui.add(params, 'py', -10000, 10000).onChange(function (val) {
        group.position.y = val
        _this.render();
      });

      gui.add(params, 'pz', -10000, 10000).onChange(function (val) {
        group.position.z = val
        _this.render();
      });

      gui.open();
    },
    //模型调整器
    objGui(obj) {
      let _this = this;
      let gui = new GUI();
      gui.close();

      let params = {
        px: 0,
        py: 0,
        pz: 0,
      };

      gui.add(params, 'px', -10000, 10000).onChange(function (val) {
        obj.position.x = val
        _this.render();
      });

      gui.add(params, 'py', -10000, 10000).onChange(function (val) {
        obj.position.y = val
        _this.render();
      });

      gui.add(params, 'pz', -10000, 10000).onChange(function (val) {
        obj.position.z = val
        _this.render();
      });

      gui.open();
    },
    //模型调整器
    markerGui(obj) {
      let _this = this;
      let gui = new GUI();
      gui.close();

      let params = {
        px: 0,
        py: 0,
      };

      gui.add(params, 'px', -1000, 1000).onChange(function (val) {
        obj.position.x = val
        _this.render();
      });

      gui.add(params, 'py', -1000, 1000).onChange(function (val) {
        obj.position.y = val
        _this.render();
      });

      gui.open();
    },
    //热力图调整器
    hotmapGui() {
      let _this = this;
      let gui = new GUI();
      gui.close();

      let params = {
        R: 255,
        G: 255,
        B: 255,
      };

      gui.add(params, 'R', 0, 255).onChange(function (val) {
        try {
          _this.centreMap.children[0].children.map((item) => {
            if (item.children[1] instanceof THREE.Mesh) {
              item.children[1].material.color.r = val / 255
            }
          })
        } catch (err) {
          console.log(err)
        }
        _this.render();
      });

      gui.add(params, 'G', 0, 255).onChange(function (val) {
        try {
          _this.centreMap.children[0].children.map((item) => {
            if (item.children[1] instanceof THREE.Mesh) {
              item.children[1].material.color.g = val / 255
            }
          })
        } catch (err) {
          console.log(err)
        }
        _this.render();
      });

      gui.add(params, 'B', 0, 255).onChange(function (val) {
        try {
          _this.centreMap.children[0].children.map((item) => {
            if (item.children[1] instanceof THREE.Mesh) {
              item.children[1].material.color.b = val / 255
            }
          })
        } catch (err) {
          console.log(err)
        }
        _this.render();
      });

      gui.open();
    },
    //效果调整器
    composerGui() {
      let _this = this;
      let gui = new GUI();
      gui.close();

      let params = {
        exposure: this.renderer.toneMappingExposure,
        bloomThreshold: this.bloomPass.threshold,
        bloomStrength: this.bloomPass.strength,
        bloomRadius: this.bloomPass.radius
      };

      gui.add( params, 'exposure', 0.1, 2 ).onChange( function ( value ) {
        _this.renderer.toneMappingExposure = Math.pow( value, 4.0 );
        _this.render();
      });

      gui.add( params, 'bloomThreshold', 0.0, 1.0 ).step( 0.01 ).onChange( function ( value ) {
        _this.bloomPass.threshold = Number( value );
        _this.render();
      } );

      gui.add( params, 'bloomStrength', 0.0, 3.0 ).step( 0.01 ).onChange( function ( value ) {
        _this.bloomPass.strength = Number( value );
        _this.render();
      } );

      gui.add( params, 'bloomRadius', 0.0, 1.0 ).step( 0.01 ).onChange( function ( value ) {
        _this.bloomPass.radius = Number( value );
        _this.render();
      } );

      gui.open();
    }
  }
}
