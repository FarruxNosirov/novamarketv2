//@ts-ignore
import requests, {assetUrl} from '@api/requests';
import {COLORS} from '@constants/colors';
import {STRINGS} from '@locales/strings';

import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const OrderItem = ({item}: any) => {
  // console.log(JSON.stringify(item, null, 2));

  return (
    <View style={styles.shadowBox}>
      <View>
        <Image source={{uri: assetUrl + item.user.photo}} style={styles.img} />
        <Text style={styles.price}>{item.price}сум</Text>
      </View>
      <View style={styles.contentBox}>
        <Text style={styles.text}>{item.name}</Text>
        <Text style={styles.name}>{item.shopName}</Text>
        <Text style={styles.items}>
          {STRINGS.ru.seller} {item.shopName}
        </Text>
        <Text style={styles.items}>{STRINGS.ru.quantity} 1 шт</Text>
        <Text style={styles.items}>
          Способ оплаты:{' '}
          <View style={styles.row}>
            <Image
              style={styles.cards}
              source={require('@assets/images/mir.png')}
            />
            <Image
              style={styles.cardsV}
              source={require('@assets/images/visa.png')}
            />
            <Image
              style={styles.cardsM}
              source={require('@assets/images/mastercard.png')}
            />
          </View>
        </Text>
        <Text style={styles.items}>
          {STRINGS.ru.delivery} {item?.delivery?.name}
        </Text>
      </View>
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  shadowBox: {
    marginVertical: 10,
    marginHorizontal: 20,
    elevation: 5,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    padding: 10,
    flexDirection: 'row',
  },

  img: {
    width: 100,
    height: 120,
  },

  text: {
    fontSize: 13,
    fontFamily: 'Montserrat-Bold',
    color: COLORS.defaultBlack,
    textTransform: 'uppercase',
  },

  contentBox: {
    flex: 1,
    paddingLeft: 5,
  },

  name: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 13,
    color: COLORS.defaultBlack,
  },

  items: {
    color: COLORS.defaultBlack,
    fontSize: 13,
    alignItems: 'center',
    marginBottom: 5,
  },

  price: {
    fontSize: 16,
    color: COLORS.red,
    fontFamily: 'Montserrat-Bold',
    alignSelf: 'center',
    padding: 10,
    marginBottom: 5,
  },

  cards: {
    width: 35,
    height: 12,
    marginHorizontal: 5,
  },
  cardsV: {
    width: 35,
    height: 10,
    marginRight: 5,
  },
  cardsM: {
    width: 35,
    height: 10,
  },

  row: {
    flexDirection: 'row',
  },
});
