import { useMemo } from "react";
import { DirectionalLight } from "three";

function useDirectionalLight() {
  const color = 0xffffff;
  const intensity = 3;
  const directionalLight = useMemo(() => {
    const light = new DirectionalLight(color, intensity);
		light.position.set(0.5, 0.5, 1);
		light.castShadow = true;
		light.shadow.camera.zoom = 4;
		return light;
  }, [color, intensity]);
  return directionalLight;
}

export default useDirectionalLight;
