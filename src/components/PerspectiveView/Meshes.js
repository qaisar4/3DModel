import React, {useState} from 'react';
import {useFrame} from '@react-three/fiber/native';
import {DoubleSide} from 'three';
import * as THREE from 'three';

const Meshes = ({
  pinkRef,
  orangeRef,
  skyblueRef,
  pinkmeshPosition,
  orangemeshPosition,
  skybluemeshPosition,
  mainCamRef,
  selectedMeshPosition,
}) => {
  const vec = new THREE.Vector3();
  const [animationState, setAnimationState] = useState({
    pink: false,
    orange: false,
    skyblue: false,
  });

  useFrame(() => {
    if (mainCamRef.current) {
      console.log('in of function', selectedMeshPosition);
      const [x, y, z] = selectedMeshPosition;
      console.log('xyz===>', x, y, z);
      mainCamRef.current.position.lerp(vec.set(x, y, z), 0.05);
    }
  });

  return (
    <group>
      <mesh position={pinkmeshPosition} ref={pinkRef}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="hotpink" side={DoubleSide} />
      </mesh>
      <mesh position={orangemeshPosition} ref={orangeRef}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="orange" side={DoubleSide} />
      </mesh>
      <mesh position={skybluemeshPosition} ref={skyblueRef}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="skyblue" side={DoubleSide} />
      </mesh>
    </group>
  );
};

export default Meshes;
