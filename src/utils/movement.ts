import { Camera } from "@react-three/fiber";
import { Vector3 } from "three";

export function moveToFactory(camera: Camera, prefersReducedMotion = false) {
  return (to: Vector3, lookAt?: Vector3, alpha = 0.01) => {
    if (lookAt) camera.lookAt(lookAt)

    if (prefersReducedMotion)
      camera.position.set(to.x, to.y, to.z)
    else
      camera.position.lerp(to, alpha)

    camera.updateProjectionMatrix()
  }
}