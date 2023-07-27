/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import requests from '@api/requests';
import DefaultInput from '@components/uikit/TextInput';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {COLORS} from '../../constants/colors';
import AllProductTitle from '../uikit/AllProductTitle';
import DefaultButton from '../uikit/DefaultButton';
import FilterSwitch from './FilterSwitch';
import useLoading from '@store/Loader/useLoading';
type PropsSort = {
  setModalVisible?: any;
  filter?: any;
  setNewValyu?: any;
  category_id?: number;
};

const FilterScren = (props: PropsSort) => {
  const [catalogType, setCatalogType] = useState<any>([]);
  const getFilterId = async () => {
    try {
      let res = await requests.filter.catalogFilter(props.filter);
      setCatalogType(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFilterId();
  }, []);
  const lodaing = useLoading();

  const [filter, setFilter] = useState<any>();
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(priceMin);

  const handleFilter = (id?: any) => {
    setFilter({
      ...filter,
      [`filter[${id}]`]: id,
    });
  };

  const OnChangeHandlerMine = (e: any) => {
    let newFilter = {
      ...filter,
      price_min: e,
    };
    setPriceMin(e);
    setFilter(newFilter);
  };
  const OnChangeHandlerMax = (e: any) => {
    let newFilter = {
      ...filter,
      price_max: e,
    };
    setPriceMax(e);
    setFilter(newFilter);
  };

  let categoryId = props.filter;

  const subMendHandler = async () => {
    lodaing?.onRun();
    try {
      let res = await requests.filter.productFilter(
        priceMin,
        priceMax,
        categoryId,
        filter,
      );

      props.setNewValyu(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      lodaing?.onClose();
    }
  };
  const submetAndClosed = async () => {
    await subMendHandler();
    closeHandler();
  };
  const closeHandler = () => {
    props.setModalVisible((a: any) => {
      return !a;
    });
  };

  let btnDisebled = true;
  if (priceMin && priceMax) {
    btnDisebled = false;
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <AllProductTitle
        title={'Фильтры'}
        color={true}
        onPress={() => closeHandler()}
      />
      <ScrollView style={styles.container}>
        <DefaultInput
          backgroundColor="#f5f5f5"
          label="От"
          onChangeText={OnChangeHandlerMine}
          typeOf="number-pad"
        />
        <DefaultInput
          backgroundColor="#f5f5f5"
          label="До"
          onChangeText={OnChangeHandlerMax}
          typeOf="number-pad"
        />
        {/* <FlatList
          data={catalogType}
          renderItem={({item}) => (
            <>
              {item.is_filter ? (
                <FilterSwitch
                  input={item}
                  priceMin={priceMin}
                  priceMax={priceMax}
                />
              ) : null}
            </>
          )}
          keyExtractor={(item, index) => index.toLocaleString()}
          style={{marginBottom: 30}}
        /> */}
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{width: '100%'}}>
            <DefaultButton
              title="Фильтр"
              onPress={submetAndClosed}
              disabled={btnDisebled}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FilterScren;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 15,
  },
  input_box: {},
  input: {
    width: '100%',
    height: 55,
    backgroundColor: '#fff',
    borderRadius: 45,
    paddingHorizontal: 24,
    fontSize: 16,
    marginBottom: 15,
  },
});
