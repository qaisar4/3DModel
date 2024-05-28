import { StyleSheet, Text, View,Button } from 'react-native'
import React,{Suspense,useState} from 'react'
import {Canvas} from '@react-three/fiber/native'
import PerspectiveCameraView from './PerspectiveCameraView'

const MainView = () => {
    const [focus, setFocus] = useState({
        position: [0, 0, 0],
        lookAt: {x: 0, y: 0, z: 0},
        mesh1:false,
        mesh2:false
       
        
      });
    
      const handleFocusBox1 = () => {
        setFocus({
          position: [0.01, -1, 1],
          lookAt: {x: 0.01, y: -1, z: 1},
          mesh1:true,
          mesh2:false
        
        });
      };
    
      const handleFocusBox2 = () => {
        setFocus({
          position: [0.01, 1, 1],
          lookAt: {x: 0.01, y: 1, z: 1},
          mesh1:false,
          mesh2:true
       
        });
      };
  return (
    <View style={{flex: 1}}>
    <Canvas>
    <ambientLight />
          {/* <pointLight position={[10, 10, 10]} /> */}
          {/* <directionalLight position={[1,0,0]}   />
          <directionalLight position={[-1,0,0]}   />
       
          <directionalLight position={[0,0,1]}   />
          <directionalLight position={[0,0,-1]}   /> */}
        
            <PerspectiveCameraView focus={focus}/>
           

    </Canvas>
    {/* <View
        style={{
          position: 'absolute',
          bottom: 50,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <Button title="Focus Box 1" color={'hotpink'} onPress={handleFocusBox1} />
        <Button title="Focuss Box 2" color={'orange'} onPress={handleFocusBox2} />
      </View> */}
    </View>
  )
}

export default MainView

