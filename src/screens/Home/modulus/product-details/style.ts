import {COLORS} from '@constants/colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 50,
    backgroundColor: COLORS.white,
  },
  box1: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 25,
    fontWeight: '600',
    color: '#3F3535',
    lineHeight: 40,
  },
  box1_title: {
    fontSize: 15,
    color: '#C8C8C8',
    lineHeight: 40,
  },
  border: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#7171712d',
    marginTop: 10,
    marginBottom: 10,
  },
  border2: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#7171712d',
  },
  box2: {
    width: '100%',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  box2_title_now: {
    fontSize: 24,
    lineHeight: 40,
    color: '#131313',
  },
  box2_title_old: {
    fontSize: 18,
    lineHeight: 40,
    color: '#C8C8C8',
  },
  box3: {
    width: '100%',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  box3_title: {
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 40,
    color: COLORS.black,
  },
  box4: {
    paddingHorizontal: 15,
  },
  box4_title: {
    fontWeight: '700',
    fontSize: 17,
    lineHeight: 40,
    color: COLORS.black,
  },
  box4_content: {
    position: 'relative',
    marginBottom: 13,
  },
  content_title: {
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 20,
    color: '#C8C8C8',
  },
  colors: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 11,
  },
  active: {
    width: 92,
    height: 33,
  },
  active_title: {
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 20,
    color: '#000',
  },
  box_noactive: {
    width: '100%',
    zIndex: 3,
    paddingVertical: 12,
  },
  value: {
    flexDirection: 'row',
    width: 163,
    height: 55,
    backgroundColor: '#d1d1d1',
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  box5: {
    width: '100%',
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  box6: {
    width: '100%',
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brend: {
    fontWeight: '700',
    fontSize: 17,
    lineHeight: 40,
    color: COLORS.black,
  },
  chiaro: {
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 40,
    color: '#C8C8C8',
  },
  render_container: {
    position: 'relative',
    width: '100%',
    marginTop: 29,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  button: {
    width: '100%',
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',

    borderColor: COLORS.textColorBlue,
  },
  buttonSize: {
    minWidth: 52,
    height: 33,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: COLORS.textColorBlue,
    paddingHorizontal: 5,
    borderRadius: 5,
    borderWidth: 1,
    marginRight: 6,
  },
  buttonColor: {
    minWidth: 92,
    height: 33,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: COLORS.textColorBlue,
    paddingHorizontal: 5,
    borderRadius: 15,
    borderWidth: 1,
    marginRight: 5,
  },
  goBack: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    top: 0,
    paddingVertical: 10,
    backgroundColor: 'transparent',
    zIndex: 4,
  },
  chatIcon: {
    position: 'absolute',
    right: 80,
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
  contentContainerStyle: {
    flexDirection: 'column',
    paddingHorizontal: 10,
  },
  counter: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  add_remov: {
    flexDirection: 'row',
    width: '30%',
  },
  minus: {
    width: 28.43,
    height: 32,
  },
  plus: {
    width: 28.43,
    height: 32,
  },
  topBottom: {
    height: 32,
    width: 32,
    borderColor: COLORS.blue,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonContainer: {
    flexDirection: 'row',
    margin: 0,
  },
  cartText: {
    color: COLORS.white,
    marginRight: 4,
    fontWeight: '700',
    fontSize: 15,
  },
  inactiveCartText: {
    color: COLORS.blue,
    marginRight: 8,
    fontWeight: '700',
    fontSize: 15,
  },

  composTwo: {
    marginVertical: 25,
    marginLeft: 15,
    marginRight: 30,

    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  composition: {
    fontWeight: '700',
    fontSize: 17,

    color: COLORS.black,
  },
  containerComment: {
    backgroundColor: COLORS.white,
  },
  boxes: {
    marginHorizontal: 20,
    marginVertical: 10,
    elevation: 5,
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 15,
  },

  nameRow: {
    flexDirection: 'row',
  },

  name: {
    color: COLORS.defaultBlack,
    fontSize: 16,
  },

  stars: {
    marginLeft: 30,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  comment: {
    maxWidth: 200,
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  icon: {
    marginRight: 5,
  },
});
