/* eslint-disable react-native/no-inline-styles */
import requests from '@api/requests';
import {ProductItemResponse} from '@api/types';
import GoBackHeader from '@components/uikit/Header/GoBackHeader';
import LoadingModal from '@components/uikit/LoadingModal/LoadingModal';
import {COLORS} from '@constants/colors';
import ProductsItem from '@home/catalog/catalogProducts/ProductsItem';
import {useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const BrendAll = () => {
  const [products, setProducts] = useState<ProductItemResponse[]>([]);
  const [isMore, setIsMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] = useState(1);
  const [skip, setSkip] = useState(1);

  let {
    params: {id, name},
  }: any = useRoute();

  const didMount = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await requests.products.getProductsWithBrand(id, 1);
      setProducts(res.data.data);
      setPageSize(res.data._meta.pageCount);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    didMount();
  }, [didMount]);

  const loadMore = useCallback(async () => {
    setIsMore(false);
    const pageCount = skip + 1;

    if (pageSize < pageCount) {
      return;
    }
    try {
      const res = await requests.products.getProductsWithBrand(id, pageCount);
      const data = res.data.data;
      setProducts(p => [...p, ...data]);
      setSkip(pageCount);
      setIsMore(true);
    } catch (err) {
      console.log(err);
    }
  }, [id, pageSize, skip]);

  const renderList = () => (
    <FlatList
      removeClippedSubviews
      showsVerticalScrollIndicator={false}
      data={products}
      maxToRenderPerBatch={1}
      initialNumToRender={1}
      //@ts-ignore
      renderItem={({item}) => <ProductsItem {...item} />}
      numColumns={2}
      contentContainerStyle={styles.contentContainerStyle}
      onEndReached={() => {
        if (isMore) {
          loadMore();
        }
      }}
      onEndReachedThreshold={0.5}
      windowSize={3}
      updateCellsBatchingPeriod={100}
      ListEmptyComponent={
        <Text
          style={{
            textAlign: 'center',
            color: COLORS.red,
            marginTop: 100,
          }}>
          Нет результатов
        </Text>
      }
      ListFooterComponent={
        <>
          {isMore && pageSize > 0 ? (
            <View style={{alignItems: 'center'}}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : null}
        </>
      }
    />
  );
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={{marginBottom: 5}}>
          <GoBackHeader title={name} />
        </View>

        {isLoading ? <LoadingModal /> : renderList()}
      </View>
    </SafeAreaView>
  );
};

export default BrendAll;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    width: '100%',
    height: '100%',
  },
  render_container: {
    position: 'relative',
    width: '100%',
    marginTop: 29,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  contentContainerStyle: {
    paddingHorizontal: 10,
    flexDirection: 'column',
    paddingTop: 10,
  },
});
