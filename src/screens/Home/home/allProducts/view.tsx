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
} from 'react-native';
import GoBackHeader from '../../../../components/uikit/Header/GoBackHeader';
import SortAndFilter from '../../../../components/uikit/SortAndFilter';
import {COLORS} from '../../../../constants/colors';
import AllProductItemCard from './AllProductItemCard';

const limt = 10;
const AllProducts = () => {
  const {params}: any = useRoute();

  const [products, setProducts] = useState<any[]>();
  const [skip, setSkip] = useState(limt);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalFilter, setModalFilter] = useState('');
  const [modalSort, setModalSort] = useState(params.title);
  const [footerLoading, setFooterLoading] = useState(false);

  let getRecently = async (type: string) => {
    try {
      setFooterLoading(true);
      let res = await requests.sort.getSortAllType(skip, type);
      const newDate = res.data.data;
      setProducts([...newDate]);
      setSkip(skip + 10);
    } catch (error) {
      console.log(error);
    } finally {
      setFooterLoading(false);
    }
  };

  useEffect(() => {
    if (modalSort === 'Новинка') {
      getRecently('new');
    }
    if (modalSort === 'Популярные') {
      getRecently('popular');
    }
    if (modalSort === 'Самые дешевые') {
      getRecently('price_down');
    }
  }, [modalSort, params]);

  const defaultTitle = modalSort ? modalSort : params.props?.title;
  const itemSeparatorComponent = useCallback(() => {
    return <View style={{height: 10}}></View>;
  }, [products]);

  const onEndReached = () => {
    if (modalSort === 'Новинка') {
      getRecently('new');
    }
    if (modalSort === 'Популярные') {
      getRecently('popular');
    }
    if (modalSort === 'Самые дешевые') {
      getRecently('price_down');
    }
  };
  const clearHandler = () => {
    setProducts([]);
    setSkip(10);
  };

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
            />
          ) : null}
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={products}
          renderItem={({item}) => (
            <AllProductItemCard modalSort={modalSort} {...item} />
          )}
          numColumns={2}
          contentContainerStyle={styles.contentContainerStyle}
          ListFooterComponent={
            <>
              {footerLoading ? (
                <View style={{alignItems: 'center'}}>
                  <ActivityIndicator size="large" color="#0000ff" />
                </View>
              ) : null}
            </>
          }
          ItemSeparatorComponent={itemSeparatorComponent}
          onEndReached={onEndReached}
        />
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
            clearHandler={clearHandler}
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
