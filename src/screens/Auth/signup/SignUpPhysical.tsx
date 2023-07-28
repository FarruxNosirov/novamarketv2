import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View} from 'react-native';
import DefaultButton from '../../../components/uikit/DefaultButton';
import DefaultInput from '../../../components/uikit/TextInput';
import {COLORS} from '../../../constants/colors';

import WelcomeScreen from '@components/template/WelcomeScreen';
import DefaultInputEye from '@components/uikit/DefaultInputEye';
import useRegisterHook from './hooks';

export default function SignUpPhysical() {
  let {loading, onStateChange, onRegister, state} = useRegisterHook();

  return (
    <WelcomeScreen title="Novamax">
      <View style={{backgroundColor: COLORS.white, paddingHorizontal: 20}}>
        <DefaultInput
          placeholder="Ваш номер"
          label="Номер телефона"
          backgroundColor={COLORS.white}
          placeholderColor={COLORS.labelText}
          marginBottom={0}
          onChangeText={onStateChange('phone')}
          value={state.phone}
          onFocus={() => {
            if (state.phone === '') {
              onStateChange('phone')('+7');
            }
          }}
        />
        <DefaultInput
          placeholder="Ваше имя"
          label="Имя"
          backgroundColor={COLORS.white}
          placeholderColor={COLORS.labelText}
          marginBottom={0}
          onChangeText={onStateChange('name')}
          value={state.name}
        />

        <DefaultInputEye
          label="Ваш пароль"
          placeholder="Ваш пароль"
          backgroundColor={COLORS.white}
          inputStyle={COLORS.white}
          color={COLORS.gray}
          placeholderColor={COLORS.gray}
          onChange={onStateChange('password')}
          value={state.password}
        />

        <DefaultButton
          onPress={() => onRegister('fiz')}
          title="Далее"
          loading={loading}
        />
        {/* <IconCart icon={<HomeIcon />} /> */}
      </View>
    </WelcomeScreen>
  );
}
