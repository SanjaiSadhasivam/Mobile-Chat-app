// NotificationService.js
import {EventEmitter} from 'events';
import {Platform, PermissionsAndroid} from 'react-native';
import PushNotification, {Importance} from 'react-native-push-notification';
export const eventEmitter = new EventEmitter();
// Function to create a notification channel
const createNotificationChannel = () => {
  if (Platform.OS === 'android') {
    PushNotification.createChannel(
      {
        channelId: 'default-channel-ids', // (required)
        channelName: 'Default Channel', // (required)
        channelDescription: 'A default channel', // (optional) default: undefined.
        playSound: true, // (optional) default: true
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }
};

// Call the function to create the channel
createNotificationChannel();

// Configure the push notifications
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },

  onNotification: function (notification) {
    if (notification.userInteraction) {
      eventEmitter.emit('notificationPressed');
    } else {
      notification.finish(PushNotification.FetchResult.NoData);
    }
  },
  // onNotification: function (notification) {
  //   console.log('NOTIFICATION:', notification);
  //   notification.finish(PushNotification.FetchResult.NoData);
  // },

  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  popInitialNotification: true,

  requestPermissions: Platform.OS === 'ios',
});

// Function to show a local notification
export const showNotification = (title, message) => {
  console.log('logged:', title, message);
  PushNotification.localNotification({
    channelId: 'default-channel-ids',
    title: title,
    message: message,
    actions: ['Reply'],
  });
};
export const showRequests = (title, message) => {
  console.log('logged:', title, message);
  PushNotification.localNotification({
    channelId: 'default-channel-ids',
    title: title,
    message: message,
  });
};
