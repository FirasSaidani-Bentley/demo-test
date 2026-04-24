// annotations.js — CSS2D labels + Three.js dimension lines

import * as THREE from 'three';
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { scene } from './scene.js';

let annotationGroup = null;
let visible = true;

function makeLabel(text) {
  const div = document.createElement('div');
  div.className = 'annotation-label';
  div.textContent = text;
  return new CSS2DObject(div);
}

function makeLine(points, color = 0x00A3E0) {
  const geo = new THREE.BufferGeometry().setFromPoints(points);
  const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.8 });
  return new THREE.Line(geo, mat);
}

function makeEndCap(position, color = 0x00A3E0) {
  const geo = new THREE.SphereGeometry(0.06, 8, 8);
  const mat = new THREE.MeshBasicMaterial({ color });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.copy(position);
  return mesh;
}

export function updateAnnotations(params) {
  const { width, depth, wallHeight, roofPitch, overhang } = params;

  // Dispose previous — must also remove CSS2DObject <div> elements from the DOM
  if (annotationGroup) {
    annotationGroup.traverse(obj => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) obj.material.dispose();
      // CSS2DObject: remove the HTML element from the DOM manually
      if (obj.isCSS2DObject && obj.element && obj.element.parentNode) {
        obj.element.parentNode.removeChild(obj.element);
      }
    });
    scene.remove(annotationGroup);
    annotationGroup = null;
  }

  if (!visible) return;

  annotationGroup = new THREE.Group();

  const halfW = width / 2;
  const halfD = depth / 2;
  const roofHeight = (width / 2) * Math.tan((roofPitch * Math.PI) / 180);
  const offset = 0.7; // distance annotations sit from walls

  // ── Width annotation (front, along X) ────────────────────────────────────
  const wZ = halfD + offset;
  const wY = wallHeight / 2;
  const wA = new THREE.Vector3(-halfW, wY, wZ);
  const wB = new THREE.Vector3( halfW, wY, wZ);
  annotationGroup.add(makeLine([wA, wB]));
  annotationGroup.add(makeEndCap(wA));
  annotationGroup.add(makeEndCap(wB));
  const wLabel = makeLabel(`${width.toFixed(1)} m`);
  wLabel.position.set(0, wY, wZ + 0.15);
  annotationGroup.add(wLabel);

  // ── Depth annotation (right side, along Z) ────────────────────────────────
  const dX = halfW + offset;
  const dY = wallHeight / 2;
  const dA = new THREE.Vector3(dX, dY, -halfD);
  const dB = new THREE.Vector3(dX, dY,  halfD);
  annotationGroup.add(makeLine([dA, dB]));
  annotationGroup.add(makeEndCap(dA));
  annotationGroup.add(makeEndCap(dB));
  const dLabel = makeLabel(`${depth.toFixed(1)} m`);
  dLabel.position.set(dX + 0.15, dY, 0);
  annotationGroup.add(dLabel);

  // ── Wall height annotation (left side, vertical) ──────────────────────────
  const hX = -(halfW + offset);
  const hA = new THREE.Vector3(hX, 0, 0);
  const hB = new THREE.Vector3(hX, wallHeight, 0);
  annotationGroup.add(makeLine([hA, hB]));
  annotationGroup.add(makeEndCap(hA));
  annotationGroup.add(makeEndCap(hB));
  const hLabel = makeLabel(`${wallHeight.toFixed(1)} m`);
  hLabel.position.set(hX - 0.2, wallHeight / 2, 0);
  annotationGroup.add(hLabel);

  // ── Roof height annotation (vertical, right side) ─────────────────────────
  const rhX = halfW + offset + 0.8;
  const rhA = new THREE.Vector3(rhX, wallHeight, 0);
  const rhB = new THREE.Vector3(rhX, wallHeight + roofHeight, 0);
  annotationGroup.add(makeLine([rhA, rhB], 0x0066B3));
  annotationGroup.add(makeEndCap(rhA, 0x0066B3));
  annotationGroup.add(makeEndCap(rhB, 0x0066B3));
  const rhLabel = makeLabel(`↑ ${roofHeight.toFixed(1)} m`);
  rhLabel.position.set(rhX + 0.2, wallHeight + roofHeight / 2, 0);
  annotationGroup.add(rhLabel);

  // ── Roof pitch annotation (top center) ────────────────────────────────────
  const rpLabel = makeLabel(`${roofPitch}°`);
  rpLabel.position.set(halfW * 0.4, wallHeight + roofHeight * 0.55, halfD + offset * 0.4);
  annotationGroup.add(rpLabel);

  scene.add(annotationGroup);
}

export function setAnnotationsVisible(show) {
  visible = show;
  if (annotationGroup) annotationGroup.visible = show;
}
