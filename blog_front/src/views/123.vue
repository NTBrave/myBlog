<template>
  <div id="info">
    <!-- <canvas id="glcanvas" width="640" height="480"></canvas> -->
    <!-- <a href="http://threejs.org" target="_blank" rel="noopener">three.js</a> - webgl particles waves example -->
    <div>
        <!-- 妈蛋 WebGL的GLSL语言居然可以这样写 -->
        <!-- 服了！！！ 费了4-5个小时  -->
      <div style="display: none;" id="vertexshader">
        attribute float scale;
        void main() {
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
        gl_PointSize = scale * ( 300.0 / - mvPosition.z );
        gl_Position = projectionMatrix * mvPosition;
        }
      </div >
      <div style="display: none;" id="fragmentshader">
        uniform vec3 color;
        void main() {
        if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;
        gl_FragColor = vec4( color, 1.0 );
        }
      </div>
    </div>
  </div>
</template>

        


	<script type="module">
import * as THREE from "./three.module.js";
// import Stats from './jsm/libs/stats.module.js';
export default {
  name: "Home",
  data() {
    return {
      SEPARATION: 100,
      //x轴数量
      AMOUNTX: 50,
      //y轴数量
      AMOUNTY: 50,
      container: null,
      camera: null,
      scene: null,
      renderer: null,
      particles: null,
      count: null,
      mouseX: 0,
      mouseY: 0,
      windowHalfX: null,
      windowHalfY: null
    };
  },

  methods: {
    init() {
      let _this = this;

      _this.container = document.createElement("div");
      document.body.appendChild(_this.container);
      _this.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        1,
        10000
      );
      _this.camera.position.z = 1000;
      _this.scene = new THREE.Scene();
      // 背景色
      _this.scene.background = new THREE.Color( 0xf0f0f0 );
      //
      var numParticles = _this.AMOUNTX * _this.AMOUNTY;
      var positions = new Float32Array(numParticles * 3);
      var scales = new Float32Array(numParticles);
      var i = 0,
        j = 0;
      for (var ix = 0; ix < _this.AMOUNTX; ix++) {
        for (var iy = 0; iy < _this.AMOUNTY; iy++) {
          positions[i] =
            ix * _this.SEPARATION - (_this.AMOUNTX * _this.SEPARATION) / 2; // x
          positions[i + 1] = 0; // y
          positions[i + 2] =
            iy * _this.SEPARATION - (_this.AMOUNTY * _this.SEPARATION) / 2; // z
          scales[j] = 1;
          i += 3;
          j++;
        }
      }
      var geometry = new THREE.BufferGeometry();
      geometry.addAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      geometry.addAttribute("scale", new THREE.BufferAttribute(scales, 1));
      //小球颜色 color
      var material = new THREE.ShaderMaterial({
        uniforms: {
          color: { value: new THREE.Color(0x159DF5) }
        },
        vertexShader: document.getElementById("vertexshader").textContent,
        fragmentShader: document.getElementById("fragmentshader").textContent
      });
      //
      _this.particles = new THREE.Points(geometry, material);
      _this.scene.add(_this.particles);
      //
      _this.renderer = new THREE.WebGLRenderer({ antialias: true });
      _this.renderer.setPixelRatio(window.devicePixelRatio);
      _this.renderer.setSize(window.innerWidth, window.innerHeight);
      _this.container.appendChild(_this.renderer.domElement);
      // stats = new Stats();
      // container.appendChild( stats.dom );
      document.addEventListener("mousemove", _this.onDocumentMouseMove, false);
      document.addEventListener(
        "touchstart",
        _this.onDocumentTouchStart,
        false
      );
      document.addEventListener("touchmove", _this.onDocumentTouchMove, false);
      //
      window.addEventListener("resize", _this.onWindowResize, false);
    },
    onWindowResize() {
      this.windowHalfX = window.innerWidth / 2;
      this.windowHalfY = window.innerHeight / 2;
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    },
    onDocumentMouseMove(event) {
      this.mouseX = event.clientX - this.windowHalfX;
      this.mouseY = event.clientY - this.windowHalfY;
    },
    onDocumentTouchStart(event) {
      if (event.touches.length === 1) {
        event.preventDefault();
        this.mouseX = event.touches[0].pageX - this.windowHalfX;
        this.mouseY = event.touches[0].pageY - this.windowHalfY;
      }
    },
    onDocumentTouchMove(event) {
      if (event.touches.length === 1) {
        event.preventDefault();
        this.mouseX = event.touches[0].pageX - this.windowHalfX;
        this.mouseY = event.touches[0].pageY - this.windowHalfY;
      }
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.render();
    },
    render() {
      let _this = this;
      _this.camera.position.x +=
        (_this.mouseX - _this.camera.position.x) * 0.05;
      _this.camera.position.y +=
        (-_this.mouseY - _this.camera.position.y) * 0.05;
      _this.camera.lookAt(_this.scene.position);
      var positions = _this.particles.geometry.attributes.position.array;
      var scales = _this.particles.geometry.attributes.scale.array;
      var i = 0,
        j = 0;
      for (var ix = 0; ix < _this.AMOUNTX; ix++) {
        for (var iy = 0; iy < _this.AMOUNTY; iy++) {
          positions[i + 1] =
            Math.sin((ix + _this.count) * 0.3) * 50 +
            Math.sin((iy + _this.count) * 0.5) * 50;
          scales[j] =
            (Math.sin((ix + _this.count) * 0.3) + 1) * 8 +
            (Math.sin((iy + _this.count) * 0.5) + 1) * 8;
          i += 3;
          j++;
        }
      }
      _this.particles.geometry.attributes.position.needsUpdate = true;
      _this.particles.geometry.attributes.scale.needsUpdate = true;
      _this.renderer.render(_this.scene, _this.camera);
      _this.count += 0.1;
    }


  },
  mounted() {
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;

    this.init();
    this.animate();
  }
};
</script>
<style scoped>
/* .info{
  background-color: aqua;

} */
</style>
