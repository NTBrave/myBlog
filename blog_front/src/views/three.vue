<template>
  <div id="blocker">
    <div id="instructions">
      <span style="font-size:36px">点击开始 Esc退出</span>
      <br />
      <br />移动: WASD
      <br />跳: 空格
      <br />视角: 鼠标
    </div>
  </div>
</template>
<script>
// import * as THREE from "three";
import * as THREE from "./three.module.js";
// import * as THREE from "three/build/three.module";
import { PointerLockControls } from "./PointerLockControls.js";
export default {
  name: "Home",
  data() {
    return {
      Vblocker: false,

      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      controls: null,
      objects: [],
      raycaster: null,
      moveForward: false,
      moveBackward: false,
      moveLeft: false,
      moveRight: false,
      canJump: false,
      prevTime: null,
      velocity: null,
      direction: null,
      vertex: null,
      color: null
    };
  },
  methods: {
    init() {
      let _this = this;
      _this.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        1,
        1000
      );
      _this.camera.position.y = 10;
      _this.scene = new THREE.Scene();
      _this.scene.background = new THREE.Color(0xffffff);
      _this.scene.fog = new THREE.Fog(0xffffff, 0, 750);
      var light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
      light.position.set(0.5, 1, 0.75);
      _this.scene.add(light);
      _this.controls = new PointerLockControls(_this.camera);
      var blocker = document.getElementById("blocker");
      var instructions = document.getElementById("instructions");
      instructions.addEventListener(
        "click",
        function() {
          _this.controls.lock();
          // _this.controls.lock;
        },
        false
      );
      _this.controls.addEventListener("lock", function() {
        instructions.style.display = "none";
        blocker.style.display = "none";
        _this.Vblocker = false;
      });
      _this.controls.addEventListener("unlock", function() {
        blocker.style.display = "block";
        instructions.style.display = "";
        _this.Vblocker = true;
      });
      _this.scene.add(_this.controls.getObject());
      var onKeyDown = function(event) {
        switch (event.keyCode) {
          case 38: // up
          case 87: // w
            console.log("w");
            _this.moveForward = true;
            break;
          case 37: // left
          case 65: // a
            console.log("A");

            _this.moveLeft = true;
            break;
          case 40: // down
          case 83: // s
            console.log("S");

            _this.moveBackward = true;
            break;
          case 39: // right
          case 68: // d
            console.log("D");

            _this.moveRight = true;
            break;
          case 32: // space
            if (_this.canJump === true) _this.velocity.y += 350;
            console.log("space");

            _this.canJump = false;
            break;
        }
      };
      var onKeyUp = function(event) {
        switch (event.keyCode) {
          case 38: // up
          case 87: // w
            console.log("w");

            _this.moveForward = false;
            break;
          case 37: // left
          case 65: // a
            console.log("A");

            _this.moveLeft = false;
            break;
          case 40: // down
          case 83: // s
            console.log("S");

            _this.moveBackward = false;
            break;
          case 39: // right
          case 68: // d
            console.log("D");

            _this.moveRight = false;
            break;
        }
      };
      document.addEventListener("keydown", onKeyDown, false);
      document.addEventListener("keyup", onKeyUp, false);
      _this.raycaster = new THREE.Raycaster(
        new THREE.Vector3(),
        new THREE.Vector3(0, -1, 0),
        0,
        10
      );
      // floor
      var floorGeometry = new THREE.PlaneBufferGeometry(2000, 2000, 100, 100);
      floorGeometry.rotateX(-Math.PI / 2);
      // vertex displacement
      var position = floorGeometry.attributes.position;
      for (let i = 0, l = position.count; i < l; i++) {
        _this.vertex.fromBufferAttribute(position, i);
        _this.vertex.x += Math.random() * 20 - 10;
        _this.vertex.y += Math.random() * 2;
        _this.vertex.z += Math.random() * 20 - 10;
        position.setXYZ(i, _this.vertex.x, _this.vertex.y, _this.vertex.z);
      }
      floorGeometry = floorGeometry.toNonIndexed(); // ensure each face has unique vertices
      position = floorGeometry.attributes.position;
      var colors = [];
      for (let i = 0, l = position.count; i < l; i++) {
        _this.color.setHSL(
          Math.random() * 0.3 + 0.5,
          0.75,
          Math.random() * 0.25 + 0.75
        );
        colors.push(_this.color.r, _this.color.g, _this.color.b);
      }
      floorGeometry.addAttribute(
        "color",
        new THREE.Float32BufferAttribute(colors, 3)
      );
      var floorMaterial = new THREE.MeshBasicMaterial({
        vertexColors: THREE.VertexColors
      });
      var floor = new THREE.Mesh(floorGeometry, floorMaterial);
      _this.scene.add(floor);
      // objects
      var boxGeometry = new THREE.BoxBufferGeometry(20, 20, 20);
      boxGeometry = boxGeometry.toNonIndexed(); // ensure each face has unique vertices
      position = boxGeometry.attributes.position;
      colors = [];
      for (let i = 0, l = position.count; i < l; i++) {
        _this.color.setHSL(
          Math.random() * 0.3 + 0.5,
          0.75,
          Math.random() * 0.25 + 0.75
        );
        colors.push(_this.color.r, _this.color.g, _this.color.b);
      }
      boxGeometry.addAttribute(
        "color",
        new THREE.Float32BufferAttribute(colors, 3)
      );
      for (let i = 0; i < 500; i++) {
        var boxMaterial = new THREE.MeshPhongMaterial({
          specular: 0xffffff,
          flatShading: true,
          vertexColors: THREE.VertexColors
        });
        boxMaterial.color.setHSL(
          Math.random() * 0.2 + 0.5,
          0.75,
          Math.random() * 0.25 + 0.75
        );
        var box = new THREE.Mesh(boxGeometry, boxMaterial);
        box.position.x = Math.floor(Math.random() * 20 - 10) * 20;
        box.position.y = Math.floor(Math.random() * 20) * 20 + 10;
        box.position.z = Math.floor(Math.random() * 20 - 10) * 20;
        _this.scene.add(box);
        _this.objects.push(box);
      }
      //
      _this.renderer = new THREE.WebGLRenderer({ antialias: true });
      _this.renderer.setPixelRatio(window.devicePixelRatio);
      _this.renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(_this.renderer.domElement);
      //
      window.addEventListener("resize", _this.onWindowResize, false);
    },
    onWindowResize() {
      let _this = this;
      _this.camera.aspect = window.innerWidth / window.innerHeight;
      _this.camera.updateProjectionMatrix();
      _this.renderer.setSize(window.innerWidth, window.innerHeight);
    },
    animate() {
      let _this = this;
        requestAnimationFrame(_this.animate);
      if (_this.controls.isLocked === true) {
        _this.raycaster.ray.origin.copy(_this.controls.getObject().position);
        _this.raycaster.ray.origin.y -= 10;
        var intersections = _this.raycaster.intersectObjects(_this.objects);
        var onObject = intersections.length > 0;
        var time = performance.now();
        var delta = (time - _this.prevTime) / 1000;
        _this.velocity.x -= _this.velocity.x * 10.0 * delta;
        _this.velocity.z -= _this.velocity.z * 10.0 * delta;
        _this.velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass
        _this.direction.z =
          Number(_this.moveForward) - Number(_this.moveBackward);
        _this.direction.x = Number(_this.moveRight) - Number(_this.moveLeft);
        _this.direction.normalize(); // _this ensures consistent movements in all directions
        if (_this.moveForward || _this.moveBackward)
          _this.velocity.z -= _this.direction.z * 400.0 * delta;
        if (_this.moveLeft || _this.moveRight)
          _this.velocity.x -= _this.direction.x * 400.0 * delta;
        if (onObject === true) {
          _this.velocity.y = Math.max(0, _this.velocity.y);
          _this.canJump = true;
        }
        _this.controls.moveRight(-_this.velocity.x * delta);
        _this.controls.moveForward(-_this.velocity.z * delta);
        _this.controls.getObject().position.y += _this.velocity.y * delta; // new behavior
        if (_this.controls.getObject().position.y < 10) {
          _this.velocity.y = 0;
          _this.controls.getObject().position.y = 10;
          _this.canJump = true;
        }
        _this.prevTime = time;
      }
      _this.renderer.render(_this.scene, _this.camera);
    }
  },
  mounted() {
    let _this = this;
    _this.prevTime = performance.now();
    _this.velocity = new THREE.Vector3();
    _this.direction = new THREE.Vector3();
    _this.vertex = new THREE.Vector3();
    _this.color = new THREE.Color();
    _this.init();
    _this.animate();
  }
};
</script>
<style>
#blocker {
  position: absolute;
  width: 100%;
  height: 90%;
  background-color: rgba(0, 0, 0, 0.5);
}
#instructions {
  width: 100%;
  height: 100%;
  display: -webkit-box;
  display: -moz-box;
  /* display: box; */
  -webkit-box-orient: horizontal;
  -moz-box-orient: horizontal;
  box-orient: horizontal;
  -webkit-box-pack: center;
  -moz-box-pack: center;
  box-pack: center;
  -webkit-box-align: center;
  -moz-box-align: center;
  box-align: center;
  color: #ffffff;
  text-align: center;
  font-family: Arial;
  font-size: 14px;
  line-height: 24px;
  cursor: pointer;
}
</style>