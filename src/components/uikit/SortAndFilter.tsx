import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {BottomArrow, FilterIcon} from '../../assets/icons/icons';
import {COLORS} from '../../constants/colors';

type PropsSnadAndFilter = {
  item?: string;
  setModalVisible?: any;
  setModalFilter?: any;
  setModalSort?: any;
  title?: any;
  isFilter?: boolean;
  isSort?: boolean;
};

export default function SortAndFilter(props: PropsSnadAndFilter) {
  const sortHandler = () => {
    props.setModalVisible(true);
    props.setModalFilter('Сортировать');
  };
  const FilterHandler = () => {
    props.setModalVisible(true);
    props.setModalFilter('Фильтры');
  };

  return (
    <View style={styles.container}>
      {props.isSort ? (
        <TouchableOpacity style={styles.populer} onPress={sortHandler}>
          <Text style={styles.title}>
            {props.setModalSort ? props.setModalSort : 'Популярные'}
          </Text>
          <BottomArrow fill={COLORS.blue} />
        </TouchableOpacity>
      ) : null}

      {props.isFilter ? (
        <TouchableOpacity style={styles.filter} onPress={FilterHandler}>
          <Text style={styles.title}>Фильтры</Text>
          <FilterIcon fill={COLORS.blue} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
    borderWidth: 1,
    paddingVertical: 13,
    borderColor: 'rgba(113, 113, 113, 0.3)',
    marginBottom: 10,
  },
  populer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: '500',
    color: COLORS.blue,
    marginRight: 5,
  },
});
