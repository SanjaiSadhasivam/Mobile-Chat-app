import {StyleSheet} from 'react-native';

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2929',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  loginImg: {
    marginTop: 70,
    alignItems: 'center',
    marginBottom: 50,
  },
  loginText: {
    fontSize: 30,
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    // fontWeight: 600,
  },
  loginTextView: {
    paddingLeft: 20,
    marginBottom: 15,
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
  forgetText: {
    color: '#f3f3f3',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    textDecorationLine: 'underline',
  },
  loginButton: {
    alignItems: 'center',
    backgroundColor: '#FFC901',
    padding: 10,
    borderRadius: 30,
    marginLeft: 100,
    marginRight: 100,
    marginTop: 20,
    marginBottom: 20,
  },
  createAccountText: {
    color: '#f3f3f3',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  signUpText: {
    color: '#FFC901',
    textDecorationLine: 'underline',
  },
});
