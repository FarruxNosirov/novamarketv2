export {default as CartScreen} from './controller';
import React from 'react';
import CartView from './view';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CheckoutScreen} from './checkout';

import {LocationScreen} from './location';
import {ROUTES} from '@constants/routes';
import FilterScreen from '@components/template/FilterScreen';

const Stack = createNativeStackNavigator();

export default function CartStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={ROUTES.CART} component={CartView} />
      <Stack.Screen name={ROUTES.CHECKOUT} component={CheckoutScreen} />
      <Stack.Screen name={ROUTES.FILTER} component={FilterScreen} />
      <Stack.Screen name={ROUTES.LOCATION} component={LocationScreen} />
    </Stack.Navigator>
  );
}
