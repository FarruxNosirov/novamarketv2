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
import {ROUTES} from '@constants/routes';
import {Category} from '@api/types';
import {appendUrl} from '@api/requests';
import {Dimensions} from 'react-native';
import {COLORS} from '@constants/colors';

const SubCatalogListItem = ({props, id}: any) => {
  const navigation = useNavigation();
  let {item} = props;

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate(
          //@ts-ignore
          ROUTES.CATALOG_PRODUCTS as never,
          {id: item.id, type: id, name: item.name} as never,
        )
      }>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{uri: appendUrl(item.photo as never)}}
        />
        <Text style={styles.text}>{item.name ? item.name : ''}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SubCatalogListItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
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
  title: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
  },

  image: {
    width: (Dimensions.get('window').width - 100) / 2,
    height: (Dimensions.get('window').width - 100) / 2,
  },

  text: {
    fontSize: 14,
    color: COLORS.defaultBlack,
    maxWidth: 110,
    textAlign: 'center',
  },
});
