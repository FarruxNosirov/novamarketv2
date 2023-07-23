import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import OrderItem from './OrderItem';
import {COLORS} from '@constants/colors';
type propsType = {
  item?: any;
};
const OrderLest = (props: propsType) => {
  let {item} = props;

  return (
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
          <View style={styles.row}>
            {item.orderProducts.length > 0 ? (
              <View>
                {/* <Text style={styles.headerText}>Общая сумма:</Text> */}
              </View>
            ) : null}
          </View>
        );
      }}
    />
  );
};

export default OrderLest;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    marginTop: 20,
    marginHorizontal: 20,
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
});
