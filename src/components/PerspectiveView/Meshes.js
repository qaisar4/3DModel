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
  pinkRef1,
  orangeRef1,
  skyblueRef1,
  pinkmeshPosition1,
  orangemeshPosition1,
  skybluemeshPosition1,
  mainCamRef,
  selectedMeshPosition,
}) => {
  console.log('pink',pinkmeshPosition)
  const vec = new THREE.Vector3();
  const pinktargetPosition = new THREE.Vector3(pinkmeshPosition[0], pinkmeshPosition[1] - 1, pinkmeshPosition[2] + 2);
  const pinkoriginalPosition = new THREE.Vector3(-1, 0, 2);
  const orangetargetPosition = new THREE.Vector3(orangemeshPosition[0], orangemeshPosition[1] , orangemeshPosition[2] * -1.4);
  const orangeoriginalPosition = new THREE.Vector3(0, -1, -4);
  const skybluetargetPosition = new THREE.Vector3(skybluemeshPosition[0], skybluemeshPosition[1] *  0.05, skybluemeshPosition[2] * -0.9);
  const skyblueoriginalPosition = new THREE.Vector3(-1, 0, -6);
  const pinktargetPosition1 = new THREE.Vector3(pinkmeshPosition1[0], pinkmeshPosition1[1] - 1, pinkmeshPosition1[2] * -10);
  const pinkoriginalPosition1 = new THREE.Vector3(0, 0, -1);
  const orangetargetPosition1 = new THREE.Vector3(orangemeshPosition1[0], orangemeshPosition1[1] * -10 , orangemeshPosition1[2] * -6);
  const orangeoriginalPosition1 = new THREE.Vector3(0.5, 1, -.5);
  const skybluetargetPosition1 = new THREE.Vector3(skybluemeshPosition1[0], skybluemeshPosition1[1] - 1, skybluemeshPosition1[2] *-0.9);
  const skyblueoriginalPosition1 = new THREE.Vector3(-1, 1, -15);
 

  const [moved,setMove]=useState(false)
  const [animationState, setAnimationState] = useState({
    pink: false,
    orange: false,
    skyblue: false,
  });
  const [moveBack, setMoveBack] = useState(false);

  const meshPink = pinkRef.current;
  const meshOrange=orangeRef.current;
  const meshSkyblue=skyblueRef.current;
  const meshPink1 = pinkRef1.current;
  const meshOrange1=orangeRef1.current;
  const meshSkyblue1=skyblueRef1.current

  useFrame(() => {
    if (meshPink || meshOrange || meshSkyblue) {
      if (!moveBack) {
        meshPink.position.lerp(pinktargetPosition, 0.03);
        meshOrange.position.lerp(orangetargetPosition, 0.03);
        meshSkyblue.position.lerp(skybluetargetPosition, 0.03);
        meshPink1.position.lerp(pinktargetPosition1, 0.03);
        meshOrange1.position.lerp(orangetargetPosition1, 0.03);
        meshSkyblue1.position.lerp(skybluetargetPosition1, 0.03);

      
        if (meshSkyblue.position.distanceTo(skybluetargetPosition) < 0.01) {
         
          setMoveBack(true);
        }
      } else {
     
        meshPink.position.lerp(pinkoriginalPosition, 0.03);
        meshOrange.position.lerp(orangeoriginalPosition, 0.03);
        meshSkyblue.position.lerp(skyblueoriginalPosition, 0.03);
        meshPink1.position.lerp(pinkoriginalPosition1, 0.03);
        meshOrange1.position.lerp(orangeoriginalPosition1, 0.03);
        meshSkyblue1.position.lerp(skyblueoriginalPosition1, 0.03);


      
        if (meshSkyblue.position.distanceTo(skyblueoriginalPosition) < 0.01) {
         
          setMoveBack(false);
        }
      }
    }
  });

  // useFrame(() => {
  //   if (pinkRef.current) {
  //     console.log('in of function', selectedMeshPosition);
  //     const [x, y, z] = selectedMeshPosition;
  //     console.log('xyz===>', x, y, z);
  //     pinkRef.current.position.lerp(vec.set(x, y, z), 0.05);
  //   }
  // });

  
  // useFrame(() => {

  //   if (pinkRef.current) {
  //     const [x, y, z] = pinkmeshPosition;

  //     pinkRef.current.position.lerp(vec.set(x, y + -1, z  + 2), 0.03);
     
      
  //   }
  //   if (orangeRef.current) {
  //     const [x, y, z] = orangemeshPosition;

  //     orangeRef.current.position.lerp(vec.set(x, y, z * -1.4), 0.03);
  //   }
  //   if (skyblueRef.current) {
  //     const [x, y, z] = skybluemeshPosition;

  //     skyblueRef.current.position.lerp(
  //       vec.set(x * -0.05, y * 0.05, z * -0.9),
  //       0.02,
  //     );
  //   }
  //   if (orangeRef1.current) {
  //     const [x, y, z] = orangemeshPosition1;
  //     orangeRef1.current.position.lerp(vec.set(x, y, z * -10), 0.01);
  //   }
  //   if (pinkRef1.current) {
  //     const [x, y, z] = pinkmeshPosition1;

  //     pinkRef1.current.position.lerp(vec.set(x, y * -10, z * -6), 0.02);
  //   }
  //   if (skyblueRef1.current) {
  //     const [x, y, z] = skybluemeshPosition1;

  //     skyblueRef1.current.position.lerp(vec.set(x, y * -0.9, z * -0.3), 0.03);
  //   }
  // });

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
      <mesh position={pinkmeshPosition1} ref={pinkRef1}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="hotpink" side={DoubleSide} />
      </mesh>
      <mesh position={orangemeshPosition1} ref={orangeRef1}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="orange" side={DoubleSide} />
      </mesh>
      <mesh position={skybluemeshPosition1} ref={skyblueRef1}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="skyblue" side={DoubleSide} />
      </mesh>
    </group>
  );
};

export default Meshes;
