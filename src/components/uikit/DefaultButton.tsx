import React, {ReactElement} from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Text from './Text';
import {COLORS, GRADIENT_COLORS} from '@constants/colors';

export interface DefaultButtonProps {
  title?: string;
  onPress?: (event: GestureResponderEvent) => void;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  secondary?: boolean;
  children?: ReactElement | null;
  loading?: boolean;
  active?: boolean;
  disabled?: boolean;
}

const DefaultButton = ({
  onPress,
  title,
  children,
  secondary,
  containerStyle = {},
  textStyle,
  loading,
  disabled,
}: DefaultButtonProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress} disabled={disabled}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 3, y: 0}}
        colors={GRADIENT_COLORS}
        style={[styles.container, containerStyle]}>
        <View style={[styles.content, secondary && styles.inactiveContainer]}>
          {loading ? (
            //TODO Check color
            <ActivityIndicator
              animating={loading}
              color={COLORS.red}
              size={'small'}
            />
          ) : (
            children || (
              <Text
                style={[
                  styles.text,
                  textStyle,
                  secondary && styles.secondaryText,
                ]}>
                {title}
              </Text>
            )
          )}
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

export default DefaultButton;

const styles = StyleSheet.create({
  content: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  inactiveContainer: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    padding: 1,
    justifyContent: 'center',
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
    marginBottom: 10,
  },
  text: {
    color: COLORS.white,
    fontSize: 20,
  },

  secondaryText: {
    color: COLORS.defaultBlack,
  },
});
