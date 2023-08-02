// import React from 'react';
// import {
//   Dimensions,
//   Image,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// import requests, {assetUrl} from '@api/requests';
// import {COLORS} from '@constants/colors';
// import {HeartIconActive, HeartIconNotActive} from '@icons/icons';
// import {useAppSelector} from '@store/hooks';
// import {toggleLoading} from '@store/slices/appSettings';
// import {favoriteSelector, loadFavorite} from '@store/slices/favoriteSlice';
// import {useDispatch} from 'react-redux';
// import {useNavigation} from '@react-navigation/native';
// import {ROUTES} from '@constants/routes';
// type Props = {
//   buttonTitle?: string;
//   item?: any;
// };

// export default function AllNewsCart({item, buttonTitle}: Props) {
//   const dispatch = useDispatch();
//   const fav = useAppSelector(favoriteSelector);
//   let isFav = !!fav[item?.id];
//   const navagation = useNavigation();
//   const onAddFavorite = async () => {
//     try {
//       dispatch(toggleLoading(true));
//       let res = await requests.favorites.addFavorite({
//         product_id: item.id,
//       });
//       let r = await requests.favorites.getFavorites();
//       dispatch(loadFavorite(r.data.data));
//     } catch (error) {
//       console.log(error);
//     } finally {
//       dispatch(toggleLoading(false));
//     }
//   };

//   return (
//     <View style={styles.cartItem}>
//       <Image style={styles.image} source={{uri: assetUrl + item.photo}} />
//       <TouchableOpacity onPress={onAddFavorite} style={styles.heartIconBox}>
//         {isFav ? <HeartIconActive /> : <HeartIconNotActive />}
//       </TouchableOpacity>
//       <View style={styles.cartItemInfo}>
//         <View style={styles.cartItemInfoBox}>
//           <Text style={styles.typeText}>
//             {' '}
//             {item.name.length > 45
//               ? item?.name.slice(0, 45) + '...'
//               : item?.name}{' '}
//           </Text>
//         </View>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() =>
//             navagation.navigate(
//               //@ts-ignore
//               ROUTES.NEWDETAILS as never,
//               {id: item.id} as never,
//             )
//           }>
//           <Text style={styles.buttonText}>{buttonTitle}</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   cartItem: {
//     width: Dimensions.get('screen').width / 2 - 20,
//     height: 330,
//     backgroundColor: '#fff',
//     borderRadius: 15,
//     marginRight: 20,
//     marginBottom: 20,
//     flexDirection: 'column',
//     shadowColor: '#d0d0d0',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   image: {
//     width: Dimensions.get('screen').width / 2 - 20,
//     height: 156,
//     borderTopLeftRadius: 15,
//     borderTopRightRadius: 15,
//     marginBottom: 10,
//     flexWrap: 'wrap',
//   },
//   heartIconBox: {
//     position: 'absolute',
//     top: 10,
//     right: 10,
//   },
//   cartItemInfo: {
//     paddingHorizontal: 10,
//   },
//   typeText: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: COLORS.black,
//     marginBottom: 10,
//   },
//   cartItemInfoBox: {
//     height: 100,
//     marginBottom: 10,
//   },
//   button: {
//     width: '100%',
//     height: 42,
//     borderRadius: 45,
//     backgroundColor: COLORS.white,
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexDirection: 'row',
//     borderWidth: 1,
//     borderColor: COLORS.textColorBlue,
//   },
//   buttonText: {
//     fontSize: 15,
//     fontWeight: '700',
//     color: COLORS.textColorBlue,
//     marginRight: 10,
//   },
// });
/* eslint-disable react-native/no-inline-styles */
import {assetUrl} from '@api/requests';
import ButtonGradient from '@components/ButtonGradient';
import {COLORS} from '@constants/colors';

import {ROUTES} from '@constants/routes';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

type Props = {
  buttonTitle?: string;
  item?: any;
};

export default function AllNewsCart({item}: Props) {
  const navigation = useNavigation();
  // console.log('item', JSON.stringify(item, null, 2));
  const formatDate = (date: any, format = ' DD.MM.YYYY') => {
    const dateMoment = moment(date);
    return dateMoment.format(format);
  };
  const defaultDate = formatDate(item.date);
  console.log('defaultDate', defaultDate);

  return (
    <View style={styles.cartItem}>
      <View style={styles.imageBox}>
        <TouchableWithoutFeedback
          onPress={() =>
            navigation.navigate(
              ROUTES.NEWDETAILS as never,
              {id: item.id} as never,
            )
          }>
          <Image style={styles.image} source={{uri: assetUrl + item.photo}} />
        </TouchableWithoutFeedback>
      </View>

      <View style={styles.cartItemInfo}>
        <View style={styles.cartItemInfoBox}>
          <Text style={styles.typeText}>
            {item.name.length > 80
              ? item?.name.slice(0, 80) + '...'
              : item?.name}
          </Text>
        </View>

        <ButtonGradient
          isInCart={true}
          defaultBtn={true}
          containerStyle={styles.button}
          onPress={() =>
            navigation.navigate(
              ROUTES.NEWDETAILS as never,
              {id: item.id} as never,
            )
          }>
          <Text style={styles.buttonText}>Подробно</Text>
        </ButtonGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cartItem: {
    width: Dimensions.get('screen').width / 2 - 20,
    height: 320,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginRight: 15,
    marginBottom: 20,
    flexDirection: 'column',
    shadowColor: '#d0d0d0',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageBox: {
    width: Dimensions.get('screen').width / 2 - 20,
    height: 156,
    borderRadius: 15,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    marginBottom: 10,
    resizeMode: 'stretch',
  },
  heartIconBox: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  cartItemInfo: {
    paddingHorizontal: 10,
  },
  typeText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.black,
  },
  cartItemInfoBox: {
    height: 100,
    width: '100%',
  },
  button: {
    width: '100%',
    height: 40,
    borderRadius: 10,
    backgroundColor: COLORS.blue,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: COLORS.blue,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.white,
  },
});
