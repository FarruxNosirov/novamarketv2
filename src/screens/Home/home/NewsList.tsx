import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import requests from '@api/requests';
import {useNavigation} from '@react-navigation/native';
import useLoading from '@store/Loader/useLoading';
import ProductsTitle from '../../../components/uikit/ProductsTitle';
import {ROUTES} from '../../../constants/routes';
import NewsItemDetail from './NewsItemDetail';

type ProductListProps = {
  title: string;
  filter?: boolean;
};

export default function NewsList(props: ProductListProps) {
  const [products, setProducts] = useState<any>();
  const loading = useLoading();
  const navigation = useNavigation();
  const getProducts = async () => {
    try {
      loading?.onRun();
      let res = await requests.news.getNews();
      setProducts(res.data.data);
    } catch (error) {
      console.log('product lest', error);
    } finally {
      loading?.onClose();
    }
  };

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (products?.length <= 0) {
    return <View />;
  }

  const onPress = () => {
    //@ts-ignore
    navigation.navigate(ROUTES.ALLNEWS as never, {products, props} as never);
  };

  return (
    <View>
      <ProductsTitle title={props.title} onPress={onPress} />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={products}
        renderItem={({item}) => (
          <NewsItemDetail buttonTitle="Подробнее" item={item} />
        )}
        keyExtractor={item => item.id}
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {marginBottom: 15},
  contentContainerStyle: {paddingHorizontal: 10},
});
