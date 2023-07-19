import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import React, {ReactElement} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  COLORS,
  GRADIENT_COLORS,
  GRADIENT_COLORSNoActive,
} from '@constants/colors';
type propsType = {
  children?: ReactElement | null;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  isInCart?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
};
const ButtonGradient = (props: propsType) => {
  return (
    <TouchableWithoutFeedback onPress={props.onPress} disabled={props.disabled}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 3, y: 0}}
        colors={!props.isInCart ? GRADIENT_COLORSNoActive : GRADIENT_COLORS}
        style={[styles.container, props.containerStyle]}>
        {props.children}
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

export default ButtonGradient;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});
