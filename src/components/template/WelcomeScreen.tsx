import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS} from '@constants/colors';

type Props = {
  title: string;
  children: React.ReactNode;
};

export default function WelcomeScreen(props: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>{props?.title}</Text>
      <View style={styles.inputBox}>{props?.children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputBox: {
    borderRadius: 10,
    paddingVertical: 30,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    elevation: 5,
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    width: '90%',
  },

  text: {
    fontSize: 24,
    lineHeight: 48,
    fontWeight: 'bold',
    marginBottom: 28,
    color: '#000',
  },
  logoText: {
    alignSelf: 'center',
    fontSize: 45,
    color: '#0057FF',
    fontWeight: 'bold',
    marginVertical: 30,
  },
});
