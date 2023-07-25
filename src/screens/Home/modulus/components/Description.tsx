import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '@constants/colors';
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

  return (
    <View>
      <RenderHTML
        contentWidth={width}
        source={source}
        baseStyle={styles.messege_HtmlText}
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
