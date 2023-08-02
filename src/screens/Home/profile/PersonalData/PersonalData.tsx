/* eslint-disable react-native/no-inline-styles */
import requests, {assetUrl} from '@api/requests';
import {LoginResponse, ProfileDate} from '@api/types';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import AllProductTitle from '../../../../components/uikit/AllProductTitle';
import GoBackHeader from '../../../../components/uikit/Header/GoBackHeader';
import DefaultInput from '../../../../components/uikit/TextInput';
import {COLORS} from '../../../../constants/colors';
import ButtonGradient from '@components/ButtonGradient';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {selectUser} from '@store/slices/userSlice';
import {deleteAccountData} from '@store/slices/ProfileSlice';
import {useSelector} from 'react-redux';
import {RootState} from '@store/configureStore';
type ProfileData = Partial<ProfileDate>;

const PersonalData = () => {
  const {params}: any = useRoute();
  const [url, setUrl] = useState<any>(assetUrl + params?.photo);
  const [animate, setAnimate] = useState(false);
  const navigation = useNavigation();
  const user = useAppSelector(selectUser);
  const dispatch: any = useAppDispatch();
  const [state, setState] = useState<ProfileData>({
    gender: params?.gender ?? '',
    name: params?.name ?? '',
    phone: params?.phone ?? '',
    email: params?.email ?? '',
    birthday: params?.birthday ?? '',
    lastname: params?.lastname ?? '',
    photo: params?.photo ?? '',
    last_address: params?.last_address ?? '',
    inn: params?.inn ?? '',
  });
  const profileStore = useSelector((store: RootState) => store.profile);

  let onStateChange = (key: string) => (value: string) => {
    setState({...state, [key]: value});
  };

  let onUpdateProfile = async () => {
    try {
      setAnimate(true);
      let res = await requests.profile.editProfile(state);
      setAnimate(false);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  const changePhoto = async () => {
    await launchImageLibrary({mediaType: 'photo'}, ({assets}: any) => {
      if (assets) {
        setUrl(assets[0].uri);
        setState({
          ...state,
          photo: {
            name: assets[0].fileName,
            type: assets[0].type,
            uri:
              Platform.OS === 'ios'
                ? assets[0].uri.replace('file://', '')
                : assets[0].uri,
          },
        });
      }
    });
  };

  return (
    <View
      style={{
        marginBottom: 100,
        backgroundColor: COLORS.white,
        paddingTop: 10,
      }}>
      <GoBackHeader title="Мои данные" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={60}>
        <ScrollView>
          <AllProductTitle title="Личные данные" color={true} />
          <View style={style.ProfileInfo}>
            <Image style={style.ProfileImage} source={{uri: url}} />
            <TouchableOpacity
              onPress={changePhoto}
              style={style.ProfileInfoTextBox}>
              <Text style={style.ProfileInfoText}>Добавить</Text>
            </TouchableOpacity>
          </View>
          <View style={{paddingHorizontal: 15}}>
            <DefaultInput
              label="Имя"
              backgroundColor={COLORS.white}
              onChangeText={onStateChange('name')}
              value={state.name}
            />
            <DefaultInput
              label="Фамилия"
              backgroundColor={COLORS.white}
              value={params?.lastname}
              onChangeText={onStateChange('lastname')}
            />
            <DefaultInput
              label="E-mail"
              backgroundColor={COLORS.white}
              value={params?.email}
              onChangeText={onStateChange('email')}
            />
            <DefaultInput
              label="Номер телефона"
              backgroundColor={COLORS.white}
              onChangeText={onStateChange('phone')}
              value={state.phone}
              defaultValue={state.phone}
              typeOf="phone-pad"
            />
            <View style={style.inputBox}>
              <Text style={style.inputLabel}>Пол</Text>
              <View style={style.gender}>
                <TouchableOpacity
                  style={style.genderItem}
                  onPress={() => setState({...state, gender: 1})}>
                  <View
                    style={[
                      style.checkOutside,
                      {
                        borderColor:
                          state.gender === 1 ? COLORS.blue : '#999999',
                      },
                    ]}>
                    <View
                      style={[
                        style.checkInside,
                        {
                          backgroundColor:
                            state.gender === 1 ? COLORS.blue : '#999999',
                        },
                      ]}
                    />
                  </View>
                  <Text style={style.genderTitle}>Муж.</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={style.genderItem}
                  onPress={() => setState({...state, gender: 2})}>
                  <View
                    style={[
                      style.checkOutside,
                      {
                        borderColor:
                          state.gender === 2 ? COLORS.blue : '#999999',
                      },
                    ]}>
                    <View
                      style={[
                        style.checkInside,
                        {
                          backgroundColor:
                            state.gender === 2 ? COLORS.blue : '#999999',
                        },
                      ]}
                    />
                  </View>
                  <Text style={style.genderTitle}>Жен.</Text>
                </TouchableOpacity>
              </View>
            </View>

            <DefaultInput
              label="Дата рождения"
              isDate
              backgroundColor={COLORS.white}
              onChangeText={onStateChange('birthday')}
              value={state.birthday}
              typeOf="number-pad"
              defaultValue={state.birthday}
            />
            <DefaultInput
              label="Адрес"
              backgroundColor={COLORS.white}
              onChangeText={onStateChange('last_address')}
              value={state.last_address}
            />

            <View>
              <ButtonGradient
                onPress={onUpdateProfile}
                isInCart={true}
                containerStyle={{
                  width: '100%',
                  height: 55,

                  borderRadius: 45,

                  marginBottom: 25,
                }}>
                {animate ? (
                  <ActivityIndicator
                    size="small"
                    color={COLORS.white}
                    animating={animate}
                  />
                ) : (
                  <Text style={{color: COLORS.white}}> Изменить</Text>
                )}
              </ButtonGradient>
            </View>
          </View>
          <View style={style.footer}>
            {user.token && (
              <TouchableOpacity
                style={style.butto2}
                onPress={() => dispatch(deleteAccountData())}>
                {profileStore.isLoadingOfBtn ? (
                  <ActivityIndicator
                    size="small"
                    color={COLORS.white}
                    animating={profileStore.isLoadingOfBtn}
                  />
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={style.logOutButtonText}>Удалить аккаунт</Text>
                  </View>
                )}
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default PersonalData;

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  ProfileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  ProfileImage: {
    width: 86,
    height: 86,
    borderRadius: 100,
    marginRight: 15,
  },
  ProfileInfoTextBox: {
    flex: 1,
    flexDirection: 'column',
  },
  ProfileInfoTextName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  ProfileInfoText: {
    fontSize: 14,
    color: '#C8C8C8',
  },
  settingsButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#E1E1E1',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 17,
    elevation: 1,
    marginBottom: 15,
    marginHorizontal: 15,
  },
  settingsButtonIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#000',
  },
  logOutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#E1E1E1',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 17,
    elevation: 1,
    marginBottom: 50,
    marginHorizontal: 15,
  },
  logOutButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 10,
    color: COLORS.white,
  },

  button: {
    width: '100%',
    height: 55,
    backgroundColor: COLORS.blue,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  gender: {
    width: '100%',
    height: 55,
    backgroundColor: '#fff',
    borderRadius: 8,
    fontSize: 16,
    // borderWidth: 1,
    // borderColor: COLORS.blue,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 15,
  },
  inputLabel: {
    fontSize: 16,
    color: COLORS.labelText,
    marginBottom: 15,
  },
  inputBox: {
    width: '100%',
    marginBottom: 20,
  },
  genderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  checkOutside: {
    width: 17,
    height: 17,
    borderWidth: 1,

    borderRadius: 50,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkInside: {
    width: 10,
    height: 10,
    borderRadius: 50,
  },
  genderTitle: {
    color: '#2C2C2C',
    fontSize: 15,
  },
  butto2: {
    height: 55,
    marginBottom: 50,
    backgroundColor: COLORS.red,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 45,
  },
  footer: {
    width: '100%',
    paddingHorizontal: 15,
    backgroundColor: COLORS.white,
    height: 120,
    bottom: 60,
    borderRadius: 10,
    top: 10,
  },
});
