import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {CloseIcon} from '@icons/icons';
import {COLORS} from '@constants/colors';
import {GestureResponderEvent} from 'react-native-modal';

type AllTitleType = {
  title?: string;
  color?: boolean;
  marginTop?: number;
  marginBottom?: number;
  onPress?: (event: GestureResponderEvent) => void;
};

export default function AllProductTitle(props: AllTitleType) {
  return (
    <View
      style={[
        styles.title_container,
        {marginBottom: props.marginBottom, marginTop: props.marginTop},
      ]}>
      {props ? (
        <Text
          style={[styles.title, {color: props.color ? '#3F3535' : '#FF9500'}]}>
          {props.title}
        </Text>
      ) : (
        <Text style={[styles.title]}>Популярные товары</Text>
      )}
      {!!props.onPress ? (
        <TouchableOpacity onPress={props.onPress}>
          <CloseIcon color={COLORS.black} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  title_container: {
    paddingHorizontal: 15,
    paddingVertical: 10,

    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    lineHeight: 40,
  },
});
