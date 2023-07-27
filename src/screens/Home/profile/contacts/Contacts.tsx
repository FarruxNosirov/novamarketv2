import React from 'react';
import {
  ScrollView,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import InfoBoxes from './components/InfoBoxes';
import {styles} from './style';
import GoBackHeader from '@components/uikit/Header/GoBackHeader';
import {STRINGS} from '@locales/strings';
import QuestionBox from './components/QuestionBox';
import MapView, {Marker} from 'react-native-maps';
import {COLORS} from '@constants/colors';

const Contacts = () => {
  const tokyoRegion = {
    latitude: 55.746468,
    longitude: 37.6451045,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <GoBackHeader title={'Контакты'} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView>
          <Text style={styles.headerText}>Контакты</Text>
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
              title={STRINGS.ru.phoneNumber}
              text={'+7 (495) 258 33 50'}
            />
            <InfoBoxes title={STRINGS.ru.email} text={'info@nova-max.ru'} />
            <InfoBoxes
              title={STRINGS.ru.lawAddres}
              text={
                '109240, РОССИЯ, МОСКВА г, ВЕРХНЯЯ РАДИЩЕВСКАЯ ул, ДОМ 2/1 СТР3'
              }
            />
          </View>

          <QuestionBox
            title={'Отправьте нам сообщение'}
            button={'Отправить сообщение'}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Contacts;
