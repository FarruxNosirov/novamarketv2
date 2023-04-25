import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, GRADIENT_COLORS} from '@constants/colors';

const IconCart = ({icon}: any) => {
  return (
    <View style={styles.containerIcon}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 3, y: 0}}
        colors={GRADIENT_COLORS}
        style={[styles.container]}>
        {icon}
      </LinearGradient>
    </View>
  );
};

export default IconCart;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 1,
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.84,
    elevation: 5,
    backgroundColor: COLORS.darkBlue4,
    width: '100%',
  },
  containerIcon: {
    width: 47,
    height: 37,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
