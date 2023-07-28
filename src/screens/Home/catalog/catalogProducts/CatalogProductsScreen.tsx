/* eslint-disable react-native/no-inline-styles */
import requests from '@api/requests';
import {ProductItemResponse} from '@api/types';
import FilterScren from '@components/template/FilterScreen';
import GoBackHeader from '@components/uikit/Header/GoBackHeader';
import LoadingModal from '@components/uikit/LoadingModal/LoadingModal';
import SortView from '@components/uikit/Sort/SortView';
import SortAndFilter from '@components/uikit/SortAndFilter';
import {COLORS} from '@constants/colors';
import {useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ProductsItem from './ProductsItem';

const CatalogProductsScreen = () => {
  const [products, setProducts] = useState<ProductItemResponse[]>([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalFilter, setModalFilter] = useState('');
  const [modalSort, setModalSort] = useState('');
  const [newValyu, setNewValyu] = useState<any>();

  const [skip, setSkip] = useState(1);
  const [isMore, setIsMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] = useState(1);

  let {
    params: {id, name},
  }: any = useRoute();

  const didMount = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await requests.products.getProductsWithID(id, 1);
      const date = res.data.data;
      setProducts(date);
      setPageSize(res.data._meta.pageCount);
    } catch (error) {
      console.log(error);
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
      const res = await requests.products.getProductsWithID(id, skip);
      const data = res.data.data;
      setProducts(a => [...a, ...data]);
      setSkip(pageCount);
      setIsMore(true);
    } catch (error) {
      console.log(error);
    }
  }, [id, pageSize, skip]);

  console.log('newValyu', JSON.stringify(newValyu, null, 2));

  const filterValue = !!newValyu;
  const renderList = () => {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={newValyu ? newValyu : products}
        numColumns={2}
        contentContainerStyle={styles.contentContainerStyle}
        onEndReachedThreshold={0.5}
        windowSize={3}
        updateCellsBatchingPeriod={100}
        maxToRenderPerBatch={1}
        initialNumToRender={1}
        renderItem={({item}) => (
          <ProductsItem {...item} modalSort={modalSort} />
        )}
        keyExtractor={(item, index) => index.toLocaleString()}
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
        onEndReached={() => {
          if (isMore && !filterValue) {
            loadMore();
          }
        }}
        ListFooterComponent={
          <>
            {isMore && pageSize > 0 && !filterValue ? (
              <View style={{alignItems: 'center'}}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            ) : null}
          </>
        }
      />
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={{marginBottom: 5}}>
          <GoBackHeader title={name} />
          <SortAndFilter
            setModalVisible={setModalVisible}
            setModalFilter={setModalFilter}
            setModalSort={modalSort}
            isFilter={true}
            isSort={false}
          />
        </View>

        {isLoading ? <LoadingModal /> : renderList()}
      </View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        {modalFilter === 'Сортировать' ? (
          <SortView
            setModalVisible={setModalVisible}
            setModalSort={setModalSort}
          />
        ) : (
          <FilterScren
            setModalVisible={setModalVisible}
            filter={id}
            setNewValyu={setNewValyu}
          />
        )}
      </Modal>
    </SafeAreaView>
  );
};

export default CatalogProductsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    width: '100%',
    height: '100%',
    paddingTop: 10,
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
