import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";

//initialize the pane
const pane = new Pane();

// create scene
const scene = new THREE.Scene();

// create camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
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

//Geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16);
const planeGeometry = new THREE.PlaneGeometry(1, 1);

// initialize materail for geometry
const material = new THREE.MeshStandardMaterial();
material.color = new THREE.Color("green");

pane.addBinding(material, "metalness", {
  min: 0,
  max: 1,
  step: 0.01
});

pane.addBinding(material, "roughness", {
  min: 0,
  max: 1,
  step: 0.01
});

// Create a mesh by geometry and material
const mesh = new THREE.Mesh(geometry, material);

const mesh2 = new THREE.Mesh(torusKnotGeometry, material);
mesh2.position.x = 1.5;

const mesh3 = new THREE.Mesh(planeGeometry, material);
mesh3.position.x = -1.5;

scene.add(mesh);
scene.add(mesh2);
scene.add(mesh3);

// Initialize light
const light = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(light);

const pointLight = new THREE.PointLight(0xffffff, 0.7);
pointLight.position.set(2, 5, 5);
scene.add(pointLight);

const axesHelperObj = new THREE.AxesHelper(1);
const axesHelper = new THREE.AxesHelper(2);

// mesh.add(axesHelperObj);
scene.add(axesHelper);

// set a size of renderer area
renderer.setSize(window.innerWidth, window.innerHeight);

// Orbit Contrsols
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.autoRotate = true;

const animate = () => {
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
