import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";

//initialize the pane
const pane = new Pane();

// initialize a group
const group = new THREE.Group();
// create scene
const scene = new THREE.Scene();

// initialize texture
const textureLoad = new THREE.TextureLoader();

// create camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.01,
  1000
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
const uv2Geometry = new THREE.BufferAttribute(geometry.attributes.uv.array, 2);
geometry.setAttribute("uv2", uv2Geometry);
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16);
const planeGeometry = new THREE.PlaneGeometry(1, 1);
const speheGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 35);

const grassAlbeno = textureLoad.load(
  "/static/textures/whispy-grass-meadow-bl/wispy-grass-meadow_albedo.png"
);
const grassAo = textureLoad.load(
  "/static/textures/whispy-grass-meadow-bl/wispy-grass-meadow_ao.png"
);
const grassHeight = textureLoad.load(
  "/static/textures/whispy-grass-meadow-bl/wispy-grass-meadow_height.png"
);
const grassMetallic = textureLoad.load(
  "/static/textures/whispy-grass-meadow-bl/wispy-grass-meadow_metallic.png"
);
const grassNormal = textureLoad.load(
  "/static/textures/whispy-grass-meadow-bl/wispy-grass-meadow_normal-ogl.png"
);
const grassrRoughness = textureLoad.load(
  "/static/textures/whispy-grass-meadow-bl/wispy-grass-meadow_roughness.png"
);

// initialize materail for geometry
const material = new THREE.MeshStandardMaterial();
material.map = grassAlbeno;
material.roughnessMap = grassrRoughness;
material.roughness = 1;

material.metalnessMap = grassMetallic;
material.metalness = 1;

material.normalMap = grassNormal;

material.displacementMap = grassHeight;
material.displacementScale = 0.1;

material.aoMap = grassAo;
pane.addBinding(material, "aoMapIntensity", {
  min: 0,
  max: 1,
  step: 0.1
});
// Create a mesh by geometry and material
const mesh = new THREE.Mesh(geometry, material);

const mesh2 = new THREE.Mesh(torusKnotGeometry, material);
mesh2.position.x = 1.5;

const spehe = new THREE.Mesh(speheGeometry, material);
spehe.position.y = 1.5;

const cylinder = new THREE.Mesh();
cylinder.position.y = -1.5;

cylinder.geometry = cylinderGeometry;
cylinder.material = material;

const plane = new THREE.Mesh(planeGeometry, material);
plane.position.x = -1.5;

group.add(mesh, mesh2, plane, spehe, cylinder);

scene.add(group);
// Initialize light
const light = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(light);

const pointLight = new THREE.PointLight(0xffffff, 0.8);
pointLight.position.set(1, 1, 1);
scene.add(pointLight);

const axesHelperObj = new THREE.AxesHelper(1);
const axesHelper = new THREE.AxesHelper(2);

scene.add(axesHelper);

// set a size of renderer area
renderer.setSize(window.innerWidth, window.innerHeight);

// Orbit Contrsols
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.autoRotate = true;

const animate = () => {
  // group.children.forEach((child) => {
  //   if (child instanceof THREE.Mesh) child.rotation.y += 0.01;
  // });

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
