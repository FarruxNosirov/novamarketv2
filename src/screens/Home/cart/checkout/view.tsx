/* eslint-disable react-native/no-inline-styles */
import requests, {appendUrl} from '@api/requests';
import {
  DeliveryMethodResponse,
  LoginResponse,
  PaymentMethodResponse,
} from '@api/types';
import DefaultButton from '@components/uikit/DefaultButton';
import GoBackHeader from '@components/uikit/Header/GoBackHeader';

import DefaultInput from '@components/uikit/TextInput';
import {COLORS} from '@constants/colors';
import {ROUTES} from '@constants/routes';
import {STRINGS} from '@locales/strings';
import {useNavigation, useRoute} from '@react-navigation/native';
import useLoading from '@store/Loader/useLoading';
import {loadCart} from '@store/slices/cartSlice';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Switch,
  Text,
  View,
} from 'react-native';
import {Snackbar} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {styles} from './style';
type ProfileData = Partial<LoginResponse>;
const CheckoutView = () => {
  const route = useRoute();
  const item: any = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [delivery, setDelivery] = useState<DeliveryMethodResponse[]>();
  const [payment, setPayment] = useState<PaymentMethodResponse[]>();
  const [isEnabled, setIsEnabled] = useState(false);

  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [profileData, setProfileData] = useState<any>();
  const [state, setState] = useState<any>({
    address: '',
    delivery_id: 5,
    email: '',

    name: '',
    payment_id: 6,
    phone: '',
  });
  const loading = useLoading();
  const fetchData = async () => {
    try {
      let res = await requests.profile.getProfile();
      setProfileData(res.data.data);
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    }
  };

  const toggleSnackbar = () => setVisibleSnackbar(!visibleSnackbar);

  const effect = async () => {
    try {
      let res = await requests.products.deliveryMethods();
      let res2 = await requests.products.getProductPayment();
      setDelivery(res.data.data);
      setPayment(res2.data.data as any);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setState({
      address: profileData?.last_address ?? '',
      delivery_id: 5,
      email: profileData?.email ?? '',

      name: profileData?.name ?? '',
      payment_id: 6,
      phone: profileData?.phone ?? '',
    });
  }, [profileData]);

  useEffect(() => {
    effect();
    fetchData();
  }, []);

  let onStateChange = (key: string) => (value: string) => {
    setState({...state, [key]: value});
  };
  const sendProduct = async () => {
    if (state.address.length > 0) {
      await sendOrder();
    } else {
      return Alert.alert(`Ошибка `, 'Вы не ввели свой адрес');
    }
  };

  const sendOrder = async () => {
    try {
      loading?.onRun();
      let res = await requests.order.sendOrder(state);
      const paymendidNew = res?.data?.data?.id;
      console.log('res=====', JSON.stringify(res.data.data, null, 2));

      if (state.payment_id === 6) {
        onClearCart();
        onClose();
        let paymentRes = await requests.order.paymendId(paymendidNew);
        // console.log('paymentRes', JSON.stringify(paymentRes.data, null, 2));
        const payLink = paymentRes?.data?.data?.pay_url;
        //@ts-ignore
        navigation.navigate(ROUTES.WebView, {link: payLink});
      } else {
        toggleSnackbar();
        onClearCart();
        onClose();
      }
    } catch (error) {
      console.log(error);
    } finally {
      loading?.onClose();
    }
  };
  const onClose = () => {
    navigation.goBack();
  };
  const onClearCart = async () => {
    try {
      let res = await requests.products.clearCart();
      let cartGet = await requests.products.getCarts();
      dispatch(loadCart(cartGet.data.data));
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    if (isEnabled === false) {
      setState({
        address: '',
        delivery_id: '',
        email: '',

        name: '',
        payment_id: '',
        phone: '',
      });
    } else {
      setState({
        address: profileData?.last_address ?? '',
        delivery_id: 5,
        email: profileData?.email ?? '',

        name: profileData?.name ?? '',
        payment_id: 6,
        phone: profileData?.phone ?? '',
      });
    }
  };

  return (
    <View style={{backgroundColor: COLORS.white, flex: 1, paddingTop: 10}}>
      <GoBackHeader title="Оформление заказа" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 20}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.deliveryContainer}>
            <Text style={styles.headerTxt}>{STRINGS.ru.deliveryChoose}</Text>
            <Text
              style={{color: '#023047', fontWeight: '500', marginBottom: 10}}>
              Россия, {state.address}
            </Text>
            <DefaultInput
              label=""
              backgroundColor={'#FAFAFA'}
              placeholderColor={COLORS.labelText}
              marginBottom={0}
              onChangeText={onStateChange('address')}
              placeholder="Напишите адрес"
              // value={state.address}
            />
          </View>

          <View style={styles.pickupContainer}>
            <View style={styles.pickupBox}>
              <ScrollView
                horizontal={true}
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}>
                {item?.map((e: any, index: number) => {
                  return (
                    <View style={styles.boxNum} key={index}>
                      <Image
                        source={{uri: appendUrl(e.product.photo)}}
                        style={styles.boxImage}
                      />
                      {e.amount ? (
                        <View style={styles.imageNum}>
                          <Text style={styles.num}>{e?.amount}</Text>
                        </View>
                      ) : null}
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </View>

          <View style={styles.recipientContainer}>
            <Text style={styles.recipHeaderTxt}>{STRINGS.ru.recipient}</Text>
            <View style={styles.recipBox}>
              <View style={styles.switch}>
                <Text style={styles.notMe}>{STRINGS.ru.itsNotMe}</Text>
                <Switch
                  hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}
                  trackColor={{
                    false: COLORS.noActiveButtonBgColor2,
                    true: COLORS.blue,
                  }}
                  thumbColor={COLORS.white}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>

              {/* <PickupPoints
              onStateChange={onStateChange}
              typePayment={payment as any}
            /> */}

              <View>
                <DefaultInput
                  label="ФИО"
                  backgroundColor={'#FAFAFA'}
                  placeholderColor={COLORS.labelText}
                  marginBottom={0}
                  onChangeText={onStateChange('name')}
                  value={state.name}
                />
                {/* <DefaultInput
                label="Фамилия"
                backgroundColor={'#FAFAFA'}
                placeholderColor={COLORS.labelText}
                marginBottom={0}
                onChangeText={onStateChange('lastName')}
                value={state.lastName}
              /> */}
                <DefaultInput
                  label="Email"
                  backgroundColor={'#FAFAFA'}
                  placeholderColor={COLORS.labelText}
                  marginBottom={0}
                  onChangeText={onStateChange('email')}
                  value={state.email}
                />
                <DefaultInput
                  label="Номер телефона"
                  backgroundColor={'#FAFAFA'}
                  placeholderColor={COLORS.labelText}
                  marginBottom={0}
                  onChangeText={onStateChange('phone')}
                  value={state.phone}
                />
              </View>
            </View>

            <DefaultButton title={STRINGS.ru.addOrder} onPress={sendProduct} />
          </View>
          <Snackbar
            visible={visibleSnackbar}
            onDismiss={toggleSnackbar}
            duration={4000}>
            Заказ оформлен успешно!
          </Snackbar>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default CheckoutView;
