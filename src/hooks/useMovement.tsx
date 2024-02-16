import { useReducedMotion } from "@react-spring/three";
import { useThree } from "@react-three/fiber";
import { useCallback } from "react";
import { Vector3 } from "three";

export function useMovement() {
  const { camera } = useThree()
  const prefersReducedMotion = useReducedMotion()

  return useCallback((to: Vector3, lookAt?: Vector3, alpha = 0.01) => {
    if (lookAt) camera.lookAt(lookAt)

    if (prefersReducedMotion)
      camera.position.set(to.x, to.y, to.z)
    else
      camera.position.lerp(to, alpha)

    camera.updateProjectionMatrix()
  }, [camera, prefersReducedMotion])
}