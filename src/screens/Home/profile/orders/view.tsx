import React, {useEffect, useState} from 'react';
import {FlatList, View, Text} from 'react-native';

import OrderItem from './components/OrderItem';
import StatusBar from './components/StatusBar';
import {styles} from './style';
import requests from '@api/requests';
import GoBackHeader from '@components/uikit/Header/GoBackHeader';
import {STRINGS} from '@locales/strings';
import OrderLest from './components/OrderLest';

const OrderScrenn = () => {
  const [orders, setOrders] = useState<any>([]);
  const [filter, setFilter] = useState({status: 6});
  const [loading, setLoading] = useState(false);

  let timer = -1;
  const getOrders = async () => {
    setLoading(true);
    try {
      let res = await requests.order.getOrders(filter);
      setOrders(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      timer = setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  };

  useEffect(() => {
    getOrders();
  }, [filter]);
  // console.log(JSON.stringify(orders, null, 2));

  return (
    <View style={styles.container}>
      <GoBackHeader title={STRINGS.ru.myOrders} />
      {/* <StatusBar orders={orders} filter={filter} setFilter={setFilter} /> */}
      <FlatList
        data={orders}
        renderItem={item => <OrderLest {...item} />}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: any) => item.id}
      />
    </View>
  );
};
export default OrderScrenn;
