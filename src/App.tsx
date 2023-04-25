import AppRouter from './routes/AppRouter';
import React from 'react';
import {Platform, UIManager} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from '@store/configureStore';
import {LoaderProvider} from '@store/Loader/Loader';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <LoaderProvider>
            <AppRouter />
          </LoaderProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
// import React, {useCallback, useEffect} from 'react';
// import {StyleSheet, View} from 'react-native';
// import {Camera, useCameraDevices} from 'react-native-vision-camera';

// export default function App() {
//   const devices = useCameraDevices();
//   const device = devices.back;

//   const getPermission = async () => {
//     await Camera.requestCameraPermission();
//   };

//   useEffect(() => {
//     getPermission();
//   }, []);

//   if (device == null) return <View />;
//   return (
//     <Camera
//       style={StyleSheet.absoluteFill}
//       device={device}
//       isActive={true}
//       enableZoomGesture={true}
//       photo={true}
//     />
//   );
// }
