import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'


export default {
  data () {
    return {
      finalComposer: null,
      bloomLayer: null,
      darkMaterial: null,
      bloomPass: null,
      composer: null
    }
  },
  methods: {
    $$bloomLayer() {
      this.bloomLayer = new THREE.Layers()
      this.bloomLayer.set(1)
    },
    $$darkMaterial() {
      this.darkMaterial = new THREE.MeshBasicMaterial( { color: "black" } )
    },
    $$render() {
      const renderScene = new RenderPass( this.scene, this.camera );

      this.bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
      this.bloomPass.threshold = 0.01;
      this.bloomPass.strength = 1.81;
      this.bloomPass.radius = 0;

      this.composer = new EffectComposer( this.renderer );
      this.composer.renderToScreen = false
      this.composer.setSize(window.innerWidth, window.innerHeight)
      this.composer.addPass( renderScene );
      this.composer.addPass( this.bloomPass );

      let ShaderMaterial = {
        uniforms: {
          baseTexture: { value: null },
          bloomTexture: { value: this.composer.renderTarget2.texture }
        },
        vertexShader:
          `
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
            }
          `,
        fragmentShader:
          `
            uniform sampler2D baseTexture;
            uniform sampler2D bloomTexture;
            varying vec2 vUv;
            void main() {
              gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );
            }
            `
      }
      const finalPass = new ShaderPass(
        new THREE.ShaderMaterial( {
          uniforms: ShaderMaterial.uniforms,
          vertexShader: ShaderMaterial.vertexShader,
          fragmentShader: ShaderMaterial.fragmentShader,
          defines: {}
        } ), "baseTexture"
      );
      finalPass.needsSwap = true;

      this.finalComposer = new EffectComposer( this.renderer );
      this.finalComposer.addPass( renderScene );
      this.finalComposer.addPass( finalPass );
    },
    // $$renderUpdate() {
    //   this.scene.traverse( this.darkenNonBloomed );
    //   this.composer.render();
    //   this.scene.traverse( this.restoreMaterial );
    //   this.finalComposer.render();
    // },
    // darkenNonBloomed(obj) {
    //   if ( obj.isMesh && this.bloomLayer.test( obj.layers ) === false ) {
    //     this.materials[ obj.uuid ] = obj.material;
    //     obj.material = this.darkMaterial;
    //   }
    // },
    // restoreMaterial( obj ) {
    //   if ( this.materials[ obj.uuid ] ) {
    //     obj.material = this.materials[ obj.uuid ];
    //     delete this.materials[ obj.uuid ];
    //   }
    // }
  }
}
