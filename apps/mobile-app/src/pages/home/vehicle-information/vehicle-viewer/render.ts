/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */


import * as THREE from 'three';
import { OrbitControls } from './orbit-controls';
import { ObjectLoader as OBJLoader } from 'three';
import ElantraObject from '../../../../assets/elantra.json';

// Setting: HTML ID's //
export const GRAPHIC_VIEW_ID = 'graphic_view';
export const OBJ_CNT_ID = 'obj_count';
export const POPUP_PARTS_WINDOW_ID = 'parts_popup';
export const POPUP_PARTS_NAME_ID = 'popup_part_name';
export const POPUP_PARTS_DRATE_ID = 'popup_part_drate';

// Setting: Model //
const MODEL_SCALE = 1;

// Setting: canvas size //
const HEIGHT = window.innerHeight;
const WIDTH = window.innerWidth;

// Setting: mesh colors //
const COLOR_DEFAULT = 0x111111;
const COLOR_DAMAGED = 0xff3333;
const COLOR_SELECTED = 0x00aaff;

const createScene = () => {
  // Globals //
  const meshes: any[] = []; // here, rendered mesh objects will come in
  const damaged_parts: number[] = []; // TODO: receive damaged parts from the device

  // Setup //
  const canvas = document.querySelector('#' + GRAPHIC_VIEW_ID);
  const renderer = new THREE.WebGLRenderer({ canvas: canvas as HTMLCanvasElement });
  renderer.setSize(WIDTH, HEIGHT);
  document.body.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 10000);
  camera.position.set(10, 20, 10);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.update();
  renderer.render(scene, camera);

  /// Lighting ///
  const light = new THREE.SpotLight(0xffffff);
  light.intensity = 1;
  light.position.set(0, 10, 0);
  scene.add(light);

  const ambient = new THREE.AmbientLight(0xffffff);
  ambient.intensity = 0.3;
  ambient.position.set(0, 10, 0);
  scene.add(ambient);

  // Geometry //
  const geometry = new THREE.CylinderGeometry(8, 8, 0.5, 100);
  const material = new THREE.MeshPhongMaterial({ color: 0x303030 });
  const cylinder = new THREE.Mesh(geometry, material);
  cylinder.position.set(0, 0, 0);
  scene.add(cylinder);

  /// OBJ Loading ///
  const loader = new OBJLoader();
  loader.parse(
    // resource URL
    ElantraObject,
    // called when resource is loaded
    function (object) {
      light.target = object;
      // light.target = object;
      // Color with default color
      object.traverse(function (mesh: any) {
        if (mesh.isMesh) {
          mesh.material = new THREE.MeshPhongMaterial();
          mesh.material.color = new THREE.Color(COLOR_DEFAULT);
          meshes.push(mesh);
        }
      });
      for (const i of damaged_parts) {
        // @ts-ignore
        object.children[i].material.color = new THREE.Color(COLOR_DAMAGED);
      }
      object.scale.set(MODEL_SCALE, MODEL_SCALE, MODEL_SCALE);
      scene.add(object);
    },
  );

  // Ray casting
  const raycaster = new THREE.Raycaster();
  raycaster!.params!.Line!.threshold = 0.1;
  let last_colored_info: any;

  const onMouseMove = function (event: any) {
    const mouse = {
      x: (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
      y: -(event.clientY / renderer.domElement.clientHeight) * 2 + 1,
    };
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(meshes);
    if (intersects.length > 1) {
      if (last_colored_info !== undefined) {
        last_colored_info.object.material.color = last_colored_info.color;
      }
      // Backup previous color
      last_colored_info = {};
      last_colored_info.object = intersects[0].object;
      // @ts-ignore
      last_colored_info.color = intersects[0].object.material.color;
      // Assign new color
      // @ts-ignore
      intersects[0].object.material.color = new THREE.Color(COLOR_SELECTED);
      // Update HTML informations
      document.getElementById(OBJ_CNT_ID)!.innerHTML = intersects[0].object.name;
      document.getElementById(POPUP_PARTS_NAME_ID)!.innerHTML = intersects[0].object.name;
      document.getElementById(POPUP_PARTS_DRATE_ID)!.innerHTML = (damaged_parts.includes(meshes.indexOf(intersects[0].object)) ? 100 : 0) + '%';
      Object.assign(document.getElementById(POPUP_PARTS_WINDOW_ID)!.style, {
        left: `${event.clientX}px`,
        top: `${event.clientY}px`,
        display: 'block',
      });
    }
    renderer.render(scene, camera);
  };
  const onMouseClick = function (event: any) {
    const mouse = {
      x: (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
      y: -(event.clientY / renderer.domElement.clientHeight) * 2 + 1,
    };
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(meshes);
    // Unselect all
    if (intersects.length == 0) {
      if (last_colored_info.object !== undefined) last_colored_info.object.material.color = last_colored_info.color;
      last_colored_info = undefined;
      document.getElementById(OBJ_CNT_ID)!.innerHTML = 'None';
    }
    // Remove popup
    Object.assign(document.getElementById(POPUP_PARTS_WINDOW_ID)!.style, {
      left: `${event.clientX}px`,
      top: `${event.clientY}px`,
      display: 'none',
    });
  };
  canvas!.addEventListener('mousemove', onMouseMove);
  canvas!.addEventListener('mousedown', onMouseClick);
  return { scene, camera, renderer };
};

// Scene builder
export function animate() {
  requestAnimationFrame(animate);
  const { scene, camera, renderer } = createScene();
  renderer.render(scene, camera);
}
