import 'react-native-gesture-handler';

import {Canvas} from '@react-three/fiber';

import {Suspense, useState} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import useControls from 'r3f-native-orbitcontrols';
import {useAnimatedSensor, SensorType} from 'react-native-reanimated';
import {Client} from './Client';

export default function ClientView() {
  const [OrbitControls, events] = useControls();
  const animatedSensor = useAnimatedSensor(SensorType.GYROSCOPE, {
    interval: 100,
  });
  // console.log('animatedSensor', animatedSensor);
  return (
    <View style={styles.wrapper} {...events}>
      <Canvas>
        <directionalLight
          position={[1.395, -0.057, -0.964]}
          args={['#c7ebfc', 2]}
        />
        <directionalLight position={[2, 1, 10]} args={['#c7ebfc', 2]} />
        <directionalLight position={[2, -5, 10]} args={['#c7ebfc', 2]} />
        <directionalLight
          position={[8.395, -1.057, 0.964]}
          args={['#c7ebfc', 2]}
        />

        <Suspense fallback={null}>
          <ambientLight />
          <pointLight position={[0, 0.5, 1]} intensity={3} />

          <Client/>
        </Suspense>
      </Canvas>

      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {flex: 1, backgroundColor: 'black'},
  slidersWrapper: {
    position: 'absolute',
    bottom: 50,
    width: '90%',
    maxWidth: 200,
    alignSelf: 'center',
  },
  slider: {width: '100%', height: 40},
});
