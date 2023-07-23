import React from 'react';
import {ScrollView, View, Text} from 'react-native';

import InfoBoxes from './components/InfoBoxes';
import {styles} from './style';
import GoBackHeader from '@components/uikit/Header/GoBackHeader';
import {STRINGS} from '@locales/strings';
import QuestionBox from './components/QuestionBox';
import MapView from 'react-native-maps';
import {COLORS} from '@constants/colors';

const Contacts = () => {
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <GoBackHeader title={'Контакты'} />
      <ScrollView style={styles.container}>
        <Text style={styles.headerText}>Контакты</Text>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          followsUserLocation={true}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
        <View style={styles.boxes}>
          <InfoBoxes title={STRINGS.ru.phoneNumber} text={'+79257813877'} />
          <InfoBoxes title={STRINGS.ru.lawAddres} text={'Россия , Петербург'} />
          <InfoBoxes
            title={STRINGS.ru.forPartners}
            text={'Узнайте подробные условия для сотрудничества'}
          />
        </View>
        <QuestionBox
          title={'Отправьте нам сообщение'}
          button={'Отправить сообщение'}
        />
      </ScrollView>
    </View>
  );
};

export default Contacts;
