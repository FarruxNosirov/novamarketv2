//@ts-ignore
import requests, {assetUrl} from '@api/requests';
import {COLORS} from '@constants/colors';
import {STRINGS} from '@locales/strings';

import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const OrderItem = ({item, payment, delivery, user}: any) => {
  return (
    <View style={styles.shadowBox}>
      <View style={styles.imageBox}>
        <Image
          source={{uri: assetUrl + item.product.photo}}
          style={styles.img}
        />
        <Text style={styles.price}>
          {item?.price
            .toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })
            .replace(/,/gi, ' ')}{' '}
          {STRINGS.ru.money}
        </Text>
      </View>
      <View style={styles.contentBox}>
        <View style={{maxHeight: 40}}>
          <Text style={styles.text}>{item?.product?.name}</Text>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <Text style={styles.name}>Цвет:</Text>
          <Text style={[styles.name, {color: item?.product?.color?.color}]}>
            {item?.product?.color?.name}
          </Text>
        </View>

        <Text style={styles.items}>Бренд: {item?.product?.brand?.name}</Text>
        <Text style={styles.items}>Доставка: {delivery?.name}</Text>
        <Text style={styles.items}>Адрес: {user?.last_address}</Text>
        {/* <Text style={styles.items}>
          Способ оплаты:
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
        </Text> */}
        <Text style={styles.items}>Оплата: {payment?.name}</Text>
      </View>
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  shadowBox: {
    marginVertical: 10,
    marginHorizontal: 20,

    borderRadius: 8,
    backgroundColor: COLORS.white,
    padding: 10,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  imageBox: {
    width: 125,
  },

  img: {
    width: 120,
    height: 120,
  },

  text: {
    fontSize: 13,

    color: COLORS.defaultBlack,
    textTransform: 'uppercase',
  },

  contentBox: {
    flex: 1,
    paddingLeft: 5,
  },

  name: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 13,
    color: COLORS.defaultBlack,
  },

  items: {
    color: COLORS.defaultBlack,
    fontSize: 13,
    alignItems: 'center',
    marginBottom: 9,
  },

  price: {
    fontSize: 20,
    color: '#0052FF',

    alignSelf: 'center',
    padding: 10,
    marginBottom: 5,
    fontWeight: '700',
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
