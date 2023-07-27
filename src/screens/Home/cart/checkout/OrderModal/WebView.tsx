import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';
import {useRoute} from '@react-navigation/native';

const WebViewComponets = () => {
  const {params} = useRoute<any>();
  // console.log('link', JSON.stringify(params, null, 2));

  return (
    <SafeAreaView style={{flex: 1}}>
      <WebView
        source={{
          uri: params?.link,
        }}
      />
    </SafeAreaView>
  );
};

export default WebViewComponets;

const styles = StyleSheet.create({});
