import {LoginResponse} from '@api/types';
import {COLORS} from '@constants/colors';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {RootState} from '@store/configureStore';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {deleteAccountData, getProfileData} from '@store/slices/ProfileSlice';
import {selectUser} from '@store/slices/userSlice';
import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {
  BorderedLikeIcon,
  CommentIcon,
  ContactIcon,
  NewAdminIcon,
  NewArrowIcon,
  NewBasketIcon,
  NewLocationIcon,
  NewLogOutIcon,
  NewMessageIcon,
  NewNotificationIcon,
  NewTranstionIcon,
  PaymentIcon,
  ShopIcon,
  UserMarkIcon,
} from '../../../assets/icons/icons';
import ProductsTitle from '../../../components/uikit/ProductsTitle';
import {ROUTES} from '../../../constants/routes';
import SettingsItem from './Setting/SettingItem';
import ContactsView from './contacts/Contacts';

export default function ProfileScreen() {
  const navigation: any = useNavigation();
  const isFocused = useIsFocused();
  const dispatch: any = useAppDispatch();
  const profileStore = useSelector((store: RootState) => store.profile);
  type ProfileData = Partial<LoginResponse>;
  // let [profileData, setProfileData] = useState<ProfileData>();
  // const [animate2, setAnimate2] = useState(false);

  let onLogOut = () => {
    navigation.navigate(ROUTES.AUTH as never);
  };

  useEffect(() => {
    isFocused && dispatch(getProfileData());
  }, [isFocused]);
  const user = useAppSelector(selectUser);
  const ubdeteProfile = () => {
    user.token
      ? navigation.navigate(ROUTES.PERSONALDATE as never, profileStore as never)
      : Alert.alert('Зарегистрируйте чтобы добавить в корзину');
  };

  return (
    <View
      style={{flex: 1, backgroundColor: COLORS.white, position: 'relative'}}>
      <ScrollView style={style.container} showsVerticalScrollIndicator={false}>
        <ProductsTitle title="Доброе утро" showButton={false} />
        {/* <View style={style.ProfileInfo}>
        {user?.token ? (
          <Image
            style={style.ProfileImage}
            source={{uri: assetUrl + profileStore?.photo}}
          />
        ) : (
          <View style={[style.ProfileImage]}></View>
        )}
        <View style={style.ProfileInfoTextBox}>
          <Text style={style.ProfileInfoTextName}>{profileStore?.name}</Text>

          <View style={{width: '80%'}}>
            <TouchableOpacity onPress={ubdeteProfile}>
              <Text style={style.ProfileInfoText}>Изменить личные данные</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View> */}

        <SettingsItem
          onPress={() => navigation.navigate(ROUTES.OrderScrenn as never)}
          text={'Мои заказы'}
          icon={() => <ShopIcon fill={COLORS.defaultBlack} />}
        />
        <SettingsItem
          text={'Избранные товары'}
          onPress={() => navigation.navigate(ROUTES.FAVORITES)}
          icon={() => <BorderedLikeIcon fill={COLORS.defaultBlack} />}
        />
        {/* <SettingsItem
        text={'Мы на карте'}
        icon={() => <NewLocationIcon />}
   
      /> */}
        <SettingsItem
          onPress={() => navigation.navigate(ROUTES.MESSAGE as never)}
          text={'Мои сообщения'}
          icon={() => <CommentIcon fill={COLORS.defaultBlack} />}
        />
        <SettingsItem
          onPress={() => navigation.navigate(ROUTES.TECHNICALSUPPORT as never)}
          text={'Техническая поддержка'}
          icon={() => <NewAdminIcon />}
        />
        {/* <SettingsItem
        onPress={() => navigation.navigate(ROUTES.BONUSPROGRAM as never)}
        text={'Бонусная программа'}
        icon={() => <NewDiscountIcon />}
   
      /> */}
        <SettingsItem
          onPress={() => navigation.navigate(ROUTES.TRANSACTIONS as never)}
          text={'Мои платежи'}
          icon={() => <PaymentIcon fill={COLORS.defaultBlack} />}
        />
        {/* <SettingsItem
          onPress={() =>
            navigation.navigate(ROUTES.PROFILE_NOTIFICATION as never)
          }
          text={'Уведомления'}
          icon={() => <NewNotificationIcon />}
        /> */}
        <SettingsItem
          onPress={ubdeteProfile}
          text={'Мои данные'}
          icon={() => <UserMarkIcon />}
        />
        <SettingsItem
          text={'Контакты'}
          onPress={() => navigation.navigate(ROUTES.Contacts)}
          icon={() => <ContactIcon stroke={COLORS.defaultBlack} />}
        />
        <SettingsItem
          text={'Войти'}
          onPress={onLogOut}
          icon={() => <NewLogOutIcon stroke={COLORS.defaultBlack} />}
        />
      </ScrollView>
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
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
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
    marginBottom: 20,
    marginHorizontal: 15,
  },
  logOutButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 10,
    color: COLORS.white,
  },
  butto2: {
    height: 55,
    marginBottom: 50,
    marginTop: 20,
    backgroundColor: COLORS.red,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    width: '100%',
    paddingHorizontal: 15,
    position: 'absolute',

    backgroundColor: COLORS.white,
    height: 120,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 17,
    elevation: 1,
    bottom: 20,
  },
});
