import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';
import {useRoute} from '@react-navigation/native';

const WebViewComponets = () => {
  const {params} = useRoute<any>();

  return (
    <SafeAreaView style={{flex: 1}}>
      <WebView
        source={{
          uri: 'https://novamarkt.server.paykeeper.ru/bill/20230528195258913/',
        }}
      />
    </SafeAreaView>
  );
};

export default WebViewComponets;

const styles = StyleSheet.create({});
