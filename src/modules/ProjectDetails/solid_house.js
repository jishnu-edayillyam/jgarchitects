/* eslint-disable import/extensions */
/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
// import './style.css'
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
// import * as dat from 'dat.gui'
import { OrthographicCamera, Color } from "three";
// import { Color } from 'three';

// import "./wireframe_house.js";

/**
 * Base
 */
const parameters = {};

// Canvas
const canvas = document.querySelector("canvas.canvas2");
canvas.style.backgroundColor = "black";

// Scene
const scene = new THREE.Scene();

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// const div = document.getElementById("div1");
// div.addEventListener("scroll", (event) => {
//   if (div.scrollTop >= 800 && div.scrollTop <= 2000) {
//     camera.position.setZ(50 - (div.scrollTop - 800) / 100);
//   }
// });

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.set(0, 0, 50);
scene.add(camera);
const axesHelper = new THREE.AxesHelper(15);
scene.add(axesHelper);
// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

// imported models
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

let house;
const scaleFactor = 50;

const houseGroup = new THREE.Group();

gltfLoader.load("/models/shaji_7.glb", (gltf) => {
  // console.log("dsfsdfsf", gltf);
  gltf.scene.traverse((child) => {
    if (child.isMesh) {
      // console.log("mesh found");
      house = [...child.parent.children];
      return true;
    }
  });

  for (const child of house) {
    // child.material.wireframe = true;
    // child.material.color = new Color('#fff');
    // child.material.transparent = true;
    // child.material.opacity = 0.1

    // house
    const solid = new THREE.Mesh(child.geometry, child.material);
    solid.scale.set(1 / scaleFactor, 1 / scaleFactor, 1 / scaleFactor);
    solid.position.set(
      -(solid.geometry.boundingBox.max.x + solid.geometry.boundingBox.min.x) /
        (2 * scaleFactor),
      0,
      -(solid.geometry.boundingBox.max.z + solid.geometry.boundingBox.min.z) /
        (2 * scaleFactor)
    );
    houseGroup.add(solid);
  }
});

scene.add(houseGroup);

// lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.far = 150;
directionalLight.shadow.camera.left = -7;
directionalLight.shadow.camera.top = 7;
directionalLight.shadow.camera.right = 7;
directionalLight.shadow.camera.bottom = -7;
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();
let oldElapsedTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - oldElapsedTime;
  oldElapsedTime = elapsedTime;

  houseGroup.rotation.y = elapsedTime / 5;

  // // Update controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
