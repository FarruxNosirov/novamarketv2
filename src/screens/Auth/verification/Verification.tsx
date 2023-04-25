import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import SingUpTemplate from '../../../components/template/SingUpTemplate';
import SectionTitle from '../../../components/uikit/SectionTitle';
import DefaultInput from '../../../components/uikit/TextInput';
import DefaultButton from '../../../components/uikit/DefaultButton';
import {COLORS} from '../../../constants/colors';
import useVerificationHook from './hooks';
import WelcomeScreen from '@components/template/WelcomeScreen';

export default function Verification(props: any) {
  let {
    timeLeft,
    onChangePhoneNumber,
    state,
    onStateChange,
    onVerificate,
    loading,
    resendCode,
  } = useVerificationHook();

  return (
    <WelcomeScreen title="Novamarkt">
      <View style={{paddingHorizontal: 20}}>
        <Text style={{marginBottom: 25, color: COLORS.labelText}}>
          Мы отправили код на{'  '}
          <Text style={{fontWeight: '700', color: COLORS.labelText}}>
            {state.phone}
          </Text>{' '}
          номер
        </Text>
        <View style={{width: '100%'}}>
          <TouchableOpacity
            onPress={onChangePhoneNumber}
            style={{alignItems: 'flex-end'}}>
            <Text style={{color: '#84A9C0', marginBottom: 25}}>
              Изменить номер
            </Text>
          </TouchableOpacity>
        </View>
        <DefaultInput
          placeholder="Код подтверждения"
          label="Введите полученный код"
          backgroundColor={COLORS.white}
          placeholderColor={COLORS.labelText}
          marginBottom={0}
          onChangeText={onStateChange('code')}
          value={state.code}
        />
        {timeLeft > 0 ? (
          <Text style={{color: '#84A9C0', marginBottom: 25}}>
            Отправить повторно через {'-'} {timeLeft}
          </Text>
        ) : null}
        <DefaultButton
          title="Переотправить"
          disabled={timeLeft !== 0}
          onPress={resendCode}

          // TextStyle={{color: timeLeft !== 0 ? COLORS.labelText : COLORS.white}}
        />
        <DefaultButton
          title="Подтвердить"
          loading={loading}
          onPress={onVerificate}
          // ButtonStyle={{
          //   backgroundColor: COLORS.activeButtonBgColor,
          //   width: '100%',
          // }}
          // TextStyle={{color: COLORS.white}}
        />
        <TouchableOpacity onPress={onChangePhoneNumber}>
          <Text style={{color: '#0052FF', marginTop: 10}}>
            Уже зарегистрированы?
          </Text>
        </TouchableOpacity>
      </View>
    </WelcomeScreen>
  );
}
