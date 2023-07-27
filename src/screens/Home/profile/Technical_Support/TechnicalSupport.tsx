import requests from '@api/requests';
import useLoading from '@store/Loader/useLoading';
import React from 'react';
import {
  Alert,
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
  TelegramIconProduct,
  WhatsapIconProduct,
} from '../../../../assets/icons/icons';
import DefaultButton from '../../../../components/uikit/DefaultButton';
import GoBackHeader from '../../../../components/uikit/Header/GoBackHeader';
import {COLORS} from '../../../../constants/colors';
import {useSelector} from 'react-redux';
import {RootState} from '@store/configureStore';

const TechnicalSupport = () => {
  const profileStore = useSelector((store: RootState) => store.profile);
  console.log(JSON.stringify(profileStore, null, 2));

  const [state, setState] = React.useState({
    name: profileStore?.name as string,
    email: profileStore?.email as string,
    message: '',
  });
  const loading = useLoading();

  const onStateChange = (key: string, value: string) => {
    setState({
      ...state,
      [key]: value,
    });
  };

  const MessegeSende = async () => {
    try {
      loading?.onRun();
      let res = await requests.frequentQuestions.sendQuestion(state);
      const data = res?.data?.data;

      if (!!data) {
        Alert.alert('Спасибо', `ваше письмо успешно отправлено`, [
          {
            text: 'OK',
            onPress: () => {
              setState({
                ...state,
                message: '',
              });
            },
          },
        ]);
      } else {
        Alert.alert('Извините', `ваше письмо не было успешно отправлено`, [
          {
            text: 'OK',
            onPress: () => {
              setState({
                theme: '',
                message: '',
              });
            },
          },
        ]);
      }
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    } finally {
      loading?.onClose();
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <GoBackHeader title="Поддержка" />

      <ScrollView style={styles.container}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '500',
            color: '#757575',
            marginTop: 20,
            marginBottom: 20,
          }}>
          Сообщение
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Введите сообщение"
          placeholderTextColor="#757575"
          multiline={true}
          numberOfLines={4}
          onChangeText={text => onStateChange('message', text)}
          value={state.message}
        />

        <DefaultButton title="Отправить" onPress={MessegeSende} />

        <Text
          style={{
            fontSize: 16,
            fontWeight: '700',
            textAlign: 'center',
            marginTop: 20,
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
            marginTop: 22,
            marginBottom: 130,
          }}>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://xn--80affa3aj0al.xn--80asehdb/');
            }}>
            <TelegramIconProduct />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://www.facebook.com/');
            }}>
            <FaceBookIconProduct />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://www.whatsapp.com/');
            }}>
            <WhatsapIconProduct />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default TechnicalSupport;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
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
