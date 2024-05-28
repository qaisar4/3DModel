import React, {useRef, useState,useEffect} from 'react';
import {useGLTF, useAnimations} from '@react-three/drei';
import {useFrame} from '@react-three/fiber';
import {PerspectiveCamera} from 'three';

export function Client(props) {
  const ref = React.useRef<PerspectiveCamera | null>(null);
  const mainRef = useRef();
  const groupRef = useRef();
  const [opened, setOpened] = useState(false);
  const {nodes, materials, animations} = useGLTF(
    require('../../assets/test.glb'),
  );
  const {actions,names} = useAnimations(animations, mainRef);
 
  useEffect(() => {
    console.log("actions",actions)
    console.log("names",names)
    console.log("names:",names,actions);
    // actions.ArmatureAction.play();
    // actions['Cube.001Action.001'].play();
    // actions['Armature.001Action'].play();
    // actions['CubeAction'].play();
    // actions['PlaneAction'].play();
    // actions['CylinderAction.001'].play();
  });

  const handleOpen = () => {
    setOpened(!opened);
  };

  // useFrame((state, delta) => {
  //   if (opened) {
  //     groupRef.current.rotation.y += 0.05;
  //   }
  // });
  // useFrame((state, delta) => {
  //   console.log(props.animatedSensor);
  //   if (opened) {
  //     let {x, y, z} = props.animatedSensor.sensor.value;
  //     x = ~~(x * 100) / 4000;
  //     y = ~~(y * 100) / 4000;
  //     z = ~~(z * 100) / 4000;

  //     mainRef.current.rotation.x += x;
  //     mainRef.current.rotation.y += y;
  //     mainRef.current.rotation.z += z;
  //   }
  // });
  return (
    <group ref={mainRef} {...props} dispose={null} scale={1.3}>
      <perspectiveCamera ref={ref} fov={7}>
        <group name="Scene" position={[0, 0, 0]} rotation={[0, 0.95, 0.3]}>
          <group
            name="Armature"
            position={[1.395, 0.057, -0.964]}
            rotation={opened ? [0.4, 0, 0] : [Math.PI / 2, 0, 0]}
            onClick={handleOpen}
            >
            <primitive object={nodes.Bone} />
          </group>
          <group
            name="Armature001"
            position={[1.399, -0.173, -0.709]}
            rotation={[Math.PI / 2, 0, 0]}>
            <primitive object={nodes.Bone_1} />
          </group>
          <group
            name="Armature002"
            position={opened ? [-0.05, 1.3, 0] : [0, 0, 0.03]}
            rotation={opened ? [0, 0, 0] : [Math.PI / 2, 0, 0]}
            ref={groupRef}
            scale={0.9}>
            <primitive object={nodes.Bone_2} />
          </group>
        </group>
      </perspectiveCamera>
    </group>
  );
}
