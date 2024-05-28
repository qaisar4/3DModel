import 'react-native-gesture-handler';

import {Canvas} from '@react-three/fiber';

import {Suspense} from 'react';
import {View, StyleSheet, SafeAreaView, Text} from 'react-native';
import useControls from 'r3f-native-orbitcontrols';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ClientModel} from './NewModel';

export default function ClientModelView() {
  const [OrbitControls, events] = useControls();

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={styles.wrapper} {...events}>
        <View style={styles.modelView}>
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
            }}>
            <directionalLight position={[1, 0, 0]} args={['#ebd39c', 2]} />
            <directionalLight position={[-1, 0, 0]} args={['#ebd39c', 2]} />
            <directionalLight position={[0, 0, 1]} args={['#ebd39c', 2]} />
            <directionalLight position={[0, 0, -1]} args={['#ebd39c', 2]} />
            <directionalLight position={[0, 1, 0]} args={['#ebd39c', 2]} />
            <directionalLight position={[0, -1, 0]} args={['#ebd39c', 2]} />
            <Suspense fallback={null}>
              <ClientModel />
            </Suspense>
            <OrbitControls />
          </Canvas>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  wrapper: {flex: 1, backgroundColor: 'black'},
  modelView: {
    flex: 1,
  },
});
