import { useMemo } from "react";
import { AmbientLight } from "three";

function useAmbientLight() {
  const color = 0x999999;
  const intensity = 1;
  const ambientLight = useMemo(() => {
    return new AmbientLight(color, intensity);
  }, [color, intensity]);

  return ambientLight;
}

export default useAmbientLight;
