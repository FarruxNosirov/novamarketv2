import requests from '@api/requests';
import {RegisterResponseErrors} from '@api/types';
import WelcomeScreen from '@components/template/WelcomeScreen';
import {ROUTES} from '@constants/routes';
import {validatePhoneNumber} from '@constants/validation';
import {useNavigation} from '@react-navigation/native';
import axios, {AxiosError} from 'axios';
import React from 'react';
import {Alert, View} from 'react-native';
import DefaultButton from '../../../components/uikit/DefaultButton';
import SectionTitle from '../../../components/uikit/SectionTitle';
import DefaultInput from '../../../components/uikit/TextInput';
import {COLORS} from '../../../constants/colors';

export default function ForgetPassword() {
  let navigation = useNavigation();
  const [state, setState] = React.useState({
    phone: '',
  });

  const [loading, setLoading] = React.useState(false);

  const onStateChange = (key: string) => (value: string) => {
    setState({...state, [key]: value});
  };

  const onForgetPassword = async () => {
    if (validatePhoneNumber(state.phone)) {
      try {
        setLoading(true);
        let res = await requests.auth.forgetPassword(state);

        navigation.navigate(
          //@ts-ignore
          ROUTES.VERIFICATION as never,
          {
            phone: state.phone,
          } as never,
        );
      } catch (error) {
        let err = error as AxiosError<RegisterResponseErrors>;
        console.log(err);
      } finally {
        setLoading(false);
      }
    } else {
      console.log('INCORRECT PHONE NUMBER');
    }
  };

  return (
    <WelcomeScreen title="Novamax">
      <View
        style={{
          paddingHorizontal: 20,
          width: '100%',
          justifyContent: 'center',
        }}>
        <SectionTitle title="Введите код" marginBottom={36} />
        <DefaultInput
          placeholder=""
          label="Номер телефона"
          backgroundColor={COLORS.white}
          placeholderColor={COLORS.labelText}
          marginBottom={0}
          value={state.phone}
          onChangeText={onStateChange('phone')}
          onFocus={() => {
            if (state.phone === '') {
              onStateChange('phone')('+7');
            }
          }}
        />
        <DefaultButton
          title="Запросить код"
          onPress={onForgetPassword}
          loading={loading}
        />
      </View>
    </WelcomeScreen>
  );
}
