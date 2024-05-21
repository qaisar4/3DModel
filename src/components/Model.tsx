import React, {useRef, useState, useEffect} from 'react';
import {useGLTF} from '@react-three/drei/native';
import {useSpring, animated as a} from '@react-spring/three';
import {Mesh} from 'three';
import {useFrame, useThree} from '@react-three/fiber';


export default function Model(props) {
  const groupRef = useRef<Mesh>(null);
  const ref=useRef<Mesh>()





  const {nodes, materials} = useGLTF(require('../assets/Model.glb'));
  const [onSoupClick, setSoup] = useState(false);
  const [onBoard, setBoard] = useState(false);
  const [soupOriginalRotation, setSoupOriginalRotation] = useState([5, 1, 0]);

  const soupcolor = onSoupClick ? 'white' : 'orange';
  let soupPosition = onSoupClick
    ? [0.231, 5.797, -0.104]
    : [0.231, 1.797, -0.104];
  const boardColor = onBoard ? 'brown' : 'hotpink';

  const onClickSoup = () => {
    console.log('soup called');
    setSoup(!onSoupClick);
    if (!onSoupClick && ref.current) {
      setSoupOriginalRotation(ref.current.rotation.toArray());
    }
  };
  const onClickBoard = () => {
    console.log('board called');
    setBoard(!onBoard);
  };

  useFrame((state, delta) => {
    let { x, y, z } = props.animatedSensor.sensor.value;
    x = ~~(x * 100) / 4000;
    y = ~~(y * 100) / 4000;
    z = ~~(z * 100) / 4000;

    groupRef.current.rotation.x += x;
    groupRef.current.rotation.y += y;
    groupRef.current.rotation.z += z;
  });





  return (
    
      
      <group {...props} dispose={null} scale={0.5}  ref={groupRef}   rotation={[5, -1, 0]}>

      <a.mesh
      // ref={groupRef}
        castShadow
        receiveShadow
        geometry={nodes.soap_dish.geometry}
        material={materials.wood_saop_dish}
        // position={[0, 0.421, 0]}
        // rotation={[5, -1, 0]}

        onClick={onClickBoard}>
        <meshStandardMaterial color={boardColor} />
      </a.mesh>
      <mesh
      // ref={groupRef}

        castShadow
        receiveShadow
        geometry={nodes.drewienko_mydelniczki.geometry}
        material={materials.wood_saop_dish}
        // rotation={[5, -1, 0]}
        position={onSoupClick ? [0, 0.5, 0] : [0, -0.159, 0]}
        scale={1.038}
      />
      <a.mesh
        castShadow
        receiveShadow
        geometry={nodes.Soap.geometry}
        material={nodes.Soap.material}
        position={soupPosition}
        // rotation={[0, -0.915, 0]}
        rotation={
          onSoupClick ? [0, ref.current.rotation.y, 0] : soupOriginalRotation
        }
        scale={[-2.739, 0.544, 1.311]}
        onClick={onClickSoup}
        ref={ref}
        >
        <meshStandardMaterial color={soupcolor} />
      </a.mesh>
    </group>
   
  );
}
