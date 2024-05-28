import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { DoubleSide, Mesh, PerspectiveCamera } from "three";
import { View } from "react-native";
import useControls from "r3f-native-orbitcontrols"


function Box() {
  const boxRef = useRef<Mesh>(null!);

  useFrame(() => {
    boxRef.current.rotation.x += 0.005;
    boxRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={boxRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" side={DoubleSide} />
    </mesh>
  );
}

function Controls() {
    const [OrbitControls, events] = useControls()
  const {
    camera,
    gl: { domElement },
  } = useThree();

  return <OrbitControls args={[camera, domElement]} />;
}

function CameraHelper() {
  const camera = new PerspectiveCamera(60, 1, 1, 3);
  return <group position={[0, 0, 2]}>
    <cameraHelper args={[camera]} />
  </group>;
}

function Scene() {
  return (
    <Canvas orthographic camera={{ position: [0, 0, 2], left: -2,
       right: 2, top: 2, bottom: -2, zoom: 100 }}>
      <ambientLight />
      <pointLight position={[5, 5, 5]} intensity={3} />
      <pointLight position={[-3, -3, 2]} />
      <Controls />
      <Box />
      <CameraHelper />
    </Canvas>
  );
}

function ThreeScene() {
  return (
    <View style={{flex:1}}>
      <Scene />
    </View>
  );
}

export default ThreeScene;