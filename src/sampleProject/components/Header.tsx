import {Image, Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import Animated, {SharedValue, useAnimatedStyle} from 'react-native-reanimated';



type Props = {
  handleChangeDirection: () => void;
  rotate: SharedValue<number>;
};

const Header = ({handleChangeDirection, rotate}: Props) => {
 

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${rotate.value}deg`}],
    };
  });
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
      
        >
        <Image
          source={require('../sampleAssets/ArrowLeft.png')}
          style={styles.arrowLeft}
        />
      </Pressable>
      <Pressable style={styles.button} onPress={handleChangeDirection}>
        <Animated.Image
          source={require('../sampleAssets/ArrowLeftRight.png')}
          style={[styles.arrowLeftRight, animatedStyle]}
        />
      </Pressable>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: '#323232',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  arrowLeft: {
    width: 28,
    height: 28,
  },
  arrowLeftRight: {
    width: 30,
    height: 20,
  },
});