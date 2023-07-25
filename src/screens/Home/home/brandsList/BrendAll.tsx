import requests from '@api/requests';
import {ProductItemResponse} from '@api/types';
import GoBackHeader from '@components/uikit/Header/GoBackHeader';
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
const limt = 1;
const BrendAll = () => {
  const [products, setProducts] = useState<ProductItemResponse[]>();
  const [footerLoading, setFooterLoading] = useState(false);
  const [skip, setSkip] = useState(limt);

  let {
    params: {id, name},
  }: any = useRoute();

  let effect = async () => {
    try {
      setFooterLoading(true);
      let res = await requests.products.getProductsWithBrand(id, skip);
      const newDate = res.data.data;
      setProducts([...newDate]);
      setSkip(skip + 1);
    } catch (error) {
      console.log(error);
    } finally {
      setFooterLoading(false);
    }
  };

  useEffect(() => {
    effect();
  }, [id]);
  const onEndReached = () => {
    setFooterLoading(true);
    effect();
  };
  const itemSeparatorComponent = useCallback(() => {
    return <View style={{height: 10}}></View>;
  }, [products]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={{marginBottom: 5}}>
          <GoBackHeader title={name} />
        </View>
        <>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={products}
            //@ts-ignore
            renderItem={({item}) => <ProductsItem {...item} />}
            numColumns={2}
            contentContainerStyle={styles.contentContainerStyle}
            ListEmptyComponent={
              <>
                <Text
                  style={{
                    textAlign: 'center',
                    color: COLORS.red,
                    marginTop: 100,
                  }}>
                  Нет результатов
                </Text>
              </>
            }
            onEndReached={onEndReached}
            ItemSeparatorComponent={itemSeparatorComponent}
            ListFooterComponent={
              <>
                {footerLoading ? (
                  <View style={{alignItems: 'center'}}>
                    <ActivityIndicator size="large" color="#0000ff" />
                  </View>
                ) : null}
              </>
            }
          />
        </>
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
