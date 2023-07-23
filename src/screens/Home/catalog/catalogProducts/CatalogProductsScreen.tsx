import requests from '@api/requests';
import {ProductItemResponse} from '@api/types';
import FilterScren from '@components/template/FilterScreen';
import GoBackHeader from '@components/uikit/Header/GoBackHeader';
import LoadingModal from '@components/uikit/LoadingModal/LoadingModal';
import SortView from '@components/uikit/Sort/SortView';
import SortAndFilter from '@components/uikit/SortAndFilter';
import {COLORS} from '@constants/colors';
import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ProductsItem from './ProductsItem';

const CatalogProductsScreen = () => {
  const [products, setProducts] = useState<ProductItemResponse[]>();
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalFilter, setModalFilter] = useState('');
  const [modalSort, setModalSort] = useState('');
  const [newValyu, setNewValyu] = useState<any>();

  let {
    params: {id, name, type},
  }: any = useRoute();

  let effect = async () => {
    try {
      setLoading(true);
      let res = await requests.products.getProductsWithID(id);
      setProducts(res.data.data as never);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  let getRecently = async () => {
    try {
      let res = await requests.sort.getRecently();
      setProducts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  let getNewAdded = async () => {
    try {
      let res = await requests.sort.getNewAdded();
      setProducts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  let getExpensive = async () => {
    try {
      let res = await requests.sort.getExpensive();
      setProducts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  let getCheap = async () => {
    try {
      let res = await requests.sort.getCheap();
      setProducts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  let getPopular = async () => {
    try {
      let res = await requests.sort.getPopular();
      setProducts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (modalSort === 'Новинка') {
      getNewAdded();
    }
    if (modalSort === 'Самые дорогие') {
      getExpensive();
    }
    if (modalSort === 'Популярные') {
      getPopular();
    }
    if (modalSort === 'Самые дешевые') {
      getCheap();
    }
    if (modalSort === 'Недавно добавленные') {
      getRecently();
    }
  }, [modalSort]);

  useEffect(() => {
    effect();
  }, []);

  let productDisebled = products?.length;
  if (newValyu) {
    productDisebled = newValyu?.length;
  }
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
          />
        </View>
        {loading ? (
          <LoadingModal />
        ) : (
          <>
            {products?.length ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={newValyu ? newValyu : products}
                renderItem={({item}) => (
                  <ProductsItem {...item} modalSort={modalSort} />
                )}
                numColumns={2}
                contentContainerStyle={styles.contentContainerStyle}
              />
            ) : (
              <Text
                style={{
                  textAlign: 'center',
                  color: COLORS.red,
                  marginTop: 100,
                }}>
                Нет результатов
              </Text>
            )}
          </>
        )}
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
