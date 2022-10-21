import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const pc = useRef(new RTCPeerConnection(null));
  const textRef = useRef();

  useEffect(() => {
    const constraints = {
      audio: false,
      video: true,
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        localVideoRef.current.srcObject = stream;

        stream.getTracks().forEach((track) => {
          _pc.addTrack(track, stream);
        });
      })
      .catch((e) => {
        console.log("getUserMedia error...", e);
      });
    const _pc = new RTCPeerConnection(null);
    _pc.onicecandidate = (e) => {
      if (e.candidate) {
        console.log(JSON.stringify(e.candidate));
      }
    };
    _pc.oniceconnectionstatechange = (e) => {
      console.log(e);
    };
    _pc.ontrack = (e) => {
      remoteVideoRef.current.srcObject = e.streams[0];
    };
    pc.current = _pc;
  }, []);
  const createOffer = () => {
    pc.current
      .createOffer({
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1,
      })
      .then((sdp) => {
        console.log(JSON.stringify(sdp));
        pc.current.setLocalDescription(sdp);
      })
      .catch((e) => console.log(e));
  };
  const createAnswer = () => {
    pc.current
      .createAnswer({
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1,
      })
      .then((sdp) => {
        console.log(JSON.stringify(sdp));
        pc.current.setLocalDescription(sdp);
      })
      .catch((e) => console.log(e));
  };
  const setRemoteDescription = () => {
    const sdp = JSON.parse(textRef.current.value);
    console.log(sdp);

    pc.current.setRemoteDescription(new RTCSessionDescription(sdp));
  };
  const addCandidate = () => {
    const candidate = JSON.parse(textRef.current.value);
    console.log("Adding Candidate...", candidate);

    pc.current.addIceCandidate(new RTCIceCandidate(candidate));
  };
  // const getUserMedia = (_audio, _video) => {};

  return (
    <div className="App">
      {/* <button onClick={() => getUserMedia(true, true)}>
        Activar microfono y video
      </button> */}

      <video
        style={{
          width: 240,
          heigth: 240,
          margin: 5,
          backgroundColor: "black",
        }}
        ref={localVideoRef}
        autoPlay
      ></video>
      <video
        style={{
          width: 240,
          heigth: 240,
          margin: 5,
          backgroundColor: "black",
        }}
        ref={remoteVideoRef}
        autoPlay
      ></video>
      <br />
      <button onClick={createOffer}>Create Offer</button>
      <button onClick={createAnswer}>Create Answer</button>
      <br />
      <textarea ref={textRef}></textarea>
      <br />
      <button onClick={setRemoteDescription}>Set Remote Descriptio n</button>
      <button onClick={addCandidate}>Add candidates</button>
    </div>
  );
}

export default App;
