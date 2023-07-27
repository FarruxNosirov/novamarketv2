/* eslint-disable react-native/no-inline-styles */
import CheckBox from '@components/uikit/CheckBox';
import FilterModal from '@components/uikit/Filter/FilterModal';
import {COLORS} from '@constants/colors';
import {NewTopArrowIcon2} from '@icons/icons';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
type PropsType = {
  input?: any;
  handleFilter?: any;
  priceMax?: any;
  priceMin?: any;
};
const FilterSwitch: any = ({
  input,
  handleFilter,
  priceMax,
  priceMin,
}: PropsType) => {
  const [active, setActive] = useState({
    value1: false,
    value2: false,
  });

  const [checkout, setCheckout] = useState<any>(false);
  const onPress = () => {
    setActive({...active, value1: !active.value1});
  };
  const onPress2 = () => {
    setActive({...active, value2: !active.value2});
  };
  const checkBoxHandler = (id: any) => {
    handleFilter(id);
    setCheckout((a: any) => !a);
  };

  useEffect(() => {
    const isDone = !(priceMax && priceMin);
    if (isDone) {
      setCheckout(false);
    }
  }, [priceMax, priceMin]);

  // console.log(JSON.stringify(input, null, 2));s

  // const newPactMessages = useMemo(() => {
  //   const result = (input.childs ||= []).map((item: any) => {
  //     const numbers = item.value.match(/\d/gi);

  //     if (!numbers) return numbers;
  //     return item;
  //   });

  //   return result.filter((item: {value: any}) => !!item?.value);
  // }, [input]);

  switch (input?.type) {
    case 'checkbox':
      return (
        <>
          {input.is_filter === true && (
            <FilterModal
              title={input.name}
              active={active.value1}
              onPress={onPress}>
              {active.value1 && (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                    }}>
                    {input.childs.map((item: any) => {
                      return (
                        <TouchableOpacity
                          style={[
                            styles.chiled_box,
                            {
                              backgroundColor: 'white',
                            },
                          ]}
                          onPress={() => {
                            handleFilter(item.id, item.valyu, 'checkbox');
                          }}>
                          <Text style={{fontSize: 13, color: COLORS.black}}>
                            {item.value}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </>
              )}
            </FilterModal>
          )}
        </>
      );
    case 'select':
      return (
        <>
          {input.is_filter === true && (
            <View style={styles.container}>
              <View style={styles.top_box}>
                <Text style={{fontSize: 18}}>{input.name}</Text>
                <NewTopArrowIcon2 />
              </View>
              <View
                style={{
                  backgroundColor: '#f1f1f1',
                  width: '80%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingVertical: 10,
                }}>
                <Text>Выбрать подкатегорию</Text>
              </View>
              <FlatList
                data={input?.childs}
                renderItem={({item}) => (
                  <>
                    {item.value && (
                      <TouchableOpacity
                        onPress={e => handleFilter(input.id, e, 'select')}
                        style={styles.chiled_box}>
                        <Text>{item.value}</Text>
                      </TouchableOpacity>
                    )}
                  </>
                )}
                showsVerticalScrollIndicator={false}
                style={{flexDirection: 'column', flexWrap: 'wrap'}}
                numColumns={3}
                keyExtractor={(item, index) => index.toLocaleString()}
              />
            </View>
          )}
        </>
      );
    case 'input':
      return (
        <>
          {input.is_filter === true && (
            <FilterModal
              title={input.name}
              active={active.value2}
              onPress={onPress2}>
              {active.value2 && (
                <TouchableOpacity
                  disabled={checkout}
                  onPress={() => {
                    if (priceMax && priceMin) {
                      checkBoxHandler(input.id);
                    }
                  }}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <CheckBox label={input.name} checkout={checkout} />
                </TouchableOpacity>
              )}
            </FilterModal>
          )}
        </>
      );
  }
};

export default FilterSwitch;

const styles = StyleSheet.create({
  container: {},
  top_box: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  chiled_box: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginRight: 10,
    marginVertical: 5,
  },
});
