import requests, {assetUrl} from '@api/requests';
import GoBackHeader from '@components/uikit/Header/GoBackHeader';
import {COLORS} from '@constants/colors';
import {useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import RenderHTML from 'react-native-render-html';

const NewDetails = () => {
  const {params} = useRoute<any>();
  let id = params.id;
  const width = Dimensions.get('window').width;

  const [loading, setLoading] = useState(false);

  const [shopValyu, setShopValyu] = useState<any>([]);
  const shopGetId = useCallback(async () => {
    setLoading(true);
    try {
      let res = await requests.news.getNewsDetails(id);
      setShopValyu(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    shopGetId();
  }, [shopGetId]);
  const source = {
    html: `
 ${shopValyu.description}`,
  };
  const mixedStyle = {
    body: {
      whiteSpace: 'normal',
      color: COLORS.textColor,
    },
    p: {
      color: COLORS.textColor,
    },
    h1: {
      color: COLORS.textColor,
    },
    h2: {
      color: COLORS.textColor,
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.goBack}>
        <GoBackHeader title="Главное" />
      </View>

      <ScrollView
        style={styles.scrolContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.imageView}>
          <Image
            style={styles.image}
            source={{uri: assetUrl + shopValyu.photo}}
          />
        </View>
        <View style={styles.contantBox}>
          <Text style={styles.title}>{shopValyu.name}</Text>
          <RenderHTML
            contentWidth={width}
            source={source}
            tagsStyles={mixedStyle}
          />
        </View>
      </ScrollView>
      <Spinner visible={loading} />
    </View>
  );
};

export default NewDetails;

const styles = StyleSheet.create({
  container: {backgroundColor: COLORS.tabBgColor, zIndex: 0, flex: 1},
  goBack: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    top: 0,
    paddingVertical: 10,
    backgroundColor: 'transparent',
    zIndex: 4,
  },
  icons: {
    width: 50,
    height: 44,
    backgroundColor: '#84A9C0',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contantBox: {
    width: '100%',
    marginBottom: 50,
    backgroundColor: COLORS.white,
    marginTop: 20,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 25,
    fontWeight: '600',
    color: '#3F3535',
  },
  box2: {
    width: '100%',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  box2_title_now: {
    fontSize: 16,
    lineHeight: 40,
    color: '#131313',
  },
  box2_title_old: {
    fontSize: 18,
    lineHeight: 40,
    color: '#C8C8C8',
  },
  border: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#7171712d',
    marginTop: 14,
    marginBottom: 14,
  },
  box_noactive: {
    width: '100%',
    zIndex: 3,
    paddingBottom: 24,
  },
  border2: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#7171712d',
  },
  imageBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'transparent',
    zIndex: 2,
    width: '100%',
    height: 100,
  },
  svgStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'transparent',
  },
  scrolContainer: {backgroundColor: COLORS.white, flex: 1},
  imageView: {width: '100%', height: 346},
  image: {width: '100%', height: '100%', resizeMode: 'stretch'},
});
