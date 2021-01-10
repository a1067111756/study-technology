import * as THREE from "three";
import guiMixin from "./_gui.js";
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';

export default {
    mixins: [guiMixin],
    data() {
        return {
            light: {
                spotLight: null, // 聚光灯
                lightHelper: null, // 聚光灯
                shadowCameraHelper: null, // 聚光灯
            }
        }
    },
    methods: {
        lights() {
            //环境光
            //this.baseGroup.add(new THREE.AmbientLight("#ffffff"))

            //聚光灯
            this.addSpotLight();

            //平面光光源-1
            // let rectAreaLight1 = this.addRectAreaLight({width: 500, height: 500, intensity: 50, x:174, y:174, z:1200, lookAt: {x: 0, y: 0, z: 0}});
            // // this.gui.rectLightGuiSwitch && this.rectLightGui(rectAreaLight1.rectLight, rectAreaLight1.rectLightMesh); // 聚光灯调试器

            // //平面光光源-2
            // let rectAreaLight2 =  this.addRectAreaLight({width: 500, height: 500, intensity: 4, x:1670, y:2190, z:1874, lookAt: {x: 0, y: 0, z: 0}});
            // //this.gui.rectLightGuiSwitch && this.rectLightGui(rectAreaLight2.rectLight, rectAreaLight2.rectLightMesh); // 聚光灯调试器

            // //平面光光源-3
            // let rectAreaLight3 =  this.addRectAreaLight({width: 1200, height: 1200, intensity: 40, x:-2232, y:2775, z:2784, lookAt: {x: 0, y: 0, z: 0}});
            // //this.gui.rectLightGuiSwitch && this.rectLightGui(rectAreaLight3.rectLight); // 聚光灯调试器

            // //平面光光源-4
            // let rectAreaLight4 =  this.addRectAreaLight({width: 500, height: 500, intensity: 100, x:-412, y:-737, z:1028, lookAt: {x: 0, y: 0, z: 0}});
            //this.gui.rectLightGuiSwitch && this.rectLightGui(rectAreaLight4.rectLight); // 聚光灯调试器


            /*let spotLight3 = new THREE.SpotLight("#ffffff", 1);
            spotLight3.position.set(-1126, -996, 1614);
            spotLight3.intensity = 3.4;
            spotLight3.distance = 3356;
            spotLight3.angle = 0.31;
            spotLight3.penumbra = 0.72;
            spotLight3.decay = 1.3;

            //阴影
            spotLight3.castShadow = true;
            spotLight3.shadow.mapSize.width = 1024;
            spotLight3.shadow.mapSize.height = 1024;
            spotLight3.shadow.camera.near = 10;
            spotLight3.shadow.camera.far = 200;

            this.baseGroup.add(spotLight3);
            this.spotLightGuiSwitch && this.spotLightGui(spotLight3); // 聚光灯调试器*/

            //半球光
            /*let hemiLight = new THREE.HemisphereLight( '#ff0000', '#091F31', 0.6 );
            //hemiLight.color.setHSL( 0.6, 1, 0.6 );
            //hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
            hemiLight.position.set( 0, 0, 0 );
            this.baseGroup.add( hemiLight );*/

            /*let vertexShader = document.getElementById( 'skyVS' ).textContent;
            let fragmentShader = document.getElementById( 'skyFS' ).textContent;
            let uniforms = {
                "topColor": { value: new THREE.Color( '#0d4363' ) },
                "bottomColor": { value: new THREE.Color( '#091F31' ) },
                "offset": { value: 33 },
                "exponent": { value: 0.6 }
            };
            let skyGeo = new THREE.SphereBufferGeometry( 1500, 32, 15 );
            let skyMat = new THREE.ShaderMaterial( {
                uniforms: uniforms,
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
                side: THREE.BackSide
            } );

            let sky = new THREE.Mesh( skyGeo, skyMat );
            this.baseGroup.add( sky );*/
        },
        addSpotLight() {
            //聚光灯
            let spotLight = new THREE.SpotLight("#ffffff", 1);
            spotLight.name = '聚光灯'
            spotLight.position.set(174, 3650, -1062);
            spotLight.intensity = 19;
            spotLight.distance = 4857;
            spotLight.angle = 0.32;
            spotLight.penumbra = 0.65;
            spotLight.decay = 1;
            //聚光灯-阴影
            spotLight.castShadow = true;
            spotLight.shadow.mapSize.width = 1024;
            spotLight.shadow.mapSize.height = 1024;
            spotLight.shadow.camera.near = 10;
            spotLight.shadow.camera.far = 200;
            spotLight.shadow.focus = 1;
            this.light.spotLight = spotLight;
            //聚光灯-辅助线
            if(this.gui.spotLightGuiSwitch) {
                this.light.lightHelper = new THREE.SpotLightHelper(spotLight);
                this.scene.add(this.light.lightHelper);
            }
            //聚光灯-阴影辅助线
            if(this.gui.spotLightGuiSwitch) {
                this.light.shadowCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
                this.scene.add(this.light.shadowCameraHelper);
            }

            this.scene.add(this.light.spotLight);
            this.gui.spotLightGuiSwitch && this.spotLightGui(spotLight); // 聚光灯调试器

            let spotLightMesh = new THREE.Mesh( new THREE.PlaneBufferGeometry(), new THREE.MeshBasicMaterial( { side: THREE.BackSide } ) );
            spotLightMesh.scale.x = 500;
            spotLightMesh.scale.y = 500;
            //spotLight.add( spotLightMesh )
        },
        addRectAreaLight(obj) {
            //平面光光源
            RectAreaLightUniformsLib.init();

            let rectLight = new THREE.RectAreaLight( '#D1DAFF', obj.intensity,  obj.width, obj.height );
            rectLight.position.set( obj.x, obj.y, obj.z  );
            rectLight.lookAt( obj.lookAt.x, obj.lookAt.y, obj.lookAt.z );

            /*let rectLightMesh = new THREE.Mesh( new THREE.PlaneBufferGeometry(), new THREE.MeshBasicMaterial( { side: THREE.BackSide } ) );
            rectLightMesh.scale.x = rectLight.width;
            rectLightMesh.scale.y = rectLight.height;
            rectLight.add( rectLightMesh )*/

            //let rectLightHelper = new THREE.RectAreaLightHelper( rectLight );
            //this.baseGroup.add( rectLightHelper );

            this.baseGroup.add( rectLight )

            return {rectLight: rectLight}
        }
    }
}
