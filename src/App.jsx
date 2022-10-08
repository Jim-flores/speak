import { useRef, useState } from 'react'
import './App.css'

function App() {
  const localVideoRef = useRef()
  const getUserMedia = (_audio, _video) => {
    const constraints = {
      audio: _audio,
      video: _video,
    }

    navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => {
        localVideoRef.current.srcObject = stream
      })
      .catch(e => {
        console.log('getUserMedia error...', e);
      })
  }

  return (
    <div className="App">
      <button onClick={() => getUserMedia(true, true)}>Activar microfono y video</button>
      {/* <button onClick={() => getUserMedia(false, true)}>´Cancel</button> */}
      <video ref={localVideoRef} autoPlay></video>
    </div>
  )
}

export default App
