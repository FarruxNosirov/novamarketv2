import {COLORS} from '@constants/colors';
import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import RenderHTML from 'react-native-render-html';
type typeProps = {
  description?: string;
};
const width = Dimensions.get('window').width;

const Description = (props: typeProps) => {
  const source = {
    html: `
  ${props.description}`,
  };
  const mixedStyle = {
    body: {
      whiteSpace: 'normal',
      color: COLORS.textColor,
      padding: 0,
      margin: 0,
    },
    p: {
      color: COLORS.textColor,
      padding: 0,
      margin: 0,
    },
    h1: {
      color: COLORS.textColor,
      padding: 0,
      margin: 0,
    },
    h2: {
      color: COLORS.textColor,
      padding: 0,
      margin: 0,
    },
  };

  return (
    <View>
      <RenderHTML
        contentWidth={width}
        source={source}
        baseStyle={styles.messege_HtmlText}
        tagsStyles={mixedStyle}
      />
      {/* <Text style={{color: COLORS.black}}>{props.description}</Text> */}
    </View>
  );
};

export default Description;

const styles = StyleSheet.create({
  messege_HtmlText: {
    color: COLORS.textColor,

    fontSize: 14,
    fontWeight: 'normal',
    padding: 0,
    margin: 0,
  },
});
