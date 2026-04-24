// scene.js — Three.js scene, camera, lights, renderers

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';

export let scene, camera, renderer, labelRenderer, controls;

export function initScene(container) {
  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0d1f3c); // deep navy — visible even without CSS
  scene.fog = new THREE.FogExp2(0x0a1628, 0.012);

  // Camera
  const w = container.clientWidth;
  const h = container.clientHeight;
  camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 500);
  camera.position.set(18, 12, 18);
  camera.lookAt(0, 2, 0);

  // WebGL Renderer — solid background, no alpha needed
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(w, h); // Three.js sets canvas width/height + CSS size
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  container.appendChild(renderer.domElement);

  // CSS2D Label Renderer
  labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize(w, h);
  labelRenderer.domElement.style.position = 'absolute';
  labelRenderer.domElement.style.top = '0';
  labelRenderer.domElement.style.pointerEvents = 'none';
  container.appendChild(labelRenderer.domElement);

  // Lights
  const ambient = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambient);

  const sun = new THREE.DirectionalLight(0xfff8e7, 1.8);
  sun.position.set(20, 30, 15);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.near = 0.5;
  sun.shadow.camera.far = 100;
  sun.shadow.camera.left = -25;
  sun.shadow.camera.right = 25;
  sun.shadow.camera.top = 25;
  sun.shadow.camera.bottom = -25;
  sun.shadow.bias = -0.001;
  scene.add(sun);

  const fill = new THREE.DirectionalLight(0xc8d8f0, 0.6);
  fill.position.set(-15, 10, -10);
  scene.add(fill);

  const bounce = new THREE.HemisphereLight(0x6688aa, 0x334455, 0.4);
  scene.add(bounce);

  // Ground grid
  const grid = new THREE.GridHelper(60, 30, 0x1a3a5c, 0x0d2240);
  grid.position.y = -0.01;
  scene.add(grid);

  // OrbitControls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.minDistance = 5;
  controls.maxDistance = 60;
  controls.maxPolarAngle = Math.PI / 2 - 0.02;
  controls.target.set(0, 2, 0);
  controls.update();

  // Resize
  window.addEventListener('resize', () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    labelRenderer.setSize(w, h);
  });

  // Render loop
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
  }
  animate();
}
