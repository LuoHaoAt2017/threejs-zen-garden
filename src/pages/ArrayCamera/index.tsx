import { useEffect, useRef } from "react";
import * as THREE from "three";
import useWebGLRenderer from "@/hooks/useWebGLRenderer";
import useDirectionalLight from "@/hooks/useDirectionalLight";
import useAmbientLight from "@/hooks/useAmbientLight";

const AMOUNT = 4;
const ASPECT_RATIO = window.innerWidth / window.innerHeight;
const WIDTH = (window.innerWidth / AMOUNT) * window.devicePixelRatio;
const HEIGHT = (window.innerHeight / AMOUNT) * window.devicePixelRatio;

/**
 * 视口的尺寸以及背景的尺寸务必远大于视口中显示的物体
 * 恰当地调整相机的视角和相机距离物体的远近来显示物体
 */
function ArrayCamera() {
  const canvasRef = useRef<HTMLDivElement>();
  const renderer = useWebGLRenderer();
  const ambientLight = useAmbientLight();
  const directionLight = useDirectionalLight();

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.add(ambientLight);
    scene.add(directionLight);

    const cameras = [];
    for (let y = 0; y < AMOUNT; y++) {
      for (let x = 0; x < AMOUNT; x++) {
        const subcamera = new THREE.PerspectiveCamera(
          40,
          ASPECT_RATIO,
          0.1,
          10
        );
        subcamera.viewport = new THREE.Vector4(
          Math.floor(x * WIDTH),
          Math.floor(y * HEIGHT),
          Math.ceil(WIDTH),
          Math.ceil(HEIGHT)
        );
        subcamera.position.x = x / AMOUNT - 0.5;
        subcamera.position.y = 0.5 - y / AMOUNT;
        subcamera.position.z = 1.5;
        subcamera.position.multiplyScalar(2);
        subcamera.lookAt(0, 0, 0);
        subcamera.updateMatrixWorld();
        cameras.push(subcamera);
      }
    }
    const camera = new THREE.ArrayCamera(cameras);
    camera.position.z = 3;

    const geometryBackground = new THREE.PlaneGeometry(100, 100);
    const materialBackground = new THREE.MeshPhongMaterial({ color: 0x000066 });
    const background = new THREE.Mesh(geometryBackground, materialBackground);
    background.receiveShadow = true;
    background.position.set(0, 0, -1);
    scene.add(background);

    const geometryCylinder = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
    const materialCylinder = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const cylinder = new THREE.Mesh(geometryCylinder, materialCylinder);
    cylinder.castShadow = true;
    cylinder.receiveShadow = true;
    scene.add(cylinder);

    renderer.setAnimationLoop(() => {
      cylinder.rotation.x += 0.005;
      cylinder.rotation.z += 0.01;
      renderer.render(scene, camera);
    });

    if (canvasRef.current) {
      canvasRef.current.innerHTML = "";
      canvasRef.current.appendChild(renderer.domElement);
    }
  }, [renderer, directionLight, ambientLight]);

  return <div ref={canvasRef}></div>;
}

export default ArrayCamera;
