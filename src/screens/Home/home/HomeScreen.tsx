import requests, {assetUrl} from '@api/requests';
import {WINDOW_WIDTH} from '@constants/sizes';
import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, Image, ScrollView, StyleSheet, View} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import SearchNatlifHeader from '../../../components/uikit/Header/SearchNatlifHeader';
import {COLORS} from '../../../constants/colors';
import NewsList from './NewsList';
import ProductCatalog from './ProductCatalog';
import ProductListNew from './ProductListNew';
import ProductListPopular from './ProductListPopular';
import ProductListSale from './ProductListSale';
import BrandsList from './brandsList/BrandsList';
import ShopsList from './shopsList/ShopsList';

export default function HomeScreen() {
  const width = Dimensions.get('window').width;
  const isCorusel = useRef(null);
  const [index2, setIndex2] = useState(0);
  const [dataSliderAll, setDataSliderAll] = useState<any>([]);
  const [bannerSlider, setBannerSlider] = useState<any>([]);

  const CaruselSliderAll = async () => {
    try {
      let res = await requests.slider.getSlidersAll();
      setDataSliderAll(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const CaruselBannerAll = async () => {
    try {
      let res = await requests.slider.getSlidersMobile();
      setBannerSlider(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    CaruselSliderAll();
    CaruselBannerAll();
  }, []);

  return (
    <View
      style={{flex: 1, position: 'relative', backgroundColor: COLORS.white}}>
      <SearchNatlifHeader />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {bannerSlider.length <= 0 ? null : (
          <>
            <Carousel
              ref={isCorusel}
              data={bannerSlider}
              renderItem={({item}: any) => {
                return (
                  <View
                    style={{
                      width: '100%',
                      height: 200,
                      borderRadius: 20,
                      paddingHorizontal: 20,
                    }}>
                    <Image
                      style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'contain',
                        borderRadius: 20,
                      }}
                      source={{uri: assetUrl + item?.photo}}
                    />
                  </View>
                );
              }}
              itemWidth={WINDOW_WIDTH}
              windowSize={WINDOW_WIDTH}
              sliderWidth={WINDOW_WIDTH}
              itemHeight={200}
              sliderHeight={200}
              onSnapToItem={index => setIndex2(index)}
              key={bannerSlider.id}
            />
            <Pagination
              dotsLength={bannerSlider?.length}
              activeDotIndex={index2}
              dotStyle={{
                width: 35,
                height: 3,
                backgroundColor: 'black',
              }}
            />
          </>
        )}

        <View style={styles.container}>
          <BrandsList />
          <ShopsList />
          <ProductListPopular title={'Популярные товары'} filter={true} />
          <ProductCatalog />
          <ProductListSale title={'Товары со скидкой'} filter={true} />
          {bannerSlider.length <= 0 ? null : (
            <>
              <Carousel
                ref={isCorusel}
                data={bannerSlider}
                renderItem={({item}: any) => {
                  return (
                    <View
                      style={{
                        width: '100%',
                        height: 200,
                        borderRadius: 20,
                        paddingHorizontal: 20,
                      }}>
                      <Image
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: 20,
                        }}
                        source={{uri: assetUrl + item.photo}}
                      />
                    </View>
                  );
                }}
                sliderWidth={width}
                itemWidth={width}
                onSnapToItem={index => setIndex2(index)}
                key={bannerSlider.id}
              />
              <Pagination
                dotsLength={dataSliderAll.length}
                activeDotIndex={index2}
                dotStyle={{
                  width: 35,
                  height: 3,
                  backgroundColor: 'black',
                }}
              />
            </>
          )}

          <ProductListNew
            title={'Новые товары'}
            filter={true}
            showNewProduct={true}
          />
          <NewsList title="Новости" filter={false} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: COLORS.tabBgColor,
  },
  container: {
    flex: 1,
  },
  imageBannerTop: {
    width: '100%',
    height: 116,
    marginBottom: 10,
  },
  caruselBadge: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
    paddingHorizontal: 40,
  },
  caruselBadgeItem: {
    width: 40,
    height: 5,
    borderRadius: 5,
    backgroundColor: '#84A9C0',
    marginHorizontal: 5,
  },
  imageBannerBattom: {
    width: '100%',
    height: 245,
    marginBottom: 10,
  },
});
