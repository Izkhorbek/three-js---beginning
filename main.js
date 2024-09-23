import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// create scene
const scene = new THREE.Scene();

// create camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  10
);

// set camera position
camera.position.z = 5;

// element from html
const canvas = document.getElementById("threejs");

// create instance of WebGLRenderer
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: canvas
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// create geometry
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

// create materail for geometry
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: "red",
  wireframe: true
});

// Create a mesh by geometry and material
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

cubeMesh.position.y = 1;
cubeMesh.position.x = 1;

//const group = new THREE.Group();
//group.add(cubeMesh);
//group.scale.setScalar(2);
//scene.add(group);
// add a mesh to scene
scene.add(cubeMesh);
cubeMesh.rotation.reorder("YXZ");
cubeMesh.rotation.y = THREE.MathUtils.degToRad(10);

const axesHelperObj = new THREE.AxesHelper(1);
const axesHelper = new THREE.AxesHelper(2);
cubeMesh.add(axesHelperObj);
scene.add(axesHelper);
// set a size of renderer area
renderer.setSize(window.innerWidth, window.innerHeight);

// Initialize the clock
const clock = new THREE.Clock();
let previousTime = 0;

// Orbit Contrsols
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const animate = () => {
  const delta = clock.getElapsedTime() - previousTime;
  previousTime = clock.getElapsedTime();

  cubeMesh.rotation.y += THREE.MathUtils.degToRad(10) * delta;
  // cubeMesh.position.y += -1 * delta;

  // using sin

  cubeMesh.scale.x = Math.sin(clock.getElapsedTime()) + 1;

  //update control
  controls.update();

  // render with scene and camera
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
};

animate();

window.addEventListener("resize", () => {
  // set a resize of renderer area

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
