/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import ButtonGradient from '@components/ButtonGradient';
import {COLORS} from '@constants/colors';
import React, {useCallback, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import OrderItem from './OrderItem';
import requests from '@api/requests';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '@constants/routes';
import Spinner from 'react-native-loading-spinner-overlay';
import {STRINGS} from '@locales/strings';
type propsType = {
  item?: any;
};
const OrderLest = (props: propsType) => {
  let {item} = props;
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const resetOplatelink = useCallback(async () => {
    setLoading(true);
    try {
      let paymentRes = await requests.order.paymendId(item.id);

      const payLink = paymentRes?.data?.data?.pay_url;
      //@ts-ignore
      navigation.navigate(ROUTES.WebView, {link: payLink});
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [item.id, navigation]);

  const cartTotalSelector = () => {
    let keys = Object.keys(item.orderProducts);
    let count = keys.length;
    let total = keys.reduce((prev, current) => {
      return prev + item.orderProducts[current].price;
    }, 0);
    return {count, total};
  };
  const cartTotal = cartTotalSelector();
  console.log('cartTotal', cartTotal);

  return (
    <>
      <FlatList
        data={item.orderProducts}
        ListHeaderComponent={() => {
          return (
            <View style={styles.row}>
              {item.orderProducts.length > 0 ? (
                <View>
                  <Text style={styles.headerText}>Заказ №{item?.id}</Text>
                </View>
              ) : null}
            </View>
          );
        }}
        renderItem={props => (
          <OrderItem
            {...props}
            payment={item.payment}
            delivery={item.delivery}
            user={item.user}
          />
        )}
        ListFooterComponent={() => {
          return (
            <View style={styles.footer}>
              {item.orderProducts.length > 0 ? (
                <>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.headerText}>Общая сумма:</Text>
                    <Text style={styles.price}>
                      {cartTotal.total
                        .toLocaleString(undefined, {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })
                        .replace(/,/gi, ' ')}{' '}
                      {STRINGS.ru.money}
                    </Text>
                  </View>
                  <ButtonGradient
                    onPress={() => resetOplatelink()}
                    isInCart={loading}
                    containerStyle={{
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: COLORS.blue,
                      width: 100,
                      height: 40,
                    }}>
                    <Text style={{color: loading ? COLORS.white : COLORS.blue}}>
                      Оплатить
                    </Text>
                  </ButtonGradient>
                </>
              ) : null}
            </View>
          );
        }}
        keyExtractor={(_item, index) => index.toString()}
      />
      <Spinner visible={loading} />
    </>
  );
};

export default OrderLest;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  headerText: {
    fontSize: 16,
    color: COLORS.defaultBlack,
  },

  header: {
    marginHorizontal: 20,
  },
  salesman: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 5,
  },
  price: {
    fontSize: 20,
    color: '#0052FF',

    alignSelf: 'center',
    padding: 10,
    marginBottom: 5,
    fontWeight: '700',
  },
});
