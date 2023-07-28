import {COLORS} from '@constants/colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  header: {
    marginHorizontal: 15,
  },

  headerText: {
    marginVertical: 20,
    marginHorizontal: 15,
    fontSize: 20,
    color: COLORS.defaultBlack,
  },

  map: {
    paddingVertical: 200,
    marginHorizontal: 15,
  },

  boxes: {
    marginVertical: 20,
  },
});
