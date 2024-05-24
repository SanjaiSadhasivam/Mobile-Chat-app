import {StyleSheet} from 'react-native';

export const chatHeader = StyleSheet.create({
  headerImg: {
    alignItems: 'center',
    height: '100%',
  },
  headerContainer: {
    backgroundColor: '#2C2929',
  },
  headerStyle: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f3f3',
  },
  headerIconStyle: {
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '30%',
    alignItems: 'center',
  },
});
