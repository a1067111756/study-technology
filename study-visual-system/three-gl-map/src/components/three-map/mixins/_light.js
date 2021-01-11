import * as THREE from "three";

export default {
  methods: {
    // 初始化灯光
    initLinght (scene) {
      this.addDirectionalLight(scene)
      this.addSpotLightLight(scene)
    },

    // 添加平行光
    addDirectionalLight (scene) {
      const directionalLight = new THREE.DirectionalLight(0xffffff);
      directionalLight.position.set(-40, 60, 20);
      directionalLight.shadow.camera.near = 20; //产生阴影的最近距离
      directionalLight.shadow.camera.far = 200; //产生阴影的最远距离
      directionalLight.shadow.camera.left = -50; //产生阴影距离位置的最左边位置
      directionalLight.shadow.camera.right = 50; //最右边
      directionalLight.shadow.camera.top = 50; //最上边
      directionalLight.shadow.camera.bottom = -50; //最下面
      directionalLight.castShadow = true;
      directionalLight.intensity = 6;
      scene.add(directionalLight);
    },

    // 添加聚光灯
    addSpotLightLight (scene) {
      const spotLight = new THREE.PointLight(0xffffff)
      spotLight.position.set(0, 200, 0)
      spotLight.castShadow = true
      spotLight.intensity = 5
      scene.add(spotLight);
    }    
  }
};
