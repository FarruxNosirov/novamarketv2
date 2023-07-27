/* eslint-disable react-native/no-inline-styles */
import {ROUTES} from '@constants/routes';
import {STRINGS} from '@locales/strings';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {DeliveryIcon, SearchIcon} from '../../../assets/icons/icons';
import {COLORS} from '../../../constants/colors';

interface SearchProps {
  autoFocus?: boolean;
  onChange?: (val: string) => void;
}
export default function SearchNatlifHeader({autoFocus, onChange}: SearchProps) {
  const navigation = useNavigation();
  // const [state, setState] = useState([]);

  // const notificationHandler = async () => {
  //   try {
  //     let res = await requests.profile.notificationAll();
  //     setState(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   notificationHandler;
  // }, []);

  return (
    <View style={styles.container}>
      <View
        style={[styles.searchInputBox, {width: autoFocus ? '85%' : '100%'}]}>
        <TextInput
          style={styles.searchInput}
          placeholder={STRINGS.ru.searching}
          placeholderTextColor={COLORS.whiteGray}
          autoFocus={false}
          autoCorrect={false}
          onChangeText={onChange}
          onPressIn={() => navigation.navigate(ROUTES.SEARCH as never)}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTES.Camera as never)}>
          <SearchIcon fill={COLORS.textColor} style={{marginRight: 10}} />
        </TouchableOpacity>
      </View>
      {autoFocus ? (
        <View style={styles.NotificationBox}>
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.DELIVERY as never)}>
            <DeliveryIcon
              fill={COLORS.whiteGray}
              style={{width: 120, height: 120}}
            />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 15,

    alignItems: 'center',
    marginVertical: 10,
  },
  searchInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.lightGray,
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  searchInput: {
    fontSize: 16,
    backgroundColor: COLORS.lightGray,
    width: '90%',
    borderRadius: 8,
    height: '100%',
  },
  NotificationBox: {
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  NotificationBoxBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: COLORS.TextActiveColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  NotificationBoxBadgeText: {
    fontSize: 12,
    color: COLORS.tabBgColor,
  },
});
