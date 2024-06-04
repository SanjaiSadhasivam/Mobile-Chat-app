import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

import {chatScreenHeader} from './chatScreenHeader-css';
import BackIcon from 'react-native-vector-icons/Ionicons';

const ChatScreenHeader = ({props, userDatas}) => {
  return (
    <View style={chatScreenHeader.headerContainer}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'start',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{paddingHorizontal: 10}}
          onPress={() => props.navigation.navigate('ChatBody')}>
          <BackIcon name={'chevron-back'} size={25} color="#F3F3F3" />
        </TouchableOpacity>
        <View style={chatScreenHeader.headerImg}>
          <Image
            source={require('../../../../assets/images/user1.png')}
            style={{width: 60, height: 60}}
          />
        </View>
        <View style={{marginLeft: 1}}>
          <Text style={{color: '#fff', fontSize: 18}}>
            {userDatas.userName}
          </Text>
          <Text style={{color: '#fff', fontSize: 13, marginTop: 12}}>
            {userDatas.mobile}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ChatScreenHeader;
