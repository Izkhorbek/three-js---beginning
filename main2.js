import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// create scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("white");
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
const geometry = new THREE.BoxGeometry(1, 1, 1);

// create materail for geometry
const cubeMaterial = new THREE.MeshBasicMaterial();
// The Color must be set as new THREE.Color()
cubeMaterial.color = new THREE.Color("red");
cubeMaterial.transparent = true;
cubeMaterial.opacity = 0.5;

// this is available only in materials
cubeMaterial.side = THREE.DoubleSide;
// if fog is false in mesh basic materal as above examle, and fog of scene doesn't effect to material
// cubeMaterial.fog = true;
// fog couldn't be add to scene (.add)
// instead, it is to be equal like(scene.fog = fog)
const fog = new THREE.Fog(0xffffff, 0.1, 10);
scene.fog = fog;

// Create a mesh by geometry and material
const cubeMesh = new THREE.Mesh(geometry, cubeMaterial);

cubeMesh.position.y = 1;
cubeMesh.position.x = 1;

scene.add(cubeMesh);

const axesHelperObj = new THREE.AxesHelper(1);
const axesHelper = new THREE.AxesHelper(2);

cubeMesh.add(axesHelperObj);
scene.add(axesHelper);

// set a size of renderer area
renderer.setSize(window.innerWidth, window.innerHeight);

// Orbit Contrsols
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.autoRotate = true;
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
