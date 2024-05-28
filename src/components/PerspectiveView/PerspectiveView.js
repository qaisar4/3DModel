import React, {Suspense, useState, useRef, useEffect} from 'react';
import {Canvas} from '@react-three/fiber/native';

import {PerspectiveCamera} from '@react-three/drei/native';
import {View, TouchableOpacity, Text} from 'react-native';
import Meshes from './Meshes';

const PerspectiveView = () => {
  const cameraRef = useRef(null);
  const pinkRef = useRef(null);
  const orangeRef = useRef(null);
  const skyblueRef = useRef(null);
  const pinkRef1 = useRef(null);
  const orangeRef1 = useRef(null);
  const skyblueRef1 = useRef(null);

  const [selectedMeshPosition, setSelectedMeshPosition] = useState([0, 0, 3]);
  const [pinkmeshPosition, setPinkPosition] = useState([-1, 0, 2]);
  const [orangemeshPosition, setOrangePosition] = useState([0, -1, -4]);
  const [skybluemeshPosition, setSkyBluePosition] = useState([-1, 0, -6]);
  const [pinkmeshPosition1, setPinkPosition1] = useState([0, 0, -1]);
  const [orangemeshPosition1, setOrangePosition1] = useState([0.5, 1, -.5]);
  const [skybluemeshPosition1, setSkyBluePosition1] = useState([-1, 1, -15]);
  const [selectedColor, setSelectedColor] = useState('');
  const [moveAll, setMoveAll] = useState('');

  const handleButtonPress = props => {
    console.log('Called and title', props.title);
    setSelectedColor(props.title);

    if (props.title === 'pink') {
      setSelectedMeshPosition(pinkRef.current?.position);
    } else if (props.title === 'orange') {
      setSelectedMeshPosition(orangeRef.current?.position);
    } else if (props.title === 'skyblue') {
      setSelectedMeshPosition(skyblueRef.current?.position);
    } else if (props.title === 'orange1') {
      setSelectedMeshPosition(orangeRef1.current?.position);
    } else if (props.title === 'skyblue1') {
      setSelectedMeshPosition(skyblueRef1.current?.position);
    } else if (props.title === 'pink1') {
      setSelectedMeshPosition(pinkRef1.current?.position);
    }else {
      console.log('Else codition called');
    }
  };

  useEffect(() => {
    const functionCalls = [
      {func: () => handleButtonPress({title: 'pink'}), delay: 1000},
      {func: () => handleButtonPress({title: 'orange'}), delay: 5000},
      {func: () => handleButtonPress({title: 'skyblue'}), delay: 10000},
      {func: () => handleButtonPress({title: 'pink1'}), delay: 15000},
      {func: () => handleButtonPress({title: 'orange1'}), delay: 20000},
      {func: () => handleButtonPress({title: 'skyblue1'}), delay: 20000},
    ];

    let currentIndex = 0;

    const interval = setInterval(() => {
      functionCalls[currentIndex].func();
      currentIndex = (currentIndex + 1) % functionCalls.length;
      console.log('current index', currentIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <Canvas>
        <ambientLight />
        <Suspense fallback={null}>
          <PerspectiveCamera
            ref={cameraRef}
            position={[0, -.5,10]}
            makeDefault
            fov={130}
            onUpdate={c => c.updateProjectionMatrix()}
            zoom={5}>
            {texture => (
              <Meshes
                selectedMeshPosition={selectedMeshPosition}
                pinkRef={pinkRef}
                orangeRef={orangeRef}
                skyblueRef={skyblueRef}
                pinkRef1={pinkRef1}
                orangeRef1={orangeRef1}
                skyblueRef1={skyblueRef1}
                pinkmeshPosition={pinkmeshPosition}
                orangemeshPosition={orangemeshPosition}
                skybluemeshPosition={skybluemeshPosition}
                pinkmeshPosition1={pinkmeshPosition1}
                orangemeshPosition1={orangemeshPosition1}
                skybluemeshPosition1={skybluemeshPosition1}
                selectedColor={selectedColor}
                mainCamRef={cameraRef}
              />
            )}
          </PerspectiveCamera>
        </Suspense>
      </Canvas>
      <View style={{flexDirection: 'row', gap: 5, alignSelf: 'center'}}>
        <TouchableOpacity
          style={{
            backgroundColor: 'hotpink',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 5,
            paddingHorizontal: 5,
            marginBottom: 20,
          }}
          activeOpacity={0.5}
          onPress={() => handleButtonPress({title: 'pink'})}>
          <Text style={{color: 'black', fontSize: 16, marginHorizontal: 10}}>
            HotPink
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'orange',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 5,
            paddingHorizontal: 5,
            marginBottom: 20,
          }}
          activeOpacity={0.5}
          onPress={() => handleButtonPress({title: 'orange'})}>
          <Text style={{color: 'black', fontSize: 16, marginHorizontal: 10}}>
            Orange
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'skyblue',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 5,
            paddingHorizontal: 5,
            marginBottom: 20,
          }}
          activeOpacity={0.5}
          onPress={() => handleButtonPress({title: 'skyblue'})}>
          <Text style={{color: 'black', fontSize: 16, marginHorizontal: 10}}>
            Sky Blue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PerspectiveView;
