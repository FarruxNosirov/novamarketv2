import {View, Text} from 'react-native';
import React, {useCallback} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {ROUTES} from '../../../constants/routes';
import HomeScreen from '../home/HomeScreen';

import CatalogScreen from '../catalog/CatalogScreen';
import CartScreen from '../cart/view';
import {
  BasketIcon,
  CartIconActive,
  CartIconNotActive,
  CatalogIcon,
  CatalogIconActive,
  CatalogIconNotActive,
  HeartIcon,
  HeartIconActive,
  HeartIconNotActive,
  HomeIcon,
  HomeIconActive,
  HomeIconNotActive,
  PersonIcon,
  ProfileIconActive,
  ProfileIconNotActive,
} from '../../../assets/icons/icons';
import ProfileScreen from '@home/profile/ProfileScreen';
import {useSelector} from 'react-redux';
import {favoriteArraySelector} from '@store/slices/favoriteSlice';
import {cartTotalSelector} from '@store/slices/cartSlice';
import FavoriteView from '@home/favorites/view';
import {COLORS} from '@constants/colors';
import {SvgProps} from 'react-native-svg';
import {STRINGS} from '@locales/strings';
import {useAppSelector} from '@store/hooks';
import {selectUser} from '@store/slices/userSlice';
import AuthStack from '@auth/index';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  let favs = useSelector(favoriteArraySelector);
  let total = useSelector(cartTotalSelector);
  let renderTabIcon = useCallback((Component: React.FC<SvgProps>) => {
    return (props: {focused: boolean; color: string; size: number}) => {
      let {color, focused, size} = props;

      return <Component fill={color} width={size} height={size} />;
    };
  }, []);
  const user = useAppSelector(selectUser);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.blue,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 70,
          paddingBottom: 15,
        },
      }}>
      <Tab.Screen
        name={ROUTES.HOME}
        component={HomeScreen}
        options={{
          tabBarIcon: renderTabIcon(HomeIcon),
          tabBarLabel: STRINGS.ru.home,
          tabBarLabelStyle: {fontSize: 12},
        }}
      />
      <Tab.Screen
        name={ROUTES.CATEGORIES}
        component={CatalogScreen}
        options={{
          tabBarIcon: renderTabIcon(CatalogIcon),
          tabBarLabel: STRINGS.ru.categories,
          tabBarLabelStyle: {fontSize: 12},
        }}
      />
      <Tab.Screen
        name={ROUTES.CART}
        component={CartScreen}
        options={{
          tabBarIcon: renderTabIcon(BasketIcon),
          tabBarBadge: total.count == 0 ? undefined : total.count,
          tabBarLabel: STRINGS.ru.cart,
          tabBarLabelStyle: {fontSize: 12},
          tabBarBadgeStyle: {backgroundColor: COLORS.blue},
        }}
      />
      <Tab.Screen
        name={ROUTES.FAVORITES}
        component={FavoriteView}
        options={{
          tabBarIcon: renderTabIcon(HeartIcon),
          tabBarLabel: STRINGS.ru.favorites,
          tabBarBadge: favs?.length == 0 ? undefined : favs.length,
          tabBarLabelStyle: {fontSize: 12},
          tabBarBadgeStyle: {backgroundColor: COLORS.blue},
        }}
      />

      <Tab.Screen
        name={ROUTES.SETTINGSSTACK}
        component={user.token ? ProfileScreen : AuthStack}
        options={{
          tabBarIcon: renderTabIcon(PersonIcon),
          tabBarLabel: STRINGS.ru.login,
          tabBarLabelStyle: {fontSize: 12},
        }}
      />
    </Tab.Navigator>
  );
}
