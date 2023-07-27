/* eslint-disable react-native/no-inline-styles */
import requests from '@api/requests';
import FilterScren from '@components/template/FilterScreen';
import SortView from '@components/uikit/Sort/SortView';
import {useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import GoBackHeader from '../../../../components/uikit/Header/GoBackHeader';
import SortAndFilter from '../../../../components/uikit/SortAndFilter';
import {COLORS} from '../../../../constants/colors';
import AllProductItemCard from './AllProductItemCard';
import LoadingModal from '@components/uikit/LoadingModal/LoadingModal';

const AllProducts = () => {
  const {params}: any = useRoute();

  const [products, setProducts] = useState<any[]>([]);
  const [skip, setSkip] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalFilter, setModalFilter] = useState('');
  const [modalSort, setModalSort] = useState(params.title);
  const [isMore, setIsMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] = useState(1);
  const [activeSortType, setActiveSortType] = useState('');
  const oldSortType = activeSortType ? activeSortType : params?.type;

  const didMount = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await requests.sort.getSortAllType(oldSortType, 1);
      setProducts(res.data.data);
      setPageSize(res.data._meta.pageCount);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [oldSortType]);

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
      const res = await requests.sort.getSortAllType(oldSortType, pageCount);
      const data = res.data.data;
      setProducts(p => [...p, ...data]);
      setSkip(pageCount);
      setIsMore(true);
    } catch (err) {
      console.log(err);
    }
  }, [oldSortType, pageSize, skip]);

  const defaultTitle = modalSort ? modalSort : params.props?.title;

  const renderList = () => (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={products}
      renderItem={({item}) => (
        <AllProductItemCard modalSort={modalSort} {...item} />
      )}
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
      maxToRenderPerBatch={1}
      initialNumToRender={1}
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
        <View style={{marginBottom: 10}}>
          <GoBackHeader title={defaultTitle} />

          {params.props.filter ? (
            <SortAndFilter
              setModalVisible={setModalVisible}
              setModalFilter={setModalFilter}
              setModalSort={modalSort}
              isSort={true}
            />
          ) : null}
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
            modalSort={modalSort}
            setActiveSortType={setActiveSortType}
          />
        ) : (
          <FilterScren setModalVisible={setModalVisible} />
        )}
      </Modal>
    </SafeAreaView>
  );
};

export default AllProducts;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.tabBgColor,
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  render_container: {
    position: 'relative',
    width: '100%',
    marginTop: 29,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  container2: {marginBottom: 0},

  contentContainerStyle: {
    flexDirection: 'column',
    paddingHorizontal: 10,
  },
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },

  modal: {
    padding: 20,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: COLORS.white,
  },

  modalText: {
    fontSize: 16,
    marginVertical: 15,
    color: COLORS.defaultBlack,
  },

  empty: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  emptyBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyText: {
    fontSize: 22,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  item: {
    padding: 10,
    height: 80,
  },
  separator: {
    height: 0.5,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  text: {
    fontSize: 15,
    color: 'black',
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
});
