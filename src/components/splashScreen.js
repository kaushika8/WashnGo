import React, {useEffect, useState} from 'react';
import {View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const SplashScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        source={require('../assets/topleft.png')}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}></Image>
      <Image
        source={require('../assets/washngo.png')}
        style={{position: 'absolute'}}></Image>
      <Image
        resizeMode="cover"
        source={require('../assets/topright.png')}
        style={{
          position: 'absolute',
          height: 200,
          width: 200,
          top: 0,
          right: 0,
        }}></Image>
      <Image
        source={require('../assets/bottomright.png')}
        resizeMode="cover"
        style={{
          position: 'absolute',
          height: 250,
          width: 250,
          bottom: 0,
          right: 0,
        }}></Image>
    </View>
  );
};

export default SplashScreen;
