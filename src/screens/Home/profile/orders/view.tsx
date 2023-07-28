import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';

import requests from '@api/requests';
import GoBackHeader from '@components/uikit/Header/GoBackHeader';
import {COLORS} from '@constants/colors';
import {STRINGS} from '@locales/strings';
import Spinner from 'react-native-loading-spinner-overlay';
import OrderLest from './components/OrderLest';
import {styles} from './style';
import StatusBar from './components/StatusBar';

const OrderScrenn = () => {
  const [orders, setOrders] = useState<any>([]);
  const [filter, setFilter] = useState({status: 6});
  const [loading, setLoading] = useState(false);

  const getOrders = useCallback(async () => {
    setLoading(true);
    try {
      let res = await requests.order.getOrders(filter);
      setOrders(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return (
    <View style={styles.container}>
      <GoBackHeader title={STRINGS.ru.myOrders} />
      <StatusBar orders={orders} filter={filter} setFilter={setFilter} />
      <FlatList
        data={orders}
        renderItem={item => <OrderLest {...item} />}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: any) => item.id}
        ListEmptyComponent={
          <Text
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              textAlign: 'center',
              color: COLORS.red,
              marginTop: 100,
            }}>
            Нет результатов
          </Text>
        }
      />
      <Spinner visible={loading} />
    </View>
  );
};
export default OrderScrenn;
