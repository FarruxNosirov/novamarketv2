import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ListRenderItemInfo,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '../../../constants/routes';
import {Category} from '@api/types';
import {appendUrl} from '@api/requests';
import {Dimensions} from 'react-native';
import {COLORS} from '@constants/colors';

const CatalogListItem = ({
  item: {photo, name, id},
}: ListRenderItemInfo<Category>) => {
  let navigation: any = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate(ROUTES.SUBCATEGORY, {id, name})}>
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: appendUrl(photo as never)}} />
        <Text style={styles.text}>{name ? name : ''}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CatalogListItem;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: COLORS.white,
    elevation: 5,
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    margin: 8,
    borderRadius: 10,
    alignItems: 'center',
    textAlign: 'center',
  },

  image: {
    width: (Dimensions.get('window').width - 108) / 2,
    height: (Dimensions.get('window').width - 108) / 2,
  },

  text: {
    fontSize: 14,
    color: COLORS.defaultBlack,
    maxWidth: 110,
    textAlign: 'center',
  },
});
