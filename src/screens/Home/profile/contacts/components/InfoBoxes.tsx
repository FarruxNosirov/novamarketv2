import {COLORS} from '@constants/colors';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';

export interface InfoBoxesProps {
  title?: string;
  text?: string;
  onPress?: (event: GestureResponderEvent) => void;
}

const InfoBoxes = ({title, text, onPress}: InfoBoxesProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default InfoBoxes;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 10,
    elevation: 5,
    padding: 15,
    borderRadius: 10,
    backgroundColor: COLORS.lightGray,
  },

  title: {
    fontSize: 14,
    color: COLORS.textColor,
  },

  text: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.defaultBlack,
  },
});
