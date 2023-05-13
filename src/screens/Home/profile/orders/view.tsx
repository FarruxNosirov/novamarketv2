import React, {useEffect, useState} from 'react';
import {FlatList, View, Text} from 'react-native';

import OrderItem from './components/OrderItem';
import StatusBar from './components/StatusBar';
import {styles} from './style';
import requests from '@api/requests';
import GoBackHeader from '@components/uikit/Header/GoBackHeader';
import {STRINGS} from '@locales/strings';

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

  const amount = orders?.length;
  return (
    <View style={styles.container}>
      <GoBackHeader title={STRINGS.ru.myOrders} />
      <StatusBar orders={orders} filter={filter} setFilter={setFilter} />
      <FlatList
        data={orders}
        ListHeaderComponent={() => {
          return (
            <View style={styles.row}>
              {amount > 0 ? (
                <View>
                  <Text style={styles.headerText}>Заказ №23</Text>
                  <View style={styles.salesman}>
                    <Text>Продавец:</Text>
                    <Text>ООО "ПРАЙД"</Text>
                  </View>
                </View>
              ) : null}
              <Text style={styles.salesman}></Text>
            </View>
          );
        }}
        renderItem={props => <OrderItem {...props} />}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: any) => item.id}
      />
    </View>
  );
};
export default OrderScrenn;
