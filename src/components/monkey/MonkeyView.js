import 'react-native-gesture-handler';

import {Canvas} from '@react-three/fiber';

import {Suspense} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import { Monkey } from './Monkey';
import useControls from 'r3f-native-orbitcontrols';



export default function MonkeyView() {
  const [OrbitControls, events] = useControls();


  return (
    <View style={styles.wrapper} {...events}>
      <Canvas
        gl={{physicallyCorrectLights: true}}
        onCreated={state => {
          const _gl = state.gl.getContext();
          const pixelStorei = _gl.pixelStorei.bind(_gl);
          _gl.pixelStorei = function (...args) {
            const [parameter] = args;
            switch (parameter) {
              case _gl.UNPACK_FLIP_Y_WEBGL:
                return pixelStorei(...args);
            }
          };
        }}
      >
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

          <Monkey/>
        </Suspense>
        <OrbitControls/>
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
