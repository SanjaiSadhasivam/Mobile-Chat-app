import {View, Text, Button, TouchableOpacity} from 'react-native';
import React from 'react';

const GettingCall = () => {
  return (
    <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
      <TouchableOpacity>
        <Button>accept</Button>
      </TouchableOpacity>
      <TouchableOpacity>
        <Button>reject</Button>
      </TouchableOpacity>
    </View>
  );
};

export default GettingCall;
