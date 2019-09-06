<template>
  <div id="info">
    <!-- <a href="http://threejs.org" target="_blank" rel="noopener">three.js</a> - THREE.PointLight ShadowMap by
    <a href="https://github.com/mkkellogg">mkkellogg</a> -->
  </div>
</template>
<script>
import * as THREE from "./three.module.js";
// import Stats from "./stats.module.js";
// 滚轮控制
import { OrbitControls } from "./OrbitControls.js";
// import { OrbitControls } from "three/examples/js/controls/OrbitControls";

export default {
  name: "Home",
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      // stats: null,

      pointLight: null,
      pointLight2: null
    };
  },
  methods: {
    // generateTexture1() {
    //   var canvasTt = document.createElement("canvas");
    //   canvasTt.width = 2;
    //   canvasTt.height = 2;
    //   var context = canvasTt.getContext("2d");
    //   contextTt.fillStyle = "white";
    //   contextTt.fillRect(0, 1, 2, 1);
    //   return canvasTt;
    // },
    init() {
      let _this =this;
      this.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        1000
      );
      this.camera.position.set(0, 10, 40);
      this.scene = new THREE.Scene();
      this.scene.add(new THREE.AmbientLight(0x111122));
      // lights
      function createLight(color) {
        var intensity = 1.5;
        var pointLight = new THREE.PointLight(color, intensity, 20);
        pointLight.castShadow = true;
        pointLight.shadow.camera.near = 1;
        pointLight.shadow.camera.far = 60;
        pointLight.shadow.bias = -0.005; // reduces self-shadowing on double-sided objects
        var geometry = new THREE.SphereBufferGeometry(0.3, 12, 6);
        var material = new THREE.MeshBasicMaterial({ color: color });
        material.color.multiplyScalar(intensity);
        var sphere = new THREE.Mesh(geometry, material);
        pointLight.add(sphere);

           var canvasTt = document.createElement("canvas");
      canvasTt.width = 2;
      canvasTt.height = 2;
      var contextTt = canvasTt.getContext("2d");
      contextTt.fillStyle = "white";
      contextTt.fillRect(0, 1, 2, 1);

        var texture = new THREE.CanvasTexture(canvasTt);
        texture.magFilter = THREE.NearestFilter;
        texture.wrapT = THREE.RepeatWrapping;
        texture.wrapS = THREE.RepeatWrapping;
        texture.repeat.set(1, 4.5);
        var geometry = new THREE.SphereBufferGeometry(2, 32, 8);
        var material = new THREE.MeshPhongMaterial({
          side: THREE.DoubleSide,
          alphaMap: texture,
          alphaTest: 0.5
        });
        var sphere = new THREE.Mesh(geometry, material);
        sphere.castShadow = true;
        sphere.receiveShadow = true;
        pointLight.add(sphere);
        // custom distance material
        var distanceMaterial = new THREE.MeshDistanceMaterial({
          alphaMap: material.alphaMap,
          alphaTest: material.alphaTest
        });
        sphere.customDistanceMaterial = distanceMaterial;
        return pointLight;
      }
      this.pointLight = createLight(0x0088ff);
      this.scene.add(this.pointLight);
      this.pointLight2 = createLight(0xff8888);
      this.scene.add(this.pointLight2);
      //
      var geometry = new THREE.BoxBufferGeometry(30, 30, 30);
      var material = new THREE.MeshPhongMaterial({
        color: 0xa0adaf,
        shininess: 10,
        specular: 0x111111,
        side: THREE.BackSide
      });
      var mesh = new THREE.Mesh(geometry, material);
      mesh.position.y = 10;
      mesh.receiveShadow = true;
      this.scene.add(mesh);
      //
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.BasicShadowMap;
      document.body.appendChild(this.renderer.domElement);
      var controls = new OrbitControls(this.camera, this.renderer.domElement);
      controls.target.set(0, 10, 0);
      controls.update();
      // this.stats = new Stats();
      // document.body.appendChild(this.stats.dom);
      //
      window.addEventListener("resize", this.onWindowResize, false);
    },
    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    },

    animate() {
      requestAnimationFrame(this.animate);
      this.render();
    },
    render() {
      var time = performance.now() * 0.001;
      this.pointLight.position.x = Math.sin(time * 0.6) * 9;
      this.pointLight.position.y = Math.sin(time * 0.7) * 9 + 6;
      this.pointLight.position.z = Math.sin(time * 0.8) * 9;
      this.pointLight.rotation.x = time;
      this.pointLight.rotation.z = time;
      time += 10000;
      this.pointLight2.position.x = Math.sin(time * 0.6) * 9;
      this.pointLight2.position.y = Math.sin(time * 0.7) * 9 + 6;
      this.pointLight2.position.z = Math.sin(time * 0.8) * 9;
      this.pointLight2.rotation.x = time;
      this.pointLight2.rotation.z = time;
      this.renderer.render(this.scene, this.camera);
      // this.stats.update();
    }
  },
  mounted() {
    this.init();
    this.animate();
  }
};
</script>
<style>
canvas {
  display: block;
}

#info {
  position: absolute;
  top: 0px;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  text-align: center;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  pointer-events: none;
  z-index: 1; /* TODO Solve this in HTML */
}
</style>