/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

import AllProductTitle from '../AllProductTitle';
import {COLORS} from '../../../constants/colors';
import DefaultButton from '../DefaultButton';

type PropsSort = {
  item?: string;
  setModalVisible?: any;
  setModalSort?: any;
  modalSort?: string;
  clearHandler?: () => void;
  setActiveSortType?: any;
};

const title = 'Сортировать';
const data = [
  {
    id: 0,
    name: 'Популярные',
    type: 'popular',
  },
  {
    id: 1,
    name: 'Новинка',
    type: 'new',
  },

  {
    id: 2,
    name: 'Самые дешевые',
    type: 'price_down',
  },
];
const SortView = (props: PropsSort) => {
  const [active, setActive] = useState('Популярные');
  const [activeType, setActiveType] = useState('');

  const sortAddHandler = () => {
    props.setModalVisible(false);
    props.setModalSort(active);
    props.setActiveSortType(activeType);
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <AllProductTitle title={title} color={true} />

      <View style={styles.content}>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.box}
              onPress={() => {
                setActive(item.name), setActiveType(item.type);
              }}>
              <Text style={styles.title}>{item.name}</Text>
              <View style={styles.except}>
                <View
                  style={[
                    styles.inside,
                    {
                      backgroundColor:
                        active === item.name ? COLORS.blue : '#FFFFFF',
                    },
                  ]}
                />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 15,
          bottom: 58,
          position: 'absolute',
          width: '100%',
        }}>
        <DefaultButton title={'Применить'} onPress={sortAddHandler} />
      </View>
    </SafeAreaView>
  );
};

export default SortView;

const styles = StyleSheet.create({
  content: {
    marginTop: 16,
    marginLeft: 15,
    marginRight: 15,
    flexDirection: 'column',

    flex: 1,
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 7,
  },

  except: {
    width: 29,
    height: 29,
    borderWidth: 1,
    borderColor: COLORS.blue,
    marginBottom: 7,
    borderRadius: 50,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inside: {
    width: 22,
    height: 22,
    borderRadius: 50,
  },
  title: {
    fontSize: 17,
    lineHeight: 40,
    fontWeight: '500',
    color: '#757575',
  },
});
