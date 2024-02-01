
import { useGLTF } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";

import { a } from '@react-spring/three';

import { forwardRef } from "react";
import { Group } from "three";

const City = forwardRef<Group, GroupProps>((props, ref) => {
  const { nodes, materials } = useGLTF('/_next/models/city.glb');

  return (
    <a.group {...props} ref={ref}>
      <a.group rotation={[-Math.PI / 2, 0, 0]} scale={5.538}>
        <a.group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Cube001_Background_Night_Buildings_0 as any).geometry}
            material={materials.Background_Night_Buildings}
            position={[-16.698, 921.631, -719.063]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
        </a.group>
      </a.group>
    </a.group>
  );
})

City.displayName = "City"

export default City