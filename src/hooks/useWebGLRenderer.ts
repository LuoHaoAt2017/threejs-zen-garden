import { useMemo } from "react";
import { WebGLRenderer } from "three";

function useWebGLRenderer() {
  const renderer = useMemo(() => {
    console.log("---useWebGLRenderer---");
    const webglRenderer = new WebGLRenderer();
    webglRenderer.setPixelRatio(window.devicePixelRatio);
    webglRenderer.setSize(window.innerWidth, window.innerHeight);
    webglRenderer.shadowMap.enabled = true;
    return webglRenderer;
  }, []);
  return renderer;
}

export default useWebGLRenderer;
