/* eslint-disable react-native/no-inline-styles */
import requests from '@api/requests';
import useLoading from '@store/Loader/useLoading';
import React from 'react';
import {
  Alert,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  FaceBookIconProduct,
  Instagram,
  TelegramIconProduct,
  VKontacte,
  WhatsapIconProduct,
} from '../../../../assets/icons/icons';
import DefaultButton from '../../../../components/uikit/DefaultButton';
import GoBackHeader from '../../../../components/uikit/Header/GoBackHeader';
import {COLORS} from '../../../../constants/colors';
import {useSelector} from 'react-redux';
import {RootState} from '@store/configureStore';
import QuestionBox from '../contacts/components/QuestionBox';

const TechnicalSupport = () => {
  // const profileStore = useSelector((store: RootState) => store.profile);

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white, paddingTop: 10}}>
      <GoBackHeader title="Поддержка" />

      <ScrollView style={styles.container}>
        <QuestionBox title={'Отправьте нам сообщение'} button={'Отправить'} />

        <Text
          style={{
            fontSize: 16,
            fontWeight: '700',
            textAlign: 'center',
            marginTop: 30,
            marginBottom: 10,
            color: COLORS.defaultBlack,
          }}>
          Вы также можете написать нам:
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
            marginBottom: 30,
          }}>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                'https://www.instagram.com/novamax.ru/?igshid=NjIwNzIyMDk2Mg%3D%3D',
              );
            }}>
            <View style={{width: 40, height: 40, marginRight: 10}}>
              <Image
                source={require('@assets/images/instagram.png')}
                style={{width: '100%', height: '100%'}}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://t.me/NovaMaxMarket');
            }}>
            <TelegramIconProduct />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                'https://www.facebook.com/people/Nova-Max/pfbid0hiXyDtszuHMvfWu5WsS3h2CTDnBEnXM8mZBgSfGQhRuZnuSFDK6L5qEj9buVssFgl/?mibextid=LQQJ4d',
              );
            }}>
            <FaceBookIconProduct />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://vk.com/novamaxmarket');
            }}>
            <VKontacte />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default TechnicalSupport;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  box1: {
    width: '100%',
    height: 50,
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#D4D4D4',
    minHeight: 150,
    borderRadius: 20,
    color: COLORS.defaultBlack,
    padding: 20,
    paddingTop: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  dropdown2BtnStyle: {
    width: '100%',
    height: 50,
    borderRadius: 45,
    paddingHorizontal: 20,
    backgroundColor: '#FAFAFA',
    marginTop: 15,
    marginBottom: 15,
  },
});
