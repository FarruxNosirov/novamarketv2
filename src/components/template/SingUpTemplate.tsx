import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {COLORS} from '../../constants/colors';

type Props = {
  children: React.ReactNode;
};

export default function SingUpTemplate(props: Props) {
  const imgRequire = require('../../assets/images/logo.png');

  return (
    <View style={styles.container}>
      <Image source={imgRequire} style={styles.logo} />
      <View style={styles.box}>{props.children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColor2,
    paddingBottom: 100,
  },
  logo: {
    width: 124,
    height: 162,
    opacity: 0.5,
    alignSelf: 'center',
  },
  box: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  buttonsBox: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: COLORS.noActiveButtonBgColor2,
    borderRadius: 45,
    height: 55,
    marginBottom: 30,
  },
});
