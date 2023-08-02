/* eslint-disable react-native/no-inline-styles */
import {assetUrl} from '@api/requests';
import ButtonGradient from '@components/ButtonGradient';
import {ROUTES} from '@constants/routes';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {COLORS} from '../../../constants/colors';
type Props = {
  buttonTitle?: string;
  item?: any;
};

export default function NewsItemDetail({item}: Props) {
  const navigation = useNavigation();
  // console.log('item', JSON.stringify(item, null, 2));
  const formatDate = (date: any, format = ' DD.MM.YYYY') => {
    const dateMoment = moment(date);
    return dateMoment.format(format);
  };
  const defaultDate = formatDate(item.date);
  console.log('defaultDate', defaultDate);

  return (
    <View style={styles.cartItem}>
      <View style={styles.imageBox}>
        <TouchableWithoutFeedback
          onPress={() =>
            navigation.navigate(
              ROUTES.NEWDETAILS as never,
              {id: item.id} as never,
            )
          }>
          <Image style={styles.image} source={{uri: assetUrl + item.photo}} />
        </TouchableWithoutFeedback>
      </View>

      <View style={styles.cartItemInfo}>
        <View style={styles.cartItemInfoBox}>
          <Text style={styles.typeText}>
            {item.name.length > 80
              ? item?.name.slice(0, 80) + '...'
              : item?.name}
          </Text>
        </View>
        <View
          style={{
            width: '100%',

            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <ButtonGradient
            isInCart={true}
            defaultBtn={true}
            containerStyle={styles.button}
            onPress={() =>
              navigation.navigate(
                ROUTES.NEWDETAILS as never,
                {id: item.id} as never,
              )
            }>
            <Text style={styles.buttonText}>Подробно</Text>
          </ButtonGradient>
          <Text>{defaultDate}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cartItem: {
    width: 200,
    height: 310,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginRight: 15,
    marginBottom: 20,
    flexDirection: 'column',
    shadowColor: '#d0d0d0',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageBox: {
    width: '100%',
    height: 156,
    borderRadius: 15,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    marginBottom: 10,
    resizeMode: 'stretch',
  },
  heartIconBox: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  cartItemInfo: {
    paddingHorizontal: 10,
  },
  typeText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.black,
  },
  cartItemInfoBox: {
    height: 80,
    width: '100%',
  },
  button: {
    width: 100,
    height: 40,
    borderRadius: 10,
    backgroundColor: COLORS.blue,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: COLORS.blue,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.white,
  },
});
