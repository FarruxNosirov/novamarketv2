import {appendUrl} from '@api/requests';
import {COLORS} from '@constants/colors';
import {ROUTES} from '@constants/routes';
import {useNavigation} from '@react-navigation/native';
import React, {ReactElement} from 'react';
import {
  Image,
  ListRenderItemInfo,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export type BrandItemProps = {
  photo: string;
  id: number;
  name: string;
};

const BrandItem = ({
  item: {photo, id, name},
}: ListRenderItemInfo<BrandItemProps>): ReactElement => {
  let navigation: any = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(ROUTES.BrendAll, {
          id,
          name,
          type: 'brand',
        })
      }>
      <View style={styles.container}>
        <Image source={{uri: appendUrl(photo)}} style={styles.image} />
      </View>
    </TouchableOpacity>
  );
};
export default BrandItem;

const styles = StyleSheet.create({
  container: {
    width: 85,
    height: 75,
    elevation: 2,
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 8,
  },
  image: {
    resizeMode: 'contain',
    width: 60,
    height: 60,
  },
});
