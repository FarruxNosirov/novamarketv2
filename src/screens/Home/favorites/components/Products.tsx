import requests, {appendUrl} from '@api/requests';
import {ProductItemResponse} from '@api/types';
import DefaultButton from '@components/uikit/DefaultButton';

import {COLORS} from '@constants/colors';
import {ROUTES} from '@constants/routes';
import {BasketIcon} from '@icons/icons';
import {STRINGS} from '@locales/strings';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '@store/hooks';
import {toggleLoading} from '@store/slices/appSettings';
import {cartSelector, loadCart} from '@store/slices/cartSlice';
import {favoriteSelector, loadFavorite} from '@store/slices/favoriteSlice';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';

const Products = ({item}: {item: ProductItemResponse}) => {
  let {photo, name, price, discount, price_usd, id, isFavorite, category} =
    item;

  const dispatch = useDispatch();
  const cart = useAppSelector(cartSelector);

  let isInCart = !!cart[id];

  const navigation: any = useNavigation();
  const [animate, setAnimate] = useState(false);
  const discountPrice = (price * (100 - discount)) / 100;

  const onCartPress = async () => {
    try {
      if (isInCart) {
        //TODO remove from cart
        try {
          setAnimate(true);
          let res = await requests.products.removeItem({
            product_id: id,
          });
          let cartRes = await requests.products.getCarts();
          dispatch(loadCart(cartRes.data.data));
          setAnimate(false);
        } catch (error) {
          console.log(error);
        } finally {
          effect();
        }
      } else {
        setAnimate(true);
        let res = await requests.products.addToCart({
          amount: 1,
          product_id: id,
        });
        let cartRes = await requests.products.getCarts();
        dispatch(loadCart(cartRes.data.data));
        setAnimate(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      effect();
    }
  };

  const effect = async () => {
    try {
      let res = await requests.favorites.getFavorites();
      // setFavorites(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate(ROUTES.PRODUCTDETAILS, {item, id});
      }}>
      <View style={styles.container}>
        <Image source={{uri: appendUrl(photo)}} style={styles.image} />
        <View style={styles.itemsContainer}>
          <View style={styles.nameContainer}>
            <View style={{width: '85%'}}>
              <Text style={styles.itemName}>{name ? name : ''}</Text>
            </View>
            {discount ? (
              <View style={styles.discount}>
                <Text style={styles.dscountText}>
                  {discount ? discount : '0'}%
                </Text>
              </View>
            ) : null}
          </View>

          <View style={styles.nameContainer2}>
            <View style={styles.priceContainer}>
              {discount ? (
                <Text style={styles.oldPrice}>
                  {discount ? price : discountPrice} {STRINGS.ru.money}
                </Text>
              ) : null}
              <Text style={styles.price}>
                {price} {STRINGS.ru.money}
              </Text>
            </View>
            <View style={styles.button}>
              <DefaultButton
                secondary={isInCart}
                onPress={onCartPress}
                isInCart={isInCart}>
                {animate ? (
                  <ActivityIndicator
                    size="small"
                    color={COLORS.red}
                    animating={animate}
                  />
                ) : (
                  <View style={styles.buttonContainer}>
                    <Text
                      style={[
                        isInCart ? styles.inactiveCartText : styles.cartText,
                      ]}>
                      {isInCart
                        ? `${STRINGS.ru.addToCart}е`
                        : `${STRINGS.ru.addToCart}у`}
                    </Text>
                    <BasketIcon
                      fill={isInCart ? COLORS.cartColor3 : COLORS.white}
                    />
                  </View>
                )}
              </DefaultButton>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: 'rgba(113, 113, 113, 0.3)',
    alignItems: 'center',
  },

  image: {
    width: 65,
    height: 72,
    borderRadius: 10,
    marginHorizontal: 10,
  },

  itemsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  priceContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameContainer2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  itemName: {
    color: COLORS.defaultBlack,
    fontSize: 16,
  },

  dscountText: {
    fontSize: 12,
    color: COLORS.blue,
  },

  discount: {
    borderRadius: 8,
    padding: 4,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },

  price: {
    fontSize: 16,
    color: COLORS.blue,
  },

  oldPrice: {
    fontSize: 14,
    color: COLORS.defaultBlack,
    textDecorationLine: 'line-through',
  },

  buttonContainer: {
    flexDirection: 'row',
  },

  cartText: {
    color: COLORS.white,
    marginRight: 10,
  },

  inactiveCartText: {
    color: COLORS.cartColor3,
    marginRight: 10,
  },

  button: {
    width: 120,
    height: 40,
  },
});
