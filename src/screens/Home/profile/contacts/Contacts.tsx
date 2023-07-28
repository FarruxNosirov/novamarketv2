/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React from 'react';
import {
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';

import GoBackHeader from '@components/uikit/Header/GoBackHeader';
import {COLORS} from '@constants/colors';
import {STRINGS} from '@locales/strings';
import MapView, {Marker} from 'react-native-maps';
import InfoBoxes from './components/InfoBoxes';
import QuestionBox from './components/QuestionBox';
import {styles} from './style';

const Contacts = () => {
  const tokyoRegion = {
    latitude: 55.746468,
    longitude: 37.6451045,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
  const phoneNumber = '+7 (495) 517 03 55';
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white, paddingTop: 10}}>
      <GoBackHeader title={'Контакты'} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <MapView
            style={styles.map}
            showsUserLocation={true}
            followsUserLocation={true}
            initialRegion={tokyoRegion}>
            <Marker
              coordinate={{
                latitude: 55.746468,
                longitude: 37.6451045,
              }}
              pinColor="red"
            />
          </MapView>

          <View style={styles.boxes}>
            <InfoBoxes
              title={'Hомер Телефонa:'}
              text={'+7 (495) 517 03 55'}
              onPress={() => Linking.openURL(`tel:${phoneNumber}`)}
            />
            <InfoBoxes
              title={'E-mail'}
              text={'info@nova-max.ru'}
              onPress={() => Linking.openURL(`mailto:${'info@nova-max.ru'}`)}
            />
            <InfoBoxes
              title={STRINGS.ru.lawAddres}
              text={
                '369300, РОССИЯ, Респ КАРАЧАЕВО-ЧЕРКЕССКАЯ, р-н УСТЬ-ДЖЕГУТИНСКИЙ, г УСТЬ-ДЖЕГУТА, ул САДОВАЯ, ДОМ 59'
              }
            />
          </View>

          <QuestionBox
            title={'Отправьте нам сообщение'}
            button={'Отправить сообщение'}
          />
          <View style={{height: 50, width: '100%'}}></View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Contacts;
