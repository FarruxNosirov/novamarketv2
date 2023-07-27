import {View, StyleSheet} from 'react-native';
import React from 'react';

import Spinner from 'react-native-loading-spinner-overlay';
import {COLORS} from '@constants/colors';
import {red100} from 'react-native-paper/lib/typescript/styles/colors';

const LoadingModal = () => {
  return (
    <View style={styles.animation}>
      <Spinner visible={true} color={COLORS.white} animation="fade" />
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
