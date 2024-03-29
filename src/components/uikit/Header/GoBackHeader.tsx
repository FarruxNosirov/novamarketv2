/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../../../constants/colors';
import {LeftArrow} from '../../../assets/icons/icons';

type Props = {
  title?: string;
  onPress?: () => void;
  color?: boolean;
};

export default function GoBackHeader(props: Props) {
  const navigation = useNavigation<any>();
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        paddingHorizontal: 15,
        paddingVertical: 10,
        width: '95%',
      }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        hitSlop={{bottom: 20, top: 20, left: 20, right: 20}}
        style={styles.row}>
        <LeftArrow />
        {props.title && <Text style={[styles.title]}>{props.title}</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: '600',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: '#71717184',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#023047',
    marginLeft: 8,
  },
});
