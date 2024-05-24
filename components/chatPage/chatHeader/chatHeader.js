import React from 'react';
import {Image, Text, View} from 'react-native';
import {loginStyles} from '../../Login/login-css';
import {chatHeader} from './chatHeader-css';
import Icons from 'react-native-vector-icons/Entypo';
import SearchIcon from 'react-native-vector-icons/FontAwesome';
import ThreeDot from 'react-native-vector-icons/Entypo';
const ChatHeader = () => {
  return (
    <View style={chatHeader.headerContainer}>
      <View style={chatHeader.headerStyle}>
        <View style={chatHeader.headerImg}>
          <Image
            source={require('../../../assets/images/chatHeader.png')}
            // style={{height: 100}}
          />
        </View>
        <View style={chatHeader.headerIconStyle}>
          <Icons name="camera" color="#F3F3F3" size={23} />
          <SearchIcon name="search" color="#F3F3F3" size={23} />
          <ThreeDot name="dots-three-vertical" color="#F3F3F3" size={23} />
        </View>
      </View>
    </View>
  );
};

export default ChatHeader;
