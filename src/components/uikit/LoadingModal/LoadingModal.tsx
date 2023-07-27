/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';

import {COLORS} from '@constants/colors';

const LoadingModal = () => {
  return (
    <View style={styles.animation}>
      <View
        style={{
          width: 250,
          height: 250,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLORS.white,
        }}>
        <View
          style={{
            width: 170,
            height: 170,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 50,
          }}>
          <Image
            source={require('@assets/images/icon1212.png')}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
            }}
          />
        </View>
      </View>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default LoadingModal;
const styles = StyleSheet.create({
  animation: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: COLORS.white,
  },
});
