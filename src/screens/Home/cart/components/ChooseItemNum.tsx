import requests, {appendUrl} from '@api/requests';
import {
  CrashIcon,
  HeartIconActive,
  HeartIconBorder,
  MinusIcon,
  PlusCounterIcon,
} from '@icons/icons';

import {COLORS} from '@constants/colors';
import {STRINGS} from '@locales/strings';
import {useAppSelector} from '@store/hooks';
import {loadCart} from '@store/slices/cartSlice';
import {favoriteSelector, loadFavorite} from '@store/slices/favoriteSlice';
import React, {useEffect, useState} from 'react';
import {
  Image,
  LayoutAnimation,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {useDispatch} from 'react-redux';

export let ProductsData = {
  name: 'Элегантный Костюм с брюками ZARA стиль',
  price: '1400  ₽',
};

export default function ChooseItemNum({data}: {data: any}) {
  const [shouldShow, setShouldShow] = useState(false);
  const [loading, setLoading] = useState({
    loadingMinus: false,
    loadingPlus: false,
    loading: false,
  });
  const [defaultPrice, setdefaultPrice] = useState(data);
  // console.log('defaultPrice', defaultPrice);

  const dispatch = useDispatch();
  let id = data.product.id;

  const fav = useAppSelector(favoriteSelector);

  let isFav = !!fav[id];
  const notDiscountPrice =
    (defaultPrice?.price * 100) / (100 - defaultPrice?.product?.discount);

  const onAddItem = async (addOne?: boolean) => {
    try {
      setLoading({...loading, loadingPlus: true});
      let res = await requests.products.increaseItem({
        amount: addOne ? 1 : value ? Number(value) : 1,
        product_id: id,
      });
      let cartRes = await requests.products.getCarts();
      dispatch(loadCart(cartRes.data.data));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading({...loading, loadingPlus: false});
    }
  };

  const onDecreaseItem = async () => {
    if (data.amount !== 1) {
      try {
        setLoading({...loading, loadingMinus: true});
        let res = await requests.products.decreaseItem({
          product_id: id,
        });
        let cartRes = await requests.products.getCarts();
        dispatch(loadCart(cartRes.data.data));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading({...loading, loadingMinus: false});
      }
    }
  };

  const onRemoveItem = async () => {
    try {
      setLoading({...loading, loading: true});
      let res = await requests.products.removeItem({
        product_id: id,
      });
      let cartRes = await requests.products.getCarts();
      dispatch(loadCart(cartRes.data.data));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading({...loading, loading: false});
      LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    }
  };

  const onAddFavorite = async () => {
    try {
      setLoading({...loading, loading: true});
      let res = await requests.favorites.addFavorite({
        product_id: id,
      });
      let r = await requests.favorites.getFavorites();
      dispatch(loadFavorite(r.data.data));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading({...loading, loading: false});
    }
  };

  const [value, onChangeText] = React.useState('1');
  useEffect(() => {
    onChangeText(data.amount.toString());
  }, [data.amount]);

  return (
    <View style={styles.container}>
      <View style={styles.imageBox}>
        <Image
          style={styles.leftImage}
          source={{uri: appendUrl(data.product.photo)}}
        />
      </View>
      <View style={styles.textBox}>
        <Text style={styles.headerTxt}>{data?.product?.name}</Text>
        <View style={styles.rowTxt}>
          {defaultPrice?.price ? (
            <Text style={styles.lineThrough}>
              {notDiscountPrice.toFixed(0)} {STRINGS.ru.money}
            </Text>
          ) : null}
          <Text style={styles.blueTxt}>
            {defaultPrice.price.toFixed(2)} {STRINGS.ru.money}
          </Text>
        </View>
        <View style={styles.counter}>
          <TouchableOpacity onPress={onDecreaseItem} style={styles.minus}>
            <View style={styles.minus}>
              {loading.loadingMinus ? (
                <ActivityIndicator size={10} color={COLORS.white} />
              ) : (
                <MinusIcon fill={COLORS.white} />
              )}
            </View>
          </TouchableOpacity>
          <View style={styles.topBottom}>
            <TextInput
              showSoftInputOnFocus={false}
              style={styles.input}
              value={value}
              onFocus={() => setShouldShow(true)}
            />
            <Text style={styles.input_title}>шт</Text>
          </View>
          <TouchableOpacity onPress={() => onAddItem(true)} style={styles.plus}>
            <View style={styles.plus}>
              {loading.loadingPlus ? (
                <ActivityIndicator size={10} color={COLORS.white} />
              ) : (
                <PlusCounterIcon fill={COLORS.white} />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.iconBox}>
        <TouchableOpacity
          onPress={onAddFavorite}
          hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}>
          {isFav ? (
            <HeartIconActive fill={'red'} />
          ) : (
            <HeartIconBorder fill={COLORS.red} stroke={COLORS.red} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onRemoveItem}
          hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}>
          <CrashIcon fill={COLORS.gray} />
        </TouchableOpacity>
      </View>
      {/* Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={shouldShow}
        onRequestClose={() => {
          setShouldShow(false);
        }}
        style={{zIndex: 1000}}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              width: '80%',
              height: 200,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={onDecreaseItem} style={styles.minus}>
                <View style={styles.minus}>
                  {loading.loadingMinus ? (
                    <ActivityIndicator size={10} color={COLORS.white} />
                  ) : (
                    <MinusIcon fill={COLORS.white} />
                  )}
                </View>
              </TouchableOpacity>
              <View style={[styles.topBottom, {paddingHorizontal: 5}]}>
                <TextInput
                  style={{
                    color: '#717171B2',
                    width: 40,
                    height: 30,
                    padding: 0,
                    margin: 0,
                    paddingHorizontal: 5,
                  }}
                  value={value}
                  onChangeText={onChangeText}
                />
                <Text style={styles.input_title}> шт</Text>
              </View>
              <TouchableOpacity
                onPress={() => onAddItem(true)}
                style={styles.plus}>
                <View style={styles.plus}>
                  {loading.loadingPlus ? (
                    <ActivityIndicator size={10} color={COLORS.white} />
                  ) : (
                    <PlusCounterIcon fill={COLORS.white} />
                  )}
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => {
                setShouldShow(false), onAddItem();
              }}
              style={{
                backgroundColor: COLORS.blue,
                marginTop: 20,
                width: '80%',
                height: 40,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', fontSize: 16}}>Подтверждение</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShouldShow(false);
              }}
              style={{
                marginTop: 20,
                width: '80%',
                height: 40,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: COLORS.blue,
              }}>
              <Text style={{color: COLORS.blue, fontSize: 16}}>Отмена</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flexDirection: 'row',

    backgroundColor: COLORS.white,
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    borderRadius: 10,
    paddingVertical: 11,
    paddingHorizontal: 11,
    elevation: 2,
  },
  input: {
    color: '#717171B2',
    height: 30,
    margin: 0,
    padding: 0,
    paddingHorizontal: 3,
    width: 30,
  },
  imageBox: {
    width: 101,
    height: 102,
    borderRadius: 8,
  },
  leftImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },

  textBox: {
    flexShrink: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',

    paddingHorizontal: 10,
    width: '60%',
  },

  headerTxt: {
    fontSize: 16,
    letterSpacing: 0.5,
    fontWeight: '600',
    color: COLORS.defaultBlack,
  },

  itemTxt: {
    fontSize: 11,
    color: COLORS.defaultBlack,
  },

  rowTxt: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    marginVertical: 5,
  },

  blueTxt: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.blue,
  },

  lineThrough: {
    fontSize: 12,
    textDecorationLine: 'line-through',
  },

  counter: {
    flexDirection: 'row',
    minWidth: 150,
    height: 30,
  },

  iconBox: {
    position: 'relative',
    paddingVertical: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 15,
  },

  item: {
    color: COLORS.white,
  },

  minus: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: COLORS.blue,
  },

  plus: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: COLORS.blue,
  },
  topBottom: {
    height: '100%',
    minWidth: 50,
    borderColor: COLORS.whiteGray,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 5,
    position: 'relative',
  },
  input_title: {
    color: '#717171B2',
    position: 'absolute',
    right: 10,
  },
});
