import requests from '@api/requests';
import DefaultInput from '@components/uikit/TextInput';
import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {COLORS} from '../../constants/colors';
import AllProductTitle from '../uikit/AllProductTitle';
import DefaultButton from '../uikit/DefaultButton';
import FilterSwitch from './FilterSwitch';
type PropsSort = {
  setModalVisible?: any;
  filter?: any;
  setNewQueryProps?: any;
  category_id?: number;
  subMendHandler?: any;
};

const FilterScren = (props: PropsSort) => {
  const [loading, setLoading] = useState(false);

  const [filter, setFilter] = useState<any>({});
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(priceMin);
  const [newQuery, setNewQuery] = useState('');
  let query = '';
  const [catalogType, setCatalogType] = useState<any>([]);
  const getFilterId = useCallback(async () => {
    try {
      let res = await requests.filter.catalogFilter(props.filter);
      setCatalogType(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }, [props.filter]);

  useEffect(() => {
    getFilterId();
  }, [getFilterId]);

  const handleFilter = (id?: any) => {
    if (filter === undefined) {
      setFilter({
        [`filter[${id}]`]: id,
      });
    } else if (!filter[`filter[${id}]`]) {
      setFilter({
        ...filter,
        [`filter[${id}]`]: id,
      });
    } else if (filter[`filter[${id}]`]) {
      const data = {...filter};
      delete data[`filter[${id}]`];
      setFilter({...data});
    }
  };
  useEffect(() => {
    for (const key in filter) {
      query = query + '&' + key + '=' + filter[key];
    }
    setNewQuery(query);
  }, [handleFilter]);

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

  const submetAndClosed = async () => {
    setLoading(true);
    try {
      props.setNewQueryProps(newQuery);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      closeHandler();
    }
  };
  const closeHandler = () => {
    props.setModalVisible((a: any) => {
      return !a;
    });

    setNewQuery('');
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
        <FlatList
          data={catalogType}
          renderItem={({item}) => (
            <>
              {item.is_filter ? (
                <FilterSwitch
                  input={item}
                  priceMin={priceMin}
                  priceMax={priceMax}
                  handleFilter={handleFilter}
                  filter={filter}
                />
              ) : null}
            </>
          )}
          keyExtractor={(item, index) => index.toLocaleString()}
          style={{marginBottom: 30}}
        />
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
      <Spinner visible={loading} />
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
