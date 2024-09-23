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
camera.position.z = 10;

// element from html
const canvas = document.getElementById("threejs");

// create instance of WebGLRenderer
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: canvas
});

//Geometry
const geometry = new THREE.SphereGeometry(1, 32, 16);
const uv2Geometry = new THREE.BufferAttribute(geometry.attributes.uv.array, 2);
geometry.setAttribute("uv2", uv2Geometry);

//load grass textures
textureLoad.setPath("/static/textures/whispy-grass-meadow-bl/");
const grassAlbeno = textureLoad.load("wispy-grass-meadow_albedo.png");
const grassAo = textureLoad.load("wispy-grass-meadow_ao.png");
const grassHeight = textureLoad.load("wispy-grass-meadow_height.png");
const grassMetallic = textureLoad.load("wispy-grass-meadow_metallic.png");
const grassNormal = textureLoad.load("wispy-grass-meadow_normal-ogl.png");
const grassRoughness = textureLoad.load("wispy-grass-meadow_roughness.png");

// Load the boulder textures
textureLoad.setPath("/static/textures/badlands-boulders-bl/");
const boulderAlbeno = textureLoad.load("badlands-boulders_albedo.png");
const boulderAo = textureLoad.load("badlands-boulders_ao.png");
const boulderHeight = textureLoad.load("badlands-boulders_height.png");
const boulderMetallic = textureLoad.load("badlands-boulders_metallic.png");
const boulderNormal = textureLoad.load("badlands-boulders_normal-ogl.png");
const boulderRoughness = textureLoad.load("badlands-boulders_roughness.png");

// Load the space cruiser textures
textureLoad.setPath("/static/textures/space-cruiser-panels2-bl/");
const spacecruiserAlbeno = textureLoad.load("space-cruiser-panels2_albedo.png");
const spacecruiserAo = textureLoad.load("space-cruiser-panels2_ao.png");
const spacecruiserHeight = textureLoad.load("space-cruiser-panels2_height.png");
const spacecruiserMetallic = textureLoad.load(
  "space-cruiser-panels2_metallic.png"
);
const spacecruiserNormal = textureLoad.load(
  "space-cruiser-panels2_normal-ogl.png"
);
const spacecruiserRoughness = textureLoad.load(
  "space-cruiser-panels2_roughness.png"
);

const grassPane = pane.addFolder({
  title: "Grass material",
  expanded: true
});

// initialize materail for geometry
const grassMaterial = new THREE.MeshStandardMaterial();
grassMaterial.map = grassAlbeno;
grassMaterial.roughnessMap = grassRoughness;
grassMaterial.metalnessMap = grassMetallic;
grassMaterial.normalMap = grassNormal;
grassMaterial.displacementMap = grassHeight;
grassMaterial.displacementScale = 0.1;
grassMaterial.aoMap = grassAo;

grassPane.addBinding(grassMaterial, "metalness", { min: 0, max: 1, step: 0.1 });
grassPane.addBinding(grassMaterial, "roughness", { min: 0, max: 1, step: 0.1 });
grassPane.addBinding(grassMaterial, "displacementScale", {
  min: 0,
  max: 1,
  step: 0.1
});
grassPane.addBinding(grassMaterial, "aoMapIntensity", {
  min: 0,
  max: 1,
  step: 0.1
});

// initialize boulder materail for geometry
const boulderMaterial = new THREE.MeshStandardMaterial();
boulderMaterial.map = boulderAlbeno;
boulderMaterial.roughnessMap = boulderRoughness;
boulderMaterial.metalnessMap = boulderMetallic;
boulderMaterial.normalMap = boulderNormal;
boulderMaterial.displacementMap = boulderHeight;
boulderMaterial.displacementScale = 0.1;
boulderMaterial.aoMap = boulderAo;

const boulderPane = pane.addFolder({
  title: "Boulder material",
  expanded: true
});

boulderPane.addBinding(boulderMaterial, "metalness", {
  min: 0,
  max: 1,
  step: 0.1
});
boulderPane.addBinding(boulderMaterial, "roughness", {
  min: 0,
  max: 1,
  step: 0.1
});
boulderPane.addBinding(boulderMaterial, "displacementScale", {
  min: 0,
  max: 1,
  step: 0.1
});
boulderPane.addBinding(boulderMaterial, "aoMapIntensity", {
  min: 0,
  max: 1,
  step: 0.1
});

// initialize spacecruiser materail for geometry
const spacecruiserMaterial = new THREE.MeshStandardMaterial();
spacecruiserMaterial.map = spacecruiserAlbeno;
spacecruiserMaterial.roughnessMap = spacecruiserRoughness;
spacecruiserMaterial.metalnessMap = spacecruiserMetallic;
spacecruiserMaterial.normalMap = spacecruiserNormal;
spacecruiserMaterial.displacementMap = spacecruiserHeight;
spacecruiserMaterial.displacementScale = 0.1;
spacecruiserMaterial.aoMap = spacecruiserAo;

const spacecruiserPane = pane.addFolder({
  title: "Space cruiser material",
  expanded: true
});

spacecruiserPane.addBinding(spacecruiserMaterial, "metalness", {
  min: 0,
  max: 1,
  step: 0.1
});
spacecruiserPane.addBinding(spacecruiserMaterial, "roughness", {
  min: 0,
  max: 1,
  step: 0.1
});
spacecruiserPane.addBinding(spacecruiserMaterial, "displacementScale", {
  min: 0,
  max: 1,
  step: 0.1
});
spacecruiserPane.addBinding(spacecruiserMaterial, "aoMapIntensity", {
  min: 0,
  max: 1,
  step: 0.1
});

// Create a mesh by geometry and material
const grass = new THREE.Mesh(geometry, grassMaterial);
const boulder = new THREE.Mesh(geometry, boulderMaterial);
boulder.position.x = 5;
const spaceCruiser = new THREE.Mesh(geometry, spacecruiserMaterial);
spaceCruiser.position.x = -5;

group.add(grass, boulder, spaceCruiser);

scene.add(group);
// Initialize light
const light = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(light);

const pointLight = new THREE.PointLight(0xffffff, 0.8);
pointLight.position.set(3, 3, 3);
pointLight.lookAt(0, 0, 0);
scene.add(pointLight);

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
