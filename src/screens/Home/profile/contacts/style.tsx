import {COLORS} from '@constants/colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: COLORS.white,
  },

  header: {
    marginHorizontal: 20,
  },

  headerText: {
    marginVertical: 20,
    marginHorizontal: 20,
    fontSize: 20,
    color: COLORS.defaultBlack,
  },

  map: {
    paddingVertical: 200,
    marginHorizontal: 20,
  },

  boxes: {
    marginVertical: 20,
  },
});
