import requests, {assetUrl} from '@api/requests';
import {ROUTES} from '@constants/routes';
import {STRINGS} from '@locales/strings';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '@store/hooks';
import {cartSelector, loadCart} from '@store/slices/cartSlice';
import {favoriteSelector, loadFavorite} from '@store/slices/favoriteSlice';
import {selectUser} from '@store/slices/userSlice';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  BasketIcon,
  HeartIconActive,
  HeartIconNotActive,
} from '../../../../assets/icons/icons';
import {COLORS} from '../../../../constants/colors';
import ButtonGradient from '@components/ButtonGradient';

type ProductItemCardProps = {
  showNewProduct?: boolean;
  showDiscount?: boolean;
  showDiscountAdd?: boolean;
  price: number;
  price_usd?: number;
  id: number;
  discount: number;
  brand?: string;
  shop?: string;
  category: {
    name?: string;
  };
  name: string;
  photo: string;
  isFavorite?: boolean;
  modalSort?: any;
  getProducts?: () => void;
};

const AllProductItemCard = (props: ProductItemCardProps) => {
  let {
    photo,
    brand,
    shop,
    category,
    name,
    price,
    discount,
    id,
    isFavorite,
    price_usd,
    showDiscount,
    showDiscountAdd,
    showNewProduct,
  } = props;

  const [animate, setAnimate] = useState(false);
  const cart = useAppSelector(cartSelector);
  let isInCart = !!cart[id];
  const dispatch = useDispatch();
  const fav = useAppSelector(favoriteSelector);
  let isFav = !!fav[id];
  const discountPrice = (price * 100) / (100 - discount);
  const navigation = useNavigation();
  const user = useAppSelector(selectUser);

  const onAddFavorite = async () => {
    try {
      let res = await requests.favorites.addFavorite({
        product_id: id,
      });
      let r = await requests.favorites.getFavorites();
      dispatch(loadFavorite(r.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  const onCartPress = async () => {
    if (isInCart) {
      try {
        setAnimate(true);
        let clear = await requests.products.removeItem({
          product_id: id,
        });
        let cartGet = await requests.products.getCarts();
        dispatch(loadCart(cartGet.data.data));
        setAnimate(false);
      } catch (error) {
        console.log(error);
        setAnimate(false);
      }
    } else {
      try {
        setAnimate(true);
        let res = await requests.products.addToCart({
          amount: 1,
          product_id: id,
        });
        if (!user.token) {
          return Alert.alert(`Oшибка `, 'вы не зарегистрированы', [
            {
              text: 'Ок',
              onPress: () => navigation.navigate(ROUTES.AUTH as never),
            },
          ]);
        }
        if (res.status.toString() === '422') {
          Alert.alert('Кол-во товара на складе меньше чем вы указали');
        }
        let cartRes = await requests.products.getCarts();
        dispatch(loadCart(cartRes.data.data));
        setAnimate(false);
      } catch (error) {
        Alert.alert('Кол-во товара на складе меньше чем вы указали');
      } finally {
        setAnimate(false);
      }
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        //@ts-ignore
        navigation.navigate(ROUTES.PRODUCTDETAILS, {props: props})
      }>
      <View style={styles.cartItem}>
        <Image style={styles.image} source={{uri: assetUrl + props.photo}} />
        {discount ? (
          <View style={styles.sileBox}>
            <Text style={styles.sileText}>{discount} %</Text>
          </View>
        ) : null}
        {/* {showNewProduct ? (
          <View style={[styles.sileBox, styles.sileBoxBgColor]}>
            <Text style={[styles.sileText, styles.sileTextFS]}>Новый</Text>
          </View>
        ) : null}
        {showDiscountAdd ? (
          <View style={[styles.sileBox, styles.sileBoxBgColor]}>
            <Text style={[styles.sileText, styles.sileTextFS]}>Под заказ</Text>
          </View>
        ) : null} */}
        <TouchableOpacity onPress={onAddFavorite} style={styles.heartIconBox}>
          {isFav ? (
            <HeartIconActive fill={COLORS.red} />
          ) : (
            <HeartIconNotActive />
          )}
        </TouchableOpacity>

        <View style={styles.cartItemInfo}>
          <View style={{height: 115}}>
            <View style={styles.title_box}>
              <Text style={styles.typeText}>
                {category?.name?.length > 15
                  ? category?.name?.slice(0, 15)
                  : category?.name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: 80,
              }}>
              <Text style={styles.nameText}>
                {name?.length > 35 ? name?.slice(0, 35) + '...' : name}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.priceText}>
                  {price
                    .toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })
                    .replace(/,/gi, ' ')}{' '}
                  {STRINGS.ru.money}
                </Text>
                {discount ? (
                  <Text style={styles.priceTextSile}>
                    {discountPrice
                      .toLocaleString(undefined, {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      .replace(/,/gi, ' ')}{' '}
                    {STRINGS.ru.money}
                  </Text>
                ) : null}
              </View>
            </View>
          </View>
          {/* <TouchableOpacity
            style={[
              styles.button,
              {backgroundColor: isInCart ? '#0052FF' : '#FFFFFF'},
            ]}
            onPress={onCartPress}>
            {animate ? (
              <ActivityIndicator
                size="small"
                color={isInCart ? '#fff' : '#0052FF'}
                animating={animate}
              />
            ) : (
              <View style={styles.buttonContainer}>
                <Text
                  style={[
                    isInCart ? styles.cartText : styles.inactiveCartText,
                  ]}>
                  {isInCart
                    ? `${STRINGS.ru.addToCart}е`
                    : `${STRINGS.ru.addToCart}у`}
                </Text>
                <BasketIcon fill={isInCart ? COLORS.white : '#274784'} />
              </View>
            )}
          </TouchableOpacity> */}
          <View style={styles.button}>
            <ButtonGradient
              onPress={onCartPress}
              isInCart={isInCart}
              containerStyle={{
                borderRadius: 40,
                borderWidth: 1,
                borderColor: COLORS.blue,
              }}>
              {animate ? (
                <ActivityIndicator
                  size="small"
                  color={isInCart ? '#fff' : COLORS.blue}
                  animating={animate}
                />
              ) : (
                <View style={styles.buttonContainer}>
                  <Text
                    style={[
                      isInCart ? styles.cartText : styles.inactiveCartText,
                    ]}>
                    {isInCart
                      ? `${STRINGS.ru.addToCart}е`
                      : `${STRINGS.ru.addToCart}у`}
                  </Text>
                  <BasketIcon fill={isInCart ? COLORS.white : COLORS.blue} />
                </View>
              )}
            </ButtonGradient>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AllProductItemCard;

const styles = StyleSheet.create({
  cartItem: {
    height: 330,
    width: Dimensions.get('screen').width / 2 - 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
    flexDirection: 'column',
    marginRight: 20,
    shadowColor: '#d0d0d0',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  cartText: {
    color: COLORS.white,
    marginRight: 4,
    fontWeight: '700',
    fontSize: 15,
  },
  inactiveCartText: {
    color: '#274784',
    marginRight: 8,
    fontWeight: '700',
    fontSize: 15,
  },
  image: {
    width: Dimensions.get('screen').width / 2 - 20,
    height: 156,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cartItemInfo: {
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  typeText: {
    fontSize: 13,
    fontWeight: '400',
    color: '#999999',
  },
  nameText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#023047',
  },
  priceTextSile: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.black,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    opacity: 0.5,
  },
  priceText: {
    fontSize: 15,
    fontWeight: '400',
    color: COLORS.blue,
  },

  button: {
    width: '100%',
    height: 42,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textColorBlue,
    marginRight: 10,
  },
  sileBox: {
    width: 40,
    height: 25,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 174,
    right: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  sileText: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.black,
  },
  sileBoxBgColor: {
    backgroundColor: COLORS.textColorBlue,
  },
  sileTextFS: {
    fontSize: 13,
  },
  heartIconBox: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  title_box: {
    height: 20,
    width: '100%',
  },
});
