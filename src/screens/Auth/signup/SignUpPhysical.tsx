import SingUpTemplate from '../../../components/template/SingUpTemplate';
import CheckBox from '../../../components/uikit/CheckBox';
import DefaultButton from '../../../components/uikit/DefaultButton';
import SectionTitle from '../../../components/uikit/SectionTitle';
import DefaultInput from '../../../components/uikit/TextInput';
import {COLORS} from '../../../constants/colors';
import React, {useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '../../../constants/routes';

import moment from 'moment';
import useRegisterHook from './hooks';
import {STRINGS} from '@locales/strings';
import DefaultInputEye from '@components/uikit/DefaultInputEye';
import WelcomeScreen from '@components/template/WelcomeScreen';
import IconCart from './IconCart';
import {HomeIcon} from '@icons/icons';

// export interface RegisterStatePyhsical {
//   phone: string;
//   name: string;
//   // lastName?: string;
//   // middleName?: string;
//   // birthday?: string;
//   password: string;
//   type: string;
// }
export default function SignUpPhysical() {
  let {
    loading,
    onStateChange,
    onRegister,
    state,
    onRegisterNavigation,
    errTxt,
  } = useRegisterHook();
  let navigation = useNavigation();
  // const [date, setDate] = useState(new Date())
  // const [open, setOpen] = useState(false)
  // const formatDate = (date: Date) => setState({ ...state, birthday: moment(date).format('DD.MM.YYYY') })
  const [diseblet, setDiseblet] = useState(true);

  return (
    <WelcomeScreen title="Novamarkt">
      <ScrollView
        style={{backgroundColor: COLORS.white, paddingHorizontal: 20}}>
        <DefaultInput
          placeholder="Ваш номер"
          label="Номер телефона"
          backgroundColor={COLORS.white}
          placeholderColor={COLORS.labelText}
          marginBottom={0}
          onChangeText={onStateChange('phone')}
          value={state.phone}
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
      </ScrollView>
    </WelcomeScreen>
  );
}
