import {mediaDevices} from 'react-native-webrtc';

export default class Utils {
  static async getStream() {
    let isFront = true;
    try {
      const sourceInfos = await mediaDevices.enumerateDevices();
      console.log(sourceInfos);

      let videoSourceId;
      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if (
          sourceInfo.kind === 'videoinput' &&
          sourceInfo.facing === (isFront ? 'front' : 'environment')
        ) {
          videoSourceId = sourceInfo.deviceId;
          break;
        }
      }

      const stream = await mediaDevices.getUserMedia({
        audio: true,
        video: {
          width: 640,
          height: 480,
          frameRate: 30,
          facingMode: isFront ? 'user' : 'environment',
          deviceId: videoSourceId,
        },
      });

      return stream;
    } catch (error) {
      console.error('Error accessing media devices:', error);
      return null;
    }
  }
}
