import React, {useState} from 'react';
import {View, Button, Text, TouchableOpacity} from 'react-native';
import {Modal, Portal, Provider} from 'react-native-paper';

const DeleteModel = ({
  visible,
  hideModal,
  showModal,
  deleteSelectedMessages,
}) => {
  return (
    // <Provider>
    //   <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={{
          backgroundColor: '#61511F', // Change this to any color you like
          padding: 20,
          margin: 20, // Optional: add margin for better visualization
          borderRadius: 10, // Optional: add border radius for rounded corners
        }}>
        <Text style={{color: '#fff', fontWeight: 400, fontSize: 18}}>
          Delete message from me
        </Text>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-evenly',
            flexDirection: 'row',
            marginTop: 50,
          }}>
          <TouchableOpacity onPress={hideModal}>
            <Text style={{color: '#fff', fontSize: 15}}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              deleteSelectedMessages();
              hideModal();
            }}
            style={{
              //   borderColor: '#000',
              //   borderWidth: 1,
              //   padding: 5,
              paddingHorizontal: 15,
              paddingVertical: 5,
              backgroundColor: '#FFC901',
              borderRadius: 8,
            }}>
            <Text style={{color: '#000', fontWeight: 400, fontSize: 15}}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </Portal>
    //   </View>
    // </Provider>
  );
};

export default DeleteModel;
