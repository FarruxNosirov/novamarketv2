/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import requests, {assetUrl} from '@api/requests';
import {STRINGS} from '@locales/strings';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useAppSelector} from '@store/hooks';
import {toggleLoading} from '@store/slices/appSettings';
import {cartSelector, loadCart} from '@store/slices/cartSlice';
import {favoriteSelector, loadFavorite} from '@store/slices/favoriteSlice';
import {selectUser} from '@store/slices/userSlice';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Image,
  LayoutAnimation,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {useDispatch} from 'react-redux';
import {
  BasketIcon,
  ChatProductIcon,
  Checked,
  HeartIconActive,
  HeartIconNotActive,
  LeftArrowIcon,
  MarkedStar,
  MinusIcon,
  NotMarkedStar,
  PlusCounterIcon,
  RightArrow,
} from '../../../../assets/icons/icons';
import FilterModal from '../../../../components/uikit/Filter/FilterModal';
import {COLORS} from '../../../../constants/colors';
import {ROUTES} from '../../../../constants/routes';
import AllProductItemCard from '../../home/allProducts/AllProductItemCard';
import Characteristics from '../components/Characteristics';
import Description from '../components/Description';
import {styles} from './style';
import ButtonGradient from '@components/ButtonGradient';
import DefaultButton from '@components/uikit/DefaultButton';
import ReviewBox from '@components/uikit/ReviewBox';
import useLoading from '@store/Loader/useLoading';
import Spinner from 'react-native-loading-spinner-overlay';

