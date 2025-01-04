import { useMemo } from "react";
import { PerspectiveCamera } from "three";

function usePerspectiveCamera() {
  const fov = Math.PI / 4;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 1000;
  const camera = useMemo(() => {
    console.log("---usePerspectiveCamera---");
    return new PerspectiveCamera(fov, aspect, near, far);
  }, [fov, aspect, near, far]);
  return camera;
}

export default usePerspectiveCamera;
