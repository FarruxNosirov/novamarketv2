import {COLORS} from '@constants/colors';
import {
  OrderIcon,
  PaymentexpectedIcon,
  PenIcon,
  RightIcon,
  RightgreyIcon,
  SendingIcon,
  SmsIcon,
} from '@icons/icons';
import {STRINGS} from '@locales/strings';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const StatusBar = ({orders, setFilter, filter}: any) => {
  const amount = orders?.length;

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.textTitle}>{STRINGS.ru.myOrders}</Text>
        <TouchableOpacity
          onPress={() => {
            let newFilter = {
              ...filter,
              status: 5,
            };
            setFilter(newFilter);
          }}>
          <View style={styles.textContainer}>
            <Text style={styles.textOrder}>{STRINGS.ru.CompletedOrders}</Text>
            <RightIcon fill={COLORS.gray} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.containerBox}>
        <TouchableOpacity
          onPress={() => {
            let newFilter = {
              ...filter,
              status: 6,
            };
            setFilter(newFilter);
          }}>
          <View style={styles.view}>
            <PaymentexpectedIcon />
            {amount > 0 && filter.status === 6 ? (
              <View style={styles.iconView}>
                <Text style={styles.iconText}>{amount}</Text>
              </View>
            ) : null}
            <Text style={styles.text}>{STRINGS.ru.Paymentexpected}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            let newFilter = {
              ...filter,
              status: 2,
            };
            setFilter(newFilter);
          }}>
          <View style={styles.view}>
            <SendingIcon />
            {amount > 0 && filter.status === 2 ? (
              <View style={styles.iconView}>
                <Text style={styles.iconText}>{amount}</Text>
              </View>
            ) : null}
            <Text style={styles.text}>{STRINGS.ru.Shipmentexpected}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            let newFilter = {
              ...filter,
              status: 4,
            };
            setFilter(newFilter);
          }}>
          <View style={styles.view}>
            <OrderIcon />
            {amount > 0 && filter.status === 4 ? (
              <View style={styles.iconView}>
                <Text style={styles.iconText}>{amount}</Text>
              </View>
            ) : null}
            <Text style={styles.text}>{STRINGS.ru.Theorderhasbeensent}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            let newFilter = {
              ...filter,
              status: 9,
            };
            setFilter(newFilter);
          }}>
          <View style={styles.view}>
            <SmsIcon />
            {amount > 0 && filter.status === 9 ? (
              <View style={styles.iconView}>
                <Text style={styles.iconText}>{amount}</Text>
              </View>
            ) : null}
            <Text style={styles.text}>{STRINGS.ru.Reviewpending}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          let newFilter = {
            ...filter,
            status: 3,
          };
          setFilter(newFilter);
        }}>
        <View style={styles.row}>
          <View style={styles.center}>
            <PenIcon fill={COLORS.gray} />
            <Text style={styles.greyText}>{STRINGS.ru.Returns}</Text>
          </View>
          <RightgreyIcon />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default StatusBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginVertical: 20,
    marginHorizontal: 20,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: COLORS.lightGray,
    paddingBottom: 10,
    marginHorizontal: 10,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textTitle: {
    color: COLORS.defaultBlack,
    fontWeight: '700',
    fontSize: 20,
  },
  textOrder: {
    color: COLORS.red,
    fontWeight: '600',
    fontSize: 10,
    marginRight: 15,
  },
  containerBox: {
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderColor: COLORS.lightGray,
    paddingTop: 20,
    paddingVertical: 10,
  },
  text: {
    width: 70,
    textAlign: 'center',
    fontSize: 10,
    height: 30,
    color: COLORS.black,
  },
  view: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  center: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  greyText: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.gray,
    marginHorizontal: 5,
  },
  view1: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  iconView: {
    borderRadius: 50,
    backgroundColor: COLORS.orange,
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -8,
    right: 15,
  },
  iconText: {
    color: COLORS.white,
    fontSize: 10,
  },
});
