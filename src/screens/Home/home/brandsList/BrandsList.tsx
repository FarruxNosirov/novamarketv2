import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
} from 'react-native';
import Modal from 'react-native-modal';
import BrandItem from './BrandItem';
import requests, {appendUrl} from '@api/requests';
import {STRINGS} from '@locales/strings';
import {LeftArrowIcon} from '@icons/icons';
import {ROUTES} from '@constants/routes';
import {COLORS} from '@constants/colors';
import DefaultButton from '@components/uikit/DefaultButton';
import ProductsTitle from '@components/uikit/ProductsTitle';

const BrandsList = () => {
  let navigation: any = useNavigation();
  const [brands, setBrands] = useState([]);
  let effect = async () => {
    try {
      let res = await requests.brands.getAllBrands();
      setBrands(res.data.data);
    } catch (error) {}
  };
  useEffect(() => {
    effect();
  }, []);

  const [allModalVisible, setAllModalVisible] = useState(false);

  const toggleAllModalVisible = () => {
    setAllModalVisible(!allModalVisible);
  };
  return (
    <View style={styles.container}>
      <View style={styles.allButtonsView}>
        <ProductsTitle title={STRINGS.ru.brands} showButton={false} />
        <Modal
          isVisible={allModalVisible}
          testID={'modal'}
          swipeDirection={['right', 'left', 'down']}
          swipeThreshold={Dimensions.get('window').width / 2}
          onSwipeComplete={() => {
            setAllModalVisible(false);
          }}
          style={styles.modalStyle}>
          <View style={styles.modalInView}>
            <TouchableOpacity
              onPress={toggleAllModalVisible}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <LeftArrowIcon />
              <Text style={styles.brandsText}>{STRINGS.ru.brands}</Text>
            </TouchableOpacity>
            <View style={styles.view}>
              <FlatList
                data={brands}
                renderItem={({item: {id, name, photo}}: any) => (
                  <TouchableOpacity
                    style={styles.item_container}
                    onPress={() => {
                      navigation.navigate(ROUTES.CATALOG_PRODUCTS, {
                        id,
                        name,
                        type: 'brand',
                      });
                      toggleAllModalVisible();
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View style={styles.imageContainer}>
                        <Image
                          source={{uri: appendUrl(photo)}}
                          style={styles.image}
                        />
                      </View>
                      <Text style={styles.brandsName}>{name}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={brands}
        renderItem={props => <BrandItem {...props} />}
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </View>
  );
};

export default BrandsList;

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: COLORS.white,
    marginTop: 10,
    borderRadius: 8,
    width: 80,
    height: 50,
    marginRight: 12,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 50,
    height: 30,
    padding: 12,
  },
  item_container: {
    borderBottomWidth: 1,
    borderColor: '#999999',
  },
  title: {
    color: COLORS.defaultBlack,
    fontSize: 19,
    marginLeft: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  container: {marginBottom: 20},
  contentContainerStyle: {
    paddingLeft: 12,
  },
  allButtonsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  modalStyle: {
    justifyContent: 'center',
    margin: 0,
  },
  modalInView: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    alignItems: 'flex-start',
    paddingVertical: 50,
  },
  brandsText: {
    color: COLORS.defaultBlack,
    fontWeight: '600',
    fontSize: 18,
    marginLeft: 10,
  },
  view: {
    marginTop: 20,
    width: '100%',
  },
  brandsName: {
    color: COLORS.defaultBlack,
    fontSize: 16,
  },
  text: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.defaultBlack,
  },
});