const PdoductDetails = () => {
  const [active, setActive] = useState({
    value1: false,
    value2: false,
  });

  const [sizeActive, setSizeActive] = useState();
  const navigation = useNavigation();
  const [animate, setAnimate] = useState(false);
  const width = Dimensions.get('window').width;
  const isCorusel = useRef(null);
  const [index, setIndex] = useState(0);
  const route = useRoute<any>();
  let id = route?.params?.props?.id;

  const [colorActive, setColorActive] = useState(id);
  let newId = colorActive ? colorActive : id;

  useEffect(() => {
    setColorActive(id);
  }, [id]);

  const cart = useAppSelector(cartSelector);
  let isInCart = !!cart[newId];
  const dispatch = useDispatch();
  const fav = useAppSelector(favoriteSelector);
  let isFav = !!fav[newId];
  const [adValue, setAdValue] = useState(1);
  const [detailIdValue, setDetailIdValue] = useState<any>([]);
  const [related, setrelated] = useState();
  const userToken = useAppSelector(selectUser);
  const [shouldShow, setShouldShow] = useState(true);
  const [reviewsList, setReviewsList] = useState<any>([]);
  const flatlistRef = React.useRef();

  const [loading, setLoading] = useState(false);

  const onPressFunction = () => {
    //@ts-ignore
    flatlistRef.current.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const getDetailId = useCallback(async () => {
    setLoading(true);
    try {
      let res = await requests.products.getProductDetailID(newId);
      setDetailIdValue(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [newId]);

  useEffect(() => {
    getDetailId();
    onPressFunction();
  }, [getDetailId]);

  const onPress = () => {
    setActive({...active, value1: !active.value1});
  };
  const onPress2 = () => {
    setActive({...active, value2: !active.value2});
  };

  const onAddFavorite = async () => {
    try {
      dispatch(toggleLoading(true));
      let res = await requests.favorites.addFavorite({
        product_id: newId,
      });
      let r = await requests.favorites.getFavorites();
      dispatch(loadFavorite(r.data.data));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(toggleLoading(false));
    }
  };

  const adHandler = (a: string) => {
    if (a === 'add') {
      setAdValue(c => c + 1);
    } else {
      if (adValue > 0) {
        setAdValue(c => c - 1);
      } else {
        setAdValue(0);
      }
    }
  };

  const onCartPress = async () => {
    const newDate = {
      amount: adValue,
      product_id: newId,
      'filterID[0]': sizeActive,
    };

    if (isInCart) {
      setLoading(true);
      try {
        setAnimate(true);
        let clear = await requests.products.removeItem({
          product_id: newId,
        });
        let cartGet = await requests.products.getCarts();
        dispatch(loadCart(cartGet.data.data));
        setAnimate(false);
      } catch (error) {
        console.log(error);
        setAnimate(false);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        setAnimate(true);
        let res = await requests.products.addToCart(newDate);
        if (!userToken.token) {
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
        setLoading(false);
        setAnimate(false);
      }
    }
  };

  const relatedProducts = async () => {
    try {
      let res = await requests.products.relatedProducts(newId);
      setrelated(res.data.data);
    } catch (error) {}
  };
  const getReviews = async () => {
    try {
      let res = await requests.products.getReviews(newId);
      setReviewsList(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  let per = detailIdValue?.reviews_count;
  reviewsList.map(() => {
    const sum = reviewsList.reduce((a: any, b: any) => {
      return b.rate + a;
    }, 0);

    let percent = sum / reviewsList.length;
    per = percent.toString().substring(0, 3);
  });

  useEffect(() => {
    getReviews();
    relatedProducts();
  }, []);

  let separate = detailIdValue?.review_separate;
  console.log(JSON.stringify(sizeActive, null, 2));

  return (
    <View style={{backgroundColor: COLORS.tabBgColor, zIndex: 0}}>
      <View
        style={{
          position: 'relative',
          top: 0,
          left: 0,
          backgroundColor: 'transparent',
          zIndex: 2,
          width: '100%',
          height: 50,
          elevation: 1,
        }}>
        <View style={styles.goBack}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <LeftArrowIcon stroke={'#0052FF'} />
          </TouchableOpacity>
          {detailIdValue?.shop && userToken.token ? (
            <TouchableOpacity
              style={styles.chatIcon}
              onPress={() =>
                navigation.navigate(
                  //@ts-ignore
                  ROUTES.CHATPRODUCTS as never,
                  {id: detailIdValue?.shop?.id} as never,
                )
              }>
              <ChatProductIcon />
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity onPress={onAddFavorite}>
            {isFav ? (
              <HeartIconActive fill={COLORS.red} />
            ) : (
              <HeartIconNotActive fill={'#0052FF'} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{zIndex: 0}} ref={flatlistRef}>
        <View style={{width: '100%', position: 'relative', minHeight: 346}}>
          <Carousel
            ref={isCorusel}
            data={detailIdValue?.gallery}
            renderItem={({item}) => {
              return (
                <View style={{width: '100%', height: 346}}>
                  <Image
                    style={{width: '100%', height: '100%'}}
                    source={{uri: assetUrl + item}}
                  />
                </View>
              );
            }}
            sliderWidth={width}
            itemWidth={width}
            onSnapToItem={index => setIndex(index)}
            keyExtractor={(_, index) => index.toString()}
          />

          <Pagination
            dotsLength={
              detailIdValue?.gallery ? detailIdValue?.gallery?.length : 1
            }
            activeDotIndex={index}
            dotStyle={{
              width: 35,
              height: 3,
              backgroundColor: 'black',
            }}
            containerStyle={{paddingHorizontal: 20}}
          />
        </View>

        <View style={styles.container}>
          <View style={styles.box1} />
          <View style={styles.box2}>
            <Text style={styles.title}>
              {detailIdValue?.name?.length > 30
                ? detailIdValue?.name.slice(0, 30) + '...'
                : detailIdValue?.name}
            </Text>
          </View>
          <View style={styles.border} />
          <View style={styles.box2}>
            <Text style={styles.box2_title_now}>
              {detailIdValue?.price
                ?.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })
                .replace(/,/gi, ' ')}{' '}
              {STRINGS.ru.money}
            </Text>
          </View>

          <View style={styles.counter}>
            <View style={styles.add_remov}>
              <View style={styles.minus}>
                <ButtonGradient
                  onPress={() => adHandler('remov')}
                  isInCart={true}
                  containerStyle={{
                    borderTopLeftRadius: 5,
                    borderBottomLeftRadius: 5,
                  }}>
                  <MinusIcon
                    style={{width: 120, height: 120}}
                    fill={COLORS.white}
                  />
                </ButtonGradient>
              </View>
              <View style={styles.topBottom}>
                <Text style={{color: COLORS.black}}>{adValue}</Text>
              </View>
              <View style={styles.plus}>
                <ButtonGradient
                  onPress={() => adHandler('add')}
                  isInCart={true}
                  containerStyle={{
                    borderTopRightRadius: 5,
                    borderBottomRightRadius: 5,
                    padding: 1,
                  }}>
                  <PlusCounterIcon
                    style={{width: 120, height: 120}}
                    fill={COLORS.white}
                  />
                </ButtonGradient>
              </View>
            </View>

            <View
              style={{
                height: '100%',
                width: '40%',
              }}>
              <DefaultButton
                containerStyle={styles.button}
                secondary={isInCart}
                onPress={onCartPress}>
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
                    <BasketIcon fill={isInCart ? COLORS.blue : COLORS.white} />
                  </View>
                )}
              </DefaultButton>
            </View>
          </View>

          {detailIdValue?.filters?.length > 0 ? (
            <>
              {detailIdValue?.filters.map((item: any) => {
                return (
                  <>
                    {item.name === 'Размер' ? (
                      <>
                        <View style={styles.border} />
                        <View style={styles.box4}>
                          <View style={styles.box4_content}>
                            <Text style={styles.box4_title}>{item.name}:</Text>
                            <FlatList
                              style={{marginTop: 18}}
                              horizontal
                              showsHorizontalScrollIndicator={false}
                              data={item.items}
                              renderItem={({item}) => (
                                <TouchableOpacity
                                  onPress={() => setSizeActive(item.value_id)}
                                  style={[
                                    styles.buttonSize,
                                    {
                                      backgroundColor:
                                        sizeActive === item.value_id
                                          ? COLORS.blue
                                          : '#FFFFFF',
                                    },
                                  ]}>
                                  <Text
                                    style={[
                                      styles.active_title,
                                      {
                                        color:
                                          sizeActive === item.value_id
                                            ? '#ffffff'
                                            : COLORS.blue,
                                      },
                                    ]}>
                                    {item.value}
                                  </Text>
                                </TouchableOpacity>
                              )}
                            />
                          </View>
                        </View>
                      </>
                    ) : null}
                  </>
                );
              })}
            </>
          ) : null}

          {detailIdValue?.products?.length > 0 ? (
            <>
              <View style={styles.border} />
              <View style={styles.box4}>
                <View style={styles.box4_content}>
                  <Text style={styles.box4_title}>Цвет:</Text>

                  <FlatList
                    style={{marginTop: 18}}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={detailIdValue?.products}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        onPress={() => setColorActive(item.id)}
                        style={[
                          styles.buttonSize,
                          {
                            backgroundColor:
                              newId === item.id ? COLORS.blue : '#FFFFFF',
                          },
                        ]}>
                        <Text
                          style={[
                            styles.active_title,
                            {
                              color:
                                newId === item.id ? '#ffffff' : COLORS.blue,
                            },
                          ]}>
                          {item.color}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </View>
            </>
          ) : null}
          {detailIdValue?.description !== '' ? (
            <>
              <View style={styles.border2} />
              <FilterModal
                title="Описание"
                active={active.value1}
                onPress={onPress}>
                {active.value1 && (
                  <View style={[styles.box_noactive]}>
                    <Description description={detailIdValue?.description} />
                  </View>
                )}
              </FilterModal>
            </>
          ) : null}
          {detailIdValue?.productProperties?.length > 0 && (
            <>
              <View style={styles.border2} />
              <FilterModal
                title="Характеристики"
                active={active.value2}
                onPress={onPress2}>
                {active.value2 && (
                  <View style={[styles.box_noactive]}>
                    <Characteristics
                      productProperties={detailIdValue?.productProperties}
                    />
                  </View>
                )}
              </FilterModal>
            </>
          )}

          <View style={styles.border2} />

          <TouchableOpacity
            onPress={() => {
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut,
              );
              setShouldShow(!shouldShow);
            }}>
            <View style={styles.composTwo}>
              <Text style={styles.composition}>Отзывы</Text>
              <RightArrow
                style={{width: 120, height: 120}}
                fill={COLORS.lighBlue}
              />
            </View>
          </TouchableOpacity>
          <ReviewBox percent={per} separate={separate} />
          {!shouldShow ? (
            <View style={{marginVertical: 10}}>
              {reviewsList?.map((item: any) => (
                <View key={item.id} style={styles.containerComment}>
                  <View style={styles.boxes}>
                    <View style={styles.nameRow}>
                      <Text style={styles.name}>{item.user.name}</Text>
                      <View style={styles.stars}>
                        {new Array(5).fill(1).map((e, i) => {
                          if (i < item.rate) {
                            return (
                              <MarkedStar
                                style={{width: 120, height: 120}}
                                fill={COLORS.blue}
                              />
                            );
                          } else {
                            return (
                              <NotMarkedStar
                                style={{width: 120, height: 120}}
                                fill={COLORS.whiteGray}
                              />
                            );
                          }
                        })}
                      </View>
                    </View>
                    <Text style={styles.comment}>{item.review}</Text>
                    <View style={styles.row}>
                      <Text>{item.date.split(' ')[0]}</Text>
                      <View style={styles.row}>
                        <Checked
                          fill={COLORS.blue}
                          style={[styles.icon, {width: 120, height: 120}]}
                        />
                        <Text>Я купил товар</Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          ) : null}

          <View style={styles.border} />
          <View style={styles.box6}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.brend}>Бренд</Text>
            </View>
            <View style={{width: 80, height: 30}}>
              <Image
                style={{width: '100%', height: '100%', resizeMode: 'cover'}}
                source={{uri: assetUrl + detailIdValue?.brand?.photo}}
              />
            </View>
          </View>
          <View style={styles.border} />
          <View style={{flex: 1}}>
            <Text
              style={{
                fontWeight: '700',
                fontSize: 17,
                lineHeight: 40,
                color: COLORS.black,
                marginLeft: 15,
              }}>
              Похожие товары
            </Text>
            <FlatList
              style={{marginTop: 10, marginBottom: 20, paddingTop: 10}}
              showsVerticalScrollIndicator={false}
              data={related}
              renderItem={({item}) => <AllProductItemCard {...item} />}
              numColumns={2}
              contentContainerStyle={styles.contentContainerStyle}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </ScrollView>
      <Spinner visible={loading} />
    </View>
  );
};

export default PdoductDetails;
