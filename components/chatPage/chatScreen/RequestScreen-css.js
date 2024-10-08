import {StyleSheet} from 'react-native';

export const chatScreen = StyleSheet.create({
  Container: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'flex-end',
    // paddingTop: 20,
    // paddingLeft: 15,
    // paddingRight: 15,
    padding: 20,
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
    fontSize: 20, // Change font size
    paddingHorizontal: 20, // Optional: Add padding for better appearance
    borderRadius: 30, // Add border radius
    width: '90%',
  },
  chatScreenSender: {
    marginTop: 15,
    height: 'auto',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 0,
    backgroundColor: '#61511F',
    marginLeft: '20%',
  },
  chatScreenReceiver: {
    marginTop: 15,
    height: 'auto',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 20,
    backgroundColor: '#61511F',
    marginRight: '20%',
  },

  chatScreenText: {
    color: '#fff',
    fontSize: 18,
    padding: 15,
  },
});
