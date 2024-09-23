import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";

//initialize the pane
const pane = new Pane();

// create scene
const scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();
// create camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.01,
  1000
);
// set camera position
camera.position.z = 50;

// element from html
const canvas = document.getElementById("threejs");

// Load Textures
textureLoader.setPath("/static/textures");
const sunTexture = textureLoader.load("/2k_sun.jpg");
const mercuryTexture = textureLoader.load("/2k_mercury.jpg");
const venusTexture = textureLoader.load("/2k_venus_surface.jpg");
const marsTexture = textureLoader.load("/2k_mars.jpg");
const moonTexture = textureLoader.load("/2k_moon.jpg");
const earthTexture = textureLoader.load("/2k_earth_daymap.jpg");
const backgroundTexture = new THREE.CubeTextureLoader()
  .setPath("/static/textures/cubeMap/")
  .load(["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]);
scene.background = backgroundTexture;

const sunMaterial = new THREE.MeshBasicMaterial({
  map: sunTexture
});
const mercuryMaterial = new THREE.MeshBasicMaterial({
  map: mercuryTexture
});
const venusMaterial = new THREE.MeshBasicMaterial({
  map: venusTexture
});
const marsMaterial = new THREE.MeshBasicMaterial({
  map: marsTexture
});
const moonMaterial = new THREE.MeshBasicMaterial({
  map: moonTexture
});
const earthMaterial = new THREE.MeshBasicMaterial({
  map: earthTexture
});

const planets = [
  {
    name: "Mercury",
    radius: 0.5,
    distance: 10,
    speed: 0.004,
    material: mercuryMaterial,
    moons: []
  },
  {
    name: "Venus",
    radius: 0.8,
    distance: 15,
    speed: 0.007,
    material: venusMaterial,
    moons: []
  },
  {
    name: "Earth",
    radius: 1,
    distance: 20,
    speed: 0.005,
    material: earthMaterial,
    moons: [
      {
        name: "Moon",
        radius: "0.3",
        distance: 3,
        material: moonMaterial,
        speed: 0.001
      }
    ]
  },
  {
    name: "Mars",
    radius: 0.7,
    distance: 25,
    speed: 0.003,
    material: marsMaterial,
    moons: [
      {
        name: "Phobos",
        radius: 0.1,
        distance: 2,
        material: moonMaterial,
        speed: 0.002
      },
      {
        name: "Deimos",
        radius: 0.2,
        distance: 3,
        material: moonMaterial,
        speed: 0.015,
        color: 0xffffff
      }
    ]
  }
];

//initialize geometry
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sun = new THREE.Mesh(sphereGeometry, sunMaterial);
sun.scale.setScalar(5);

scene.add(sun);

const createPlanet = (planet) => {
  // create mesh
  const planetMesh = new THREE.Mesh(sphereGeometry, planet.material);
  // set radius
  planetMesh.scale.setScalar(planet.radius);
  // set distance
  planetMesh.position.x = planet.distance;
  planetMesh.name = planet.name;
  return planetMesh;
};

const createMoon = (moon) => {
  const moonMesh = new THREE.Mesh(sphereGeometry, moon.material);
  moonMesh.scale.setScalar(moon.radius);
  moonMesh.position.x = moon.distance;
  return moonMesh;
};

const planetMeshes = planets.map((planet) => {
  const planetMesh = createPlanet(planet);
  scene.add(planetMesh);

  planet.moons.forEach((moon) => {
    const moonMesh = createMoon(moon);
    planetMesh.add(moonMesh);
  });

  return planetMesh;
});

// Initialize light
const light = new THREE.AmbientLight(0x000000, 0.1);
scene.add(light);

const pointLight = new THREE.PointLight(0xffffff, 2);
scene.add(pointLight);

// const axesHelper = new THREE.AxesHelper(10);
// scene.add(axesHelper);

// create instance of WebGLRenderer
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: canvas
});

// set a size of renderer area
renderer.setSize(window.innerWidth, window.innerHeight);

// Orbit Contrsols
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.autoRotate = true;

const animate = () => {
  planetMeshes.forEach((planet, indexPlanet) => {
    planet.rotation.y += planets[indexPlanet].speed;
    planet.position.x =
      Math.sin(planet.rotation.y) * planets[indexPlanet].distance;
    planet.position.z =
      Math.cos(planet.rotation.y) * planets[indexPlanet].distance;
    planet.children.forEach((moon, indexMoon) => {
      moon.rotation.y += planets[indexPlanet].moons[indexMoon].speed;
      moon.position.x =
        Math.sin(moon.rotation.y) *
        planets[indexPlanet].moons[indexMoon].distance;
      moon.position.z =
        Math.cos(moon.rotation.y) *
        planets[indexPlanet].moons[indexMoon].distance;
    });
  });
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
