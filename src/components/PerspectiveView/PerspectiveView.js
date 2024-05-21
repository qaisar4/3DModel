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

  const [selectedMeshPosition, setSelectedMeshPosition] = useState([0, 0, -2]);
  const [pinkmeshPosition, setPinkPosition] = useState([0, 0, -2]);
  const [orangemeshPosition, setOrangePosition] = useState([1, 0, -4]);
  const [skybluemeshPosition, setSkyBluePosition] = [-1, 0, -6];
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
    } else {
      console.log('Else codition called');
    }
  };

  useEffect(() => {
    const functionCalls = [
      { func: () => handleButtonPress({ title: 'pink' }), delay: 1000 },
      { func: () => handleButtonPress({ title: 'orange' }), delay: 5000 },
      { func: () => handleButtonPress({ title: 'skyblue' }), delay: 10000 }
    ];

    let currentIndex = 0;

    const interval = setInterval(() => {
      functionCalls[currentIndex].func();
      currentIndex = (currentIndex + 1) % functionCalls.length;
      console.log("current index",currentIndex)
    }, 3000); // This interval will ensure immediate execution of the next function after its delay

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // useEffect(()=>{
  //   setTimeout(()=>{

  //     handleButtonPress({title:'pink'})

  //   },1000)
  // },[])
  // useEffect(()=>{
  //   setTimeout(()=>{

  //     handleButtonPress({title:'orange'})

  //   },5000)
  // },[])
  // useEffect(()=>{
  //   setTimeout(()=>{

  //     handleButtonPress({title:'skyblue'})

  //   },10000)
  // },[])
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <Canvas>
        <ambientLight />
        <Suspense fallback={null}>
          <PerspectiveCamera
            ref={cameraRef}
            position={[0, 1, 10]}
            makeDefault
            fov={150}
            onUpdate={c => c.updateProjectionMatrix()}
            zoom={1}>
            {texture => (
              <Meshes
                selectedMeshPosition={selectedMeshPosition}
                pinkRef={pinkRef}
                orangeRef={orangeRef}
                skyblueRef={skyblueRef}
                pinkmeshPosition={pinkmeshPosition}
                orangemeshPosition={orangemeshPosition}
                skybluemeshPosition={skybluemeshPosition}
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
