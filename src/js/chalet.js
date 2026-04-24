// chalet.js — Parametric geometry builder

import * as THREE from 'three';
import { scene } from './scene.js';

// Materials
const matWall = new THREE.MeshStandardMaterial({
  color: 0xF5EFE6,
  roughness: 0.85,
  metalness: 0.0,
});

const matRoof = new THREE.MeshStandardMaterial({
  color: 0x3D2B1F,
  roughness: 0.9,
  metalness: 0.0,
});

const matFloor = new THREE.MeshStandardMaterial({
  color: 0xD4C4A0,
  roughness: 0.95,
  metalness: 0.0,
});

const matBeam = new THREE.MeshStandardMaterial({
  color: 0x6B4C2A,
  roughness: 0.8,
  metalness: 0.0,
});

// Group holding all chalet meshes
let chaletGroup = null;

export function buildChalet(params) {
  const { width, depth, wallHeight, roofPitch, overhang } = params;

  // Dispose previous
  if (chaletGroup) {
    chaletGroup.traverse(obj => {
      if (obj.geometry) obj.geometry.dispose();
    });
    scene.remove(chaletGroup);
  }

  chaletGroup = new THREE.Group();

  const halfW = width / 2;
  const halfD = depth / 2;
  const roofHeight = (width / 2) * Math.tan((roofPitch * Math.PI) / 180);

  // ── Floor ────────────────────────────────────────────────────────────────
  const floorGeo = new THREE.BoxGeometry(width, 0.15, depth);
  const floor = new THREE.Mesh(floorGeo, matFloor);
  floor.position.y = -0.075;
  floor.receiveShadow = true;
  chaletGroup.add(floor);

  // ── Walls ─────────────────────────────────────────────────────────────────
  function addWall(w, h, d, x, y, z, ry = 0) {
    const geo = new THREE.BoxGeometry(w, h, d);
    const mesh = new THREE.Mesh(geo, matWall);
    mesh.position.set(x, y, z);
    mesh.rotation.y = ry;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    chaletGroup.add(mesh);
    return mesh;
  }

  const wallThickness = 0.22;
  const wallY = wallHeight / 2;

  // Front & back
  addWall(width, wallHeight, wallThickness, 0, wallY, halfD - wallThickness / 2);
  addWall(width, wallHeight, wallThickness, 0, wallY, -(halfD - wallThickness / 2));
  // Left & right
  addWall(wallThickness, wallHeight, depth, -(halfW - wallThickness / 2), wallY, 0);
  addWall(wallThickness, wallHeight, depth, (halfW - wallThickness / 2), wallY, 0);

  // ── Gable triangles ───────────────────────────────────────────────────────
  function addGable(zPos) {
    const shape = new THREE.Shape();
    shape.moveTo(-halfW, 0);
    shape.lineTo(halfW, 0);
    shape.lineTo(0, roofHeight);
    shape.closePath();
    const geo = new THREE.ShapeGeometry(shape);
    const mesh = new THREE.Mesh(geo, matWall);
    mesh.position.set(0, wallHeight, zPos);
    mesh.castShadow = true;
    chaletGroup.add(mesh);
  }
  addGable(halfD - wallThickness / 2 + 0.01);
  addGable(-(halfD - wallThickness / 2 + 0.01));

  // ── Roof panels ───────────────────────────────────────────────────────────
  const roofAngle = Math.atan2(roofHeight, halfW);
  const roofPanelWidth = Math.sqrt(halfW * halfW + roofHeight * roofHeight);
  const roofLength = depth + overhang * 2;

  function addRoofPanel(side) {
    const geo = new THREE.BoxGeometry(roofPanelWidth + overhang, 0.18, roofLength);
    const mesh = new THREE.Mesh(geo, matRoof);
    mesh.position.set(side * halfW / 2, wallHeight + roofHeight / 2, 0);
    mesh.rotation.z = side * -roofAngle;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    chaletGroup.add(mesh);
  }
  addRoofPanel(1);
  addRoofPanel(-1);

  // ── Ridge beam ────────────────────────────────────────────────────────────
  const ridgeGeo = new THREE.BoxGeometry(0.15, 0.15, roofLength);
  const ridge = new THREE.Mesh(ridgeGeo, matBeam);
  ridge.position.set(0, wallHeight + roofHeight + 0.07, 0);
  ridge.castShadow = true;
  chaletGroup.add(ridge);

  // ── Corner posts ──────────────────────────────────────────────────────────
  const postPositions = [
    [-halfW + 0.11, halfD - 0.11],
    [ halfW - 0.11, halfD - 0.11],
    [-halfW + 0.11, -(halfD - 0.11)],
    [ halfW - 0.11, -(halfD - 0.11)],
  ];
  postPositions.forEach(([px, pz]) => {
    const geo = new THREE.BoxGeometry(0.14, wallHeight, 0.14);
    const mesh = new THREE.Mesh(geo, matBeam);
    mesh.position.set(px, wallHeight / 2, pz);
    mesh.castShadow = true;
    chaletGroup.add(mesh);
  });

  scene.add(chaletGroup);
  return { halfW, halfD, wallHeight, roofHeight, roofAngle };
}

export function getChaletGroup() {
  return chaletGroup;
}
