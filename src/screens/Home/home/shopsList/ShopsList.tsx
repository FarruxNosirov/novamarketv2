import requests from '@api/requests';
import {STRINGS} from '@locales/strings';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View, Text} from 'react-native';
import ShopsItem from './ShopItem';
import {COLORS} from '@constants/colors';

const ShopsList = () => {
  const [shops, setShops] = useState([]);
  let effect = async () => {
    try {
      let res = await requests.shops.getShops();
      setShops(res.data.data);
    } catch (error) {}
  };
  useEffect(() => {
    effect();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{STRINGS.ru.yourShops}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={shops}
        renderItem={props => <ShopsItem {...props} />}
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </View>
  );
};

export default ShopsList;

const styles = StyleSheet.create({
  title: {
    color: COLORS.defaultBlack,
    fontSize: 19,
    marginLeft: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  container: {marginBottom: 20},
  contentContainerStyle: {
    paddingLeft: 12,
  },
  text: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.defaultBlack,
    marginLeft: 16,
  },
});
