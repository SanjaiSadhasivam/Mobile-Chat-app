import {StyleSheet} from 'react-native';

export const chatScreen = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#2C2929',
    paddingTop: 20,
    paddingLeft: 15,
  },
  textArea: {
    borderColor: '#FFC901',
    borderWidth: 2,
    borderRadius: 100,
  },
  textInput: {
    borderColor: '#5E5C5C',
    borderWidth: 2,
    backgroundColor: '#5E5C5C',
    color: 'white', // Change text color
    fontSize: 16, // Change font size
    paddingHorizontal: 20, // Optional: Add padding for better appearance
    borderRadius: 30, // Add border radius
  },
});
