import React, {useContext, useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

import {chatScreenHeader} from './chatScreenHeader-css';
import BackIcon from 'react-native-vector-icons/Ionicons';
import useSocketIO from '../../../../utils/SocketIO';
import {useSocket} from '../../../../SocketContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../../../AuthContext';
import {Avatar, Badge} from 'react-native-elements';

const ChatScreenHeader = ({props}) => {
  const {activeUsers, isActive, socket} = useSocket();
  const [sctive, setsctive] = useState(false);
  const {userName} = useContext(AuthContext);
  useEffect(() => {
    if (activeUsers) {
      setsctive(activeUsers?.includes(props.route.params.receiverId));
    }
  }, [activeUsers]);

  useEffect(() => {
    if (socket) {
      // setsctive(activeUsers?.includes(props.route.params.receiverId));
      socket.on('activeUsers', data => {
        setsctive(data?.includes(props.route.params.receiverId));
      });
    }
  }, [socket]);

  return (
    <View style={chatScreenHeader.headerContainer}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'start',
          alignItems: 'center',
          marginTop: 15,
          marginBottom: 10,
        }}>
        <TouchableOpacity
          style={{paddingHorizontal: 10}}
          onPress={() => props.navigation.navigate('ChatBody')}>
          <BackIcon name={'chevron-back'} size={25} color="#F3F3F3" />
        </TouchableOpacity>
        {/* <View style={chatScreenHeader.headerImg}>
          <Image
            source={require('../../../../assets/images/user1.png')}
            style={{width: 60, height: 60}}
          />
        </View> */}

        <View>
          <Avatar
            rounded
            source={require('../../../../assets/images/user1.png')}
            size="small"
          />

          <Badge
            status={sctive ? 'success' : 'error'}
            containerStyle={{position: 'absolute', bottom: -4, right: 4}}
            badgeStyle={{width: 10, height: 10, borderRadius: 8}}
          />
        </View>
        <View style={{marginLeft: 20}}>
          <Text style={{color: '#fff', fontSize: 18}}>
            {props.route.params.name}
          </Text>
          <Text style={{color: '#fff', fontSize: 13, marginTop: 1}}>
            {props.route.params.email}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ChatScreenHeader;
