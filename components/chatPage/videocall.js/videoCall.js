import React, {useState, useEffect, useRef} from 'react';
import {View, Button} from 'react-native';
import {RTCView, mediaDevices} from 'react-native-webrtc';
import io from 'socket.io-client';

const socket = io('YOUR_SOCKET_SERVER_URL');

const VideoCall = () => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const pc = useRef(null);

  useEffect(() => {
    const setupWebRTC = async () => {
      pc.current = new RTCPeerConnection({
        iceServers: [
          {urls: 'stun:stun.l.google.com:19302'}, // Example STUN server
          // Add your TURN servers if necessary for NAT traversal
        ],
      });

      // Add local stream
      const stream = await mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setLocalStream(stream);
      pc.current.addStream(stream);

      // Listen for remote stream
      pc.current.onaddstream = event => {
        setRemoteStream(event.stream);
      };

      // Socket.IO event listeners for signaling
      socket.on('offer', async offer => {
        await pc.current.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await pc.current.createAnswer();
        await pc.current.setLocalDescription(answer);
        socket.emit('answer', answer);
      });

      socket.on('answer', async answer => {
        await pc.current.setRemoteDescription(
          new RTCSessionDescription(answer),
        );
      });

      socket.on('iceCandidate', candidate => {
        pc.current.addIceCandidate(new RTCIceCandidate(candidate));
      });
    };

    setupWebRTC();

    return () => {
      // Cleanup logic if necessary
    };
  }, []);

  const startCall = async () => {
    const offer = await pc.current.createOffer();
    await pc.current.setLocalDescription(offer);
    socket.emit('offer', offer);
  };

  const hangup = () => {
    // Implement hangup logic
    socket.disconnect(); // Disconnect Socket.IO
    pc.current.close(); // Close peer connection
    setLocalStream(null);
    setRemoteStream(null);
  };

  return (
    <View>
      <RTCView
        streamURL={localStream ? localStream.toURL() : null}
        style={{width: 300, height: 200}}
      />
      <RTCView
        streamURL={remoteStream ? remoteStream.toURL() : null}
        style={{width: 300, height: 200}}
      />
      <Button title="Start Call" onPress={startCall} />
      <Button title="Hangup" onPress={hangup} />
    </View>
  );
};

export default VideoCall;
