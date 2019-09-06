<template>
  <div id="info">
    <!-- <canvas id="glcanvas" width="640" height="480"></canvas> -->
    <!-- <a href="http://threejs.org" target="_blank" rel="noopener">three.js</a> - webgl particles waves example -->
  </div>
</template>

        


	<script type="module">
import * as THREE from "./three.module.js";
// import Stats from './jsm/libs/stats.module.js';
export default {
  name: "Home",
  data() {
    return {
    //   SEPARATION: 100,
    //   AMOUNTX: 50,
    //   AMOUNTY: 50,
    //   container: null,
    //   count: null,
      camera: null,
      scene: null,
      renderer: null,
       mouseX: 0,
      mouseY: 0,
      windowHalfX: null,
      windowHalfY: null,
       particles: null,

      materials: [],
      parameters: null,
     

    
    };
  },

  methods: {
    init() {
      let _this = this;

      _this.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        1,
        2000
      );
      _this.camera.position.z = 1000;
      _this.scene = new THREE.Scene();
      _this.scene.fog = new THREE.FogExp2(0x000000, 0.0008);
      var geometry = new THREE.BufferGeometry();
      var vertices = [];
      var textureLoader = new THREE.TextureLoader();
      var sprite1 = textureLoader.load(
        "https://threejs.org/examples/textures/sprites/snowflake1.png"
      );
      var sprite2 = textureLoader.load(
        "https://threejs.org/examples/textures/sprites/snowflake2.png"
      );
      var sprite3 = textureLoader.load(
        "https://threejs.org/examples/textures/sprites/snowflake3.png"
      );
      var sprite4 = textureLoader.load(
        "https://threejs.org/examples/textures/sprites/snowflake4.png"
      );
      var sprite5 = textureLoader.load(
        "https://threejs.org/examples/textures/sprites/snowflake5.png"
      );
      for (var j = 0; j < 10000; j++) {
        var x = Math.random() * 2000 - 1000;
        var y = Math.random() * 2000 - 1000;
        var z = Math.random() * 2000 - 1000;
        vertices.push(x, y, z);
      }
      geometry.addAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3)
      );
      _this.parameters = [
        [[1.0, 0.2, 0.5], sprite2, 20],
        [[0.95, 0.1, 0.5], sprite3, 15],
        [[0.9, 0.05, 0.5], sprite1, 10],
        [[0.85, 0, 0.5], sprite5, 8],
        [[0.8, 0, 0.5], sprite4, 5]
      ];
      for (var i = 0; i < _this.parameters.length; i++) {
        var color = _this.parameters[i][0];
        var sprite = _this.parameters[i][1];
        var size = _this.parameters[i][2];
        _this.materials[i] = new THREE.PointsMaterial({
          size: size,
          map: sprite,
          blending: THREE.AdditiveBlending,
          depthTest: false,
          transparent: true
        });
        _this.materials[i].color.setHSL(color[0], color[1], color[2]);
        var particles = new THREE.Points(geometry, _this.materials[i]);
        particles.rotation.x = Math.random() * 6;
        particles.rotation.y = Math.random() * 6;
        particles.rotation.z = Math.random() * 6;
        _this.scene.add(particles);
      }
      //
      //
      _this.renderer = new THREE.WebGLRenderer();
      _this.renderer.setPixelRatio(window.devicePixelRatio);
      _this.renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(_this.renderer.domElement);
      //

      //

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
      var time = Date.now() * 0.00005;
      _this.camera.position.x +=
        (_this.mouseX - _this.camera.position.x) * 0.05;
      _this.camera.position.y +=
        (-_this.mouseY - _this.camera.position.y) * 0.05;

      _this.camera.lookAt(_this.scene.position);

      for (let i = 0; i < _this.scene.children.length; i++) {
        var object = _this.scene.children[i];
        if (object instanceof THREE.Points) {
          object.rotation.y = time * (i < 4 ? i + 1 : -(i + 1));
        }
      }
      for (let i = 0; i < _this.materials.length; i++) {
        var color = _this.parameters[i][0];
        var h = ((360 * (color[0] + time)) % 360) / 360;
        _this.materials[i].color.setHSL(h, color[1], color[2]);
      }

      _this.renderer.render(_this.scene, _this.camera);
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
