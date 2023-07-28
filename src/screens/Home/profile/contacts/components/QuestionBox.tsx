/* eslint-disable no-alert */
import requests from '@api/requests';
import {SendQuestionValue} from '@api/types';
import DefaultButton from '@components/uikit/DefaultButton';
import {COLORS} from '@constants/colors';
import useLoading from '@store/Loader/useLoading';
import React, {useState} from 'react';
import {Alert, Platform, StyleSheet, Text, TextInput, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

export interface QuestionBoxProps {
  title?: string;
  button?: string;
}

const QuestionBox = ({title, button}: QuestionBoxProps) => {
  const [question, setQuestion] = useState<SendQuestionValue>();
  const [loading, setLoading] = useState(false);

  const disabled = question?.message?.length > 0 ? true : false;
  const onSubmit = async () => {
    try {
      setLoading(true);
      let res = await requests.frequentQuestions.sendQuestion({
        name: question?.name as string,
        email: question?.email as string,
        message: question?.message as string,
      });
      // eslint-disable-next-line no-extra-boolean-cast
      if (!!res.data) {
        Alert.alert('Спасибо', `ваше письмо успешно отправлено`, [
          {
            text: 'OK',
          },
        ]);
      } else {
        Alert.alert('Извините', `ваше письмо не было успешно отправлено`, [
          {
            text: 'OK',
          },
        ]);
      }
      setQuestion({});
    } catch (error) {
      alert('errroooor');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={{backgroundColor: COLORS.white}}>
      <View style={styles.footer}>
        <Text style={styles.footerTxt}>{title ? title : ''}</Text>
        <TextInput
          style={styles.input}
          placeholder={'Ваше имя'}
          placeholderTextColor={COLORS.gray}
          value={question?.name}
          onChangeText={e => {
            setQuestion({...question, name: e});
          }}
        />
        <TextInput
          placeholderTextColor={COLORS.gray}
          style={styles.input}
          keyboardType="email-address"
          placeholder={'Ваш  e-mail'}
          value={question?.email}
          onChangeText={e => {
            setQuestion({...question, email: e});
          }}
        />
        <TextInput
          style={styles.bigger}
          placeholder={'Сообщение'}
          placeholderTextColor={COLORS.gray}
          value={question?.message}
          onChangeText={e => {
            setQuestion({...question, message: e});
          }}
        />
        <DefaultButton
          textStyle={styles.text}
          containerStyle={styles.button}
          onPress={onSubmit}
          title={button}
          isInCart={false}
          disabled={!disabled}
        />
      </View>
      <Spinner visible={loading} />
    </View>
  );
};

export default QuestionBox;

const styles = StyleSheet.create({
  footer: {
    backgroundColor: COLORS.skyBlue,
    marginHorizontal: 15,
    borderRadius: 10,
    elevation: 8,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },

  footerTxt: {
    color: COLORS.defaultBlack,
    fontSize: 20,
    marginBottom: 10,
  },

  input: {
    marginVertical: 10,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS == 'android' ? 10 : 15,
    fontStyle: 'italic',
    color: COLORS.black,
  },

  bigger: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    paddingVertical: Platform.OS == 'android' ? 10 : 15,
    paddingBottom: 60,
    fontStyle: 'italic',
    marginVertical: 10,
    color: COLORS.black,
    paddingHorizontal: 10,
  },

  button: {
    padding: 0,
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 0,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
  },

  text: {
    fontSize: 15,
  },
});
