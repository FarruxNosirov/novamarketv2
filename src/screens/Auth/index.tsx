import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {ROUTES} from '../../constants/routes';
import Login from './login/Login';
import TelNumberScreen from './restorePassword/ForgetPassword';
import VerificationForget from './restorePassword/VerificationForget';
import SignUpPhysical from './signup/SignUpPhysical';
import Verification from './verification/Verification';

let Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name={ROUTES.LANGUAGE} component={LanguageScreen} /> */}
      <Stack.Screen name={ROUTES.LOGIN} component={Login} />
      <Stack.Screen name={ROUTES.REGISTER} component={SignUpPhysical} />
      <Stack.Screen name={ROUTES.FORGOTPASSWORD} component={TelNumberScreen} />
      <Stack.Screen name={ROUTES.VERIFICATION} component={Verification} />
    </Stack.Navigator>
  );
}
